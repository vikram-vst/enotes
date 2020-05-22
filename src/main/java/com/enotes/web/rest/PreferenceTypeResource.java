package com.enotes.web.rest;

import com.enotes.domain.PreferenceType;
import com.enotes.repository.PreferenceTypeRepository;
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
 * REST controller for managing {@link com.enotes.domain.PreferenceType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PreferenceTypeResource {

    private final Logger log = LoggerFactory.getLogger(PreferenceTypeResource.class);

    private static final String ENTITY_NAME = "preferenceType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PreferenceTypeRepository preferenceTypeRepository;

    public PreferenceTypeResource(PreferenceTypeRepository preferenceTypeRepository) {
        this.preferenceTypeRepository = preferenceTypeRepository;
    }

    /**
     * {@code POST  /preference-types} : Create a new preferenceType.
     *
     * @param preferenceType the preferenceType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new preferenceType, or with status {@code 400 (Bad Request)} if the preferenceType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/preference-types")
    public ResponseEntity<PreferenceType> createPreferenceType(@Valid @RequestBody PreferenceType preferenceType) throws URISyntaxException {
        log.debug("REST request to save PreferenceType : {}", preferenceType);
        if (preferenceType.getId() != null) {
            throw new BadRequestAlertException("A new preferenceType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PreferenceType result = preferenceTypeRepository.save(preferenceType);
        return ResponseEntity.created(new URI("/api/preference-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /preference-types} : Updates an existing preferenceType.
     *
     * @param preferenceType the preferenceType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated preferenceType,
     * or with status {@code 400 (Bad Request)} if the preferenceType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the preferenceType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/preference-types")
    public ResponseEntity<PreferenceType> updatePreferenceType(@Valid @RequestBody PreferenceType preferenceType) throws URISyntaxException {
        log.debug("REST request to update PreferenceType : {}", preferenceType);
        if (preferenceType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PreferenceType result = preferenceTypeRepository.save(preferenceType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, preferenceType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /preference-types} : get all the preferenceTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of preferenceTypes in body.
     */
    @GetMapping("/preference-types")
    public List<PreferenceType> getAllPreferenceTypes() {
        log.debug("REST request to get all PreferenceTypes");
        return preferenceTypeRepository.findAll();
    }

    /**
     * {@code GET  /preference-types/:id} : get the "id" preferenceType.
     *
     * @param id the id of the preferenceType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the preferenceType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/preference-types/{id}")
    public ResponseEntity<PreferenceType> getPreferenceType(@PathVariable Long id) {
        log.debug("REST request to get PreferenceType : {}", id);
        Optional<PreferenceType> preferenceType = preferenceTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(preferenceType);
    }

    /**
     * {@code DELETE  /preference-types/:id} : delete the "id" preferenceType.
     *
     * @param id the id of the preferenceType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/preference-types/{id}")
    public ResponseEntity<Void> deletePreferenceType(@PathVariable Long id) {
        log.debug("REST request to delete PreferenceType : {}", id);
        preferenceTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
