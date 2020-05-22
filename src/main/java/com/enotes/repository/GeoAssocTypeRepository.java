package com.enotes.repository;

import com.enotes.domain.GeoAssocType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GeoAssocType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeoAssocTypeRepository extends JpaRepository<GeoAssocType, Long> {
}
