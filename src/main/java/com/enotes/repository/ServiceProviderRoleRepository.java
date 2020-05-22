package com.enotes.repository;

import com.enotes.domain.ServiceProviderRole;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ServiceProviderRole entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceProviderRoleRepository extends JpaRepository<ServiceProviderRole, Long> {
}
