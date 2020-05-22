package com.enotes.repository;

import com.enotes.domain.OtpAuth;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OtpAuth entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OtpAuthRepository extends JpaRepository<OtpAuth, Long> {
}
