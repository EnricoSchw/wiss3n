package de.wiss3n.webapp.repository.search;

import de.wiss3n.webapp.domain.SchoolClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

/**
 * Spring Data Elasticsearch repository for the SchoolClass entity.
 */
public interface SchoolClassSearchRepository extends ElasticsearchRepository<SchoolClass, Long> {

    @Query("{\"bool\": { \"must\": [ { \"term\": { \"active\": \"true\"} }, { \"term\": { \"user.login.keyword\": \"?0\"} } ] }}")
    Page<SchoolClass> findActive(String login, Pageable pageable);
}
