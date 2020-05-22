package com.enotes.repository;

import com.enotes.domain.ServiceEntryTimeLog;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ServiceEntryTimeLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceEntryTimeLogRepository extends JpaRepository<ServiceEntryTimeLog, Long> {

    @Query("select serviceEntryTimeLog from ServiceEntryTimeLog serviceEntryTimeLog where serviceEntryTimeLog.modifiedBy.login = ?#{principal.username}")
    List<ServiceEntryTimeLog> findByModifiedByIsCurrentUser();

    @Query("select serviceEntryTimeLog from ServiceEntryTimeLog serviceEntryTimeLog where serviceEntryTimeLog.createdBy.login = ?#{principal.username}")
    List<ServiceEntryTimeLog> findByCreatedByIsCurrentUser();
}
