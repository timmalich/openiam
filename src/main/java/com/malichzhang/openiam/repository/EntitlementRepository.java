package com.malichzhang.openiam.repository;

import java.util.List;
import java.util.Set;

import com.malichzhang.openiam.domain.Accessor;
import com.malichzhang.openiam.domain.Entitlement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Entitlement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntitlementRepository extends JpaRepository<Entitlement, Long> {
    List<Entitlement> findAllByAccessorsIs(Accessor accessors);
}
