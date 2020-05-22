package com.enotes.repository;

import com.enotes.domain.Geo;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Geo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GeoRepository extends JpaRepository<Geo, Long> {
}
