package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.Status;
import com.enotes.repository.StatusRepository;

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
 * Integration tests for the {@link StatusResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class StatusResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_SEQUENCE_NO = 1;
    private static final Integer UPDATED_SEQUENCE_NO = 2;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStatusMockMvc;

    private Status status;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Status createEntity(EntityManager em) {
        Status status = new Status()
            .name(DEFAULT_NAME)
            .sequenceNo(DEFAULT_SEQUENCE_NO)
            .description(DEFAULT_DESCRIPTION)
            .type(DEFAULT_TYPE);
        return status;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Status createUpdatedEntity(EntityManager em) {
        Status status = new Status()
            .name(UPDATED_NAME)
            .sequenceNo(UPDATED_SEQUENCE_NO)
            .description(UPDATED_DESCRIPTION)
            .type(UPDATED_TYPE);
        return status;
    }

    @BeforeEach
    public void initTest() {
        status = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatus() throws Exception {
        int databaseSizeBeforeCreate = statusRepository.findAll().size();

        // Create the Status
        restStatusMockMvc.perform(post("/api/statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(status)))
            .andExpect(status().isCreated());

        // Validate the Status in the database
        List<Status> statusList = statusRepository.findAll();
        assertThat(statusList).hasSize(databaseSizeBeforeCreate + 1);
        Status testStatus = statusList.get(statusList.size() - 1);
        assertThat(testStatus.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStatus.getSequenceNo()).isEqualTo(DEFAULT_SEQUENCE_NO);
        assertThat(testStatus.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testStatus.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statusRepository.findAll().size();

        // Create the Status with an existing ID
        status.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatusMockMvc.perform(post("/api/statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(status)))
            .andExpect(status().isBadRequest());

        // Validate the Status in the database
        List<Status> statusList = statusRepository.findAll();
        assertThat(statusList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStatuses() throws Exception {
        // Initialize the database
        statusRepository.saveAndFlush(status);

        // Get all the statusList
        restStatusMockMvc.perform(get("/api/statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(status.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].sequenceNo").value(hasItem(DEFAULT_SEQUENCE_NO)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getStatus() throws Exception {
        // Initialize the database
        statusRepository.saveAndFlush(status);

        // Get the status
        restStatusMockMvc.perform(get("/api/statuses/{id}", status.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(status.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.sequenceNo").value(DEFAULT_SEQUENCE_NO))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }

    @Test
    @Transactional
    public void getNonExistingStatus() throws Exception {
        // Get the status
        restStatusMockMvc.perform(get("/api/statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatus() throws Exception {
        // Initialize the database
        statusRepository.saveAndFlush(status);

        int databaseSizeBeforeUpdate = statusRepository.findAll().size();

        // Update the status
        Status updatedStatus = statusRepository.findById(status.getId()).get();
        // Disconnect from session so that the updates on updatedStatus are not directly saved in db
        em.detach(updatedStatus);
        updatedStatus
            .name(UPDATED_NAME)
            .sequenceNo(UPDATED_SEQUENCE_NO)
            .description(UPDATED_DESCRIPTION)
            .type(UPDATED_TYPE);

        restStatusMockMvc.perform(put("/api/statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatus)))
            .andExpect(status().isOk());

        // Validate the Status in the database
        List<Status> statusList = statusRepository.findAll();
        assertThat(statusList).hasSize(databaseSizeBeforeUpdate);
        Status testStatus = statusList.get(statusList.size() - 1);
        assertThat(testStatus.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStatus.getSequenceNo()).isEqualTo(UPDATED_SEQUENCE_NO);
        assertThat(testStatus.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testStatus.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingStatus() throws Exception {
        int databaseSizeBeforeUpdate = statusRepository.findAll().size();

        // Create the Status

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatusMockMvc.perform(put("/api/statuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(status)))
            .andExpect(status().isBadRequest());

        // Validate the Status in the database
        List<Status> statusList = statusRepository.findAll();
        assertThat(statusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStatus() throws Exception {
        // Initialize the database
        statusRepository.saveAndFlush(status);

        int databaseSizeBeforeDelete = statusRepository.findAll().size();

        // Delete the status
        restStatusMockMvc.perform(delete("/api/statuses/{id}", status.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Status> statusList = statusRepository.findAll();
        assertThat(statusList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
