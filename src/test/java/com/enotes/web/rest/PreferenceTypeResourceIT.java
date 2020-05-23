package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.PreferenceType;
import com.enotes.repository.PreferenceTypeRepository;

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
 * Integration tests for the {@link PreferenceTypeResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class PreferenceTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private PreferenceTypeRepository preferenceTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPreferenceTypeMockMvc;

    private PreferenceType preferenceType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PreferenceType createEntity(EntityManager em) {
        PreferenceType preferenceType = new PreferenceType()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return preferenceType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PreferenceType createUpdatedEntity(EntityManager em) {
        PreferenceType preferenceType = new PreferenceType()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return preferenceType;
    }

    @BeforeEach
    public void initTest() {
        preferenceType = createEntity(em);
    }

    @Test
    @Transactional
    public void createPreferenceType() throws Exception {
        int databaseSizeBeforeCreate = preferenceTypeRepository.findAll().size();

        // Create the PreferenceType
        restPreferenceTypeMockMvc.perform(post("/api/preference-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(preferenceType)))
            .andExpect(status().isCreated());

        // Validate the PreferenceType in the database
        List<PreferenceType> preferenceTypeList = preferenceTypeRepository.findAll();
        assertThat(preferenceTypeList).hasSize(databaseSizeBeforeCreate + 1);
        PreferenceType testPreferenceType = preferenceTypeList.get(preferenceTypeList.size() - 1);
        assertThat(testPreferenceType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPreferenceType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createPreferenceTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = preferenceTypeRepository.findAll().size();

        // Create the PreferenceType with an existing ID
        preferenceType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPreferenceTypeMockMvc.perform(post("/api/preference-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(preferenceType)))
            .andExpect(status().isBadRequest());

        // Validate the PreferenceType in the database
        List<PreferenceType> preferenceTypeList = preferenceTypeRepository.findAll();
        assertThat(preferenceTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPreferenceTypes() throws Exception {
        // Initialize the database
        preferenceTypeRepository.saveAndFlush(preferenceType);

        // Get all the preferenceTypeList
        restPreferenceTypeMockMvc.perform(get("/api/preference-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(preferenceType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getPreferenceType() throws Exception {
        // Initialize the database
        preferenceTypeRepository.saveAndFlush(preferenceType);

        // Get the preferenceType
        restPreferenceTypeMockMvc.perform(get("/api/preference-types/{id}", preferenceType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(preferenceType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingPreferenceType() throws Exception {
        // Get the preferenceType
        restPreferenceTypeMockMvc.perform(get("/api/preference-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePreferenceType() throws Exception {
        // Initialize the database
        preferenceTypeRepository.saveAndFlush(preferenceType);

        int databaseSizeBeforeUpdate = preferenceTypeRepository.findAll().size();

        // Update the preferenceType
        PreferenceType updatedPreferenceType = preferenceTypeRepository.findById(preferenceType.getId()).get();
        // Disconnect from session so that the updates on updatedPreferenceType are not directly saved in db
        em.detach(updatedPreferenceType);
        updatedPreferenceType
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restPreferenceTypeMockMvc.perform(put("/api/preference-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPreferenceType)))
            .andExpect(status().isOk());

        // Validate the PreferenceType in the database
        List<PreferenceType> preferenceTypeList = preferenceTypeRepository.findAll();
        assertThat(preferenceTypeList).hasSize(databaseSizeBeforeUpdate);
        PreferenceType testPreferenceType = preferenceTypeList.get(preferenceTypeList.size() - 1);
        assertThat(testPreferenceType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPreferenceType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingPreferenceType() throws Exception {
        int databaseSizeBeforeUpdate = preferenceTypeRepository.findAll().size();

        // Create the PreferenceType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPreferenceTypeMockMvc.perform(put("/api/preference-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(preferenceType)))
            .andExpect(status().isBadRequest());

        // Validate the PreferenceType in the database
        List<PreferenceType> preferenceTypeList = preferenceTypeRepository.findAll();
        assertThat(preferenceTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePreferenceType() throws Exception {
        // Initialize the database
        preferenceTypeRepository.saveAndFlush(preferenceType);

        int databaseSizeBeforeDelete = preferenceTypeRepository.findAll().size();

        // Delete the preferenceType
        restPreferenceTypeMockMvc.perform(delete("/api/preference-types/{id}", preferenceType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PreferenceType> preferenceTypeList = preferenceTypeRepository.findAll();
        assertThat(preferenceTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
