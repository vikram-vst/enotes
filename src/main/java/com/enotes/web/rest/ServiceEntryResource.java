package com.enotes.web.rest;

import com.enotes.domain.ServiceEntry;
import com.enotes.repository.ServiceEntryRepository;
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
 * REST controller for managing {@link com.enotes.domain.ServiceEntry}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceEntryResource {

    private final Logger log = LoggerFactory.getLogger(ServiceEntryResource.class);

    private static final String ENTITY_NAME = "serviceEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceEntryRepository serviceEntryRepository;

    public ServiceEntryResource(ServiceEntryRepository serviceEntryRepository) {
        this.serviceEntryRepository = serviceEntryRepository;
    }

    /**
     * {@code POST  /service-entries} : Create a new serviceEntry.
     *
     * @param serviceEntry the serviceEntry to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceEntry, or with status {@code 400 (Bad Request)} if the serviceEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-entries")
    public ResponseEntity<ServiceEntry> createServiceEntry(@Valid @RequestBody ServiceEntry serviceEntry) throws URISyntaxException {
        log.debug("REST request to save ServiceEntry : {}", serviceEntry);
        if (serviceEntry.getId() != null) {
            throw new BadRequestAlertException("A new serviceEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceEntry result = serviceEntryRepository.save(serviceEntry);
        return ResponseEntity.created(new URI("/api/service-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-entries} : Updates an existing serviceEntry.
     *
     * @param serviceEntry the serviceEntry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceEntry,
     * or with status {@code 400 (Bad Request)} if the serviceEntry is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceEntry couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-entries")
    public ResponseEntity<ServiceEntry> updateServiceEntry(@Valid @RequestBody ServiceEntry serviceEntry) throws URISyntaxException {
        log.debug("REST request to update ServiceEntry : {}", serviceEntry);
        if (serviceEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceEntry result = serviceEntryRepository.save(serviceEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceEntry.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-entries} : get all the serviceEntries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceEntries in body.
     */
    @GetMapping("/service-entries")
    public List<ServiceEntry> getAllServiceEntries() {
        log.debug("REST request to get all ServiceEntries");
        return serviceEntryRepository.findAll();
    }

    /**
     * {@code GET  /service-entries/:id} : get the "id" serviceEntry.
     *
     * @param id the id of the serviceEntry to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceEntry, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-entries/{id}")
    public ResponseEntity<ServiceEntry> getServiceEntry(@PathVariable Long id) {
        log.debug("REST request to get ServiceEntry : {}", id);
        Optional<ServiceEntry> serviceEntry = serviceEntryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceEntry);
    }

    /**
     * {@code DELETE  /service-entries/:id} : delete the "id" serviceEntry.
     *
     * @param id the id of the serviceEntry to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-entries/{id}")
    public ResponseEntity<Void> deleteServiceEntry(@PathVariable Long id) {
        log.debug("REST request to delete ServiceEntry : {}", id);
        serviceEntryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
