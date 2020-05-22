package com.enotes.web.rest;

import com.enotes.domain.ServiceProvider;
import com.enotes.repository.ServiceProviderRepository;
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
 * REST controller for managing {@link com.enotes.domain.ServiceProvider}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceProviderResource {

    private final Logger log = LoggerFactory.getLogger(ServiceProviderResource.class);

    private static final String ENTITY_NAME = "serviceProvider";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceProviderRepository serviceProviderRepository;

    public ServiceProviderResource(ServiceProviderRepository serviceProviderRepository) {
        this.serviceProviderRepository = serviceProviderRepository;
    }

    /**
     * {@code POST  /service-providers} : Create a new serviceProvider.
     *
     * @param serviceProvider the serviceProvider to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceProvider, or with status {@code 400 (Bad Request)} if the serviceProvider has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-providers")
    public ResponseEntity<ServiceProvider> createServiceProvider(@RequestBody ServiceProvider serviceProvider) throws URISyntaxException {
        log.debug("REST request to save ServiceProvider : {}", serviceProvider);
        if (serviceProvider.getId() != null) {
            throw new BadRequestAlertException("A new serviceProvider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceProvider result = serviceProviderRepository.save(serviceProvider);
        return ResponseEntity.created(new URI("/api/service-providers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-providers} : Updates an existing serviceProvider.
     *
     * @param serviceProvider the serviceProvider to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceProvider,
     * or with status {@code 400 (Bad Request)} if the serviceProvider is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceProvider couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-providers")
    public ResponseEntity<ServiceProvider> updateServiceProvider(@RequestBody ServiceProvider serviceProvider) throws URISyntaxException {
        log.debug("REST request to update ServiceProvider : {}", serviceProvider);
        if (serviceProvider.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceProvider result = serviceProviderRepository.save(serviceProvider);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceProvider.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-providers} : get all the serviceProviders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceProviders in body.
     */
    @GetMapping("/service-providers")
    public List<ServiceProvider> getAllServiceProviders() {
        log.debug("REST request to get all ServiceProviders");
        return serviceProviderRepository.findAll();
    }

    /**
     * {@code GET  /service-providers/:id} : get the "id" serviceProvider.
     *
     * @param id the id of the serviceProvider to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceProvider, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-providers/{id}")
    public ResponseEntity<ServiceProvider> getServiceProvider(@PathVariable Long id) {
        log.debug("REST request to get ServiceProvider : {}", id);
        Optional<ServiceProvider> serviceProvider = serviceProviderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceProvider);
    }

    /**
     * {@code DELETE  /service-providers/:id} : delete the "id" serviceProvider.
     *
     * @param id the id of the serviceProvider to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-providers/{id}")
    public ResponseEntity<Void> deleteServiceProvider(@PathVariable Long id) {
        log.debug("REST request to delete ServiceProvider : {}", id);
        serviceProviderRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
