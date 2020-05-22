package com.enotes.web.rest;

import com.enotes.domain.Frequency;
import com.enotes.repository.FrequencyRepository;
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
 * REST controller for managing {@link com.enotes.domain.Frequency}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FrequencyResource {

    private final Logger log = LoggerFactory.getLogger(FrequencyResource.class);

    private static final String ENTITY_NAME = "frequency";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FrequencyRepository frequencyRepository;

    public FrequencyResource(FrequencyRepository frequencyRepository) {
        this.frequencyRepository = frequencyRepository;
    }

    /**
     * {@code POST  /frequencies} : Create a new frequency.
     *
     * @param frequency the frequency to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new frequency, or with status {@code 400 (Bad Request)} if the frequency has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/frequencies")
    public ResponseEntity<Frequency> createFrequency(@Valid @RequestBody Frequency frequency) throws URISyntaxException {
        log.debug("REST request to save Frequency : {}", frequency);
        if (frequency.getId() != null) {
            throw new BadRequestAlertException("A new frequency cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Frequency result = frequencyRepository.save(frequency);
        return ResponseEntity.created(new URI("/api/frequencies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /frequencies} : Updates an existing frequency.
     *
     * @param frequency the frequency to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated frequency,
     * or with status {@code 400 (Bad Request)} if the frequency is not valid,
     * or with status {@code 500 (Internal Server Error)} if the frequency couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/frequencies")
    public ResponseEntity<Frequency> updateFrequency(@Valid @RequestBody Frequency frequency) throws URISyntaxException {
        log.debug("REST request to update Frequency : {}", frequency);
        if (frequency.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Frequency result = frequencyRepository.save(frequency);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, frequency.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /frequencies} : get all the frequencies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of frequencies in body.
     */
    @GetMapping("/frequencies")
    public List<Frequency> getAllFrequencies() {
        log.debug("REST request to get all Frequencies");
        return frequencyRepository.findAll();
    }

    /**
     * {@code GET  /frequencies/:id} : get the "id" frequency.
     *
     * @param id the id of the frequency to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the frequency, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/frequencies/{id}")
    public ResponseEntity<Frequency> getFrequency(@PathVariable Long id) {
        log.debug("REST request to get Frequency : {}", id);
        Optional<Frequency> frequency = frequencyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(frequency);
    }

    /**
     * {@code DELETE  /frequencies/:id} : delete the "id" frequency.
     *
     * @param id the id of the frequency to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/frequencies/{id}")
    public ResponseEntity<Void> deleteFrequency(@PathVariable Long id) {
        log.debug("REST request to delete Frequency : {}", id);
        frequencyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
