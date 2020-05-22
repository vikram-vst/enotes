package com.enotes.web.rest;

import com.enotes.domain.OtpAuth;
import com.enotes.repository.OtpAuthRepository;
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
 * REST controller for managing {@link com.enotes.domain.OtpAuth}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OtpAuthResource {

    private final Logger log = LoggerFactory.getLogger(OtpAuthResource.class);

    private static final String ENTITY_NAME = "otpAuth";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OtpAuthRepository otpAuthRepository;

    public OtpAuthResource(OtpAuthRepository otpAuthRepository) {
        this.otpAuthRepository = otpAuthRepository;
    }

    /**
     * {@code POST  /otp-auths} : Create a new otpAuth.
     *
     * @param otpAuth the otpAuth to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new otpAuth, or with status {@code 400 (Bad Request)} if the otpAuth has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/otp-auths")
    public ResponseEntity<OtpAuth> createOtpAuth(@Valid @RequestBody OtpAuth otpAuth) throws URISyntaxException {
        log.debug("REST request to save OtpAuth : {}", otpAuth);
        if (otpAuth.getId() != null) {
            throw new BadRequestAlertException("A new otpAuth cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OtpAuth result = otpAuthRepository.save(otpAuth);
        return ResponseEntity.created(new URI("/api/otp-auths/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /otp-auths} : Updates an existing otpAuth.
     *
     * @param otpAuth the otpAuth to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated otpAuth,
     * or with status {@code 400 (Bad Request)} if the otpAuth is not valid,
     * or with status {@code 500 (Internal Server Error)} if the otpAuth couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/otp-auths")
    public ResponseEntity<OtpAuth> updateOtpAuth(@Valid @RequestBody OtpAuth otpAuth) throws URISyntaxException {
        log.debug("REST request to update OtpAuth : {}", otpAuth);
        if (otpAuth.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OtpAuth result = otpAuthRepository.save(otpAuth);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, otpAuth.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /otp-auths} : get all the otpAuths.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of otpAuths in body.
     */
    @GetMapping("/otp-auths")
    public List<OtpAuth> getAllOtpAuths() {
        log.debug("REST request to get all OtpAuths");
        return otpAuthRepository.findAll();
    }

    /**
     * {@code GET  /otp-auths/:id} : get the "id" otpAuth.
     *
     * @param id the id of the otpAuth to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the otpAuth, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/otp-auths/{id}")
    public ResponseEntity<OtpAuth> getOtpAuth(@PathVariable Long id) {
        log.debug("REST request to get OtpAuth : {}", id);
        Optional<OtpAuth> otpAuth = otpAuthRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(otpAuth);
    }

    /**
     * {@code DELETE  /otp-auths/:id} : delete the "id" otpAuth.
     *
     * @param id the id of the otpAuth to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/otp-auths/{id}")
    public ResponseEntity<Void> deleteOtpAuth(@PathVariable Long id) {
        log.debug("REST request to delete OtpAuth : {}", id);
        otpAuthRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
