package com.enotes.repository;

import com.enotes.domain.Frequency;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Frequency entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FrequencyRepository extends JpaRepository<Frequency, Long> {
}
