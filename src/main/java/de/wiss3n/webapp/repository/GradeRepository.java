package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.Grade;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Grade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GradeRepository extends JpaRepository<Grade, Long> {

    @Query("select grade from Grade grade where grade.user.login = ?#{principal.username}")
    List<Grade> findByUserIsCurrentUser();

}
