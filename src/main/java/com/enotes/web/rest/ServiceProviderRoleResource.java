package com.enotes.web.rest;

import com.enotes.domain.ServiceProviderRole;
import com.enotes.repository.ServiceProviderRoleRepository;
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
 * REST controller for managing {@link com.enotes.domain.ServiceProviderRole}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceProviderRoleResource {

    private final Logger log = LoggerFactory.getLogger(ServiceProviderRoleResource.class);

    private static final String ENTITY_NAME = "serviceProviderRole";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceProviderRoleRepository serviceProviderRoleRepository;

    public ServiceProviderRoleResource(ServiceProviderRoleRepository serviceProviderRoleRepository) {
        this.serviceProviderRoleRepository = serviceProviderRoleRepository;
    }

    /**
     * {@code POST  /service-provider-roles} : Create a new serviceProviderRole.
     *
     * @param serviceProviderRole the serviceProviderRole to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceProviderRole, or with status {@code 400 (Bad Request)} if the serviceProviderRole has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-provider-roles")
    public ResponseEntity<ServiceProviderRole> createServiceProviderRole(@Valid @RequestBody ServiceProviderRole serviceProviderRole) throws URISyntaxException {
        log.debug("REST request to save ServiceProviderRole : {}", serviceProviderRole);
        if (serviceProviderRole.getId() != null) {
            throw new BadRequestAlertException("A new serviceProviderRole cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceProviderRole result = serviceProviderRoleRepository.save(serviceProviderRole);
        return ResponseEntity.created(new URI("/api/service-provider-roles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-provider-roles} : Updates an existing serviceProviderRole.
     *
     * @param serviceProviderRole the serviceProviderRole to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceProviderRole,
     * or with status {@code 400 (Bad Request)} if the serviceProviderRole is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceProviderRole couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-provider-roles")
    public ResponseEntity<ServiceProviderRole> updateServiceProviderRole(@Valid @RequestBody ServiceProviderRole serviceProviderRole) throws URISyntaxException {
        log.debug("REST request to update ServiceProviderRole : {}", serviceProviderRole);
        if (serviceProviderRole.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceProviderRole result = serviceProviderRoleRepository.save(serviceProviderRole);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, serviceProviderRole.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-provider-roles} : get all the serviceProviderRoles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceProviderRoles in body.
     */
    @GetMapping("/service-provider-roles")
    public List<ServiceProviderRole> getAllServiceProviderRoles() {
        log.debug("REST request to get all ServiceProviderRoles");
        return serviceProviderRoleRepository.findAll();
    }

    /**
     * {@code GET  /service-provider-roles/:id} : get the "id" serviceProviderRole.
     *
     * @param id the id of the serviceProviderRole to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceProviderRole, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-provider-roles/{id}")
    public ResponseEntity<ServiceProviderRole> getServiceProviderRole(@PathVariable Long id) {
        log.debug("REST request to get ServiceProviderRole : {}", id);
        Optional<ServiceProviderRole> serviceProviderRole = serviceProviderRoleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceProviderRole);
    }

    /**
     * {@code DELETE  /service-provider-roles/:id} : delete the "id" serviceProviderRole.
     *
     * @param id the id of the serviceProviderRole to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-provider-roles/{id}")
    public ResponseEntity<Void> deleteServiceProviderRole(@PathVariable Long id) {
        log.debug("REST request to delete ServiceProviderRole : {}", id);
        serviceProviderRoleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
