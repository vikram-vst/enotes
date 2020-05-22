package com.enotes.repository;

import com.enotes.domain.ServiceEntryStatusLog;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ServiceEntryStatusLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceEntryStatusLogRepository extends JpaRepository<ServiceEntryStatusLog, Long> {

    @Query("select serviceEntryStatusLog from ServiceEntryStatusLog serviceEntryStatusLog where serviceEntryStatusLog.modifiedBy.login = ?#{principal.username}")
    List<ServiceEntryStatusLog> findByModifiedByIsCurrentUser();
}
