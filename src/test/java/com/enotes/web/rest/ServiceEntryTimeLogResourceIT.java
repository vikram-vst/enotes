package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.ServiceEntryTimeLog;
import com.enotes.repository.ServiceEntryTimeLogRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ServiceEntryTimeLogResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ServiceEntryTimeLogResourceIT {

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceEntryTimeLogRepository serviceEntryTimeLogRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceEntryTimeLogMockMvc;

    private ServiceEntryTimeLog serviceEntryTimeLog;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntryTimeLog createEntity(EntityManager em) {
        ServiceEntryTimeLog serviceEntryTimeLog = new ServiceEntryTimeLog()
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return serviceEntryTimeLog;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntryTimeLog createUpdatedEntity(EntityManager em) {
        ServiceEntryTimeLog serviceEntryTimeLog = new ServiceEntryTimeLog()
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return serviceEntryTimeLog;
    }

    @BeforeEach
    public void initTest() {
        serviceEntryTimeLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceEntryTimeLog() throws Exception {
        int databaseSizeBeforeCreate = serviceEntryTimeLogRepository.findAll().size();

        // Create the ServiceEntryTimeLog
        restServiceEntryTimeLogMockMvc.perform(post("/api/service-entry-time-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntryTimeLog)))
            .andExpect(status().isCreated());

        // Validate the ServiceEntryTimeLog in the database
        List<ServiceEntryTimeLog> serviceEntryTimeLogList = serviceEntryTimeLogRepository.findAll();
        assertThat(serviceEntryTimeLogList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceEntryTimeLog testServiceEntryTimeLog = serviceEntryTimeLogList.get(serviceEntryTimeLogList.size() - 1);
        assertThat(testServiceEntryTimeLog.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testServiceEntryTimeLog.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createServiceEntryTimeLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceEntryTimeLogRepository.findAll().size();

        // Create the ServiceEntryTimeLog with an existing ID
        serviceEntryTimeLog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceEntryTimeLogMockMvc.perform(post("/api/service-entry-time-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntryTimeLog)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntryTimeLog in the database
        List<ServiceEntryTimeLog> serviceEntryTimeLogList = serviceEntryTimeLogRepository.findAll();
        assertThat(serviceEntryTimeLogList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceEntryTimeLogs() throws Exception {
        // Initialize the database
        serviceEntryTimeLogRepository.saveAndFlush(serviceEntryTimeLog);

        // Get all the serviceEntryTimeLogList
        restServiceEntryTimeLogMockMvc.perform(get("/api/service-entry-time-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceEntryTimeLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceEntryTimeLog() throws Exception {
        // Initialize the database
        serviceEntryTimeLogRepository.saveAndFlush(serviceEntryTimeLog);

        // Get the serviceEntryTimeLog
        restServiceEntryTimeLogMockMvc.perform(get("/api/service-entry-time-logs/{id}", serviceEntryTimeLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceEntryTimeLog.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceEntryTimeLog() throws Exception {
        // Get the serviceEntryTimeLog
        restServiceEntryTimeLogMockMvc.perform(get("/api/service-entry-time-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceEntryTimeLog() throws Exception {
        // Initialize the database
        serviceEntryTimeLogRepository.saveAndFlush(serviceEntryTimeLog);

        int databaseSizeBeforeUpdate = serviceEntryTimeLogRepository.findAll().size();

        // Update the serviceEntryTimeLog
        ServiceEntryTimeLog updatedServiceEntryTimeLog = serviceEntryTimeLogRepository.findById(serviceEntryTimeLog.getId()).get();
        // Disconnect from session so that the updates on updatedServiceEntryTimeLog are not directly saved in db
        em.detach(updatedServiceEntryTimeLog);
        updatedServiceEntryTimeLog
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restServiceEntryTimeLogMockMvc.perform(put("/api/service-entry-time-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceEntryTimeLog)))
            .andExpect(status().isOk());

        // Validate the ServiceEntryTimeLog in the database
        List<ServiceEntryTimeLog> serviceEntryTimeLogList = serviceEntryTimeLogRepository.findAll();
        assertThat(serviceEntryTimeLogList).hasSize(databaseSizeBeforeUpdate);
        ServiceEntryTimeLog testServiceEntryTimeLog = serviceEntryTimeLogList.get(serviceEntryTimeLogList.size() - 1);
        assertThat(testServiceEntryTimeLog.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testServiceEntryTimeLog.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceEntryTimeLog() throws Exception {
        int databaseSizeBeforeUpdate = serviceEntryTimeLogRepository.findAll().size();

        // Create the ServiceEntryTimeLog

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceEntryTimeLogMockMvc.perform(put("/api/service-entry-time-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntryTimeLog)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntryTimeLog in the database
        List<ServiceEntryTimeLog> serviceEntryTimeLogList = serviceEntryTimeLogRepository.findAll();
        assertThat(serviceEntryTimeLogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceEntryTimeLog() throws Exception {
        // Initialize the database
        serviceEntryTimeLogRepository.saveAndFlush(serviceEntryTimeLog);

        int databaseSizeBeforeDelete = serviceEntryTimeLogRepository.findAll().size();

        // Delete the serviceEntryTimeLog
        restServiceEntryTimeLogMockMvc.perform(delete("/api/service-entry-time-logs/{id}", serviceEntryTimeLog.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceEntryTimeLog> serviceEntryTimeLogList = serviceEntryTimeLogRepository.findAll();
        assertThat(serviceEntryTimeLogList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
