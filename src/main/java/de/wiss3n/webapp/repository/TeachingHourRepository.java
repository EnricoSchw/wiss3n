package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.domain.TeachingHour;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Set;


/**
 * Spring Data  repository for the TeachingHour entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachingHourRepository extends JpaRepository<TeachingHour, Long> {

    Set<TeachingHour> findAllBySchoolClass(SchoolClass schoolClass);
}
