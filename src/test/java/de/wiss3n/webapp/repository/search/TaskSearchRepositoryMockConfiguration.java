package de.wiss3n.webapp.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of TaskSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class TaskSearchRepositoryMockConfiguration {

    @MockBean
    private TaskSearchRepository mockTaskSearchRepository;

}
