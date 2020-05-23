package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.GeoAssocType;
import com.enotes.repository.GeoAssocTypeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
 * Integration tests for the {@link GeoAssocTypeResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class GeoAssocTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GeoAssocTypeRepository geoAssocTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGeoAssocTypeMockMvc;

    private GeoAssocType geoAssocType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoAssocType createEntity(EntityManager em) {
        GeoAssocType geoAssocType = new GeoAssocType()
            .name(DEFAULT_NAME);
        return geoAssocType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoAssocType createUpdatedEntity(EntityManager em) {
        GeoAssocType geoAssocType = new GeoAssocType()
            .name(UPDATED_NAME);
        return geoAssocType;
    }

    @BeforeEach
    public void initTest() {
        geoAssocType = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeoAssocType() throws Exception {
        int databaseSizeBeforeCreate = geoAssocTypeRepository.findAll().size();

        // Create the GeoAssocType
        restGeoAssocTypeMockMvc.perform(post("/api/geo-assoc-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoAssocType)))
            .andExpect(status().isCreated());

        // Validate the GeoAssocType in the database
        List<GeoAssocType> geoAssocTypeList = geoAssocTypeRepository.findAll();
        assertThat(geoAssocTypeList).hasSize(databaseSizeBeforeCreate + 1);
        GeoAssocType testGeoAssocType = geoAssocTypeList.get(geoAssocTypeList.size() - 1);
        assertThat(testGeoAssocType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGeoAssocTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = geoAssocTypeRepository.findAll().size();

        // Create the GeoAssocType with an existing ID
        geoAssocType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeoAssocTypeMockMvc.perform(post("/api/geo-assoc-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoAssocType)))
            .andExpect(status().isBadRequest());

        // Validate the GeoAssocType in the database
        List<GeoAssocType> geoAssocTypeList = geoAssocTypeRepository.findAll();
        assertThat(geoAssocTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGeoAssocTypes() throws Exception {
        // Initialize the database
        geoAssocTypeRepository.saveAndFlush(geoAssocType);

        // Get all the geoAssocTypeList
        restGeoAssocTypeMockMvc.perform(get("/api/geo-assoc-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(geoAssocType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getGeoAssocType() throws Exception {
        // Initialize the database
        geoAssocTypeRepository.saveAndFlush(geoAssocType);

        // Get the geoAssocType
        restGeoAssocTypeMockMvc.perform(get("/api/geo-assoc-types/{id}", geoAssocType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(geoAssocType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingGeoAssocType() throws Exception {
        // Get the geoAssocType
        restGeoAssocTypeMockMvc.perform(get("/api/geo-assoc-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeoAssocType() throws Exception {
        // Initialize the database
        geoAssocTypeRepository.saveAndFlush(geoAssocType);

        int databaseSizeBeforeUpdate = geoAssocTypeRepository.findAll().size();

        // Update the geoAssocType
        GeoAssocType updatedGeoAssocType = geoAssocTypeRepository.findById(geoAssocType.getId()).get();
        // Disconnect from session so that the updates on updatedGeoAssocType are not directly saved in db
        em.detach(updatedGeoAssocType);
        updatedGeoAssocType
            .name(UPDATED_NAME);

        restGeoAssocTypeMockMvc.perform(put("/api/geo-assoc-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeoAssocType)))
            .andExpect(status().isOk());

        // Validate the GeoAssocType in the database
        List<GeoAssocType> geoAssocTypeList = geoAssocTypeRepository.findAll();
        assertThat(geoAssocTypeList).hasSize(databaseSizeBeforeUpdate);
        GeoAssocType testGeoAssocType = geoAssocTypeList.get(geoAssocTypeList.size() - 1);
        assertThat(testGeoAssocType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGeoAssocType() throws Exception {
        int databaseSizeBeforeUpdate = geoAssocTypeRepository.findAll().size();

        // Create the GeoAssocType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeoAssocTypeMockMvc.perform(put("/api/geo-assoc-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoAssocType)))
            .andExpect(status().isBadRequest());

        // Validate the GeoAssocType in the database
        List<GeoAssocType> geoAssocTypeList = geoAssocTypeRepository.findAll();
        assertThat(geoAssocTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeoAssocType() throws Exception {
        // Initialize the database
        geoAssocTypeRepository.saveAndFlush(geoAssocType);

        int databaseSizeBeforeDelete = geoAssocTypeRepository.findAll().size();

        // Delete the geoAssocType
        restGeoAssocTypeMockMvc.perform(delete("/api/geo-assoc-types/{id}", geoAssocType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GeoAssocType> geoAssocTypeList = geoAssocTypeRepository.findAll();
        assertThat(geoAssocTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
