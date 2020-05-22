package com.enotes.repository;

import com.enotes.domain.GeoAssoc;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GeoAssoc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeoAssocRepository extends JpaRepository<GeoAssoc, Long> {
}
