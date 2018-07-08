package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.TeachingSubject;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the TeachingSubject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachingSubjectRepository extends JpaRepository<TeachingSubject, Long> {

    @Query("select teaching_subject from TeachingSubject teaching_subject where teaching_subject.user.login = ?#{principal.username}")
    List<TeachingSubject> findByUserIsCurrentUser();

}
