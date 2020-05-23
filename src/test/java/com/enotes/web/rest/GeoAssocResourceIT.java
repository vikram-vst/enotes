package com.enotes.web.rest;

import com.enotes.EnotesApp;
import com.enotes.domain.GeoAssoc;
import com.enotes.repository.GeoAssocRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GeoAssocResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class GeoAssocResourceIT {

    @Autowired
    private GeoAssocRepository geoAssocRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGeoAssocMockMvc;

    private GeoAssoc geoAssoc;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoAssoc createEntity(EntityManager em) {
        GeoAssoc geoAssoc = new GeoAssoc();
        return geoAssoc;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GeoAssoc createUpdatedEntity(EntityManager em) {
        GeoAssoc geoAssoc = new GeoAssoc();
        return geoAssoc;
    }

    @BeforeEach
    public void initTest() {
        geoAssoc = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeoAssoc() throws Exception {
        int databaseSizeBeforeCreate = geoAssocRepository.findAll().size();

        // Create the GeoAssoc
        restGeoAssocMockMvc.perform(post("/api/geo-assocs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoAssoc)))
            .andExpect(status().isCreated());

        // Validate the GeoAssoc in the database
        List<GeoAssoc> geoAssocList = geoAssocRepository.findAll();
        assertThat(geoAssocList).hasSize(databaseSizeBeforeCreate + 1);
        GeoAssoc testGeoAssoc = geoAssocList.get(geoAssocList.size() - 1);
    }

    @Test
    @Transactional
    public void createGeoAssocWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = geoAssocRepository.findAll().size();

        // Create the GeoAssoc with an existing ID
        geoAssoc.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeoAssocMockMvc.perform(post("/api/geo-assocs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoAssoc)))
            .andExpect(status().isBadRequest());

        // Validate the GeoAssoc in the database
        List<GeoAssoc> geoAssocList = geoAssocRepository.findAll();
        assertThat(geoAssocList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGeoAssocs() throws Exception {
        // Initialize the database
        geoAssocRepository.saveAndFlush(geoAssoc);

        // Get all the geoAssocList
        restGeoAssocMockMvc.perform(get("/api/geo-assocs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(geoAssoc.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getGeoAssoc() throws Exception {
        // Initialize the database
        geoAssocRepository.saveAndFlush(geoAssoc);

        // Get the geoAssoc
        restGeoAssocMockMvc.perform(get("/api/geo-assocs/{id}", geoAssoc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(geoAssoc.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGeoAssoc() throws Exception {
        // Get the geoAssoc
        restGeoAssocMockMvc.perform(get("/api/geo-assocs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeoAssoc() throws Exception {
        // Initialize the database
        geoAssocRepository.saveAndFlush(geoAssoc);

        int databaseSizeBeforeUpdate = geoAssocRepository.findAll().size();

        // Update the geoAssoc
        GeoAssoc updatedGeoAssoc = geoAssocRepository.findById(geoAssoc.getId()).get();
        // Disconnect from session so that the updates on updatedGeoAssoc are not directly saved in db
        em.detach(updatedGeoAssoc);

        restGeoAssocMockMvc.perform(put("/api/geo-assocs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeoAssoc)))
            .andExpect(status().isOk());

        // Validate the GeoAssoc in the database
        List<GeoAssoc> geoAssocList = geoAssocRepository.findAll();
        assertThat(geoAssocList).hasSize(databaseSizeBeforeUpdate);
        GeoAssoc testGeoAssoc = geoAssocList.get(geoAssocList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingGeoAssoc() throws Exception {
        int databaseSizeBeforeUpdate = geoAssocRepository.findAll().size();

        // Create the GeoAssoc

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeoAssocMockMvc.perform(put("/api/geo-assocs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(geoAssoc)))
            .andExpect(status().isBadRequest());

        // Validate the GeoAssoc in the database
        List<GeoAssoc> geoAssocList = geoAssocRepository.findAll();
        assertThat(geoAssocList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeoAssoc() throws Exception {
        // Initialize the database
        geoAssocRepository.saveAndFlush(geoAssoc);

        int databaseSizeBeforeDelete = geoAssocRepository.findAll().size();

        // Delete the geoAssoc
        restGeoAssocMockMvc.perform(delete("/api/geo-assocs/{id}", geoAssoc.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GeoAssoc> geoAssocList = geoAssocRepository.findAll();
        assertThat(geoAssocList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
