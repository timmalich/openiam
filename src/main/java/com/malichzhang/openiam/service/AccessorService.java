package com.malichzhang.openiam.service;

import com.malichzhang.openiam.domain.Accessor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Accessor}.
 */
public interface AccessorService {

    /**
     * Save a accessor.
     *
     * @param accessor the entity to save.
     * @return the persisted entity.
     */
    Accessor save(Accessor accessor);

    /**
     * Get all the accessors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Accessor> findAll(Pageable pageable);

    /**
     * Get all the accessors with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Accessor> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" accessor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Accessor> findOne(Long id);

    /**
     * Delete the "id" accessor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the accessor corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Accessor> search(String query, Pageable pageable);
}
