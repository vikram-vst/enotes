package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.FacilityUser;
import com.enotes.repository.FacilityUserRepository;

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
 * Integration tests for the {@link FacilityUserResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class FacilityUserResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private FacilityUserRepository facilityUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFacilityUserMockMvc;

    private FacilityUser facilityUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityUser createEntity(EntityManager em) {
        FacilityUser facilityUser = new FacilityUser()
            .name(DEFAULT_NAME);
        return facilityUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FacilityUser createUpdatedEntity(EntityManager em) {
        FacilityUser facilityUser = new FacilityUser()
            .name(UPDATED_NAME);
        return facilityUser;
    }

    @BeforeEach
    public void initTest() {
        facilityUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacilityUser() throws Exception {
        int databaseSizeBeforeCreate = facilityUserRepository.findAll().size();

        // Create the FacilityUser
        restFacilityUserMockMvc.perform(post("/api/facility-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityUser)))
            .andExpect(status().isCreated());

        // Validate the FacilityUser in the database
        List<FacilityUser> facilityUserList = facilityUserRepository.findAll();
        assertThat(facilityUserList).hasSize(databaseSizeBeforeCreate + 1);
        FacilityUser testFacilityUser = facilityUserList.get(facilityUserList.size() - 1);
        assertThat(testFacilityUser.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createFacilityUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facilityUserRepository.findAll().size();

        // Create the FacilityUser with an existing ID
        facilityUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacilityUserMockMvc.perform(post("/api/facility-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityUser)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityUser in the database
        List<FacilityUser> facilityUserList = facilityUserRepository.findAll();
        assertThat(facilityUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFacilityUsers() throws Exception {
        // Initialize the database
        facilityUserRepository.saveAndFlush(facilityUser);

        // Get all the facilityUserList
        restFacilityUserMockMvc.perform(get("/api/facility-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facilityUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getFacilityUser() throws Exception {
        // Initialize the database
        facilityUserRepository.saveAndFlush(facilityUser);

        // Get the facilityUser
        restFacilityUserMockMvc.perform(get("/api/facility-users/{id}", facilityUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(facilityUser.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingFacilityUser() throws Exception {
        // Get the facilityUser
        restFacilityUserMockMvc.perform(get("/api/facility-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacilityUser() throws Exception {
        // Initialize the database
        facilityUserRepository.saveAndFlush(facilityUser);

        int databaseSizeBeforeUpdate = facilityUserRepository.findAll().size();

        // Update the facilityUser
        FacilityUser updatedFacilityUser = facilityUserRepository.findById(facilityUser.getId()).get();
        // Disconnect from session so that the updates on updatedFacilityUser are not directly saved in db
        em.detach(updatedFacilityUser);
        updatedFacilityUser
            .name(UPDATED_NAME);

        restFacilityUserMockMvc.perform(put("/api/facility-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacilityUser)))
            .andExpect(status().isOk());

        // Validate the FacilityUser in the database
        List<FacilityUser> facilityUserList = facilityUserRepository.findAll();
        assertThat(facilityUserList).hasSize(databaseSizeBeforeUpdate);
        FacilityUser testFacilityUser = facilityUserList.get(facilityUserList.size() - 1);
        assertThat(testFacilityUser.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingFacilityUser() throws Exception {
        int databaseSizeBeforeUpdate = facilityUserRepository.findAll().size();

        // Create the FacilityUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacilityUserMockMvc.perform(put("/api/facility-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(facilityUser)))
            .andExpect(status().isBadRequest());

        // Validate the FacilityUser in the database
        List<FacilityUser> facilityUserList = facilityUserRepository.findAll();
        assertThat(facilityUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacilityUser() throws Exception {
        // Initialize the database
        facilityUserRepository.saveAndFlush(facilityUser);

        int databaseSizeBeforeDelete = facilityUserRepository.findAll().size();

        // Delete the facilityUser
        restFacilityUserMockMvc.perform(delete("/api/facility-users/{id}", facilityUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FacilityUser> facilityUserList = facilityUserRepository.findAll();
        assertThat(facilityUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
