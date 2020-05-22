package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.Geo;
import com.enotes.repository.GeoRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GeoResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class GeoResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_ABBREVIATION = "AAAAAAAAAA";
    private static final String UPDATED_ABBREVIATION = "BBBBBBBBBB";

    @Autowired
    private GeoRepository geoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGeoMockMvc;

    private Geo geo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Geo createEntity(EntityManager em) {
        Geo geo = new Geo()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE)
            .abbreviation(DEFAULT_ABBREVIATION);
        return geo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Geo createUpdatedEntity(EntityManager em) {
        Geo geo = new Geo()
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .abbreviation(UPDATED_ABBREVIATION);
        return geo;
    }

    @BeforeEach
    public void initTest() {
        geo = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeo() throws Exception {
        int databaseSizeBeforeCreate = geoRepository.findAll().size();

        // Create the Geo
        restGeoMockMvc.perform(post("/api/geos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geo)))
            .andExpect(status().isCreated());

        // Validate the Geo in the database
        List<Geo> geoList = geoRepository.findAll();
        assertThat(geoList).hasSize(databaseSizeBeforeCreate + 1);
        Geo testGeo = geoList.get(geoList.size() - 1);
        assertThat(testGeo.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGeo.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testGeo.getAbbreviation()).isEqualTo(DEFAULT_ABBREVIATION);
    }

    @Test
    @Transactional
    public void createGeoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = geoRepository.findAll().size();

        // Create the Geo with an existing ID
        geo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeoMockMvc.perform(post("/api/geos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geo)))
            .andExpect(status().isBadRequest());

        // Validate the Geo in the database
        List<Geo> geoList = geoRepository.findAll();
        assertThat(geoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGeos() throws Exception {
        // Initialize the database
        geoRepository.saveAndFlush(geo);

        // Get all the geoList
        restGeoMockMvc.perform(get("/api/geos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(geo.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].abbreviation").value(hasItem(DEFAULT_ABBREVIATION)));
    }
    
    @Test
    @Transactional
    public void getGeo() throws Exception {
        // Initialize the database
        geoRepository.saveAndFlush(geo);

        // Get the geo
        restGeoMockMvc.perform(get("/api/geos/{id}", geo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(geo.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.abbreviation").value(DEFAULT_ABBREVIATION));
    }

    @Test
    @Transactional
    public void getNonExistingGeo() throws Exception {
        // Get the geo
        restGeoMockMvc.perform(get("/api/geos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeo() throws Exception {
        // Initialize the database
        geoRepository.saveAndFlush(geo);

        int databaseSizeBeforeUpdate = geoRepository.findAll().size();

        // Update the geo
        Geo updatedGeo = geoRepository.findById(geo.getId()).get();
        // Disconnect from session so that the updates on updatedGeo are not directly saved in db
        em.detach(updatedGeo);
        updatedGeo
            .name(UPDATED_NAME)
            .code(UPDATED_CODE)
            .abbreviation(UPDATED_ABBREVIATION);

        restGeoMockMvc.perform(put("/api/geos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeo)))
            .andExpect(status().isOk());

        // Validate the Geo in the database
        List<Geo> geoList = geoRepository.findAll();
        assertThat(geoList).hasSize(databaseSizeBeforeUpdate);
        Geo testGeo = geoList.get(geoList.size() - 1);
        assertThat(testGeo.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGeo.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testGeo.getAbbreviation()).isEqualTo(UPDATED_ABBREVIATION);
    }

    @Test
    @Transactional
    public void updateNonExistingGeo() throws Exception {
        int databaseSizeBeforeUpdate = geoRepository.findAll().size();

        // Create the Geo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeoMockMvc.perform(put("/api/geos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geo)))
            .andExpect(status().isBadRequest());

        // Validate the Geo in the database
        List<Geo> geoList = geoRepository.findAll();
        assertThat(geoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeo() throws Exception {
        // Initialize the database
        geoRepository.saveAndFlush(geo);

        int databaseSizeBeforeDelete = geoRepository.findAll().size();

        // Delete the geo
        restGeoMockMvc.perform(delete("/api/geos/{id}", geo.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Geo> geoList = geoRepository.findAll();
        assertThat(geoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
