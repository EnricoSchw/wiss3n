package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.domain.TeachingSubject;
import de.wiss3n.webapp.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the TeachingSubject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachingSubjectRepository extends JpaRepository<TeachingSubject, Long> {

    Optional<TeachingSubject> findOneByUser(User user);
    Optional<TeachingSubject> findOneByName(String name);


    @Query("select teaching_subject from TeachingSubject teaching_subject where teaching_subject.user.login = ?#{principal.username}")
    Page<TeachingSubject> findByUserIsCurrentUser(Pageable pageable);

    @Query("select teaching_subject from TeachingSubject teaching_subject where teaching_subject.user.login = ?#{principal.username} and teaching_subject.id = :id")
    Optional<TeachingSubject> findOneByIdAndByUserIsCurrentUser(@Param("id") Long id);

    @Query("SELECT CASE  WHEN count(teaching_subject)> 0 THEN true ELSE false END FROM TeachingSubject teaching_subject where teaching_subject.user.login = ?#{principal.username} and teaching_subject.id = :id")
    boolean existsByIdAndByUserIsCurrentUser(@Param("id") Long id);

}
