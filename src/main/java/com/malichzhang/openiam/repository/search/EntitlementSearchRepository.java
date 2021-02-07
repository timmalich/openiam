package com.malichzhang.openiam.repository.search;

import com.malichzhang.openiam.domain.Entitlement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Entitlement} entity.
 */
public interface EntitlementSearchRepository extends ElasticsearchRepository<Entitlement, Long> {
}
