package com.enotes.web.rest;

import com.enotes.domain.ProductStore;
import com.enotes.repository.ProductStoreRepository;
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
 * REST controller for managing {@link com.enotes.domain.ProductStore}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductStoreResource {

    private final Logger log = LoggerFactory.getLogger(ProductStoreResource.class);

    private static final String ENTITY_NAME = "productStore";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductStoreRepository productStoreRepository;

    public ProductStoreResource(ProductStoreRepository productStoreRepository) {
        this.productStoreRepository = productStoreRepository;
    }

    /**
     * {@code POST  /product-stores} : Create a new productStore.
     *
     * @param productStore the productStore to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productStore, or with status {@code 400 (Bad Request)} if the productStore has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-stores")
    public ResponseEntity<ProductStore> createProductStore(@Valid @RequestBody ProductStore productStore) throws URISyntaxException {
        log.debug("REST request to save ProductStore : {}", productStore);
        if (productStore.getId() != null) {
            throw new BadRequestAlertException("A new productStore cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductStore result = productStoreRepository.save(productStore);
        return ResponseEntity.created(new URI("/api/product-stores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-stores} : Updates an existing productStore.
     *
     * @param productStore the productStore to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productStore,
     * or with status {@code 400 (Bad Request)} if the productStore is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productStore couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-stores")
    public ResponseEntity<ProductStore> updateProductStore(@Valid @RequestBody ProductStore productStore) throws URISyntaxException {
        log.debug("REST request to update ProductStore : {}", productStore);
        if (productStore.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductStore result = productStoreRepository.save(productStore);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productStore.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-stores} : get all the productStores.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productStores in body.
     */
    @GetMapping("/product-stores")
    public List<ProductStore> getAllProductStores() {
        log.debug("REST request to get all ProductStores");
        return productStoreRepository.findAll();
    }

    /**
     * {@code GET  /product-stores/:id} : get the "id" productStore.
     *
     * @param id the id of the productStore to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productStore, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-stores/{id}")
    public ResponseEntity<ProductStore> getProductStore(@PathVariable Long id) {
        log.debug("REST request to get ProductStore : {}", id);
        Optional<ProductStore> productStore = productStoreRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productStore);
    }

    /**
     * {@code DELETE  /product-stores/:id} : delete the "id" productStore.
     *
     * @param id the id of the productStore to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-stores/{id}")
    public ResponseEntity<Void> deleteProductStore(@PathVariable Long id) {
        log.debug("REST request to delete ProductStore : {}", id);
        productStoreRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
