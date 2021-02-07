package com.malichzhang.openiam.web.rest;

import com.malichzhang.openiam.OpeniamApp;
import com.malichzhang.openiam.config.TestSecurityConfiguration;
import com.malichzhang.openiam.domain.Accessor;
import com.malichzhang.openiam.repository.AccessorRepository;
import com.malichzhang.openiam.repository.search.AccessorSearchRepository;
import com.malichzhang.openiam.service.AccessorService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.malichzhang.openiam.domain.enumeration.Community;
import com.malichzhang.openiam.domain.enumeration.Language;
/**
 * Integration tests for the {@link AccessorResource} REST controller.
 */
@SpringBootTest(classes = { OpeniamApp.class, TestSecurityConfiguration.class })
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class AccessorResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    private static final Community DEFAULT_COMMUNITY = Community.BOT;
    private static final Community UPDATED_COMMUNITY = Community.EMPLOYEE;

    private static final Language DEFAULT_LANGUAGE = Language.FR;
    private static final Language UPDATED_LANGUAGE = Language.EN;

    private static final Boolean DEFAULT_BLOCKED = false;
    private static final Boolean UPDATED_BLOCKED = true;

    @Autowired
    private AccessorRepository accessorRepository;

    @Mock
    private AccessorRepository accessorRepositoryMock;

    @Mock
    private AccessorService accessorServiceMock;

    @Autowired
    private AccessorService accessorService;

    /**
     * This repository is mocked in the com.malichzhang.openiam.repository.search test package.
     *
     * @see com.malichzhang.openiam.repository.search.AccessorSearchRepositoryMockConfiguration
     */
    @Autowired
    private AccessorSearchRepository mockAccessorSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccessorMockMvc;

    private Accessor accessor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Accessor createEntity(EntityManager em) {
        Accessor accessor = new Accessor()
            .title(DEFAULT_TITLE)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .community(DEFAULT_COMMUNITY)
            .language(DEFAULT_LANGUAGE)
            .blocked(DEFAULT_BLOCKED);
        return accessor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Accessor createUpdatedEntity(EntityManager em) {
        Accessor accessor = new Accessor()
            .title(UPDATED_TITLE)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .community(UPDATED_COMMUNITY)
            .language(UPDATED_LANGUAGE)
            .blocked(UPDATED_BLOCKED);
        return accessor;
    }

    @BeforeEach
    public void initTest() {
        accessor = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccessor() throws Exception {
        int databaseSizeBeforeCreate = accessorRepository.findAll().size();
        // Create the Accessor
        restAccessorMockMvc.perform(post("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accessor)))
            .andExpect(status().isCreated());

        // Validate the Accessor in the database
        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeCreate + 1);
        Accessor testAccessor = accessorList.get(accessorList.size() - 1);
        assertThat(testAccessor.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAccessor.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testAccessor.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testAccessor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAccessor.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testAccessor.getCommunity()).isEqualTo(DEFAULT_COMMUNITY);
        assertThat(testAccessor.getLanguage()).isEqualTo(DEFAULT_LANGUAGE);
        assertThat(testAccessor.isBlocked()).isEqualTo(DEFAULT_BLOCKED);

        // Validate the Accessor in Elasticsearch
        verify(mockAccessorSearchRepository, times(1)).save(testAccessor);
    }

    @Test
    @Transactional
    public void createAccessorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accessorRepository.findAll().size();

        // Create the Accessor with an existing ID
        accessor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccessorMockMvc.perform(post("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accessor)))
            .andExpect(status().isBadRequest());

        // Validate the Accessor in the database
        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeCreate);

        // Validate the Accessor in Elasticsearch
        verify(mockAccessorSearchRepository, times(0)).save(accessor);
    }


    @Test
    @Transactional
    public void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = accessorRepository.findAll().size();
        // set the field null
        accessor.setFirstName(null);

        // Create the Accessor, which fails.


        restAccessorMockMvc.perform(post("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accessor)))
            .andExpect(status().isBadRequest());

        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = accessorRepository.findAll().size();
        // set the field null
        accessor.setLastName(null);

        // Create the Accessor, which fails.


        restAccessorMockMvc.perform(post("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accessor)))
            .andExpect(status().isBadRequest());

        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = accessorRepository.findAll().size();
        // set the field null
        accessor.setEmail(null);

        // Create the Accessor, which fails.


        restAccessorMockMvc.perform(post("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accessor)))
            .andExpect(status().isBadRequest());

        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCommunityIsRequired() throws Exception {
        int databaseSizeBeforeTest = accessorRepository.findAll().size();
        // set the field null
        accessor.setCommunity(null);

        // Create the Accessor, which fails.


        restAccessorMockMvc.perform(post("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accessor)))
            .andExpect(status().isBadRequest());

        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAccessors() throws Exception {
        // Initialize the database
        accessorRepository.saveAndFlush(accessor);

        // Get all the accessorList
        restAccessorMockMvc.perform(get("/api/accessors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accessor.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].community").value(hasItem(DEFAULT_COMMUNITY.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].blocked").value(hasItem(DEFAULT_BLOCKED.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAccessorsWithEagerRelationshipsIsEnabled() throws Exception {
        when(accessorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAccessorMockMvc.perform(get("/api/accessors?eagerload=true"))
            .andExpect(status().isOk());

        verify(accessorServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAccessorsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(accessorServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAccessorMockMvc.perform(get("/api/accessors?eagerload=true"))
            .andExpect(status().isOk());

        verify(accessorServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAccessor() throws Exception {
        // Initialize the database
        accessorRepository.saveAndFlush(accessor);

        // Get the accessor
        restAccessorMockMvc.perform(get("/api/accessors/{id}", accessor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accessor.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.community").value(DEFAULT_COMMUNITY.toString()))
            .andExpect(jsonPath("$.language").value(DEFAULT_LANGUAGE.toString()))
            .andExpect(jsonPath("$.blocked").value(DEFAULT_BLOCKED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAccessor() throws Exception {
        // Get the accessor
        restAccessorMockMvc.perform(get("/api/accessors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccessor() throws Exception {
        // Initialize the database
        accessorService.save(accessor);

        int databaseSizeBeforeUpdate = accessorRepository.findAll().size();

        // Update the accessor
        Accessor updatedAccessor = accessorRepository.findById(accessor.getId()).get();
        // Disconnect from session so that the updates on updatedAccessor are not directly saved in db
        em.detach(updatedAccessor);
        updatedAccessor
            .title(UPDATED_TITLE)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .community(UPDATED_COMMUNITY)
            .language(UPDATED_LANGUAGE)
            .blocked(UPDATED_BLOCKED);

        restAccessorMockMvc.perform(put("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccessor)))
            .andExpect(status().isOk());

        // Validate the Accessor in the database
        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeUpdate);
        Accessor testAccessor = accessorList.get(accessorList.size() - 1);
        assertThat(testAccessor.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAccessor.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testAccessor.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testAccessor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAccessor.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testAccessor.getCommunity()).isEqualTo(UPDATED_COMMUNITY);
        assertThat(testAccessor.getLanguage()).isEqualTo(UPDATED_LANGUAGE);
        assertThat(testAccessor.isBlocked()).isEqualTo(UPDATED_BLOCKED);

        // Validate the Accessor in Elasticsearch
        verify(mockAccessorSearchRepository, times(2)).save(testAccessor);
    }

    @Test
    @Transactional
    public void updateNonExistingAccessor() throws Exception {
        int databaseSizeBeforeUpdate = accessorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccessorMockMvc.perform(put("/api/accessors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accessor)))
            .andExpect(status().isBadRequest());

        // Validate the Accessor in the database
        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Accessor in Elasticsearch
        verify(mockAccessorSearchRepository, times(0)).save(accessor);
    }

    @Test
    @Transactional
    public void deleteAccessor() throws Exception {
        // Initialize the database
        accessorService.save(accessor);

        int databaseSizeBeforeDelete = accessorRepository.findAll().size();

        // Delete the accessor
        restAccessorMockMvc.perform(delete("/api/accessors/{id}", accessor.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Accessor> accessorList = accessorRepository.findAll();
        assertThat(accessorList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Accessor in Elasticsearch
        verify(mockAccessorSearchRepository, times(1)).deleteById(accessor.getId());
    }

    @Test
    @Transactional
    public void searchAccessor() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        accessorService.save(accessor);
        when(mockAccessorSearchRepository.search(queryStringQuery("id:" + accessor.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(accessor), PageRequest.of(0, 1), 1));

        // Search the accessor
        restAccessorMockMvc.perform(get("/api/_search/accessors?query=id:" + accessor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accessor.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].community").value(hasItem(DEFAULT_COMMUNITY.toString())))
            .andExpect(jsonPath("$.[*].language").value(hasItem(DEFAULT_LANGUAGE.toString())))
            .andExpect(jsonPath("$.[*].blocked").value(hasItem(DEFAULT_BLOCKED.booleanValue())));
    }
}
