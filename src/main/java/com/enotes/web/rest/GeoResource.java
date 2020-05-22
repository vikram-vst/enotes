package com.enotes.web.rest;

import com.enotes.domain.Geo;
import com.enotes.repository.GeoRepository;
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
 * REST controller for managing {@link com.enotes.domain.Geo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GeoResource {

    private final Logger log = LoggerFactory.getLogger(GeoResource.class);

    private static final String ENTITY_NAME = "geo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GeoRepository geoRepository;

    public GeoResource(GeoRepository geoRepository) {
        this.geoRepository = geoRepository;
    }

    /**
     * {@code POST  /geos} : Create a new geo.
     *
     * @param geo the geo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new geo, or with status {@code 400 (Bad Request)} if the geo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/geos")
    public ResponseEntity<Geo> createGeo(@Valid @RequestBody Geo geo) throws URISyntaxException {
        log.debug("REST request to save Geo : {}", geo);
        if (geo.getId() != null) {
            throw new BadRequestAlertException("A new geo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Geo result = geoRepository.save(geo);
        return ResponseEntity.created(new URI("/api/geos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /geos} : Updates an existing geo.
     *
     * @param geo the geo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated geo,
     * or with status {@code 400 (Bad Request)} if the geo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the geo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/geos")
    public ResponseEntity<Geo> updateGeo(@Valid @RequestBody Geo geo) throws URISyntaxException {
        log.debug("REST request to update Geo : {}", geo);
        if (geo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Geo result = geoRepository.save(geo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, geo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /geos} : get all the geos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of geos in body.
     */
    @GetMapping("/geos")
    public List<Geo> getAllGeos() {
        log.debug("REST request to get all Geos");
        return geoRepository.findAll();
    }

    /**
     * {@code GET  /geos/:id} : get the "id" geo.
     *
     * @param id the id of the geo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the geo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/geos/{id}")
    public ResponseEntity<Geo> getGeo(@PathVariable Long id) {
        log.debug("REST request to get Geo : {}", id);
        Optional<Geo> geo = geoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(geo);
    }

    /**
     * {@code DELETE  /geos/:id} : delete the "id" geo.
     *
     * @param id the id of the geo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/geos/{id}")
    public ResponseEntity<Void> deleteGeo(@PathVariable Long id) {
        log.debug("REST request to delete Geo : {}", id);
        geoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
