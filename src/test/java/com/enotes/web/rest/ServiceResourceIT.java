package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.Service;
import com.enotes.repository.ServiceRepository;

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
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ServiceResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ServiceResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_SEQUENCE_NO = 1;
    private static final Integer UPDATED_SEQUENCE_NO = 2;

    private static final Duration DEFAULT_START_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_START_TIME = Duration.ofHours(12);

    private static final Duration DEFAULT_END_TIME = Duration.ofHours(6);
    private static final Duration UPDATED_END_TIME = Duration.ofHours(12);

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_RECURRENCE = 1;
    private static final Integer UPDATED_RECURRENCE = 2;

    private static final Duration DEFAULT_INTERVAL = Duration.ofHours(6);
    private static final Duration UPDATED_INTERVAL = Duration.ofHours(12);

    private static final Duration DEFAULT_GRACE_PERIOD = Duration.ofHours(6);
    private static final Duration UPDATED_GRACE_PERIOD = Duration.ofHours(12);

    private static final String DEFAULT_IMAGE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_PATH = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceMockMvc;

    private Service service;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Service createEntity(EntityManager em) {
        Service service = new Service()
            .title(DEFAULT_TITLE)
            .sequenceNo(DEFAULT_SEQUENCE_NO)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .recurrence(DEFAULT_RECURRENCE)
            .interval(DEFAULT_INTERVAL)
            .gracePeriod(DEFAULT_GRACE_PERIOD)
            .imagePath(DEFAULT_IMAGE_PATH)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return service;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Service createUpdatedEntity(EntityManager em) {
        Service service = new Service()
            .title(UPDATED_TITLE)
            .sequenceNo(UPDATED_SEQUENCE_NO)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .recurrence(UPDATED_RECURRENCE)
            .interval(UPDATED_INTERVAL)
            .gracePeriod(UPDATED_GRACE_PERIOD)
            .imagePath(UPDATED_IMAGE_PATH)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return service;
    }

    @BeforeEach
    public void initTest() {
        service = createEntity(em);
    }

    @Test
    @Transactional
    public void createService() throws Exception {
        int databaseSizeBeforeCreate = serviceRepository.findAll().size();

        // Create the Service
        restServiceMockMvc.perform(post("/api/services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(service)))
            .andExpect(status().isCreated());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeCreate + 1);
        Service testService = serviceList.get(serviceList.size() - 1);
        assertThat(testService.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testService.getSequenceNo()).isEqualTo(DEFAULT_SEQUENCE_NO);
        assertThat(testService.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testService.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testService.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testService.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testService.getRecurrence()).isEqualTo(DEFAULT_RECURRENCE);
        assertThat(testService.getInterval()).isEqualTo(DEFAULT_INTERVAL);
        assertThat(testService.getGracePeriod()).isEqualTo(DEFAULT_GRACE_PERIOD);
        assertThat(testService.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testService.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testService.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceRepository.findAll().size();

        // Create the Service with an existing ID
        service.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceMockMvc.perform(post("/api/services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(service)))
            .andExpect(status().isBadRequest());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServices() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        // Get all the serviceList
        restServiceMockMvc.perform(get("/api/services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(service.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].sequenceNo").value(hasItem(DEFAULT_SEQUENCE_NO)))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].recurrence").value(hasItem(DEFAULT_RECURRENCE)))
            .andExpect(jsonPath("$.[*].interval").value(hasItem(DEFAULT_INTERVAL.toString())))
            .andExpect(jsonPath("$.[*].gracePeriod").value(hasItem(DEFAULT_GRACE_PERIOD.toString())))
            .andExpect(jsonPath("$.[*].imagePath").value(hasItem(DEFAULT_IMAGE_PATH)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getService() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        // Get the service
        restServiceMockMvc.perform(get("/api/services/{id}", service.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(service.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.sequenceNo").value(DEFAULT_SEQUENCE_NO))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.recurrence").value(DEFAULT_RECURRENCE))
            .andExpect(jsonPath("$.interval").value(DEFAULT_INTERVAL.toString()))
            .andExpect(jsonPath("$.gracePeriod").value(DEFAULT_GRACE_PERIOD.toString()))
            .andExpect(jsonPath("$.imagePath").value(DEFAULT_IMAGE_PATH))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingService() throws Exception {
        // Get the service
        restServiceMockMvc.perform(get("/api/services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateService() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        int databaseSizeBeforeUpdate = serviceRepository.findAll().size();

        // Update the service
        Service updatedService = serviceRepository.findById(service.getId()).get();
        // Disconnect from session so that the updates on updatedService are not directly saved in db
        em.detach(updatedService);
        updatedService
            .title(UPDATED_TITLE)
            .sequenceNo(UPDATED_SEQUENCE_NO)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .recurrence(UPDATED_RECURRENCE)
            .interval(UPDATED_INTERVAL)
            .gracePeriod(UPDATED_GRACE_PERIOD)
            .imagePath(UPDATED_IMAGE_PATH)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restServiceMockMvc.perform(put("/api/services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedService)))
            .andExpect(status().isOk());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeUpdate);
        Service testService = serviceList.get(serviceList.size() - 1);
        assertThat(testService.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testService.getSequenceNo()).isEqualTo(UPDATED_SEQUENCE_NO);
        assertThat(testService.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testService.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testService.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testService.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testService.getRecurrence()).isEqualTo(UPDATED_RECURRENCE);
        assertThat(testService.getInterval()).isEqualTo(UPDATED_INTERVAL);
        assertThat(testService.getGracePeriod()).isEqualTo(UPDATED_GRACE_PERIOD);
        assertThat(testService.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testService.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testService.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingService() throws Exception {
        int databaseSizeBeforeUpdate = serviceRepository.findAll().size();

        // Create the Service

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceMockMvc.perform(put("/api/services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(service)))
            .andExpect(status().isBadRequest());

        // Validate the Service in the database
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteService() throws Exception {
        // Initialize the database
        serviceRepository.saveAndFlush(service);

        int databaseSizeBeforeDelete = serviceRepository.findAll().size();

        // Delete the service
        restServiceMockMvc.perform(delete("/api/services/{id}", service.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Service> serviceList = serviceRepository.findAll();
        assertThat(serviceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
