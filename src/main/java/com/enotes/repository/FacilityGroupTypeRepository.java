package com.enotes.repository;

import com.enotes.domain.FacilityGroupType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FacilityGroupType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilityGroupTypeRepository extends JpaRepository<FacilityGroupType, Long> {
}
