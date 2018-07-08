package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.SchoolClass;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SchoolClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {

    @Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username}")
    List<SchoolClass> findByUserIsCurrentUser();

}
