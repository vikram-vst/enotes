package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.GeoPoint;
import com.enotes.repository.GeoPointRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GeoPointResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class GeoPointResourceIT {

    private static final BigDecimal DEFAULT_LATITUDE = new BigDecimal(1);
    private static final BigDecimal UPDATED_LATITUDE = new BigDecimal(2);

    private static final BigDecimal DEFAULT_LONGITUDE = new BigDecimal(1);
    private static final BigDecimal UPDATED_LONGITUDE = new BigDecimal(2);

    @Autowired
    private GeoPointRepository geoPointRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGeoPointMockMvc;

    private GeoPoint geoPoint;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoPoint createEntity(EntityManager em) {
        GeoPoint geoPoint = new GeoPoint()
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE);
        return geoPoint;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoPoint createUpdatedEntity(EntityManager em) {
        GeoPoint geoPoint = new GeoPoint()
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);
        return geoPoint;
    }

    @BeforeEach
    public void initTest() {
        geoPoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeoPoint() throws Exception {
        int databaseSizeBeforeCreate = geoPointRepository.findAll().size();

        // Create the GeoPoint
        restGeoPointMockMvc.perform(post("/api/geo-points")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoPoint)))
            .andExpect(status().isCreated());

        // Validate the GeoPoint in the database
        List<GeoPoint> geoPointList = geoPointRepository.findAll();
        assertThat(geoPointList).hasSize(databaseSizeBeforeCreate + 1);
        GeoPoint testGeoPoint = geoPointList.get(geoPointList.size() - 1);
        assertThat(testGeoPoint.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testGeoPoint.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    public void createGeoPointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = geoPointRepository.findAll().size();

        // Create the GeoPoint with an existing ID
        geoPoint.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeoPointMockMvc.perform(post("/api/geo-points")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoPoint)))
            .andExpect(status().isBadRequest());

        // Validate the GeoPoint in the database
        List<GeoPoint> geoPointList = geoPointRepository.findAll();
        assertThat(geoPointList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGeoPoints() throws Exception {
        // Initialize the database
        geoPointRepository.saveAndFlush(geoPoint);

        // Get all the geoPointList
        restGeoPointMockMvc.perform(get("/api/geo-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(geoPoint.getId().intValue())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.intValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.intValue())));
    }
    
    @Test
    @Transactional
    public void getGeoPoint() throws Exception {
        // Initialize the database
        geoPointRepository.saveAndFlush(geoPoint);

        // Get the geoPoint
        restGeoPointMockMvc.perform(get("/api/geo-points/{id}", geoPoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(geoPoint.getId().intValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.intValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGeoPoint() throws Exception {
        // Get the geoPoint
        restGeoPointMockMvc.perform(get("/api/geo-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeoPoint() throws Exception {
        // Initialize the database
        geoPointRepository.saveAndFlush(geoPoint);

        int databaseSizeBeforeUpdate = geoPointRepository.findAll().size();

        // Update the geoPoint
        GeoPoint updatedGeoPoint = geoPointRepository.findById(geoPoint.getId()).get();
        // Disconnect from session so that the updates on updatedGeoPoint are not directly saved in db
        em.detach(updatedGeoPoint);
        updatedGeoPoint
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);

        restGeoPointMockMvc.perform(put("/api/geo-points")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeoPoint)))
            .andExpect(status().isOk());

        // Validate the GeoPoint in the database
        List<GeoPoint> geoPointList = geoPointRepository.findAll();
        assertThat(geoPointList).hasSize(databaseSizeBeforeUpdate);
        GeoPoint testGeoPoint = geoPointList.get(geoPointList.size() - 1);
        assertThat(testGeoPoint.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testGeoPoint.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingGeoPoint() throws Exception {
        int databaseSizeBeforeUpdate = geoPointRepository.findAll().size();

        // Create the GeoPoint

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeoPointMockMvc.perform(put("/api/geo-points")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoPoint)))
            .andExpect(status().isBadRequest());

        // Validate the GeoPoint in the database
        List<GeoPoint> geoPointList = geoPointRepository.findAll();
        assertThat(geoPointList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeoPoint() throws Exception {
        // Initialize the database
        geoPointRepository.saveAndFlush(geoPoint);

        int databaseSizeBeforeDelete = geoPointRepository.findAll().size();

        // Delete the geoPoint
        restGeoPointMockMvc.perform(delete("/api/geo-points/{id}", geoPoint.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GeoPoint> geoPointList = geoPointRepository.findAll();
        assertThat(geoPointList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
