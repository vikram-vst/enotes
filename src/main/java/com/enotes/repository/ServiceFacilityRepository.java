package com.enotes.repository;

import com.enotes.domain.ServiceFacility;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ServiceFacility entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceFacilityRepository extends JpaRepository<ServiceFacility, Long> {
}
