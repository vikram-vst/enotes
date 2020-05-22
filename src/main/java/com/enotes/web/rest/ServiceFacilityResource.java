package com.enotes.web.rest;

import com.enotes.domain.ServiceFacility;
import com.enotes.repository.ServiceFacilityRepository;
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
 * REST controller for managing {@link com.enotes.domain.ServiceFacility}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceFacilityResource {

    private final Logger log = LoggerFactory.getLogger(ServiceFacilityResource.class);

    private static final String ENTITY_NAME = "serviceFacility";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceFacilityRepository serviceFacilityRepository;

    public ServiceFacilityResource(ServiceFacilityRepository serviceFacilityRepository) {
        this.serviceFacilityRepository = serviceFacilityRepository;
    }

    /**
     * {@code POST  /service-facilities} : Create a new serviceFacility.
     *
     * @param serviceFacility the serviceFacility to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceFacility, or with status {@code 400 (Bad Request)} if the serviceFacility has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-facilities")
    public ResponseEntity<ServiceFacility> createServiceFacility(@RequestBody ServiceFacility serviceFacility) throws URISyntaxException {
        log.debug("REST request to save ServiceFacility : {}", serviceFacility);
        if (serviceFacility.getId() != null) {
            throw new BadRequestAlertException("A new serviceFacility cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceFacility result = serviceFacilityRepository.save(serviceFacility);
        return ResponseEntity.created(new URI("/api/service-facilities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-facilities} : Updates an existing serviceFacility.
     *
     * @param serviceFacility the serviceFacility to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceFacility,
     * or with status {@code 400 (Bad Request)} if the serviceFacility is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceFacility couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-facilities")
    public ResponseEntity<ServiceFacility> updateServiceFacility(@RequestBody ServiceFacility serviceFacility) throws URISyntaxException {
        log.debug("REST request to update ServiceFacility : {}", serviceFacility);
        if (serviceFacility.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceFacility result = serviceFacilityRepository.save(serviceFacility);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceFacility.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-facilities} : get all the serviceFacilities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceFacilities in body.
     */
    @GetMapping("/service-facilities")
    public List<ServiceFacility> getAllServiceFacilities() {
        log.debug("REST request to get all ServiceFacilities");
        return serviceFacilityRepository.findAll();
    }

    /**
     * {@code GET  /service-facilities/:id} : get the "id" serviceFacility.
     *
     * @param id the id of the serviceFacility to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceFacility, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-facilities/{id}")
    public ResponseEntity<ServiceFacility> getServiceFacility(@PathVariable Long id) {
        log.debug("REST request to get ServiceFacility : {}", id);
        Optional<ServiceFacility> serviceFacility = serviceFacilityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceFacility);
    }

    /**
     * {@code DELETE  /service-facilities/:id} : delete the "id" serviceFacility.
     *
     * @param id the id of the serviceFacility to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-facilities/{id}")
    public ResponseEntity<Void> deleteServiceFacility(@PathVariable Long id) {
        log.debug("REST request to delete ServiceFacility : {}", id);
        serviceFacilityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
