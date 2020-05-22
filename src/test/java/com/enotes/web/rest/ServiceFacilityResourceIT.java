package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.ServiceFacility;
import com.enotes.repository.ServiceFacilityRepository;

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
 * Integration tests for the {@link ServiceFacilityResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ServiceFacilityResourceIT {

    private static final Instant DEFAULT_FROM_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FROM_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_THRU_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_THRU_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

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

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceFacilityRepository serviceFacilityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceFacilityMockMvc;

    private ServiceFacility serviceFacility;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceFacility createEntity(EntityManager em) {
        ServiceFacility serviceFacility = new ServiceFacility()
            .fromDate(DEFAULT_FROM_DATE)
            .thruDate(DEFAULT_THRU_DATE)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .recurrence(DEFAULT_RECURRENCE)
            .interval(DEFAULT_INTERVAL)
            .gracePeriod(DEFAULT_GRACE_PERIOD)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return serviceFacility;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceFacility createUpdatedEntity(EntityManager em) {
        ServiceFacility serviceFacility = new ServiceFacility()
            .fromDate(UPDATED_FROM_DATE)
            .thruDate(UPDATED_THRU_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .recurrence(UPDATED_RECURRENCE)
            .interval(UPDATED_INTERVAL)
            .gracePeriod(UPDATED_GRACE_PERIOD)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return serviceFacility;
    }

    @BeforeEach
    public void initTest() {
        serviceFacility = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceFacility() throws Exception {
        int databaseSizeBeforeCreate = serviceFacilityRepository.findAll().size();

        // Create the ServiceFacility
        restServiceFacilityMockMvc.perform(post("/api/service-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceFacility)))
            .andExpect(status().isCreated());

        // Validate the ServiceFacility in the database
        List<ServiceFacility> serviceFacilityList = serviceFacilityRepository.findAll();
        assertThat(serviceFacilityList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceFacility testServiceFacility = serviceFacilityList.get(serviceFacilityList.size() - 1);
        assertThat(testServiceFacility.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testServiceFacility.getThruDate()).isEqualTo(DEFAULT_THRU_DATE);
        assertThat(testServiceFacility.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testServiceFacility.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testServiceFacility.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testServiceFacility.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testServiceFacility.getRecurrence()).isEqualTo(DEFAULT_RECURRENCE);
        assertThat(testServiceFacility.getInterval()).isEqualTo(DEFAULT_INTERVAL);
        assertThat(testServiceFacility.getGracePeriod()).isEqualTo(DEFAULT_GRACE_PERIOD);
        assertThat(testServiceFacility.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testServiceFacility.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createServiceFacilityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceFacilityRepository.findAll().size();

        // Create the ServiceFacility with an existing ID
        serviceFacility.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceFacilityMockMvc.perform(post("/api/service-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceFacility)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceFacility in the database
        List<ServiceFacility> serviceFacilityList = serviceFacilityRepository.findAll();
        assertThat(serviceFacilityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceFacilities() throws Exception {
        // Initialize the database
        serviceFacilityRepository.saveAndFlush(serviceFacility);

        // Get all the serviceFacilityList
        restServiceFacilityMockMvc.perform(get("/api/service-facilities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceFacility.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].thruDate").value(hasItem(DEFAULT_THRU_DATE.toString())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].recurrence").value(hasItem(DEFAULT_RECURRENCE)))
            .andExpect(jsonPath("$.[*].interval").value(hasItem(DEFAULT_INTERVAL.toString())))
            .andExpect(jsonPath("$.[*].gracePeriod").value(hasItem(DEFAULT_GRACE_PERIOD.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceFacility() throws Exception {
        // Initialize the database
        serviceFacilityRepository.saveAndFlush(serviceFacility);

        // Get the serviceFacility
        restServiceFacilityMockMvc.perform(get("/api/service-facilities/{id}", serviceFacility.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceFacility.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.thruDate").value(DEFAULT_THRU_DATE.toString()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.recurrence").value(DEFAULT_RECURRENCE))
            .andExpect(jsonPath("$.interval").value(DEFAULT_INTERVAL.toString()))
            .andExpect(jsonPath("$.gracePeriod").value(DEFAULT_GRACE_PERIOD.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceFacility() throws Exception {
        // Get the serviceFacility
        restServiceFacilityMockMvc.perform(get("/api/service-facilities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceFacility() throws Exception {
        // Initialize the database
        serviceFacilityRepository.saveAndFlush(serviceFacility);

        int databaseSizeBeforeUpdate = serviceFacilityRepository.findAll().size();

        // Update the serviceFacility
        ServiceFacility updatedServiceFacility = serviceFacilityRepository.findById(serviceFacility.getId()).get();
        // Disconnect from session so that the updates on updatedServiceFacility are not directly saved in db
        em.detach(updatedServiceFacility);
        updatedServiceFacility
            .fromDate(UPDATED_FROM_DATE)
            .thruDate(UPDATED_THRU_DATE)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .recurrence(UPDATED_RECURRENCE)
            .interval(UPDATED_INTERVAL)
            .gracePeriod(UPDATED_GRACE_PERIOD)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restServiceFacilityMockMvc.perform(put("/api/service-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceFacility)))
            .andExpect(status().isOk());

        // Validate the ServiceFacility in the database
        List<ServiceFacility> serviceFacilityList = serviceFacilityRepository.findAll();
        assertThat(serviceFacilityList).hasSize(databaseSizeBeforeUpdate);
        ServiceFacility testServiceFacility = serviceFacilityList.get(serviceFacilityList.size() - 1);
        assertThat(testServiceFacility.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testServiceFacility.getThruDate()).isEqualTo(UPDATED_THRU_DATE);
        assertThat(testServiceFacility.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testServiceFacility.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testServiceFacility.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testServiceFacility.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testServiceFacility.getRecurrence()).isEqualTo(UPDATED_RECURRENCE);
        assertThat(testServiceFacility.getInterval()).isEqualTo(UPDATED_INTERVAL);
        assertThat(testServiceFacility.getGracePeriod()).isEqualTo(UPDATED_GRACE_PERIOD);
        assertThat(testServiceFacility.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testServiceFacility.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceFacility() throws Exception {
        int databaseSizeBeforeUpdate = serviceFacilityRepository.findAll().size();

        // Create the ServiceFacility

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceFacilityMockMvc.perform(put("/api/service-facilities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceFacility)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceFacility in the database
        List<ServiceFacility> serviceFacilityList = serviceFacilityRepository.findAll();
        assertThat(serviceFacilityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceFacility() throws Exception {
        // Initialize the database
        serviceFacilityRepository.saveAndFlush(serviceFacility);

        int databaseSizeBeforeDelete = serviceFacilityRepository.findAll().size();

        // Delete the serviceFacility
        restServiceFacilityMockMvc.perform(delete("/api/service-facilities/{id}", serviceFacility.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceFacility> serviceFacilityList = serviceFacilityRepository.findAll();
        assertThat(serviceFacilityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
