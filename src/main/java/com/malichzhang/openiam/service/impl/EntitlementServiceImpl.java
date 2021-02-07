package com.malichzhang.openiam.service.impl;

import com.malichzhang.openiam.service.EntitlementService;
import com.malichzhang.openiam.domain.Entitlement;
import com.malichzhang.openiam.repository.EntitlementRepository;
import com.malichzhang.openiam.repository.search.EntitlementSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Entitlement}.
 */
@Service
@Transactional
public class EntitlementServiceImpl implements EntitlementService {

    private final Logger log = LoggerFactory.getLogger(EntitlementServiceImpl.class);

    private final EntitlementRepository entitlementRepository;

    private final EntitlementSearchRepository entitlementSearchRepository;

    public EntitlementServiceImpl(EntitlementRepository entitlementRepository, EntitlementSearchRepository entitlementSearchRepository) {
        this.entitlementRepository = entitlementRepository;
        this.entitlementSearchRepository = entitlementSearchRepository;
    }

    @Override
    public Entitlement save(Entitlement entitlement) {
        log.debug("Request to save Entitlement : {}", entitlement);
        Entitlement result = entitlementRepository.save(entitlement);
        entitlementSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Entitlement> findAll() {
        log.debug("Request to get all Entitlements");
        return entitlementRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Entitlement> findOne(Long id) {
        log.debug("Request to get Entitlement : {}", id);
        return entitlementRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Entitlement : {}", id);
        entitlementRepository.deleteById(id);
        entitlementSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Entitlement> search(String query) {
        log.debug("Request to search Entitlements for query {}", query);
        return StreamSupport
            .stream(entitlementSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
