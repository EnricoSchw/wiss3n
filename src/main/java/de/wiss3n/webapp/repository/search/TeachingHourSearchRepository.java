package de.wiss3n.webapp.repository.search;

import de.wiss3n.webapp.domain.TeachingHour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TeachingHour entity.
 */
public interface TeachingHourSearchRepository extends ElasticsearchRepository<TeachingHour, Long> {

    @Query("{ \"bool\": { \"must\": [ { \"term\": { \"schoolClass.id\": \"?0\"}},{ \"term\": { \"schoolClass.user.login.keyword\": \"?1\"}}] }}")
    Page<TeachingHour> findAllBySchoolClass(Long schoolClassId, String login, Pageable pageable);
}
