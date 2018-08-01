package de.wiss3n.webapp.web.rest;

import de.wiss3n.webapp.Wiss3NApp;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.SchoolClassRepository;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.repository.search.SchoolClassSearchRepository;
import de.wiss3n.webapp.service.SchoolClassService;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


import static de.wiss3n.webapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SchoolClassResource REST controller.
 *
 * @see SchoolClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Wiss3NApp.class)
public class SchoolClassResourceIntTest {

    private static final LocalDate DEFAULT_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolClassService schoolClassService;

    /**
     * This repository is mocked in the de.wiss3n.webapp.repository.search test package.
     *
     * @see de.wiss3n.webapp.repository.search.SchoolClassSearchRepositoryMockConfiguration
     */
    @Autowired
    private SchoolClassSearchRepository mockSchoolClassSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSchoolClassMockMvc;

    private SchoolClass schoolClass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SchoolClassResource schoolClassResource = new SchoolClassResource(schoolClassService);
        this.restSchoolClassMockMvc = MockMvcBuilders.standaloneSetup(schoolClassResource)
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
    public static SchoolClass createEntity(EntityManager em) {
        SchoolClass schoolClass = new SchoolClass()
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .active(DEFAULT_ACTIVE)
            .name(DEFAULT_NAME);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        schoolClass.setUser(user);
        return schoolClass;
    }

    @Before
    public void initTest() {
        schoolClass = createEntity(em);
        schoolClass.user(userRepository.findOneByLogin("user").get());
    }

    @Test
    @Transactional
    @WithMockUser
    public void createSchoolClass() throws Exception {
        int databaseSizeBeforeCreate = schoolClassRepository.findAll().size();

        // Create the SchoolClass
        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClass)))
            .andExpect(status().isCreated());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeCreate + 1);
        SchoolClass testSchoolClass = schoolClassList.get(schoolClassList.size() - 1);
        assertThat(testSchoolClass.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testSchoolClass.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testSchoolClass.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testSchoolClass.getName()).isEqualTo(DEFAULT_NAME);

        // Validate the SchoolClass in Elasticsearch
        verify(mockSchoolClassSearchRepository, times(1)).save(testSchoolClass);
    }

    @Test
    @Transactional
    public void createSchoolClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schoolClassRepository.findAll().size();

        // Create the SchoolClass with an existing ID
        schoolClass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClass)))
            .andExpect(status().isBadRequest());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeCreate);

        // Validate the SchoolClass in Elasticsearch
        verify(mockSchoolClassSearchRepository, times(0)).save(schoolClass);
    }

    @Test
    @Transactional
    public void checkStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolClassRepository.findAll().size();
        // set the field null
        schoolClass.setStart(null);

        // Create the SchoolClass, which fails.

        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClass)))
            .andExpect(status().isBadRequest());

        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolClassRepository.findAll().size();
        // set the field null
        schoolClass.setEnd(null);

        // Create the SchoolClass, which fails.

        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClass)))
            .andExpect(status().isBadRequest());

        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolClassRepository.findAll().size();
        // set the field null
        schoolClass.setActive(null);

        // Create the SchoolClass, which fails.

        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClass)))
            .andExpect(status().isBadRequest());

        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolClassRepository.findAll().size();
        // set the field null
        schoolClass.setName(null);

        // Create the SchoolClass, which fails.

        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClass)))
            .andExpect(status().isBadRequest());

        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    @WithMockUser
    public void getAllSchoolClasses() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);

        // Get all the schoolClassList
        restSchoolClassMockMvc.perform(get("/api/school-classes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schoolClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }


    @Test
    @Transactional
    @WithMockUser
    public void getSchoolClass() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);

        // Get the schoolClass
        restSchoolClassMockMvc.perform(get("/api/school-classes/{id}", schoolClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schoolClass.getId().intValue()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    @WithMockUser
    public void getNonExistingSchoolClass() throws Exception {
        // Get the schoolClass
        restSchoolClassMockMvc.perform(get("/api/school-classes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithMockUser
    public void updateSchoolClass() throws Exception {
        // Initialize the database
        schoolClassService.save(schoolClass);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockSchoolClassSearchRepository);

        int databaseSizeBeforeUpdate = schoolClassRepository.findAll().size();

        // Update the schoolClass
        SchoolClass updatedSchoolClass = schoolClassRepository.findById(schoolClass.getId()).get();
        // Disconnect from session so that the updates on updatedSchoolClass are not directly saved in db
        em.detach(updatedSchoolClass);
        updatedSchoolClass
            .start(UPDATED_START)
            .end(UPDATED_END)
            .active(UPDATED_ACTIVE)
            .name(UPDATED_NAME);

        restSchoolClassMockMvc.perform(put("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSchoolClass)))
            .andExpect(status().isOk());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeUpdate);
        SchoolClass testSchoolClass = schoolClassList.get(schoolClassList.size() - 1);
        assertThat(testSchoolClass.getStart()).isEqualTo(UPDATED_START);
        assertThat(testSchoolClass.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testSchoolClass.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testSchoolClass.getName()).isEqualTo(UPDATED_NAME);

        // Validate the SchoolClass in Elasticsearch
        verify(mockSchoolClassSearchRepository, times(1)).save(testSchoolClass);
    }

    @Test
    @Transactional
    @WithMockUser
    public void updateNonExistingSchoolClass() throws Exception {
        int databaseSizeBeforeUpdate = schoolClassRepository.findAll().size();

        // Create the SchoolClass

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSchoolClassMockMvc.perform(put("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClass)))
            .andExpect(status().isBadRequest());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeUpdate);

        // Validate the SchoolClass in Elasticsearch
        verify(mockSchoolClassSearchRepository, times(0)).save(schoolClass);
    }

    @Test
    @Transactional
    @WithMockUser
    public void deleteSchoolClass() throws Exception {
        // Initialize the database
        schoolClassService.save(schoolClass);

        int databaseSizeBeforeDelete = schoolClassRepository.findAll().size();

        // Get the schoolClass
        restSchoolClassMockMvc.perform(delete("/api/school-classes/{id}", schoolClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the SchoolClass in Elasticsearch
        verify(mockSchoolClassSearchRepository, times(1)).deleteById(schoolClass.getId());
    }

    @Test
    @Transactional
    @WithMockUser
    public void searchSchoolClass() throws Exception {
        // Initialize the database
        schoolClassService.save(schoolClass);
        when(mockSchoolClassSearchRepository.search(queryStringQuery("id:" + schoolClass.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(schoolClass), PageRequest.of(0, 1), 1));
        // Search the schoolClass
        restSchoolClassMockMvc.perform(get("/api/_search/school-classes?query=id:" + schoolClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schoolClass.getId().intValue())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolClass.class);
        SchoolClass schoolClass1 = new SchoolClass();
        schoolClass1.setId(1L);
        SchoolClass schoolClass2 = new SchoolClass();
        schoolClass2.setId(schoolClass1.getId());
        assertThat(schoolClass1).isEqualTo(schoolClass2);
        schoolClass2.setId(2L);
        assertThat(schoolClass1).isNotEqualTo(schoolClass2);
        schoolClass1.setId(null);
        assertThat(schoolClass1).isNotEqualTo(schoolClass2);
    }
}
