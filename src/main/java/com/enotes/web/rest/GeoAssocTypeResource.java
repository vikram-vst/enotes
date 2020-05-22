package com.enotes.web.rest;

import com.enotes.domain.GeoAssocType;
import com.enotes.repository.GeoAssocTypeRepository;
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
 * REST controller for managing {@link com.enotes.domain.GeoAssocType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GeoAssocTypeResource {

    private final Logger log = LoggerFactory.getLogger(GeoAssocTypeResource.class);

    private static final String ENTITY_NAME = "geoAssocType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GeoAssocTypeRepository geoAssocTypeRepository;

    public GeoAssocTypeResource(GeoAssocTypeRepository geoAssocTypeRepository) {
        this.geoAssocTypeRepository = geoAssocTypeRepository;
    }

    /**
     * {@code POST  /geo-assoc-types} : Create a new geoAssocType.
     *
     * @param geoAssocType the geoAssocType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new geoAssocType, or with status {@code 400 (Bad Request)} if the geoAssocType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/geo-assoc-types")
    public ResponseEntity<GeoAssocType> createGeoAssocType(@Valid @RequestBody GeoAssocType geoAssocType) throws URISyntaxException {
        log.debug("REST request to save GeoAssocType : {}", geoAssocType);
        if (geoAssocType.getId() != null) {
            throw new BadRequestAlertException("A new geoAssocType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GeoAssocType result = geoAssocTypeRepository.save(geoAssocType);
        return ResponseEntity.created(new URI("/api/geo-assoc-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /geo-assoc-types} : Updates an existing geoAssocType.
     *
     * @param geoAssocType the geoAssocType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated geoAssocType,
     * or with status {@code 400 (Bad Request)} if the geoAssocType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the geoAssocType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/geo-assoc-types")
    public ResponseEntity<GeoAssocType> updateGeoAssocType(@Valid @RequestBody GeoAssocType geoAssocType) throws URISyntaxException {
        log.debug("REST request to update GeoAssocType : {}", geoAssocType);
        if (geoAssocType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GeoAssocType result = geoAssocTypeRepository.save(geoAssocType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, geoAssocType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /geo-assoc-types} : get all the geoAssocTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of geoAssocTypes in body.
     */
    @GetMapping("/geo-assoc-types")
    public List<GeoAssocType> getAllGeoAssocTypes() {
        log.debug("REST request to get all GeoAssocTypes");
        return geoAssocTypeRepository.findAll();
    }

    /**
     * {@code GET  /geo-assoc-types/:id} : get the "id" geoAssocType.
     *
     * @param id the id of the geoAssocType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the geoAssocType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/geo-assoc-types/{id}")
    public ResponseEntity<GeoAssocType> getGeoAssocType(@PathVariable Long id) {
        log.debug("REST request to get GeoAssocType : {}", id);
        Optional<GeoAssocType> geoAssocType = geoAssocTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(geoAssocType);
    }

    /**
     * {@code DELETE  /geo-assoc-types/:id} : delete the "id" geoAssocType.
     *
     * @param id the id of the geoAssocType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/geo-assoc-types/{id}")
    public ResponseEntity<Void> deleteGeoAssocType(@PathVariable Long id) {
        log.debug("REST request to delete GeoAssocType : {}", id);
        geoAssocTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
