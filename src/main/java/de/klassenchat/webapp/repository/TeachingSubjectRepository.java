package de.klassenchat.webapp.repository;

import de.klassenchat.webapp.domain.TeachingSubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the TeachingSubject entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachingSubjectRepository extends JpaRepository<TeachingSubject, Long> {

    @Query("select teaching_subject from TeachingSubject teaching_subject where teaching_subject.user.login = ?#{principal.username}")
    Page<TeachingSubject> findByUserIsCurrentUser(Pageable pageable);

    @Query("select distinct teaching_subject from TeachingSubject teaching_subject left join fetch teaching_subject.tags")
    List<TeachingSubject> findAllWithEagerRelationships();

    @Query("select teaching_subject from TeachingSubject teaching_subject left join fetch teaching_subject.tags where teaching_subject.id =:id")
    TeachingSubject findOneWithEagerRelationships(@Param("id") Long id);

}
