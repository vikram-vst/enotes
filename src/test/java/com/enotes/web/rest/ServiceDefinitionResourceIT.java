package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.ServiceDefinition;
import com.enotes.domain.Service;
import com.enotes.repository.ServiceDefinitionRepository;

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
 * Integration tests for the {@link ServiceDefinitionResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ServiceDefinitionResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_VERSION = 1;
    private static final Integer UPDATED_VERSION = 2;

    private static final String DEFAULT_IMAGE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_PATH = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_FIELDS = "AAAAAAAAAA";
    private static final String UPDATED_FIELDS = "BBBBBBBBBB";

    @Autowired
    private ServiceDefinitionRepository serviceDefinitionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceDefinitionMockMvc;

    private ServiceDefinition serviceDefinition;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceDefinition createEntity(EntityManager em) {
        ServiceDefinition serviceDefinition = new ServiceDefinition()
            .title(DEFAULT_TITLE)
            .version(DEFAULT_VERSION)
            .imagePath(DEFAULT_IMAGE_PATH)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .fields(DEFAULT_FIELDS);
        // Add required entity
        Service service;
        if (TestUtil.findAll(em, Service.class).isEmpty()) {
            service = ServiceResourceIT.createEntity(em);
            em.persist(service);
            em.flush();
        } else {
            service = TestUtil.findAll(em, Service.class).get(0);
        }
        serviceDefinition.setService(service);
        return serviceDefinition;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceDefinition createUpdatedEntity(EntityManager em) {
        ServiceDefinition serviceDefinition = new ServiceDefinition()
            .title(UPDATED_TITLE)
            .version(UPDATED_VERSION)
            .imagePath(UPDATED_IMAGE_PATH)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .fields(UPDATED_FIELDS);
        // Add required entity
        Service service;
        if (TestUtil.findAll(em, Service.class).isEmpty()) {
            service = ServiceResourceIT.createUpdatedEntity(em);
            em.persist(service);
            em.flush();
        } else {
            service = TestUtil.findAll(em, Service.class).get(0);
        }
        serviceDefinition.setService(service);
        return serviceDefinition;
    }

    @BeforeEach
    public void initTest() {
        serviceDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceDefinition() throws Exception {
        int databaseSizeBeforeCreate = serviceDefinitionRepository.findAll().size();

        // Create the ServiceDefinition
        restServiceDefinitionMockMvc.perform(post("/api/service-definitions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceDefinition)))
            .andExpect(status().isCreated());

        // Validate the ServiceDefinition in the database
        List<ServiceDefinition> serviceDefinitionList = serviceDefinitionRepository.findAll();
        assertThat(serviceDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceDefinition testServiceDefinition = serviceDefinitionList.get(serviceDefinitionList.size() - 1);
        assertThat(testServiceDefinition.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testServiceDefinition.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testServiceDefinition.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testServiceDefinition.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testServiceDefinition.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testServiceDefinition.getFields()).isEqualTo(DEFAULT_FIELDS);
    }

    @Test
    @Transactional
    public void createServiceDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceDefinitionRepository.findAll().size();

        // Create the ServiceDefinition with an existing ID
        serviceDefinition.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceDefinitionMockMvc.perform(post("/api/service-definitions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceDefinition in the database
        List<ServiceDefinition> serviceDefinitionList = serviceDefinitionRepository.findAll();
        assertThat(serviceDefinitionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceDefinitions() throws Exception {
        // Initialize the database
        serviceDefinitionRepository.saveAndFlush(serviceDefinition);

        // Get all the serviceDefinitionList
        restServiceDefinitionMockMvc.perform(get("/api/service-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION)))
            .andExpect(jsonPath("$.[*].imagePath").value(hasItem(DEFAULT_IMAGE_PATH)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].fields").value(hasItem(DEFAULT_FIELDS.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceDefinition() throws Exception {
        // Initialize the database
        serviceDefinitionRepository.saveAndFlush(serviceDefinition);

        // Get the serviceDefinition
        restServiceDefinitionMockMvc.perform(get("/api/service-definitions/{id}", serviceDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceDefinition.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION))
            .andExpect(jsonPath("$.imagePath").value(DEFAULT_IMAGE_PATH))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.fields").value(DEFAULT_FIELDS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceDefinition() throws Exception {
        // Get the serviceDefinition
        restServiceDefinitionMockMvc.perform(get("/api/service-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceDefinition() throws Exception {
        // Initialize the database
        serviceDefinitionRepository.saveAndFlush(serviceDefinition);

        int databaseSizeBeforeUpdate = serviceDefinitionRepository.findAll().size();

        // Update the serviceDefinition
        ServiceDefinition updatedServiceDefinition = serviceDefinitionRepository.findById(serviceDefinition.getId()).get();
        // Disconnect from session so that the updates on updatedServiceDefinition are not directly saved in db
        em.detach(updatedServiceDefinition);
        updatedServiceDefinition
            .title(UPDATED_TITLE)
            .version(UPDATED_VERSION)
            .imagePath(UPDATED_IMAGE_PATH)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .fields(UPDATED_FIELDS);

        restServiceDefinitionMockMvc.perform(put("/api/service-definitions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceDefinition)))
            .andExpect(status().isOk());

        // Validate the ServiceDefinition in the database
        List<ServiceDefinition> serviceDefinitionList = serviceDefinitionRepository.findAll();
        assertThat(serviceDefinitionList).hasSize(databaseSizeBeforeUpdate);
        ServiceDefinition testServiceDefinition = serviceDefinitionList.get(serviceDefinitionList.size() - 1);
        assertThat(testServiceDefinition.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testServiceDefinition.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testServiceDefinition.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testServiceDefinition.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testServiceDefinition.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testServiceDefinition.getFields()).isEqualTo(UPDATED_FIELDS);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceDefinition() throws Exception {
        int databaseSizeBeforeUpdate = serviceDefinitionRepository.findAll().size();

        // Create the ServiceDefinition

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceDefinitionMockMvc.perform(put("/api/service-definitions")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceDefinition)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceDefinition in the database
        List<ServiceDefinition> serviceDefinitionList = serviceDefinitionRepository.findAll();
        assertThat(serviceDefinitionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceDefinition() throws Exception {
        // Initialize the database
        serviceDefinitionRepository.saveAndFlush(serviceDefinition);

        int databaseSizeBeforeDelete = serviceDefinitionRepository.findAll().size();

        // Delete the serviceDefinition
        restServiceDefinitionMockMvc.perform(delete("/api/service-definitions/{id}", serviceDefinition.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceDefinition> serviceDefinitionList = serviceDefinitionRepository.findAll();
        assertThat(serviceDefinitionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
