package com.enotes.web.rest;

import com.enotes.domain.Gender;
import com.enotes.repository.GenderRepository;
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
 * REST controller for managing {@link com.enotes.domain.Gender}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GenderResource {

    private final Logger log = LoggerFactory.getLogger(GenderResource.class);

    private static final String ENTITY_NAME = "gender";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GenderRepository genderRepository;

    public GenderResource(GenderRepository genderRepository) {
        this.genderRepository = genderRepository;
    }

    /**
     * {@code POST  /genders} : Create a new gender.
     *
     * @param gender the gender to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gender, or with status {@code 400 (Bad Request)} if the gender has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/genders")
    public ResponseEntity<Gender> createGender(@Valid @RequestBody Gender gender) throws URISyntaxException {
        log.debug("REST request to save Gender : {}", gender);
        if (gender.getId() != null) {
            throw new BadRequestAlertException("A new gender cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gender result = genderRepository.save(gender);
        return ResponseEntity.created(new URI("/api/genders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /genders} : Updates an existing gender.
     *
     * @param gender the gender to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gender,
     * or with status {@code 400 (Bad Request)} if the gender is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gender couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/genders")
    public ResponseEntity<Gender> updateGender(@Valid @RequestBody Gender gender) throws URISyntaxException {
        log.debug("REST request to update Gender : {}", gender);
        if (gender.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Gender result = genderRepository.save(gender);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gender.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /genders} : get all the genders.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of genders in body.
     */
    @GetMapping("/genders")
    public List<Gender> getAllGenders() {
        log.debug("REST request to get all Genders");
        return genderRepository.findAll();
    }

    /**
     * {@code GET  /genders/:id} : get the "id" gender.
     *
     * @param id the id of the gender to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gender, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/genders/{id}")
    public ResponseEntity<Gender> getGender(@PathVariable Long id) {
        log.debug("REST request to get Gender : {}", id);
        Optional<Gender> gender = genderRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gender);
    }

    /**
     * {@code DELETE  /genders/:id} : delete the "id" gender.
     *
     * @param id the id of the gender to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/genders/{id}")
    public ResponseEntity<Void> deleteGender(@PathVariable Long id) {
        log.debug("REST request to delete Gender : {}", id);
        genderRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
