package com.enotes.web.rest;

import com.enotes.domain.GeoPoint;
import com.enotes.repository.GeoPointRepository;
import com.enotes.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.enotes.domain.GeoPoint}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GeoPointResource {

    private final Logger log = LoggerFactory.getLogger(GeoPointResource.class);

    private static final String ENTITY_NAME = "geoPoint";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GeoPointRepository geoPointRepository;

    public GeoPointResource(GeoPointRepository geoPointRepository) {
        this.geoPointRepository = geoPointRepository;
    }

    /**
     * {@code POST  /geo-points} : Create a new geoPoint.
     *
     * @param geoPoint the geoPoint to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new geoPoint, or with status {@code 400 (Bad Request)} if the geoPoint has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/geo-points")
    public ResponseEntity<GeoPoint> createGeoPoint(@RequestBody GeoPoint geoPoint) throws URISyntaxException {
        log.debug("REST request to save GeoPoint : {}", geoPoint);
        if (geoPoint.getId() != null) {
            throw new BadRequestAlertException("A new geoPoint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GeoPoint result = geoPointRepository.save(geoPoint);
        return ResponseEntity.created(new URI("/api/geo-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /geo-points} : Updates an existing geoPoint.
     *
     * @param geoPoint the geoPoint to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated geoPoint,
     * or with status {@code 400 (Bad Request)} if the geoPoint is not valid,
     * or with status {@code 500 (Internal Server Error)} if the geoPoint couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/geo-points")
    public ResponseEntity<GeoPoint> updateGeoPoint(@RequestBody GeoPoint geoPoint) throws URISyntaxException {
        log.debug("REST request to update GeoPoint : {}", geoPoint);
        if (geoPoint.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GeoPoint result = geoPointRepository.save(geoPoint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, geoPoint.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /geo-points} : get all the geoPoints.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of geoPoints in body.
     */
    @GetMapping("/geo-points")
    public List<GeoPoint> getAllGeoPoints() {
        log.debug("REST request to get all GeoPoints");
        return geoPointRepository.findAll();
    }

    /**
     * {@code GET  /geo-points/:id} : get the "id" geoPoint.
     *
     * @param id the id of the geoPoint to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the geoPoint, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/geo-points/{id}")
    public ResponseEntity<GeoPoint> getGeoPoint(@PathVariable Long id) {
        log.debug("REST request to get GeoPoint : {}", id);
        Optional<GeoPoint> geoPoint = geoPointRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(geoPoint);
    }

    /**
     * {@code DELETE  /geo-points/:id} : delete the "id" geoPoint.
     *
     * @param id the id of the geoPoint to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/geo-points/{id}")
    public ResponseEntity<Void> deleteGeoPoint(@PathVariable Long id) {
        log.debug("REST request to delete GeoPoint : {}", id);
        geoPointRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
