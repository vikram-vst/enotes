package com.enotes.repository;

import com.enotes.domain.FacilityType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FacilityType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilityTypeRepository extends JpaRepository<FacilityType, Long> {
}
