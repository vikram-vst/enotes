package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.FacilityGroup;
import com.enotes.repository.FacilityGroupRepository;

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
 * Integration tests for the {@link FacilityGroupResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class FacilityGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private FacilityGroupRepository facilityGroupRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFacilityGroupMockMvc;

    private FacilityGroup facilityGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityGroup createEntity(EntityManager em) {
        FacilityGroup facilityGroup = new FacilityGroup()
            .name(DEFAULT_NAME);
        return facilityGroup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityGroup createUpdatedEntity(EntityManager em) {
        FacilityGroup facilityGroup = new FacilityGroup()
            .name(UPDATED_NAME);
        return facilityGroup;
    }

    @BeforeEach
    public void initTest() {
        facilityGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacilityGroup() throws Exception {
        int databaseSizeBeforeCreate = facilityGroupRepository.findAll().size();

        // Create the FacilityGroup
        restFacilityGroupMockMvc.perform(post("/api/facility-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityGroup)))
            .andExpect(status().isCreated());

        // Validate the FacilityGroup in the database
        List<FacilityGroup> facilityGroupList = facilityGroupRepository.findAll();
        assertThat(facilityGroupList).hasSize(databaseSizeBeforeCreate + 1);
        FacilityGroup testFacilityGroup = facilityGroupList.get(facilityGroupList.size() - 1);
        assertThat(testFacilityGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createFacilityGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facilityGroupRepository.findAll().size();

        // Create the FacilityGroup with an existing ID
        facilityGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacilityGroupMockMvc.perform(post("/api/facility-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityGroup)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityGroup in the database
        List<FacilityGroup> facilityGroupList = facilityGroupRepository.findAll();
        assertThat(facilityGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFacilityGroups() throws Exception {
        // Initialize the database
        facilityGroupRepository.saveAndFlush(facilityGroup);

        // Get all the facilityGroupList
        restFacilityGroupMockMvc.perform(get("/api/facility-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facilityGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getFacilityGroup() throws Exception {
        // Initialize the database
        facilityGroupRepository.saveAndFlush(facilityGroup);

        // Get the facilityGroup
        restFacilityGroupMockMvc.perform(get("/api/facility-groups/{id}", facilityGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(facilityGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingFacilityGroup() throws Exception {
        // Get the facilityGroup
        restFacilityGroupMockMvc.perform(get("/api/facility-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacilityGroup() throws Exception {
        // Initialize the database
        facilityGroupRepository.saveAndFlush(facilityGroup);

        int databaseSizeBeforeUpdate = facilityGroupRepository.findAll().size();

        // Update the facilityGroup
        FacilityGroup updatedFacilityGroup = facilityGroupRepository.findById(facilityGroup.getId()).get();
        // Disconnect from session so that the updates on updatedFacilityGroup are not directly saved in db
        em.detach(updatedFacilityGroup);
        updatedFacilityGroup
            .name(UPDATED_NAME);

        restFacilityGroupMockMvc.perform(put("/api/facility-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacilityGroup)))
            .andExpect(status().isOk());

        // Validate the FacilityGroup in the database
        List<FacilityGroup> facilityGroupList = facilityGroupRepository.findAll();
        assertThat(facilityGroupList).hasSize(databaseSizeBeforeUpdate);
        FacilityGroup testFacilityGroup = facilityGroupList.get(facilityGroupList.size() - 1);
        assertThat(testFacilityGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingFacilityGroup() throws Exception {
        int databaseSizeBeforeUpdate = facilityGroupRepository.findAll().size();

        // Create the FacilityGroup

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacilityGroupMockMvc.perform(put("/api/facility-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityGroup)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityGroup in the database
        List<FacilityGroup> facilityGroupList = facilityGroupRepository.findAll();
        assertThat(facilityGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacilityGroup() throws Exception {
        // Initialize the database
        facilityGroupRepository.saveAndFlush(facilityGroup);

        int databaseSizeBeforeDelete = facilityGroupRepository.findAll().size();

        // Delete the facilityGroup
        restFacilityGroupMockMvc.perform(delete("/api/facility-groups/{id}", facilityGroup.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FacilityGroup> facilityGroupList = facilityGroupRepository.findAll();
        assertThat(facilityGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
