package com.malichzhang.openiam.web.rest;

import com.malichzhang.openiam.domain.Accessor;
import com.malichzhang.openiam.domain.Entitlement;
import com.malichzhang.openiam.service.AccessorService;
import com.malichzhang.openiam.service.EntitlementService;
import com.malichzhang.openiam.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing {@link com.malichzhang.openiam.domain.Accessor}.
 */
@RestController
@RequestMapping("/api")
public class AccessorResource {

    private final Logger log = LoggerFactory.getLogger(AccessorResource.class);

    private static final String ENTITY_NAME = "accessor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccessorService accessorService;
    private final EntitlementService entitlementService;

    public AccessorResource(AccessorService accessorService, EntitlementService entitlementService) {
        this.accessorService = accessorService;
        this.entitlementService = entitlementService;
    }

    /**
     * {@code POST  /accessors} : Create a new accessor.
     *
     * @param accessor the accessor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accessor, or with status {@code 400 (Bad Request)} if the accessor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/accessors")
    public ResponseEntity<Accessor> createAccessor(@Valid @RequestBody Accessor accessor) throws URISyntaxException {
        log.debug("REST request to save Accessor : {}", accessor);
        if (accessor.getId() != null) {
            throw new BadRequestAlertException("A new accessor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Accessor result = accessorService.save(accessor);
        return ResponseEntity.created(new URI("/api/accessors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /accessors} : Updates an existing accessor.
     *
     * @param accessor the accessor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accessor,
     * or with status {@code 400 (Bad Request)} if the accessor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accessor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/accessors")
    public ResponseEntity<Accessor> updateAccessor(@Valid @RequestBody Accessor accessor) throws URISyntaxException {
        log.debug("REST request to update Accessor : {}", accessor);
        if (accessor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Accessor result = accessorService.save(accessor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, accessor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /accessors} : get all the accessors.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accessors in body.
     */
    @GetMapping("/accessors")
    public ResponseEntity<List<Accessor>> getAllAccessors(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Accessors");
        Page<Accessor> page;
        if (eagerload) {
            page = accessorService.findAllWithEagerRelationships(pageable);
        } else {
            page = accessorService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /accessors/:id} : get the "id" accessor.
     *
     * @param id the id of the accessor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accessor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/accessors/{id}")
    public ResponseEntity<Accessor> getAccessor(@PathVariable Long id) {
        log.debug("REST request to get Accessor : {}", id);
        Optional<Accessor> accessor = accessorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(accessor);
    }

    @GetMapping("/accessors/{id}/entitlements")
    public ResponseEntity<List<Entitlement>> getAccessorsEntitlements(@PathVariable Long id) {
        log.debug("REST request to get entitlements of Accessors");
        Accessor accessor = accessorService.findOne(id).orElseThrow();
        return ResponseEntity.ok().body(entitlementService.findAllByAccessorsIs(accessor));
    }

    /**
     * {@code DELETE  /accessors/:id} : delete the "id" accessor.
     *
     * @param id the id of the accessor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/accessors/{id}")
    public ResponseEntity<Void> deleteAccessor(@PathVariable Long id) {
        log.debug("REST request to delete Accessor : {}", id);
        accessorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/accessors?query=:query} : search for the accessor corresponding
     * to the query.
     *
     * @param query the query of the accessor search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/accessors")
    public ResponseEntity<List<Accessor>> searchAccessors(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Accessors for query {}", query);
        Page<Accessor> page = accessorService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
}
