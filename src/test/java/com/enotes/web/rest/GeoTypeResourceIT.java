package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.GeoType;
import com.enotes.repository.GeoTypeRepository;

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
 * Integration tests for the {@link GeoTypeResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class GeoTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GeoTypeRepository geoTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGeoTypeMockMvc;

    private GeoType geoType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoType createEntity(EntityManager em) {
        GeoType geoType = new GeoType()
            .name(DEFAULT_NAME);
        return geoType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoType createUpdatedEntity(EntityManager em) {
        GeoType geoType = new GeoType()
            .name(UPDATED_NAME);
        return geoType;
    }

    @BeforeEach
    public void initTest() {
        geoType = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeoType() throws Exception {
        int databaseSizeBeforeCreate = geoTypeRepository.findAll().size();

        // Create the GeoType
        restGeoTypeMockMvc.perform(post("/api/geo-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoType)))
            .andExpect(status().isCreated());

        // Validate the GeoType in the database
        List<GeoType> geoTypeList = geoTypeRepository.findAll();
        assertThat(geoTypeList).hasSize(databaseSizeBeforeCreate + 1);
        GeoType testGeoType = geoTypeList.get(geoTypeList.size() - 1);
        assertThat(testGeoType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGeoTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = geoTypeRepository.findAll().size();

        // Create the GeoType with an existing ID
        geoType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeoTypeMockMvc.perform(post("/api/geo-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoType)))
            .andExpect(status().isBadRequest());

        // Validate the GeoType in the database
        List<GeoType> geoTypeList = geoTypeRepository.findAll();
        assertThat(geoTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGeoTypes() throws Exception {
        // Initialize the database
        geoTypeRepository.saveAndFlush(geoType);

        // Get all the geoTypeList
        restGeoTypeMockMvc.perform(get("/api/geo-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(geoType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getGeoType() throws Exception {
        // Initialize the database
        geoTypeRepository.saveAndFlush(geoType);

        // Get the geoType
        restGeoTypeMockMvc.perform(get("/api/geo-types/{id}", geoType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(geoType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingGeoType() throws Exception {
        // Get the geoType
        restGeoTypeMockMvc.perform(get("/api/geo-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeoType() throws Exception {
        // Initialize the database
        geoTypeRepository.saveAndFlush(geoType);

        int databaseSizeBeforeUpdate = geoTypeRepository.findAll().size();

        // Update the geoType
        GeoType updatedGeoType = geoTypeRepository.findById(geoType.getId()).get();
        // Disconnect from session so that the updates on updatedGeoType are not directly saved in db
        em.detach(updatedGeoType);
        updatedGeoType
            .name(UPDATED_NAME);

        restGeoTypeMockMvc.perform(put("/api/geo-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeoType)))
            .andExpect(status().isOk());

        // Validate the GeoType in the database
        List<GeoType> geoTypeList = geoTypeRepository.findAll();
        assertThat(geoTypeList).hasSize(databaseSizeBeforeUpdate);
        GeoType testGeoType = geoTypeList.get(geoTypeList.size() - 1);
        assertThat(testGeoType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGeoType() throws Exception {
        int databaseSizeBeforeUpdate = geoTypeRepository.findAll().size();

        // Create the GeoType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeoTypeMockMvc.perform(put("/api/geo-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoType)))
            .andExpect(status().isBadRequest());

        // Validate the GeoType in the database
        List<GeoType> geoTypeList = geoTypeRepository.findAll();
        assertThat(geoTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeoType() throws Exception {
        // Initialize the database
        geoTypeRepository.saveAndFlush(geoType);

        int databaseSizeBeforeDelete = geoTypeRepository.findAll().size();

        // Delete the geoType
        restGeoTypeMockMvc.perform(delete("/api/geo-types/{id}", geoType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GeoType> geoTypeList = geoTypeRepository.findAll();
        assertThat(geoTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
