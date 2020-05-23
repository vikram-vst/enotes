package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.FacilityType;
import com.enotes.repository.FacilityTypeRepository;

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
 * Integration tests for the {@link FacilityTypeResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class FacilityTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FacilityTypeRepository facilityTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFacilityTypeMockMvc;

    private FacilityType facilityType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityType createEntity(EntityManager em) {
        FacilityType facilityType = new FacilityType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return facilityType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityType createUpdatedEntity(EntityManager em) {
        FacilityType facilityType = new FacilityType()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return facilityType;
    }

    @BeforeEach
    public void initTest() {
        facilityType = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacilityType() throws Exception {
        int databaseSizeBeforeCreate = facilityTypeRepository.findAll().size();

        // Create the FacilityType
        restFacilityTypeMockMvc.perform(post("/api/facility-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityType)))
            .andExpect(status().isCreated());

        // Validate the FacilityType in the database
        List<FacilityType> facilityTypeList = facilityTypeRepository.findAll();
        assertThat(facilityTypeList).hasSize(databaseSizeBeforeCreate + 1);
        FacilityType testFacilityType = facilityTypeList.get(facilityTypeList.size() - 1);
        assertThat(testFacilityType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFacilityType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createFacilityTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facilityTypeRepository.findAll().size();

        // Create the FacilityType with an existing ID
        facilityType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacilityTypeMockMvc.perform(post("/api/facility-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityType)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityType in the database
        List<FacilityType> facilityTypeList = facilityTypeRepository.findAll();
        assertThat(facilityTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFacilityTypes() throws Exception {
        // Initialize the database
        facilityTypeRepository.saveAndFlush(facilityType);

        // Get all the facilityTypeList
        restFacilityTypeMockMvc.perform(get("/api/facility-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facilityType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getFacilityType() throws Exception {
        // Initialize the database
        facilityTypeRepository.saveAndFlush(facilityType);

        // Get the facilityType
        restFacilityTypeMockMvc.perform(get("/api/facility-types/{id}", facilityType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(facilityType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingFacilityType() throws Exception {
        // Get the facilityType
        restFacilityTypeMockMvc.perform(get("/api/facility-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacilityType() throws Exception {
        // Initialize the database
        facilityTypeRepository.saveAndFlush(facilityType);

        int databaseSizeBeforeUpdate = facilityTypeRepository.findAll().size();

        // Update the facilityType
        FacilityType updatedFacilityType = facilityTypeRepository.findById(facilityType.getId()).get();
        // Disconnect from session so that the updates on updatedFacilityType are not directly saved in db
        em.detach(updatedFacilityType);
        updatedFacilityType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restFacilityTypeMockMvc.perform(put("/api/facility-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacilityType)))
            .andExpect(status().isOk());

        // Validate the FacilityType in the database
        List<FacilityType> facilityTypeList = facilityTypeRepository.findAll();
        assertThat(facilityTypeList).hasSize(databaseSizeBeforeUpdate);
        FacilityType testFacilityType = facilityTypeList.get(facilityTypeList.size() - 1);
        assertThat(testFacilityType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFacilityType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingFacilityType() throws Exception {
        int databaseSizeBeforeUpdate = facilityTypeRepository.findAll().size();

        // Create the FacilityType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacilityTypeMockMvc.perform(put("/api/facility-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityType)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityType in the database
        List<FacilityType> facilityTypeList = facilityTypeRepository.findAll();
        assertThat(facilityTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacilityType() throws Exception {
        // Initialize the database
        facilityTypeRepository.saveAndFlush(facilityType);

        int databaseSizeBeforeDelete = facilityTypeRepository.findAll().size();

        // Delete the facilityType
        restFacilityTypeMockMvc.perform(delete("/api/facility-types/{id}", facilityType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FacilityType> facilityTypeList = facilityTypeRepository.findAll();
        assertThat(facilityTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
