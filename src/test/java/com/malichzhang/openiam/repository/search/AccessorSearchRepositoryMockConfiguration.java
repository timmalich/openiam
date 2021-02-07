package com.malichzhang.openiam.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link AccessorSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class AccessorSearchRepositoryMockConfiguration {

    @MockBean
    private AccessorSearchRepository mockAccessorSearchRepository;

}
