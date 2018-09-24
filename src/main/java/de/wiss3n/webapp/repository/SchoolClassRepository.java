package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.domain.TeachingHour;
import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.web.rest.AuditResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the SchoolClass entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {

    Optional<SchoolClass> findOneByUser(User user);
    Optional<SchoolClass> findOneByName(String name);


    @Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username}")
    Page<SchoolClass> findByUserIsCurrentUser(Pageable pageable);

    @Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username} and school_class.id = :id")
    Optional<SchoolClass> findOneByIdAndByUserIsCurrentUser(@Param("id") Long id);

    @Query("SELECT CASE  WHEN count(school_class)> 0 THEN true ELSE false END FROM SchoolClass school_class where school_class.user.login = ?#{principal.username} and school_class.id = :id")
    boolean existsByIdAndByUserIsCurrentUser(@Param("id") Long id);

    //@Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username} and school_class.active = true")
    //Page<SchoolClass> findAllByUserIsCurrentUserAndActive(String login, Pageable pageable);

    //@Query("SELECT school_class FROM SchoolClass school_class INNER JOIN TeachingHour teaching_hour ON school_class.id = teaching_hour.schoolClass.id WHERE school_class.user.login = ?#{principal.username} AND school_class.active = true")

    // @Query("select s from SchoolClass s LEFT OUTER JOIN s.teachingHours WHERE s.user.login = ?#{principal.username} AND s.active = true")
    @Query("select school_class from SchoolClass school_class where school_class.user.login = ?#{principal.username} and school_class.active = true")
    Page<SchoolClass> findAllByUserIsCurrentUserAndActive(String login, Pageable pageable);
}


