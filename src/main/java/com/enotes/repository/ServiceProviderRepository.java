package com.enotes.repository;

import com.enotes.domain.ServiceProvider;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ServiceProvider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {

    @Query("select serviceProvider from ServiceProvider serviceProvider where serviceProvider.user.login = ?#{principal.username}")
    List<ServiceProvider> findByUserIsCurrentUser();
}
