package de.wiss3n.webapp.web.rest;

import de.wiss3n.webapp.Wiss3NApp;

import de.wiss3n.webapp.domain.TeachingSubject;
import de.wiss3n.webapp.repository.TeachingSubjectRepository;
import de.wiss3n.webapp.repository.search.TeachingSubjectSearchRepository;
import de.wiss3n.webapp.service.TeachingSubjectService;
import de.wiss3n.webapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static de.wiss3n.webapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import de.wiss3n.webapp.domain.enumeration.SubjectType;
/**
 * Test class for the TeachingSubjectResource REST controller.
 *
 * @see TeachingSubjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Wiss3NApp.class)
public class TeachingSubjectResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PREFIX = "AAAAAAAAAA";
    private static final String UPDATED_PREFIX = "BBBBBBBBBB";

    private static final SubjectType DEFAULT_TYPE = SubjectType.HAUPFACH;
    private static final SubjectType UPDATED_TYPE = SubjectType.NEBENFACH;

    @Autowired
    private TeachingSubjectRepository teachingSubjectRepository;

    

    @Autowired
    private TeachingSubjectService teachingSubjectService;

    /**
     * This repository is mocked in the de.wiss3n.webapp.repository.search test package.
     *
     * @see de.wiss3n.webapp.repository.search.TeachingSubjectSearchRepositoryMockConfiguration
     */
    @Autowired
    private TeachingSubjectSearchRepository mockTeachingSubjectSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTeachingSubjectMockMvc;

    private TeachingSubject teachingSubject;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeachingSubjectResource teachingSubjectResource = new TeachingSubjectResource(teachingSubjectService);
        this.restTeachingSubjectMockMvc = MockMvcBuilders.standaloneSetup(teachingSubjectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TeachingSubject createEntity(EntityManager em) {
        TeachingSubject teachingSubject = new TeachingSubject()
            .name(DEFAULT_NAME)
            .prefix(DEFAULT_PREFIX)
            .type(DEFAULT_TYPE);
        return teachingSubject;
    }

    @Before
    public void initTest() {
        teachingSubject = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeachingSubject() throws Exception {
        int databaseSizeBeforeCreate = teachingSubjectRepository.findAll().size();

        // Create the TeachingSubject
        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubject)))
            .andExpect(status().isCreated());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeCreate + 1);
        TeachingSubject testTeachingSubject = teachingSubjectList.get(teachingSubjectList.size() - 1);
        assertThat(testTeachingSubject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTeachingSubject.getPrefix()).isEqualTo(DEFAULT_PREFIX);
        assertThat(testTeachingSubject.getType()).isEqualTo(DEFAULT_TYPE);

        // Validate the TeachingSubject in Elasticsearch
        verify(mockTeachingSubjectSearchRepository, times(1)).save(testTeachingSubject);
    }

    @Test
    @Transactional
    public void createTeachingSubjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teachingSubjectRepository.findAll().size();

        // Create the TeachingSubject with an existing ID
        teachingSubject.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubject)))
            .andExpect(status().isBadRequest());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeCreate);

        // Validate the TeachingSubject in Elasticsearch
        verify(mockTeachingSubjectSearchRepository, times(0)).save(teachingSubject);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingSubjectRepository.findAll().size();
        // set the field null
        teachingSubject.setName(null);

        // Create the TeachingSubject, which fails.

        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubject)))
            .andExpect(status().isBadRequest());

        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrefixIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingSubjectRepository.findAll().size();
        // set the field null
        teachingSubject.setPrefix(null);

        // Create the TeachingSubject, which fails.

        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubject)))
            .andExpect(status().isBadRequest());

        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingSubjectRepository.findAll().size();
        // set the field null
        teachingSubject.setType(null);

        // Create the TeachingSubject, which fails.

        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubject)))
            .andExpect(status().isBadRequest());

        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTeachingSubjects() throws Exception {
        // Initialize the database
        teachingSubjectRepository.saveAndFlush(teachingSubject);

        // Get all the teachingSubjectList
        restTeachingSubjectMockMvc.perform(get("/api/teaching-subjects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachingSubject.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].prefix").value(hasItem(DEFAULT_PREFIX.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getTeachingSubject() throws Exception {
        // Initialize the database
        teachingSubjectRepository.saveAndFlush(teachingSubject);

        // Get the teachingSubject
        restTeachingSubjectMockMvc.perform(get("/api/teaching-subjects/{id}", teachingSubject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teachingSubject.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.prefix").value(DEFAULT_PREFIX.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTeachingSubject() throws Exception {
        // Get the teachingSubject
        restTeachingSubjectMockMvc.perform(get("/api/teaching-subjects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeachingSubject() throws Exception {
        // Initialize the database
        teachingSubjectService.save(teachingSubject);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTeachingSubjectSearchRepository);

        int databaseSizeBeforeUpdate = teachingSubjectRepository.findAll().size();

        // Update the teachingSubject
        TeachingSubject updatedTeachingSubject = teachingSubjectRepository.findById(teachingSubject.getId()).get();
        // Disconnect from session so that the updates on updatedTeachingSubject are not directly saved in db
        em.detach(updatedTeachingSubject);
        updatedTeachingSubject
            .name(UPDATED_NAME)
            .prefix(UPDATED_PREFIX)
            .type(UPDATED_TYPE);

        restTeachingSubjectMockMvc.perform(put("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeachingSubject)))
            .andExpect(status().isOk());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeUpdate);
        TeachingSubject testTeachingSubject = teachingSubjectList.get(teachingSubjectList.size() - 1);
        assertThat(testTeachingSubject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTeachingSubject.getPrefix()).isEqualTo(UPDATED_PREFIX);
        assertThat(testTeachingSubject.getType()).isEqualTo(UPDATED_TYPE);

        // Validate the TeachingSubject in Elasticsearch
        verify(mockTeachingSubjectSearchRepository, times(1)).save(testTeachingSubject);
    }

    @Test
    @Transactional
    public void updateNonExistingTeachingSubject() throws Exception {
        int databaseSizeBeforeUpdate = teachingSubjectRepository.findAll().size();

        // Create the TeachingSubject

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTeachingSubjectMockMvc.perform(put("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubject)))
            .andExpect(status().isBadRequest());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TeachingSubject in Elasticsearch
        verify(mockTeachingSubjectSearchRepository, times(0)).save(teachingSubject);
    }

    @Test
    @Transactional
    public void deleteTeachingSubject() throws Exception {
        // Initialize the database
        teachingSubjectService.save(teachingSubject);

        int databaseSizeBeforeDelete = teachingSubjectRepository.findAll().size();

        // Get the teachingSubject
        restTeachingSubjectMockMvc.perform(delete("/api/teaching-subjects/{id}", teachingSubject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TeachingSubject in Elasticsearch
        verify(mockTeachingSubjectSearchRepository, times(1)).deleteById(teachingSubject.getId());
    }

    @Test
    @Transactional
    public void searchTeachingSubject() throws Exception {
        // Initialize the database
        teachingSubjectService.save(teachingSubject);
        when(mockTeachingSubjectSearchRepository.search(queryStringQuery("id:" + teachingSubject.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(teachingSubject), PageRequest.of(0, 1), 1));
        // Search the teachingSubject
        restTeachingSubjectMockMvc.perform(get("/api/_search/teaching-subjects?query=id:" + teachingSubject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachingSubject.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].prefix").value(hasItem(DEFAULT_PREFIX.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeachingSubject.class);
        TeachingSubject teachingSubject1 = new TeachingSubject();
        teachingSubject1.setId(1L);
        TeachingSubject teachingSubject2 = new TeachingSubject();
        teachingSubject2.setId(teachingSubject1.getId());
        assertThat(teachingSubject1).isEqualTo(teachingSubject2);
        teachingSubject2.setId(2L);
        assertThat(teachingSubject1).isNotEqualTo(teachingSubject2);
        teachingSubject1.setId(null);
        assertThat(teachingSubject1).isNotEqualTo(teachingSubject2);
    }
}
