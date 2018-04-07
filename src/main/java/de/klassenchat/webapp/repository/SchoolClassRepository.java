package de.klassenchat.webapp.repository;

import de.klassenchat.webapp.domain.SchoolClass;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the SchoolClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {

    @Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username}")
    List<SchoolClass> findByUserIsCurrentUser();

}
