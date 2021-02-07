package com.malichzhang.openiam.web.rest;

import com.malichzhang.openiam.OpeniamApp;
import com.malichzhang.openiam.config.TestSecurityConfiguration;
import com.malichzhang.openiam.domain.Entitlement;
import com.malichzhang.openiam.repository.EntitlementRepository;
import com.malichzhang.openiam.repository.search.EntitlementSearchRepository;
import com.malichzhang.openiam.service.EntitlementService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EntitlementResource} REST controller.
 */
@SpringBootTest(classes = { OpeniamApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class EntitlementResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private EntitlementRepository entitlementRepository;

    @Autowired
    private EntitlementService entitlementService;

    /**
     * This repository is mocked in the com.malichzhang.openiam.repository.search test package.
     *
     * @see com.malichzhang.openiam.repository.search.EntitlementSearchRepositoryMockConfiguration
     */
    @Autowired
    private EntitlementSearchRepository mockEntitlementSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEntitlementMockMvc;

    private Entitlement entitlement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entitlement createEntity(EntityManager em) {
        Entitlement entitlement = new Entitlement()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return entitlement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Entitlement createUpdatedEntity(EntityManager em) {
        Entitlement entitlement = new Entitlement()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return entitlement;
    }

    @BeforeEach
    public void initTest() {
        entitlement = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntitlement() throws Exception {
        int databaseSizeBeforeCreate = entitlementRepository.findAll().size();
        // Create the Entitlement
        restEntitlementMockMvc.perform(post("/api/entitlements").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entitlement)))
            .andExpect(status().isCreated());

        // Validate the Entitlement in the database
        List<Entitlement> entitlementList = entitlementRepository.findAll();
        assertThat(entitlementList).hasSize(databaseSizeBeforeCreate + 1);
        Entitlement testEntitlement = entitlementList.get(entitlementList.size() - 1);
        assertThat(testEntitlement.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEntitlement.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the Entitlement in Elasticsearch
        verify(mockEntitlementSearchRepository, times(1)).save(testEntitlement);
    }

    @Test
    @Transactional
    public void createEntitlementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entitlementRepository.findAll().size();

        // Create the Entitlement with an existing ID
        entitlement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntitlementMockMvc.perform(post("/api/entitlements").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entitlement)))
            .andExpect(status().isBadRequest());

        // Validate the Entitlement in the database
        List<Entitlement> entitlementList = entitlementRepository.findAll();
        assertThat(entitlementList).hasSize(databaseSizeBeforeCreate);

        // Validate the Entitlement in Elasticsearch
        verify(mockEntitlementSearchRepository, times(0)).save(entitlement);
    }


    @Test
    @Transactional
    public void getAllEntitlements() throws Exception {
        // Initialize the database
        entitlementRepository.saveAndFlush(entitlement);

        // Get all the entitlementList
        restEntitlementMockMvc.perform(get("/api/entitlements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entitlement.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getEntitlement() throws Exception {
        // Initialize the database
        entitlementRepository.saveAndFlush(entitlement);

        // Get the entitlement
        restEntitlementMockMvc.perform(get("/api/entitlements/{id}", entitlement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entitlement.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingEntitlement() throws Exception {
        // Get the entitlement
        restEntitlementMockMvc.perform(get("/api/entitlements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntitlement() throws Exception {
        // Initialize the database
        entitlementService.save(entitlement);

        int databaseSizeBeforeUpdate = entitlementRepository.findAll().size();

        // Update the entitlement
        Entitlement updatedEntitlement = entitlementRepository.findById(entitlement.getId()).get();
        // Disconnect from session so that the updates on updatedEntitlement are not directly saved in db
        em.detach(updatedEntitlement);
        updatedEntitlement
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restEntitlementMockMvc.perform(put("/api/entitlements").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntitlement)))
            .andExpect(status().isOk());

        // Validate the Entitlement in the database
        List<Entitlement> entitlementList = entitlementRepository.findAll();
        assertThat(entitlementList).hasSize(databaseSizeBeforeUpdate);
        Entitlement testEntitlement = entitlementList.get(entitlementList.size() - 1);
        assertThat(testEntitlement.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEntitlement.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the Entitlement in Elasticsearch
        verify(mockEntitlementSearchRepository, times(2)).save(testEntitlement);
    }

    @Test
    @Transactional
    public void updateNonExistingEntitlement() throws Exception {
        int databaseSizeBeforeUpdate = entitlementRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntitlementMockMvc.perform(put("/api/entitlements").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entitlement)))
            .andExpect(status().isBadRequest());

        // Validate the Entitlement in the database
        List<Entitlement> entitlementList = entitlementRepository.findAll();
        assertThat(entitlementList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Entitlement in Elasticsearch
        verify(mockEntitlementSearchRepository, times(0)).save(entitlement);
    }

    @Test
    @Transactional
    public void deleteEntitlement() throws Exception {
        // Initialize the database
        entitlementService.save(entitlement);

        int databaseSizeBeforeDelete = entitlementRepository.findAll().size();

        // Delete the entitlement
        restEntitlementMockMvc.perform(delete("/api/entitlements/{id}", entitlement.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Entitlement> entitlementList = entitlementRepository.findAll();
        assertThat(entitlementList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Entitlement in Elasticsearch
        verify(mockEntitlementSearchRepository, times(1)).deleteById(entitlement.getId());
    }

    @Test
    @Transactional
    public void searchEntitlement() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        entitlementService.save(entitlement);
        when(mockEntitlementSearchRepository.search(queryStringQuery("id:" + entitlement.getId())))
            .thenReturn(Collections.singletonList(entitlement));

        // Search the entitlement
        restEntitlementMockMvc.perform(get("/api/_search/entitlements?query=id:" + entitlement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entitlement.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
}
