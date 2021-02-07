package com.malichzhang.openiam.repository;

import com.malichzhang.openiam.domain.Accessor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Accessor entity.
 */
@Repository
public interface AccessorRepository extends JpaRepository<Accessor, Long> {

    @Query(value = "select distinct accessor from Accessor accessor left join fetch accessor.entitlements left join fetch accessor.organizations",
        countQuery = "select count(distinct accessor) from Accessor accessor")
    Page<Accessor> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct accessor from Accessor accessor left join fetch accessor.entitlements left join fetch accessor.organizations")
    List<Accessor> findAllWithEagerRelationships();

    @Query("select accessor from Accessor accessor left join fetch accessor.entitlements left join fetch accessor.organizations where accessor.id =:id")
    Optional<Accessor> findOneWithEagerRelationships(@Param("id") Long id);
}
