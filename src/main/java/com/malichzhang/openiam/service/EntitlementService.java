package com.malichzhang.openiam.service;

import com.malichzhang.openiam.domain.Accessor;
import com.malichzhang.openiam.domain.Entitlement;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Service Interface for managing {@link Entitlement}.
 */
public interface EntitlementService {

    /**
     * Save a entitlement.
     *
     * @param entitlement the entity to save.
     * @return the persisted entity.
     */
    Entitlement save(Entitlement entitlement);

    /**
     * Get all the entitlements.
     *
     * @return the list of entities.
     */
    List<Entitlement> findAll();

    List<Entitlement> findAllByAccessorsIs(Accessor accessors);


    /**
     * Get the "id" entitlement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Entitlement> findOne(Long id);

    /**
     * Delete the "id" entitlement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the entitlement corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<Entitlement> search(String query);
}
