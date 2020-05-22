package com.enotes.repository;

import com.enotes.domain.ProductStore;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ProductStore entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductStoreRepository extends JpaRepository<ProductStore, Long> {

    @Query("select productStore from ProductStore productStore where productStore.owner.login = ?#{principal.username}")
    List<ProductStore> findByOwnerIsCurrentUser();
}
