package de.wiss3n.webapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of TeachingHourSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TeachingHourSearchRepositoryMockConfiguration {

    @MockBean
    private TeachingHourSearchRepository mockTeachingHourSearchRepository;

}
