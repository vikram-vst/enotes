package com.enotes.repository;

import com.enotes.domain.PreferenceType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PreferenceType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PreferenceTypeRepository extends JpaRepository<PreferenceType, Long> {
}
