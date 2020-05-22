package com.enotes.web.rest;

import com.enotes.domain.FacilityGroupType;
import com.enotes.repository.FacilityGroupTypeRepository;
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
 * REST controller for managing {@link com.enotes.domain.FacilityGroupType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FacilityGroupTypeResource {

    private final Logger log = LoggerFactory.getLogger(FacilityGroupTypeResource.class);

    private static final String ENTITY_NAME = "facilityGroupType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacilityGroupTypeRepository facilityGroupTypeRepository;

    public FacilityGroupTypeResource(FacilityGroupTypeRepository facilityGroupTypeRepository) {
        this.facilityGroupTypeRepository = facilityGroupTypeRepository;
    }

    /**
     * {@code POST  /facility-group-types} : Create a new facilityGroupType.
     *
     * @param facilityGroupType the facilityGroupType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facilityGroupType, or with status {@code 400 (Bad Request)} if the facilityGroupType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facility-group-types")
    public ResponseEntity<FacilityGroupType> createFacilityGroupType(@Valid @RequestBody FacilityGroupType facilityGroupType) throws URISyntaxException {
        log.debug("REST request to save FacilityGroupType : {}", facilityGroupType);
        if (facilityGroupType.getId() != null) {
            throw new BadRequestAlertException("A new facilityGroupType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacilityGroupType result = facilityGroupTypeRepository.save(facilityGroupType);
        return ResponseEntity.created(new URI("/api/facility-group-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facility-group-types} : Updates an existing facilityGroupType.
     *
     * @param facilityGroupType the facilityGroupType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facilityGroupType,
     * or with status {@code 400 (Bad Request)} if the facilityGroupType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facilityGroupType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facility-group-types")
    public ResponseEntity<FacilityGroupType> updateFacilityGroupType(@Valid @RequestBody FacilityGroupType facilityGroupType) throws URISyntaxException {
        log.debug("REST request to update FacilityGroupType : {}", facilityGroupType);
        if (facilityGroupType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FacilityGroupType result = facilityGroupTypeRepository.save(facilityGroupType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, facilityGroupType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facility-group-types} : get all the facilityGroupTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facilityGroupTypes in body.
     */
    @GetMapping("/facility-group-types")
    public List<FacilityGroupType> getAllFacilityGroupTypes() {
        log.debug("REST request to get all FacilityGroupTypes");
        return facilityGroupTypeRepository.findAll();
    }

    /**
     * {@code GET  /facility-group-types/:id} : get the "id" facilityGroupType.
     *
     * @param id the id of the facilityGroupType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facilityGroupType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facility-group-types/{id}")
    public ResponseEntity<FacilityGroupType> getFacilityGroupType(@PathVariable Long id) {
        log.debug("REST request to get FacilityGroupType : {}", id);
        Optional<FacilityGroupType> facilityGroupType = facilityGroupTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facilityGroupType);
    }

    /**
     * {@code DELETE  /facility-group-types/:id} : delete the "id" facilityGroupType.
     *
     * @param id the id of the facilityGroupType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facility-group-types/{id}")
    public ResponseEntity<Void> deleteFacilityGroupType(@PathVariable Long id) {
        log.debug("REST request to delete FacilityGroupType : {}", id);
        facilityGroupTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
