package com.enotes.repository;

import com.enotes.domain.ServiceDefinition;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ServiceDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceDefinitionRepository extends JpaRepository<ServiceDefinition, Long> {
}
