package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.ProductStore;
import com.enotes.repository.ProductStoreRepository;

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
 * Integration tests for the {@link ProductStoreResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class ProductStoreResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    @Autowired
    private ProductStoreRepository productStoreRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProductStoreMockMvc;

    private ProductStore productStore;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductStore createEntity(EntityManager em) {
        ProductStore productStore = new ProductStore()
            .name(DEFAULT_NAME)
            .title(DEFAULT_TITLE);
        return productStore;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductStore createUpdatedEntity(EntityManager em) {
        ProductStore productStore = new ProductStore()
            .name(UPDATED_NAME)
            .title(UPDATED_TITLE);
        return productStore;
    }

    @BeforeEach
    public void initTest() {
        productStore = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductStore() throws Exception {
        int databaseSizeBeforeCreate = productStoreRepository.findAll().size();

        // Create the ProductStore
        restProductStoreMockMvc.perform(post("/api/product-stores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productStore)))
            .andExpect(status().isCreated());

        // Validate the ProductStore in the database
        List<ProductStore> productStoreList = productStoreRepository.findAll();
        assertThat(productStoreList).hasSize(databaseSizeBeforeCreate + 1);
        ProductStore testProductStore = productStoreList.get(productStoreList.size() - 1);
        assertThat(testProductStore.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProductStore.getTitle()).isEqualTo(DEFAULT_TITLE);
    }

    @Test
    @Transactional
    public void createProductStoreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productStoreRepository.findAll().size();

        // Create the ProductStore with an existing ID
        productStore.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductStoreMockMvc.perform(post("/api/product-stores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productStore)))
            .andExpect(status().isBadRequest());

        // Validate the ProductStore in the database
        List<ProductStore> productStoreList = productStoreRepository.findAll();
        assertThat(productStoreList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProductStores() throws Exception {
        // Initialize the database
        productStoreRepository.saveAndFlush(productStore);

        // Get all the productStoreList
        restProductStoreMockMvc.perform(get("/api/product-stores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productStore.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)));
    }
    
    @Test
    @Transactional
    public void getProductStore() throws Exception {
        // Initialize the database
        productStoreRepository.saveAndFlush(productStore);

        // Get the productStore
        restProductStoreMockMvc.perform(get("/api/product-stores/{id}", productStore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productStore.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE));
    }

    @Test
    @Transactional
    public void getNonExistingProductStore() throws Exception {
        // Get the productStore
        restProductStoreMockMvc.perform(get("/api/product-stores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductStore() throws Exception {
        // Initialize the database
        productStoreRepository.saveAndFlush(productStore);

        int databaseSizeBeforeUpdate = productStoreRepository.findAll().size();

        // Update the productStore
        ProductStore updatedProductStore = productStoreRepository.findById(productStore.getId()).get();
        // Disconnect from session so that the updates on updatedProductStore are not directly saved in db
        em.detach(updatedProductStore);
        updatedProductStore
            .name(UPDATED_NAME)
            .title(UPDATED_TITLE);

        restProductStoreMockMvc.perform(put("/api/product-stores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductStore)))
            .andExpect(status().isOk());

        // Validate the ProductStore in the database
        List<ProductStore> productStoreList = productStoreRepository.findAll();
        assertThat(productStoreList).hasSize(databaseSizeBeforeUpdate);
        ProductStore testProductStore = productStoreList.get(productStoreList.size() - 1);
        assertThat(testProductStore.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProductStore.getTitle()).isEqualTo(UPDATED_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingProductStore() throws Exception {
        int databaseSizeBeforeUpdate = productStoreRepository.findAll().size();

        // Create the ProductStore

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductStoreMockMvc.perform(put("/api/product-stores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productStore)))
            .andExpect(status().isBadRequest());

        // Validate the ProductStore in the database
        List<ProductStore> productStoreList = productStoreRepository.findAll();
        assertThat(productStoreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductStore() throws Exception {
        // Initialize the database
        productStoreRepository.saveAndFlush(productStore);

        int databaseSizeBeforeDelete = productStoreRepository.findAll().size();

        // Delete the productStore
        restProductStoreMockMvc.perform(delete("/api/product-stores/{id}", productStore.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductStore> productStoreList = productStoreRepository.findAll();
        assertThat(productStoreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
