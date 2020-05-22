package com.enotes.repository;

import com.enotes.domain.FacilityUser;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the FacilityUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilityUserRepository extends JpaRepository<FacilityUser, Long> {

    @Query("select facilityUser from FacilityUser facilityUser where facilityUser.user.login = ?#{principal.username}")
    List<FacilityUser> findByUserIsCurrentUser();
}
