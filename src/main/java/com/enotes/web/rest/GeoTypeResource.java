package com.enotes.web.rest;

import com.enotes.domain.GeoType;
import com.enotes.repository.GeoTypeRepository;
import com.enotes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.enotes.domain.GeoType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GeoTypeResource {

    private final Logger log = LoggerFactory.getLogger(GeoTypeResource.class);

    private static final String ENTITY_NAME = "geoType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GeoTypeRepository geoTypeRepository;

    public GeoTypeResource(GeoTypeRepository geoTypeRepository) {
        this.geoTypeRepository = geoTypeRepository;
    }

    /**
     * {@code POST  /geo-types} : Create a new geoType.
     *
     * @param geoType the geoType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new geoType, or with status {@code 400 (Bad Request)} if the geoType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/geo-types")
    public ResponseEntity<GeoType> createGeoType(@Valid @RequestBody GeoType geoType) throws URISyntaxException {
        log.debug("REST request to save GeoType : {}", geoType);
        if (geoType.getId() != null) {
            throw new BadRequestAlertException("A new geoType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GeoType result = geoTypeRepository.save(geoType);
        return ResponseEntity.created(new URI("/api/geo-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /geo-types} : Updates an existing geoType.
     *
     * @param geoType the geoType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated geoType,
     * or with status {@code 400 (Bad Request)} if the geoType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the geoType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/geo-types")
    public ResponseEntity<GeoType> updateGeoType(@Valid @RequestBody GeoType geoType) throws URISyntaxException {
        log.debug("REST request to update GeoType : {}", geoType);
        if (geoType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GeoType result = geoTypeRepository.save(geoType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, geoType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /geo-types} : get all the geoTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of geoTypes in body.
     */
    @GetMapping("/geo-types")
    public List<GeoType> getAllGeoTypes() {
        log.debug("REST request to get all GeoTypes");
        return geoTypeRepository.findAll();
    }

    /**
     * {@code GET  /geo-types/:id} : get the "id" geoType.
     *
     * @param id the id of the geoType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the geoType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/geo-types/{id}")
    public ResponseEntity<GeoType> getGeoType(@PathVariable Long id) {
        log.debug("REST request to get GeoType : {}", id);
        Optional<GeoType> geoType = geoTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(geoType);
    }

    /**
     * {@code DELETE  /geo-types/:id} : delete the "id" geoType.
     *
     * @param id the id of the geoType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/geo-types/{id}")
    public ResponseEntity<Void> deleteGeoType(@PathVariable Long id) {
        log.debug("REST request to delete GeoType : {}", id);
        geoTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
