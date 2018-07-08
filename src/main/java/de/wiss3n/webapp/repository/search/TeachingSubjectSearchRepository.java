package de.wiss3n.webapp.repository.search;

import de.wiss3n.webapp.domain.TeachingSubject;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TeachingSubject entity.
 */
public interface TeachingSubjectSearchRepository extends ElasticsearchRepository<TeachingSubject, Long> {
}
