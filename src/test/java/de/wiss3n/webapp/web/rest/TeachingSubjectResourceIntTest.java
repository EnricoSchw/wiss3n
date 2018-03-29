package de.wiss3n.webapp.web.rest;

import de.wiss3n.webapp.Wiss3nApp;

import de.wiss3n.webapp.domain.TeachingSubject;
import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.TeachingSubjectRepository;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.service.TeachingSubjectService;
import de.wiss3n.webapp.service.dto.TeachingSubjectDTO;
import de.wiss3n.webapp.service.mapper.TeachingSubjectMapper;
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
 * Test class for the TeachingSubjectResource REST controller.
 *
 * @see TeachingSubjectResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Wiss3nApp.class)
public class TeachingSubjectResourceIntTest {

    private static final LocalDate DEFAULT_YEAR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_YEAR = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_GRADE = 1;
    private static final Integer UPDATED_GRADE = 2;

    @Autowired
    private TeachingSubjectRepository teachingSubjectRepository;

    @Autowired
    private TeachingSubjectMapper teachingSubjectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeachingSubjectService teachingSubjectService;

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
            .year(DEFAULT_YEAR)
            .name(DEFAULT_NAME)
            .grade(DEFAULT_GRADE);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        teachingSubject.setUser(user);
        return teachingSubject;
    }

    @Before
    public void initTest() {
        teachingSubject = teachingSubject = new TeachingSubject()
            .year(DEFAULT_YEAR)
            .name(DEFAULT_NAME)
            .grade(DEFAULT_GRADE)
            .user(userRepository.findOneByLogin("user").get());
    }

    @Test
    @Transactional
    @WithMockUser
    public void createTeachingSubject() throws Exception {
        int databaseSizeBeforeCreate = teachingSubjectRepository.findAll().size();

        // Create the TeachingSubject
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectMapper.toDto(teachingSubject);
        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubjectDTO)))
            .andExpect(status().isCreated());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeCreate + 1);
        TeachingSubject testTeachingSubject = teachingSubjectList.get(teachingSubjectList.size() - 1);
        assertThat(testTeachingSubject.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testTeachingSubject.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTeachingSubject.getGrade()).isEqualTo(DEFAULT_GRADE);
    }

    @Test
    @Transactional
    public void createTeachingSubjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teachingSubjectRepository.findAll().size();

        // Create the TeachingSubject with an existing ID
        teachingSubject.setId(1L);
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectMapper.toDto(teachingSubject);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkYearIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingSubjectRepository.findAll().size();
        // set the field null
        teachingSubject.setYear(null);

        // Create the TeachingSubject, which fails.
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectMapper.toDto(teachingSubject);

        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubjectDTO)))
            .andExpect(status().isBadRequest());

        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingSubjectRepository.findAll().size();
        // set the field null
        teachingSubject.setName(null);

        // Create the TeachingSubject, which fails.
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectMapper.toDto(teachingSubject);

        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubjectDTO)))
            .andExpect(status().isBadRequest());

        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGradeIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingSubjectRepository.findAll().size();
        // set the field null
        teachingSubject.setGrade(null);

        // Create the TeachingSubject, which fails.
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectMapper.toDto(teachingSubject);

        restTeachingSubjectMockMvc.perform(post("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubjectDTO)))
            .andExpect(status().isBadRequest());

        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    @WithMockUser
    public void getAllTeachingSubjects() throws Exception {
        // Initialize the database
        teachingSubjectRepository.saveAndFlush(teachingSubject);

        // Get all the teachingSubjectList
        restTeachingSubjectMockMvc.perform(get("/api/teaching-subjects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachingSubject.getId().intValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].grade").value(hasItem(DEFAULT_GRADE)));
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
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.grade").value(DEFAULT_GRADE));
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
    @WithMockUser
    public void updateTeachingSubject() throws Exception {
        // Initialize the database
        teachingSubjectRepository.saveAndFlush(teachingSubject);
        int databaseSizeBeforeUpdate = teachingSubjectRepository.findAll().size();

        // Update the teachingSubject
        TeachingSubject updatedTeachingSubject = teachingSubjectRepository.findOne(teachingSubject.getId());
        // Disconnect from session so that the updates on updatedTeachingSubject are not directly saved in db
        em.detach(updatedTeachingSubject);
        updatedTeachingSubject
            .year(UPDATED_YEAR)
            .name(UPDATED_NAME)
            .grade(UPDATED_GRADE);
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectMapper.toDto(updatedTeachingSubject);

        restTeachingSubjectMockMvc.perform(put("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubjectDTO)))
            .andExpect(status().isOk());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeUpdate);
        TeachingSubject testTeachingSubject = teachingSubjectList.get(teachingSubjectList.size() - 1);
        assertThat(testTeachingSubject.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testTeachingSubject.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTeachingSubject.getGrade()).isEqualTo(UPDATED_GRADE);
    }

    @Test
    @Transactional
    @WithMockUser
    public void updateNonExistingTeachingSubject() throws Exception {
        int databaseSizeBeforeUpdate = teachingSubjectRepository.findAll().size();

        // Create the TeachingSubject
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectMapper.toDto(teachingSubject);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTeachingSubjectMockMvc.perform(put("/api/teaching-subjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingSubjectDTO)))
            .andExpect(status().isCreated());

        // Validate the TeachingSubject in the database
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTeachingSubject() throws Exception {
        // Initialize the database
        teachingSubjectRepository.saveAndFlush(teachingSubject);
        int databaseSizeBeforeDelete = teachingSubjectRepository.findAll().size();

        // Get the teachingSubject
        restTeachingSubjectMockMvc.perform(delete("/api/teaching-subjects/{id}", teachingSubject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TeachingSubject> teachingSubjectList = teachingSubjectRepository.findAll();
        assertThat(teachingSubjectList).hasSize(databaseSizeBeforeDelete - 1);
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

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeachingSubjectDTO.class);
        TeachingSubjectDTO teachingSubjectDTO1 = new TeachingSubjectDTO();
        teachingSubjectDTO1.setId(1L);
        TeachingSubjectDTO teachingSubjectDTO2 = new TeachingSubjectDTO();
        assertThat(teachingSubjectDTO1).isNotEqualTo(teachingSubjectDTO2);
        teachingSubjectDTO2.setId(teachingSubjectDTO1.getId());
        assertThat(teachingSubjectDTO1).isEqualTo(teachingSubjectDTO2);
        teachingSubjectDTO2.setId(2L);
        assertThat(teachingSubjectDTO1).isNotEqualTo(teachingSubjectDTO2);
        teachingSubjectDTO1.setId(null);
        assertThat(teachingSubjectDTO1).isNotEqualTo(teachingSubjectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(teachingSubjectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(teachingSubjectMapper.fromId(null)).isNull();
    }
}
