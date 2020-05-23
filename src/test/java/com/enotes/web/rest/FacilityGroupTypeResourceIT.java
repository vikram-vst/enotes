package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.FacilityGroupType;
import com.enotes.repository.FacilityGroupTypeRepository;

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
 * Integration tests for the {@link FacilityGroupTypeResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class FacilityGroupTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FacilityGroupTypeRepository facilityGroupTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFacilityGroupTypeMockMvc;

    private FacilityGroupType facilityGroupType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityGroupType createEntity(EntityManager em) {
        FacilityGroupType facilityGroupType = new FacilityGroupType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return facilityGroupType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityGroupType createUpdatedEntity(EntityManager em) {
        FacilityGroupType facilityGroupType = new FacilityGroupType()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return facilityGroupType;
    }

    @BeforeEach
    public void initTest() {
        facilityGroupType = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacilityGroupType() throws Exception {
        int databaseSizeBeforeCreate = facilityGroupTypeRepository.findAll().size();

        // Create the FacilityGroupType
        restFacilityGroupTypeMockMvc.perform(post("/api/facility-group-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityGroupType)))
            .andExpect(status().isCreated());

        // Validate the FacilityGroupType in the database
        List<FacilityGroupType> facilityGroupTypeList = facilityGroupTypeRepository.findAll();
        assertThat(facilityGroupTypeList).hasSize(databaseSizeBeforeCreate + 1);
        FacilityGroupType testFacilityGroupType = facilityGroupTypeList.get(facilityGroupTypeList.size() - 1);
        assertThat(testFacilityGroupType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFacilityGroupType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createFacilityGroupTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facilityGroupTypeRepository.findAll().size();

        // Create the FacilityGroupType with an existing ID
        facilityGroupType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacilityGroupTypeMockMvc.perform(post("/api/facility-group-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityGroupType)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityGroupType in the database
        List<FacilityGroupType> facilityGroupTypeList = facilityGroupTypeRepository.findAll();
        assertThat(facilityGroupTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFacilityGroupTypes() throws Exception {
        // Initialize the database
        facilityGroupTypeRepository.saveAndFlush(facilityGroupType);

        // Get all the facilityGroupTypeList
        restFacilityGroupTypeMockMvc.perform(get("/api/facility-group-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facilityGroupType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getFacilityGroupType() throws Exception {
        // Initialize the database
        facilityGroupTypeRepository.saveAndFlush(facilityGroupType);

        // Get the facilityGroupType
        restFacilityGroupTypeMockMvc.perform(get("/api/facility-group-types/{id}", facilityGroupType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(facilityGroupType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingFacilityGroupType() throws Exception {
        // Get the facilityGroupType
        restFacilityGroupTypeMockMvc.perform(get("/api/facility-group-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacilityGroupType() throws Exception {
        // Initialize the database
        facilityGroupTypeRepository.saveAndFlush(facilityGroupType);

        int databaseSizeBeforeUpdate = facilityGroupTypeRepository.findAll().size();

        // Update the facilityGroupType
        FacilityGroupType updatedFacilityGroupType = facilityGroupTypeRepository.findById(facilityGroupType.getId()).get();
        // Disconnect from session so that the updates on updatedFacilityGroupType are not directly saved in db
        em.detach(updatedFacilityGroupType);
        updatedFacilityGroupType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restFacilityGroupTypeMockMvc.perform(put("/api/facility-group-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacilityGroupType)))
            .andExpect(status().isOk());

        // Validate the FacilityGroupType in the database
        List<FacilityGroupType> facilityGroupTypeList = facilityGroupTypeRepository.findAll();
        assertThat(facilityGroupTypeList).hasSize(databaseSizeBeforeUpdate);
        FacilityGroupType testFacilityGroupType = facilityGroupTypeList.get(facilityGroupTypeList.size() - 1);
        assertThat(testFacilityGroupType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFacilityGroupType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingFacilityGroupType() throws Exception {
        int databaseSizeBeforeUpdate = facilityGroupTypeRepository.findAll().size();

        // Create the FacilityGroupType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacilityGroupTypeMockMvc.perform(put("/api/facility-group-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityGroupType)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityGroupType in the database
        List<FacilityGroupType> facilityGroupTypeList = facilityGroupTypeRepository.findAll();
        assertThat(facilityGroupTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacilityGroupType() throws Exception {
        // Initialize the database
        facilityGroupTypeRepository.saveAndFlush(facilityGroupType);

        int databaseSizeBeforeDelete = facilityGroupTypeRepository.findAll().size();

        // Delete the facilityGroupType
        restFacilityGroupTypeMockMvc.perform(delete("/api/facility-group-types/{id}", facilityGroupType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FacilityGroupType> facilityGroupTypeList = facilityGroupTypeRepository.findAll();
        assertThat(facilityGroupTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
