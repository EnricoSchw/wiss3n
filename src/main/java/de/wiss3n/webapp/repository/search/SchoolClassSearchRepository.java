package de.wiss3n.webapp.repository.search;

import de.wiss3n.webapp.domain.SchoolClass;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the SchoolClass entity.
 */
public interface SchoolClassSearchRepository extends ElasticsearchRepository<SchoolClass, Long> {
}
