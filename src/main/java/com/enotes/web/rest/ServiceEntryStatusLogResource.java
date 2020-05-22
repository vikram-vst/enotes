package com.enotes.web.rest;

import com.enotes.domain.ServiceEntryStatusLog;
import com.enotes.repository.ServiceEntryStatusLogRepository;
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
 * REST controller for managing {@link com.enotes.domain.ServiceEntryStatusLog}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceEntryStatusLogResource {

    private final Logger log = LoggerFactory.getLogger(ServiceEntryStatusLogResource.class);

    private static final String ENTITY_NAME = "serviceEntryStatusLog";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceEntryStatusLogRepository serviceEntryStatusLogRepository;

    public ServiceEntryStatusLogResource(ServiceEntryStatusLogRepository serviceEntryStatusLogRepository) {
        this.serviceEntryStatusLogRepository = serviceEntryStatusLogRepository;
    }

    /**
     * {@code POST  /service-entry-status-logs} : Create a new serviceEntryStatusLog.
     *
     * @param serviceEntryStatusLog the serviceEntryStatusLog to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceEntryStatusLog, or with status {@code 400 (Bad Request)} if the serviceEntryStatusLog has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-entry-status-logs")
    public ResponseEntity<ServiceEntryStatusLog> createServiceEntryStatusLog(@RequestBody ServiceEntryStatusLog serviceEntryStatusLog) throws URISyntaxException {
        log.debug("REST request to save ServiceEntryStatusLog : {}", serviceEntryStatusLog);
        if (serviceEntryStatusLog.getId() != null) {
            throw new BadRequestAlertException("A new serviceEntryStatusLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceEntryStatusLog result = serviceEntryStatusLogRepository.save(serviceEntryStatusLog);
        return ResponseEntity.created(new URI("/api/service-entry-status-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-entry-status-logs} : Updates an existing serviceEntryStatusLog.
     *
     * @param serviceEntryStatusLog the serviceEntryStatusLog to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceEntryStatusLog,
     * or with status {@code 400 (Bad Request)} if the serviceEntryStatusLog is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceEntryStatusLog couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-entry-status-logs")
    public ResponseEntity<ServiceEntryStatusLog> updateServiceEntryStatusLog(@RequestBody ServiceEntryStatusLog serviceEntryStatusLog) throws URISyntaxException {
        log.debug("REST request to update ServiceEntryStatusLog : {}", serviceEntryStatusLog);
        if (serviceEntryStatusLog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceEntryStatusLog result = serviceEntryStatusLogRepository.save(serviceEntryStatusLog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceEntryStatusLog.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-entry-status-logs} : get all the serviceEntryStatusLogs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceEntryStatusLogs in body.
     */
    @GetMapping("/service-entry-status-logs")
    public List<ServiceEntryStatusLog> getAllServiceEntryStatusLogs() {
        log.debug("REST request to get all ServiceEntryStatusLogs");
        return serviceEntryStatusLogRepository.findAll();
    }

    /**
     * {@code GET  /service-entry-status-logs/:id} : get the "id" serviceEntryStatusLog.
     *
     * @param id the id of the serviceEntryStatusLog to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceEntryStatusLog, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-entry-status-logs/{id}")
    public ResponseEntity<ServiceEntryStatusLog> getServiceEntryStatusLog(@PathVariable Long id) {
        log.debug("REST request to get ServiceEntryStatusLog : {}", id);
        Optional<ServiceEntryStatusLog> serviceEntryStatusLog = serviceEntryStatusLogRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceEntryStatusLog);
    }

    /**
     * {@code DELETE  /service-entry-status-logs/:id} : delete the "id" serviceEntryStatusLog.
     *
     * @param id the id of the serviceEntryStatusLog to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-entry-status-logs/{id}")
    public ResponseEntity<Void> deleteServiceEntryStatusLog(@PathVariable Long id) {
        log.debug("REST request to delete ServiceEntryStatusLog : {}", id);
        serviceEntryStatusLogRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
