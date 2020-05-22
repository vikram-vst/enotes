package com.enotes.repository;

import com.enotes.domain.StatusCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the StatusCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StatusCategoryRepository extends JpaRepository<StatusCategory, Long> {
}
