package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.ServiceProviderRole;
import com.enotes.repository.ServiceProviderRoleRepository;

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
 * Integration tests for the {@link ServiceProviderRoleResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ServiceProviderRoleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceProviderRoleRepository serviceProviderRoleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceProviderRoleMockMvc;

    private ServiceProviderRole serviceProviderRole;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceProviderRole createEntity(EntityManager em) {
        ServiceProviderRole serviceProviderRole = new ServiceProviderRole()
            .name(DEFAULT_NAME)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return serviceProviderRole;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceProviderRole createUpdatedEntity(EntityManager em) {
        ServiceProviderRole serviceProviderRole = new ServiceProviderRole()
            .name(UPDATED_NAME)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return serviceProviderRole;
    }

    @BeforeEach
    public void initTest() {
        serviceProviderRole = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceProviderRole() throws Exception {
        int databaseSizeBeforeCreate = serviceProviderRoleRepository.findAll().size();

        // Create the ServiceProviderRole
        restServiceProviderRoleMockMvc.perform(post("/api/service-provider-roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceProviderRole)))
            .andExpect(status().isCreated());

        // Validate the ServiceProviderRole in the database
        List<ServiceProviderRole> serviceProviderRoleList = serviceProviderRoleRepository.findAll();
        assertThat(serviceProviderRoleList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceProviderRole testServiceProviderRole = serviceProviderRoleList.get(serviceProviderRoleList.size() - 1);
        assertThat(testServiceProviderRole.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testServiceProviderRole.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testServiceProviderRole.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createServiceProviderRoleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceProviderRoleRepository.findAll().size();

        // Create the ServiceProviderRole with an existing ID
        serviceProviderRole.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceProviderRoleMockMvc.perform(post("/api/service-provider-roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceProviderRole)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceProviderRole in the database
        List<ServiceProviderRole> serviceProviderRoleList = serviceProviderRoleRepository.findAll();
        assertThat(serviceProviderRoleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceProviderRoles() throws Exception {
        // Initialize the database
        serviceProviderRoleRepository.saveAndFlush(serviceProviderRole);

        // Get all the serviceProviderRoleList
        restServiceProviderRoleMockMvc.perform(get("/api/service-provider-roles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceProviderRole.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceProviderRole() throws Exception {
        // Initialize the database
        serviceProviderRoleRepository.saveAndFlush(serviceProviderRole);

        // Get the serviceProviderRole
        restServiceProviderRoleMockMvc.perform(get("/api/service-provider-roles/{id}", serviceProviderRole.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceProviderRole.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceProviderRole() throws Exception {
        // Get the serviceProviderRole
        restServiceProviderRoleMockMvc.perform(get("/api/service-provider-roles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceProviderRole() throws Exception {
        // Initialize the database
        serviceProviderRoleRepository.saveAndFlush(serviceProviderRole);

        int databaseSizeBeforeUpdate = serviceProviderRoleRepository.findAll().size();

        // Update the serviceProviderRole
        ServiceProviderRole updatedServiceProviderRole = serviceProviderRoleRepository.findById(serviceProviderRole.getId()).get();
        // Disconnect from session so that the updates on updatedServiceProviderRole are not directly saved in db
        em.detach(updatedServiceProviderRole);
        updatedServiceProviderRole
            .name(UPDATED_NAME)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restServiceProviderRoleMockMvc.perform(put("/api/service-provider-roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceProviderRole)))
            .andExpect(status().isOk());

        // Validate the ServiceProviderRole in the database
        List<ServiceProviderRole> serviceProviderRoleList = serviceProviderRoleRepository.findAll();
        assertThat(serviceProviderRoleList).hasSize(databaseSizeBeforeUpdate);
        ServiceProviderRole testServiceProviderRole = serviceProviderRoleList.get(serviceProviderRoleList.size() - 1);
        assertThat(testServiceProviderRole.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testServiceProviderRole.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testServiceProviderRole.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceProviderRole() throws Exception {
        int databaseSizeBeforeUpdate = serviceProviderRoleRepository.findAll().size();

        // Create the ServiceProviderRole

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceProviderRoleMockMvc.perform(put("/api/service-provider-roles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceProviderRole)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceProviderRole in the database
        List<ServiceProviderRole> serviceProviderRoleList = serviceProviderRoleRepository.findAll();
        assertThat(serviceProviderRoleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceProviderRole() throws Exception {
        // Initialize the database
        serviceProviderRoleRepository.saveAndFlush(serviceProviderRole);

        int databaseSizeBeforeDelete = serviceProviderRoleRepository.findAll().size();

        // Delete the serviceProviderRole
        restServiceProviderRoleMockMvc.perform(delete("/api/service-provider-roles/{id}", serviceProviderRole.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceProviderRole> serviceProviderRoleList = serviceProviderRoleRepository.findAll();
        assertThat(serviceProviderRoleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
