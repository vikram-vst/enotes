package com.enotes.web.rest;

import com.enotes.domain.FacilityType;
import com.enotes.repository.FacilityTypeRepository;
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
 * REST controller for managing {@link com.enotes.domain.FacilityType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FacilityTypeResource {

    private final Logger log = LoggerFactory.getLogger(FacilityTypeResource.class);

    private static final String ENTITY_NAME = "facilityType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacilityTypeRepository facilityTypeRepository;

    public FacilityTypeResource(FacilityTypeRepository facilityTypeRepository) {
        this.facilityTypeRepository = facilityTypeRepository;
    }

    /**
     * {@code POST  /facility-types} : Create a new facilityType.
     *
     * @param facilityType the facilityType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facilityType, or with status {@code 400 (Bad Request)} if the facilityType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facility-types")
    public ResponseEntity<FacilityType> createFacilityType(@Valid @RequestBody FacilityType facilityType) throws URISyntaxException {
        log.debug("REST request to save FacilityType : {}", facilityType);
        if (facilityType.getId() != null) {
            throw new BadRequestAlertException("A new facilityType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacilityType result = facilityTypeRepository.save(facilityType);
        return ResponseEntity.created(new URI("/api/facility-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facility-types} : Updates an existing facilityType.
     *
     * @param facilityType the facilityType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facilityType,
     * or with status {@code 400 (Bad Request)} if the facilityType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facilityType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facility-types")
    public ResponseEntity<FacilityType> updateFacilityType(@Valid @RequestBody FacilityType facilityType) throws URISyntaxException {
        log.debug("REST request to update FacilityType : {}", facilityType);
        if (facilityType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FacilityType result = facilityTypeRepository.save(facilityType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, facilityType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facility-types} : get all the facilityTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facilityTypes in body.
     */
    @GetMapping("/facility-types")
    public List<FacilityType> getAllFacilityTypes() {
        log.debug("REST request to get all FacilityTypes");
        return facilityTypeRepository.findAll();
    }

    /**
     * {@code GET  /facility-types/:id} : get the "id" facilityType.
     *
     * @param id the id of the facilityType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facilityType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facility-types/{id}")
    public ResponseEntity<FacilityType> getFacilityType(@PathVariable Long id) {
        log.debug("REST request to get FacilityType : {}", id);
        Optional<FacilityType> facilityType = facilityTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facilityType);
    }

    /**
     * {@code DELETE  /facility-types/:id} : delete the "id" facilityType.
     *
     * @param id the id of the facilityType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facility-types/{id}")
    public ResponseEntity<Void> deleteFacilityType(@PathVariable Long id) {
        log.debug("REST request to delete FacilityType : {}", id);
        facilityTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
