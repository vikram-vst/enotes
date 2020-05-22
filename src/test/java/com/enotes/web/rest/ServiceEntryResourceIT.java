package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.ServiceEntry;
import com.enotes.domain.ServiceDefinition;
import com.enotes.repository.ServiceEntryRepository;

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
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ServiceEntryResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ServiceEntryResourceIT {

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_INITIATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INITIATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_SERVICE_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SERVICE_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_SERVICE_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SERVICE_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ENTRY = "AAAAAAAAAA";
    private static final String UPDATED_ENTRY = "BBBBBBBBBB";

    @Autowired
    private ServiceEntryRepository serviceEntryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceEntryMockMvc;

    private ServiceEntry serviceEntry;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntry createEntity(EntityManager em) {
        ServiceEntry serviceEntry = new ServiceEntry()
            .createdDate(DEFAULT_CREATED_DATE)
            .initiatedDate(DEFAULT_INITIATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .serviceStartDate(DEFAULT_SERVICE_START_DATE)
            .serviceEndDate(DEFAULT_SERVICE_END_DATE)
            .entry(DEFAULT_ENTRY);
        // Add required entity
        ServiceDefinition serviceDefinition;
        if (TestUtil.findAll(em, ServiceDefinition.class).isEmpty()) {
            serviceDefinition = ServiceDefinitionResourceIT.createEntity(em);
            em.persist(serviceDefinition);
            em.flush();
        } else {
            serviceDefinition = TestUtil.findAll(em, ServiceDefinition.class).get(0);
        }
        serviceEntry.setServiceDefinition(serviceDefinition);
        return serviceEntry;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntry createUpdatedEntity(EntityManager em) {
        ServiceEntry serviceEntry = new ServiceEntry()
            .createdDate(UPDATED_CREATED_DATE)
            .initiatedDate(UPDATED_INITIATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .serviceStartDate(UPDATED_SERVICE_START_DATE)
            .serviceEndDate(UPDATED_SERVICE_END_DATE)
            .entry(UPDATED_ENTRY);
        // Add required entity
        ServiceDefinition serviceDefinition;
        if (TestUtil.findAll(em, ServiceDefinition.class).isEmpty()) {
            serviceDefinition = ServiceDefinitionResourceIT.createUpdatedEntity(em);
            em.persist(serviceDefinition);
            em.flush();
        } else {
            serviceDefinition = TestUtil.findAll(em, ServiceDefinition.class).get(0);
        }
        serviceEntry.setServiceDefinition(serviceDefinition);
        return serviceEntry;
    }

    @BeforeEach
    public void initTest() {
        serviceEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceEntry() throws Exception {
        int databaseSizeBeforeCreate = serviceEntryRepository.findAll().size();

        // Create the ServiceEntry
        restServiceEntryMockMvc.perform(post("/api/service-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntry)))
            .andExpect(status().isCreated());

        // Validate the ServiceEntry in the database
        List<ServiceEntry> serviceEntryList = serviceEntryRepository.findAll();
        assertThat(serviceEntryList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceEntry testServiceEntry = serviceEntryList.get(serviceEntryList.size() - 1);
        assertThat(testServiceEntry.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testServiceEntry.getInitiatedDate()).isEqualTo(DEFAULT_INITIATED_DATE);
        assertThat(testServiceEntry.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testServiceEntry.getServiceStartDate()).isEqualTo(DEFAULT_SERVICE_START_DATE);
        assertThat(testServiceEntry.getServiceEndDate()).isEqualTo(DEFAULT_SERVICE_END_DATE);
        assertThat(testServiceEntry.getEntry()).isEqualTo(DEFAULT_ENTRY);
    }

    @Test
    @Transactional
    public void createServiceEntryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceEntryRepository.findAll().size();

        // Create the ServiceEntry with an existing ID
        serviceEntry.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceEntryMockMvc.perform(post("/api/service-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntry)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntry in the database
        List<ServiceEntry> serviceEntryList = serviceEntryRepository.findAll();
        assertThat(serviceEntryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceEntries() throws Exception {
        // Initialize the database
        serviceEntryRepository.saveAndFlush(serviceEntry);

        // Get all the serviceEntryList
        restServiceEntryMockMvc.perform(get("/api/service-entries?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceEntry.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].initiatedDate").value(hasItem(DEFAULT_INITIATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].serviceStartDate").value(hasItem(DEFAULT_SERVICE_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].serviceEndDate").value(hasItem(DEFAULT_SERVICE_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].entry").value(hasItem(DEFAULT_ENTRY.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceEntry() throws Exception {
        // Initialize the database
        serviceEntryRepository.saveAndFlush(serviceEntry);

        // Get the serviceEntry
        restServiceEntryMockMvc.perform(get("/api/service-entries/{id}", serviceEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceEntry.getId().intValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.initiatedDate").value(DEFAULT_INITIATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.serviceStartDate").value(DEFAULT_SERVICE_START_DATE.toString()))
            .andExpect(jsonPath("$.serviceEndDate").value(DEFAULT_SERVICE_END_DATE.toString()))
            .andExpect(jsonPath("$.entry").value(DEFAULT_ENTRY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceEntry() throws Exception {
        // Get the serviceEntry
        restServiceEntryMockMvc.perform(get("/api/service-entries/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceEntry() throws Exception {
        // Initialize the database
        serviceEntryRepository.saveAndFlush(serviceEntry);

        int databaseSizeBeforeUpdate = serviceEntryRepository.findAll().size();

        // Update the serviceEntry
        ServiceEntry updatedServiceEntry = serviceEntryRepository.findById(serviceEntry.getId()).get();
        // Disconnect from session so that the updates on updatedServiceEntry are not directly saved in db
        em.detach(updatedServiceEntry);
        updatedServiceEntry
            .createdDate(UPDATED_CREATED_DATE)
            .initiatedDate(UPDATED_INITIATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .serviceStartDate(UPDATED_SERVICE_START_DATE)
            .serviceEndDate(UPDATED_SERVICE_END_DATE)
            .entry(UPDATED_ENTRY);

        restServiceEntryMockMvc.perform(put("/api/service-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceEntry)))
            .andExpect(status().isOk());

        // Validate the ServiceEntry in the database
        List<ServiceEntry> serviceEntryList = serviceEntryRepository.findAll();
        assertThat(serviceEntryList).hasSize(databaseSizeBeforeUpdate);
        ServiceEntry testServiceEntry = serviceEntryList.get(serviceEntryList.size() - 1);
        assertThat(testServiceEntry.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testServiceEntry.getInitiatedDate()).isEqualTo(UPDATED_INITIATED_DATE);
        assertThat(testServiceEntry.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testServiceEntry.getServiceStartDate()).isEqualTo(UPDATED_SERVICE_START_DATE);
        assertThat(testServiceEntry.getServiceEndDate()).isEqualTo(UPDATED_SERVICE_END_DATE);
        assertThat(testServiceEntry.getEntry()).isEqualTo(UPDATED_ENTRY);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceEntry() throws Exception {
        int databaseSizeBeforeUpdate = serviceEntryRepository.findAll().size();

        // Create the ServiceEntry

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceEntryMockMvc.perform(put("/api/service-entries")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntry)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntry in the database
        List<ServiceEntry> serviceEntryList = serviceEntryRepository.findAll();
        assertThat(serviceEntryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceEntry() throws Exception {
        // Initialize the database
        serviceEntryRepository.saveAndFlush(serviceEntry);

        int databaseSizeBeforeDelete = serviceEntryRepository.findAll().size();

        // Delete the serviceEntry
        restServiceEntryMockMvc.perform(delete("/api/service-entries/{id}", serviceEntry.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceEntry> serviceEntryList = serviceEntryRepository.findAll();
        assertThat(serviceEntryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
