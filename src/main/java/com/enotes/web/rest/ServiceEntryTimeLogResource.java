package com.enotes.web.rest;

import com.enotes.domain.ServiceEntryTimeLog;
import com.enotes.repository.ServiceEntryTimeLogRepository;
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
 * REST controller for managing {@link com.enotes.domain.ServiceEntryTimeLog}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceEntryTimeLogResource {

    private final Logger log = LoggerFactory.getLogger(ServiceEntryTimeLogResource.class);

    private static final String ENTITY_NAME = "serviceEntryTimeLog";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceEntryTimeLogRepository serviceEntryTimeLogRepository;

    public ServiceEntryTimeLogResource(ServiceEntryTimeLogRepository serviceEntryTimeLogRepository) {
        this.serviceEntryTimeLogRepository = serviceEntryTimeLogRepository;
    }

    /**
     * {@code POST  /service-entry-time-logs} : Create a new serviceEntryTimeLog.
     *
     * @param serviceEntryTimeLog the serviceEntryTimeLog to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceEntryTimeLog, or with status {@code 400 (Bad Request)} if the serviceEntryTimeLog has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-entry-time-logs")
    public ResponseEntity<ServiceEntryTimeLog> createServiceEntryTimeLog(@RequestBody ServiceEntryTimeLog serviceEntryTimeLog) throws URISyntaxException {
        log.debug("REST request to save ServiceEntryTimeLog : {}", serviceEntryTimeLog);
        if (serviceEntryTimeLog.getId() != null) {
            throw new BadRequestAlertException("A new serviceEntryTimeLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceEntryTimeLog result = serviceEntryTimeLogRepository.save(serviceEntryTimeLog);
        return ResponseEntity.created(new URI("/api/service-entry-time-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-entry-time-logs} : Updates an existing serviceEntryTimeLog.
     *
     * @param serviceEntryTimeLog the serviceEntryTimeLog to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceEntryTimeLog,
     * or with status {@code 400 (Bad Request)} if the serviceEntryTimeLog is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceEntryTimeLog couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-entry-time-logs")
    public ResponseEntity<ServiceEntryTimeLog> updateServiceEntryTimeLog(@RequestBody ServiceEntryTimeLog serviceEntryTimeLog) throws URISyntaxException {
        log.debug("REST request to update ServiceEntryTimeLog : {}", serviceEntryTimeLog);
        if (serviceEntryTimeLog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceEntryTimeLog result = serviceEntryTimeLogRepository.save(serviceEntryTimeLog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceEntryTimeLog.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-entry-time-logs} : get all the serviceEntryTimeLogs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceEntryTimeLogs in body.
     */
    @GetMapping("/service-entry-time-logs")
    public List<ServiceEntryTimeLog> getAllServiceEntryTimeLogs() {
        log.debug("REST request to get all ServiceEntryTimeLogs");
        return serviceEntryTimeLogRepository.findAll();
    }

    /**
     * {@code GET  /service-entry-time-logs/:id} : get the "id" serviceEntryTimeLog.
     *
     * @param id the id of the serviceEntryTimeLog to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceEntryTimeLog, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-entry-time-logs/{id}")
    public ResponseEntity<ServiceEntryTimeLog> getServiceEntryTimeLog(@PathVariable Long id) {
        log.debug("REST request to get ServiceEntryTimeLog : {}", id);
        Optional<ServiceEntryTimeLog> serviceEntryTimeLog = serviceEntryTimeLogRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceEntryTimeLog);
    }

    /**
     * {@code DELETE  /service-entry-time-logs/:id} : delete the "id" serviceEntryTimeLog.
     *
     * @param id the id of the serviceEntryTimeLog to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-entry-time-logs/{id}")
    public ResponseEntity<Void> deleteServiceEntryTimeLog(@PathVariable Long id) {
        log.debug("REST request to delete ServiceEntryTimeLog : {}", id);
        serviceEntryTimeLogRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
