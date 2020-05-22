package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.ServiceEntryStatusLog;
import com.enotes.repository.ServiceEntryStatusLogRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ServiceEntryStatusLogResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ServiceEntryStatusLogResourceIT {

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceEntryStatusLogRepository serviceEntryStatusLogRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceEntryStatusLogMockMvc;

    private ServiceEntryStatusLog serviceEntryStatusLog;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntryStatusLog createEntity(EntityManager em) {
        ServiceEntryStatusLog serviceEntryStatusLog = new ServiceEntryStatusLog()
            .createdDate(DEFAULT_CREATED_DATE);
        return serviceEntryStatusLog;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntryStatusLog createUpdatedEntity(EntityManager em) {
        ServiceEntryStatusLog serviceEntryStatusLog = new ServiceEntryStatusLog()
            .createdDate(UPDATED_CREATED_DATE);
        return serviceEntryStatusLog;
    }

    @BeforeEach
    public void initTest() {
        serviceEntryStatusLog = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceEntryStatusLog() throws Exception {
        int databaseSizeBeforeCreate = serviceEntryStatusLogRepository.findAll().size();

        // Create the ServiceEntryStatusLog
        restServiceEntryStatusLogMockMvc.perform(post("/api/service-entry-status-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntryStatusLog)))
            .andExpect(status().isCreated());

        // Validate the ServiceEntryStatusLog in the database
        List<ServiceEntryStatusLog> serviceEntryStatusLogList = serviceEntryStatusLogRepository.findAll();
        assertThat(serviceEntryStatusLogList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceEntryStatusLog testServiceEntryStatusLog = serviceEntryStatusLogList.get(serviceEntryStatusLogList.size() - 1);
        assertThat(testServiceEntryStatusLog.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
    }

    @Test
    @Transactional
    public void createServiceEntryStatusLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceEntryStatusLogRepository.findAll().size();

        // Create the ServiceEntryStatusLog with an existing ID
        serviceEntryStatusLog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceEntryStatusLogMockMvc.perform(post("/api/service-entry-status-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntryStatusLog)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntryStatusLog in the database
        List<ServiceEntryStatusLog> serviceEntryStatusLogList = serviceEntryStatusLogRepository.findAll();
        assertThat(serviceEntryStatusLogList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceEntryStatusLogs() throws Exception {
        // Initialize the database
        serviceEntryStatusLogRepository.saveAndFlush(serviceEntryStatusLog);

        // Get all the serviceEntryStatusLogList
        restServiceEntryStatusLogMockMvc.perform(get("/api/service-entry-status-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceEntryStatusLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceEntryStatusLog() throws Exception {
        // Initialize the database
        serviceEntryStatusLogRepository.saveAndFlush(serviceEntryStatusLog);

        // Get the serviceEntryStatusLog
        restServiceEntryStatusLogMockMvc.perform(get("/api/service-entry-status-logs/{id}", serviceEntryStatusLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceEntryStatusLog.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceEntryStatusLog() throws Exception {
        // Get the serviceEntryStatusLog
        restServiceEntryStatusLogMockMvc.perform(get("/api/service-entry-status-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceEntryStatusLog() throws Exception {
        // Initialize the database
        serviceEntryStatusLogRepository.saveAndFlush(serviceEntryStatusLog);

        int databaseSizeBeforeUpdate = serviceEntryStatusLogRepository.findAll().size();

        // Update the serviceEntryStatusLog
        ServiceEntryStatusLog updatedServiceEntryStatusLog = serviceEntryStatusLogRepository.findById(serviceEntryStatusLog.getId()).get();
        // Disconnect from session so that the updates on updatedServiceEntryStatusLog are not directly saved in db
        em.detach(updatedServiceEntryStatusLog);
        updatedServiceEntryStatusLog
            .createdDate(UPDATED_CREATED_DATE);

        restServiceEntryStatusLogMockMvc.perform(put("/api/service-entry-status-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceEntryStatusLog)))
            .andExpect(status().isOk());

        // Validate the ServiceEntryStatusLog in the database
        List<ServiceEntryStatusLog> serviceEntryStatusLogList = serviceEntryStatusLogRepository.findAll();
        assertThat(serviceEntryStatusLogList).hasSize(databaseSizeBeforeUpdate);
        ServiceEntryStatusLog testServiceEntryStatusLog = serviceEntryStatusLogList.get(serviceEntryStatusLogList.size() - 1);
        assertThat(testServiceEntryStatusLog.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceEntryStatusLog() throws Exception {
        int databaseSizeBeforeUpdate = serviceEntryStatusLogRepository.findAll().size();

        // Create the ServiceEntryStatusLog

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceEntryStatusLogMockMvc.perform(put("/api/service-entry-status-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntryStatusLog)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntryStatusLog in the database
        List<ServiceEntryStatusLog> serviceEntryStatusLogList = serviceEntryStatusLogRepository.findAll();
        assertThat(serviceEntryStatusLogList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceEntryStatusLog() throws Exception {
        // Initialize the database
        serviceEntryStatusLogRepository.saveAndFlush(serviceEntryStatusLog);

        int databaseSizeBeforeDelete = serviceEntryStatusLogRepository.findAll().size();

        // Delete the serviceEntryStatusLog
        restServiceEntryStatusLogMockMvc.perform(delete("/api/service-entry-status-logs/{id}", serviceEntryStatusLog.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceEntryStatusLog> serviceEntryStatusLogList = serviceEntryStatusLogRepository.findAll();
        assertThat(serviceEntryStatusLogList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
