package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.Gender;
import com.enotes.repository.GenderRepository;

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
 * Integration tests for the {@link GenderResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class GenderResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private GenderRepository genderRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGenderMockMvc;

    private Gender gender;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gender createEntity(EntityManager em) {
        Gender gender = new Gender()
            .name(DEFAULT_NAME);
        return gender;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gender createUpdatedEntity(EntityManager em) {
        Gender gender = new Gender()
            .name(UPDATED_NAME);
        return gender;
    }

    @BeforeEach
    public void initTest() {
        gender = createEntity(em);
    }

    @Test
    @Transactional
    public void createGender() throws Exception {
        int databaseSizeBeforeCreate = genderRepository.findAll().size();

        // Create the Gender
        restGenderMockMvc.perform(post("/api/genders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gender)))
            .andExpect(status().isCreated());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeCreate + 1);
        Gender testGender = genderList.get(genderList.size() - 1);
        assertThat(testGender.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createGenderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = genderRepository.findAll().size();

        // Create the Gender with an existing ID
        gender.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGenderMockMvc.perform(post("/api/genders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gender)))
            .andExpect(status().isBadRequest());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGenders() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        // Get all the genderList
        restGenderMockMvc.perform(get("/api/genders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gender.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getGender() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        // Get the gender
        restGenderMockMvc.perform(get("/api/genders/{id}", gender.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gender.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingGender() throws Exception {
        // Get the gender
        restGenderMockMvc.perform(get("/api/genders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGender() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        int databaseSizeBeforeUpdate = genderRepository.findAll().size();

        // Update the gender
        Gender updatedGender = genderRepository.findById(gender.getId()).get();
        // Disconnect from session so that the updates on updatedGender are not directly saved in db
        em.detach(updatedGender);
        updatedGender
            .name(UPDATED_NAME);

        restGenderMockMvc.perform(put("/api/genders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGender)))
            .andExpect(status().isOk());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeUpdate);
        Gender testGender = genderList.get(genderList.size() - 1);
        assertThat(testGender.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingGender() throws Exception {
        int databaseSizeBeforeUpdate = genderRepository.findAll().size();

        // Create the Gender

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGenderMockMvc.perform(put("/api/genders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gender)))
            .andExpect(status().isBadRequest());

        // Validate the Gender in the database
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGender() throws Exception {
        // Initialize the database
        genderRepository.saveAndFlush(gender);

        int databaseSizeBeforeDelete = genderRepository.findAll().size();

        // Delete the gender
        restGenderMockMvc.perform(delete("/api/genders/{id}", gender.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Gender> genderList = genderRepository.findAll();
        assertThat(genderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
