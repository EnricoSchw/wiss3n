package de.wiss3n.webapp.repository.search;

import de.wiss3n.webapp.domain.TeachingSubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TeachingSubject entity.
 */
public interface TeachingSubjectSearchRepository extends ElasticsearchRepository<TeachingSubject, Long> {

    @Query("{ \"bool\": { \"must\": [ { \"term\": { \"schoolClass.id\": \"?0\"}},{ \"term\": { \"schoolClass.user.login.keyword\": \"?1\"}}] }}")
    Page<TeachingSubject> findAllBySchoolClass(Long schoolClassId, String login, Pageable pageable);
}
