package de.wiss3n.webapp.web.rest;

import de.wiss3n.webapp.Wiss3nApp;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.SchoolClassRepository;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.service.SchoolClassService;
import de.wiss3n.webapp.service.dto.SchoolClassDTO;
import de.wiss3n.webapp.service.mapper.SchoolClassMapper;
import de.wiss3n.webapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
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
import java.util.List;

import static de.wiss3n.webapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SchoolClassResource REST controller.
 *
 * @see SchoolClassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Wiss3nApp.class)
public class SchoolClassResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SchoolClassRepository schoolClassRepository;

    @Autowired
    private SchoolClassMapper schoolClassMapper;

    @Autowired
    private SchoolClassService schoolClassService;

    @Autowired
    private UserRepository userRepository;

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
            .date(DEFAULT_DATE)
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
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);
        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isCreated());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeCreate + 1);
        SchoolClass testSchoolClass = schoolClassList.get(schoolClassList.size() - 1);
        assertThat(testSchoolClass.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSchoolClass.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createSchoolClassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = schoolClassRepository.findAll().size();

        // Create the SchoolClass with an existing ID
        schoolClass.setId(1L);
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = schoolClassRepository.findAll().size();
        // set the field null
        schoolClass.setDate(null);

        // Create the SchoolClass, which fails.
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);

        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
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
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);

        restSchoolClassMockMvc.perform(post("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
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
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getSchoolClass() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);

        // Get the schoolClass
        restSchoolClassMockMvc.perform(get("/api/school-classes/{id}", schoolClass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(schoolClass.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
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
        schoolClassRepository.saveAndFlush(schoolClass);
        int databaseSizeBeforeUpdate = schoolClassRepository.findAll().size();

        // Update the schoolClass
        SchoolClass updatedSchoolClass = schoolClassRepository.findOne(schoolClass.getId());
        // Disconnect from session so that the updates on updatedSchoolClass are not directly saved in db
        em.detach(updatedSchoolClass);
        updatedSchoolClass
            .date(UPDATED_DATE)
            .name(UPDATED_NAME);
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(updatedSchoolClass);

        restSchoolClassMockMvc.perform(put("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isOk());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeUpdate);
        SchoolClass testSchoolClass = schoolClassList.get(schoolClassList.size() - 1);
        assertThat(testSchoolClass.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSchoolClass.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    @WithMockUser
    public void updateNonExistingSchoolClass() throws Exception {
        int databaseSizeBeforeUpdate = schoolClassRepository.findAll().size();

        // Create the SchoolClass
        SchoolClassDTO schoolClassDTO = schoolClassMapper.toDto(schoolClass);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSchoolClassMockMvc.perform(put("/api/school-classes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(schoolClassDTO)))
            .andExpect(status().isCreated());

        // Validate the SchoolClass in the database
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSchoolClass() throws Exception {
        // Initialize the database
        schoolClassRepository.saveAndFlush(schoolClass);
        int databaseSizeBeforeDelete = schoolClassRepository.findAll().size();

        // Get the schoolClass
        restSchoolClassMockMvc.perform(delete("/api/school-classes/{id}", schoolClass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SchoolClass> schoolClassList = schoolClassRepository.findAll();
        assertThat(schoolClassList).hasSize(databaseSizeBeforeDelete - 1);
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

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SchoolClassDTO.class);
        SchoolClassDTO schoolClassDTO1 = new SchoolClassDTO();
        schoolClassDTO1.setId(1L);
        SchoolClassDTO schoolClassDTO2 = new SchoolClassDTO();
        assertThat(schoolClassDTO1).isNotEqualTo(schoolClassDTO2);
        schoolClassDTO2.setId(schoolClassDTO1.getId());
        assertThat(schoolClassDTO1).isEqualTo(schoolClassDTO2);
        schoolClassDTO2.setId(2L);
        assertThat(schoolClassDTO1).isNotEqualTo(schoolClassDTO2);
        schoolClassDTO1.setId(null);
        assertThat(schoolClassDTO1).isNotEqualTo(schoolClassDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(schoolClassMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(schoolClassMapper.fromId(null)).isNull();
    }
}
