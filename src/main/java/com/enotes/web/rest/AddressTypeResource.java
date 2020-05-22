package com.enotes.web.rest;

import com.enotes.domain.AddressType;
import com.enotes.repository.AddressTypeRepository;
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
 * REST controller for managing {@link com.enotes.domain.AddressType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AddressTypeResource {

    private final Logger log = LoggerFactory.getLogger(AddressTypeResource.class);

    private static final String ENTITY_NAME = "addressType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AddressTypeRepository addressTypeRepository;

    public AddressTypeResource(AddressTypeRepository addressTypeRepository) {
        this.addressTypeRepository = addressTypeRepository;
    }

    /**
     * {@code POST  /address-types} : Create a new addressType.
     *
     * @param addressType the addressType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new addressType, or with status {@code 400 (Bad Request)} if the addressType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/address-types")
    public ResponseEntity<AddressType> createAddressType(@Valid @RequestBody AddressType addressType) throws URISyntaxException {
        log.debug("REST request to save AddressType : {}", addressType);
        if (addressType.getId() != null) {
            throw new BadRequestAlertException("A new addressType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AddressType result = addressTypeRepository.save(addressType);
        return ResponseEntity.created(new URI("/api/address-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /address-types} : Updates an existing addressType.
     *
     * @param addressType the addressType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated addressType,
     * or with status {@code 400 (Bad Request)} if the addressType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the addressType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/address-types")
    public ResponseEntity<AddressType> updateAddressType(@Valid @RequestBody AddressType addressType) throws URISyntaxException {
        log.debug("REST request to update AddressType : {}", addressType);
        if (addressType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AddressType result = addressTypeRepository.save(addressType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, addressType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /address-types} : get all the addressTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of addressTypes in body.
     */
    @GetMapping("/address-types")
    public List<AddressType> getAllAddressTypes() {
        log.debug("REST request to get all AddressTypes");
        return addressTypeRepository.findAll();
    }

    /**
     * {@code GET  /address-types/:id} : get the "id" addressType.
     *
     * @param id the id of the addressType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the addressType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/address-types/{id}")
    public ResponseEntity<AddressType> getAddressType(@PathVariable Long id) {
        log.debug("REST request to get AddressType : {}", id);
        Optional<AddressType> addressType = addressTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(addressType);
    }

    /**
     * {@code DELETE  /address-types/:id} : delete the "id" addressType.
     *
     * @param id the id of the addressType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/address-types/{id}")
    public ResponseEntity<Void> deleteAddressType(@PathVariable Long id) {
        log.debug("REST request to delete AddressType : {}", id);
        addressTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
