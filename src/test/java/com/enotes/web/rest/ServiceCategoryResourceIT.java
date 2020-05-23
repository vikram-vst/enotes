package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.ServiceCategory;
import com.enotes.repository.ServiceCategoryRepository;

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
 * Integration tests for the {@link ServiceCategoryResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class ServiceCategoryResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Integer DEFAULT_SEQUENCE_NO = 1;
    private static final Integer UPDATED_SEQUENCE_NO = 2;

    private static final Long DEFAULT_PARENT_CATEGORY = 1L;
    private static final Long UPDATED_PARENT_CATEGORY = 2L;

    private static final String DEFAULT_IMAGE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_PATH = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceCategoryRepository serviceCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceCategoryMockMvc;

    private ServiceCategory serviceCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceCategory createEntity(EntityManager em) {
        ServiceCategory serviceCategory = new ServiceCategory()
            .title(DEFAULT_TITLE)
            .sequenceNo(DEFAULT_SEQUENCE_NO)
            .parentCategory(DEFAULT_PARENT_CATEGORY)
            .imagePath(DEFAULT_IMAGE_PATH)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return serviceCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceCategory createUpdatedEntity(EntityManager em) {
        ServiceCategory serviceCategory = new ServiceCategory()
            .title(UPDATED_TITLE)
            .sequenceNo(UPDATED_SEQUENCE_NO)
            .parentCategory(UPDATED_PARENT_CATEGORY)
            .imagePath(UPDATED_IMAGE_PATH)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return serviceCategory;
    }

    @BeforeEach
    public void initTest() {
        serviceCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceCategory() throws Exception {
        int databaseSizeBeforeCreate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory
        restServiceCategoryMockMvc.perform(post("/api/service-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategory)))
            .andExpect(status().isCreated());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceCategory testServiceCategory = serviceCategoryList.get(serviceCategoryList.size() - 1);
        assertThat(testServiceCategory.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testServiceCategory.getSequenceNo()).isEqualTo(DEFAULT_SEQUENCE_NO);
        assertThat(testServiceCategory.getParentCategory()).isEqualTo(DEFAULT_PARENT_CATEGORY);
        assertThat(testServiceCategory.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testServiceCategory.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testServiceCategory.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createServiceCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory with an existing ID
        serviceCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceCategoryMockMvc.perform(post("/api/service-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceCategories() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        // Get all the serviceCategoryList
        restServiceCategoryMockMvc.perform(get("/api/service-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].sequenceNo").value(hasItem(DEFAULT_SEQUENCE_NO)))
            .andExpect(jsonPath("$.[*].parentCategory").value(hasItem(DEFAULT_PARENT_CATEGORY.intValue())))
            .andExpect(jsonPath("$.[*].imagePath").value(hasItem(DEFAULT_IMAGE_PATH)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(get("/api/service-categories/{id}", serviceCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceCategory.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.sequenceNo").value(DEFAULT_SEQUENCE_NO))
            .andExpect(jsonPath("$.parentCategory").value(DEFAULT_PARENT_CATEGORY.intValue()))
            .andExpect(jsonPath("$.imagePath").value(DEFAULT_IMAGE_PATH))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceCategory() throws Exception {
        // Get the serviceCategory
        restServiceCategoryMockMvc.perform(get("/api/service-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        int databaseSizeBeforeUpdate = serviceCategoryRepository.findAll().size();

        // Update the serviceCategory
        ServiceCategory updatedServiceCategory = serviceCategoryRepository.findById(serviceCategory.getId()).get();
        // Disconnect from session so that the updates on updatedServiceCategory are not directly saved in db
        em.detach(updatedServiceCategory);
        updatedServiceCategory
            .title(UPDATED_TITLE)
            .sequenceNo(UPDATED_SEQUENCE_NO)
            .parentCategory(UPDATED_PARENT_CATEGORY)
            .imagePath(UPDATED_IMAGE_PATH)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restServiceCategoryMockMvc.perform(put("/api/service-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceCategory)))
            .andExpect(status().isOk());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeUpdate);
        ServiceCategory testServiceCategory = serviceCategoryList.get(serviceCategoryList.size() - 1);
        assertThat(testServiceCategory.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testServiceCategory.getSequenceNo()).isEqualTo(UPDATED_SEQUENCE_NO);
        assertThat(testServiceCategory.getParentCategory()).isEqualTo(UPDATED_PARENT_CATEGORY);
        assertThat(testServiceCategory.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testServiceCategory.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testServiceCategory.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceCategory() throws Exception {
        int databaseSizeBeforeUpdate = serviceCategoryRepository.findAll().size();

        // Create the ServiceCategory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceCategoryMockMvc.perform(put("/api/service-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceCategory in the database
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceCategory() throws Exception {
        // Initialize the database
        serviceCategoryRepository.saveAndFlush(serviceCategory);

        int databaseSizeBeforeDelete = serviceCategoryRepository.findAll().size();

        // Delete the serviceCategory
        restServiceCategoryMockMvc.perform(delete("/api/service-categories/{id}", serviceCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceCategory> serviceCategoryList = serviceCategoryRepository.findAll();
        assertThat(serviceCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
