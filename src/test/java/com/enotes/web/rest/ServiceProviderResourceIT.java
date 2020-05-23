package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.ServiceProvider;
import com.enotes.repository.ServiceProviderRepository;

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
 * Integration tests for the {@link ServiceProviderResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ServiceProviderResourceIT {

    private static final Instant DEFAULT_FROM_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FROM_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_THRU_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_THRU_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceProviderMockMvc;

    private ServiceProvider serviceProvider;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceProvider createEntity(EntityManager em) {
        ServiceProvider serviceProvider = new ServiceProvider()
            .fromDate(DEFAULT_FROM_DATE)
            .thruDate(DEFAULT_THRU_DATE)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return serviceProvider;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceProvider createUpdatedEntity(EntityManager em) {
        ServiceProvider serviceProvider = new ServiceProvider()
            .fromDate(UPDATED_FROM_DATE)
            .thruDate(UPDATED_THRU_DATE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return serviceProvider;
    }

    @BeforeEach
    public void initTest() {
        serviceProvider = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceProvider() throws Exception {
        int databaseSizeBeforeCreate = serviceProviderRepository.findAll().size();

        // Create the ServiceProvider
        restServiceProviderMockMvc.perform(post("/api/service-providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceProvider)))
            .andExpect(status().isCreated());

        // Validate the ServiceProvider in the database
        List<ServiceProvider> serviceProviderList = serviceProviderRepository.findAll();
        assertThat(serviceProviderList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceProvider testServiceProvider = serviceProviderList.get(serviceProviderList.size() - 1);
        assertThat(testServiceProvider.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testServiceProvider.getThruDate()).isEqualTo(DEFAULT_THRU_DATE);
        assertThat(testServiceProvider.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testServiceProvider.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createServiceProviderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceProviderRepository.findAll().size();

        // Create the ServiceProvider with an existing ID
        serviceProvider.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceProviderMockMvc.perform(post("/api/service-providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceProvider)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceProvider in the database
        List<ServiceProvider> serviceProviderList = serviceProviderRepository.findAll();
        assertThat(serviceProviderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceProviders() throws Exception {
        // Initialize the database
        serviceProviderRepository.saveAndFlush(serviceProvider);

        // Get all the serviceProviderList
        restServiceProviderMockMvc.perform(get("/api/service-providers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceProvider.getId().intValue())))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].thruDate").value(hasItem(DEFAULT_THRU_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceProvider() throws Exception {
        // Initialize the database
        serviceProviderRepository.saveAndFlush(serviceProvider);

        // Get the serviceProvider
        restServiceProviderMockMvc.perform(get("/api/service-providers/{id}", serviceProvider.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceProvider.getId().intValue()))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.thruDate").value(DEFAULT_THRU_DATE.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceProvider() throws Exception {
        // Get the serviceProvider
        restServiceProviderMockMvc.perform(get("/api/service-providers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceProvider() throws Exception {
        // Initialize the database
        serviceProviderRepository.saveAndFlush(serviceProvider);

        int databaseSizeBeforeUpdate = serviceProviderRepository.findAll().size();

        // Update the serviceProvider
        ServiceProvider updatedServiceProvider = serviceProviderRepository.findById(serviceProvider.getId()).get();
        // Disconnect from session so that the updates on updatedServiceProvider are not directly saved in db
        em.detach(updatedServiceProvider);
        updatedServiceProvider
            .fromDate(UPDATED_FROM_DATE)
            .thruDate(UPDATED_THRU_DATE)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restServiceProviderMockMvc.perform(put("/api/service-providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceProvider)))
            .andExpect(status().isOk());

        // Validate the ServiceProvider in the database
        List<ServiceProvider> serviceProviderList = serviceProviderRepository.findAll();
        assertThat(serviceProviderList).hasSize(databaseSizeBeforeUpdate);
        ServiceProvider testServiceProvider = serviceProviderList.get(serviceProviderList.size() - 1);
        assertThat(testServiceProvider.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testServiceProvider.getThruDate()).isEqualTo(UPDATED_THRU_DATE);
        assertThat(testServiceProvider.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testServiceProvider.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceProvider() throws Exception {
        int databaseSizeBeforeUpdate = serviceProviderRepository.findAll().size();

        // Create the ServiceProvider

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceProviderMockMvc.perform(put("/api/service-providers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceProvider)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceProvider in the database
        List<ServiceProvider> serviceProviderList = serviceProviderRepository.findAll();
        assertThat(serviceProviderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceProvider() throws Exception {
        // Initialize the database
        serviceProviderRepository.saveAndFlush(serviceProvider);

        int databaseSizeBeforeDelete = serviceProviderRepository.findAll().size();

        // Delete the serviceProvider
        restServiceProviderMockMvc.perform(delete("/api/service-providers/{id}", serviceProvider.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceProvider> serviceProviderList = serviceProviderRepository.findAll();
        assertThat(serviceProviderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
