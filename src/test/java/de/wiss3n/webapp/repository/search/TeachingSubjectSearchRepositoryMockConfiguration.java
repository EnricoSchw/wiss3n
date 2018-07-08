package de.wiss3n.webapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of TeachingSubjectSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TeachingSubjectSearchRepositoryMockConfiguration {

    @MockBean
    private TeachingSubjectSearchRepository mockTeachingSubjectSearchRepository;

}
