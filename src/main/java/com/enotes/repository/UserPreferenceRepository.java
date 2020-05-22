package com.enotes.repository;

import com.enotes.domain.UserPreference;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserPreference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPreferenceRepository extends JpaRepository<UserPreference, Long> {

    @Query("select userPreference from UserPreference userPreference where userPreference.user.login = ?#{principal.username}")
    List<UserPreference> findByUserIsCurrentUser();
}
