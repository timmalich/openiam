package com.malichzhang.openiam.service.impl;

import com.malichzhang.openiam.service.AccessorService;
import com.malichzhang.openiam.domain.Accessor;
import com.malichzhang.openiam.repository.AccessorRepository;
import com.malichzhang.openiam.repository.search.AccessorSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link Accessor}.
 */
@Service
@Transactional
public class AccessorServiceImpl implements AccessorService {

    private final Logger log = LoggerFactory.getLogger(AccessorServiceImpl.class);

    private final AccessorRepository accessorRepository;

    private final AccessorSearchRepository accessorSearchRepository;

    public AccessorServiceImpl(AccessorRepository accessorRepository, AccessorSearchRepository accessorSearchRepository) {
        this.accessorRepository = accessorRepository;
        this.accessorSearchRepository = accessorSearchRepository;
    }

    @Override
    public Accessor save(Accessor accessor) {
        log.debug("Request to save Accessor : {}", accessor);
        Accessor result = accessorRepository.save(accessor);
        accessorSearchRepository.save(result);
        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Accessor> findAll(Pageable pageable) {
        log.debug("Request to get all Accessors");
        return accessorRepository.findAll(pageable);
    }


    public Page<Accessor> findAllWithEagerRelationships(Pageable pageable) {
        return accessorRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Accessor> findOne(Long id) {
        log.debug("Request to get Accessor : {}", id);
        return accessorRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Accessor : {}", id);
        accessorRepository.deleteById(id);
        accessorSearchRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Accessor> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Accessors for query {}", query);
        return accessorSearchRepository.search(queryStringQuery(query), pageable);    }
}
