package com.enotes.web.rest;

import com.enotes.domain.FacilityGroup;
import com.enotes.repository.FacilityGroupRepository;
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
 * REST controller for managing {@link com.enotes.domain.FacilityGroup}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FacilityGroupResource {

    private final Logger log = LoggerFactory.getLogger(FacilityGroupResource.class);

    private static final String ENTITY_NAME = "facilityGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacilityGroupRepository facilityGroupRepository;

    public FacilityGroupResource(FacilityGroupRepository facilityGroupRepository) {
        this.facilityGroupRepository = facilityGroupRepository;
    }

    /**
     * {@code POST  /facility-groups} : Create a new facilityGroup.
     *
     * @param facilityGroup the facilityGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facilityGroup, or with status {@code 400 (Bad Request)} if the facilityGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facility-groups")
    public ResponseEntity<FacilityGroup> createFacilityGroup(@Valid @RequestBody FacilityGroup facilityGroup) throws URISyntaxException {
        log.debug("REST request to save FacilityGroup : {}", facilityGroup);
        if (facilityGroup.getId() != null) {
            throw new BadRequestAlertException("A new facilityGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacilityGroup result = facilityGroupRepository.save(facilityGroup);
        return ResponseEntity.created(new URI("/api/facility-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facility-groups} : Updates an existing facilityGroup.
     *
     * @param facilityGroup the facilityGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facilityGroup,
     * or with status {@code 400 (Bad Request)} if the facilityGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facilityGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facility-groups")
    public ResponseEntity<FacilityGroup> updateFacilityGroup(@Valid @RequestBody FacilityGroup facilityGroup) throws URISyntaxException {
        log.debug("REST request to update FacilityGroup : {}", facilityGroup);
        if (facilityGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FacilityGroup result = facilityGroupRepository.save(facilityGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, facilityGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facility-groups} : get all the facilityGroups.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facilityGroups in body.
     */
    @GetMapping("/facility-groups")
    public List<FacilityGroup> getAllFacilityGroups() {
        log.debug("REST request to get all FacilityGroups");
        return facilityGroupRepository.findAll();
    }

    /**
     * {@code GET  /facility-groups/:id} : get the "id" facilityGroup.
     *
     * @param id the id of the facilityGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facilityGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facility-groups/{id}")
    public ResponseEntity<FacilityGroup> getFacilityGroup(@PathVariable Long id) {
        log.debug("REST request to get FacilityGroup : {}", id);
        Optional<FacilityGroup> facilityGroup = facilityGroupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facilityGroup);
    }

    /**
     * {@code DELETE  /facility-groups/:id} : delete the "id" facilityGroup.
     *
     * @param id the id of the facilityGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facility-groups/{id}")
    public ResponseEntity<Void> deleteFacilityGroup(@PathVariable Long id) {
        log.debug("REST request to delete FacilityGroup : {}", id);
        facilityGroupRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
