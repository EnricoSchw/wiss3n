package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.SchoolClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the SchoolClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {

    @Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username}")
    Page<SchoolClass> findByUserIsCurrentUser(Pageable pageable);

    @Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username} and school_class.id = :id")
    Optional<SchoolClass> findByIdAndByUserIsCurrentUser(@Param("id") Long id);
}
