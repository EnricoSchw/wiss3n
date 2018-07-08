package de.wiss3n.webapp.repository.search;

import de.wiss3n.webapp.domain.TeachingHour;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TeachingHour entity.
 */
public interface TeachingHourSearchRepository extends ElasticsearchRepository<TeachingHour, Long> {
}
