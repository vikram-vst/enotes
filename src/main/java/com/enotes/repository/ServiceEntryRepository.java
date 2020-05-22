package com.enotes.repository;

import com.enotes.domain.ServiceEntry;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ServiceEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceEntryRepository extends JpaRepository<ServiceEntry, Long> {

    @Query("select serviceEntry from ServiceEntry serviceEntry where serviceEntry.user.login = ?#{principal.username}")
    List<ServiceEntry> findByUserIsCurrentUser();
}
