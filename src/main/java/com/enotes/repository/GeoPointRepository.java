package com.enotes.repository;

import com.enotes.domain.GeoPoint;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GeoPoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeoPointRepository extends JpaRepository<GeoPoint, Long> {
}
