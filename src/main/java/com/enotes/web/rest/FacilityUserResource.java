package com.enotes.web.rest;

import com.enotes.domain.FacilityUser;
import com.enotes.repository.FacilityUserRepository;
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
 * REST controller for managing {@link com.enotes.domain.FacilityUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FacilityUserResource {

    private final Logger log = LoggerFactory.getLogger(FacilityUserResource.class);

    private static final String ENTITY_NAME = "facilityUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacilityUserRepository facilityUserRepository;

    public FacilityUserResource(FacilityUserRepository facilityUserRepository) {
        this.facilityUserRepository = facilityUserRepository;
    }

    /**
     * {@code POST  /facility-users} : Create a new facilityUser.
     *
     * @param facilityUser the facilityUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facilityUser, or with status {@code 400 (Bad Request)} if the facilityUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facility-users")
    public ResponseEntity<FacilityUser> createFacilityUser(@Valid @RequestBody FacilityUser facilityUser) throws URISyntaxException {
        log.debug("REST request to save FacilityUser : {}", facilityUser);
        if (facilityUser.getId() != null) {
            throw new BadRequestAlertException("A new facilityUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FacilityUser result = facilityUserRepository.save(facilityUser);
        return ResponseEntity.created(new URI("/api/facility-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facility-users} : Updates an existing facilityUser.
     *
     * @param facilityUser the facilityUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facilityUser,
     * or with status {@code 400 (Bad Request)} if the facilityUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facilityUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facility-users")
    public ResponseEntity<FacilityUser> updateFacilityUser(@Valid @RequestBody FacilityUser facilityUser) throws URISyntaxException {
        log.debug("REST request to update FacilityUser : {}", facilityUser);
        if (facilityUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FacilityUser result = facilityUserRepository.save(facilityUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, facilityUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facility-users} : get all the facilityUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facilityUsers in body.
     */
    @GetMapping("/facility-users")
    public List<FacilityUser> getAllFacilityUsers() {
        log.debug("REST request to get all FacilityUsers");
        return facilityUserRepository.findAll();
    }

    /**
     * {@code GET  /facility-users/:id} : get the "id" facilityUser.
     *
     * @param id the id of the facilityUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facilityUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facility-users/{id}")
    public ResponseEntity<FacilityUser> getFacilityUser(@PathVariable Long id) {
        log.debug("REST request to get FacilityUser : {}", id);
        Optional<FacilityUser> facilityUser = facilityUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facilityUser);
    }

    /**
     * {@code DELETE  /facility-users/:id} : delete the "id" facilityUser.
     *
     * @param id the id of the facilityUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facility-users/{id}")
    public ResponseEntity<Void> deleteFacilityUser(@PathVariable Long id) {
        log.debug("REST request to delete FacilityUser : {}", id);
        facilityUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
