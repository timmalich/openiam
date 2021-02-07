package com.malichzhang.openiam.repository.search;

import com.malichzhang.openiam.domain.Accessor;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Accessor} entity.
 */
public interface AccessorSearchRepository extends ElasticsearchRepository<Accessor, Long> {
}
