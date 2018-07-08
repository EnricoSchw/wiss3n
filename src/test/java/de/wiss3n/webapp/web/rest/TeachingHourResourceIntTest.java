package de.wiss3n.webapp.web.rest;

import de.wiss3n.webapp.Wiss3NApp;

import de.wiss3n.webapp.domain.TeachingHour;
import de.wiss3n.webapp.repository.TeachingHourRepository;
import de.wiss3n.webapp.repository.search.TeachingHourSearchRepository;
import de.wiss3n.webapp.service.TeachingHourService;
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

/**
 * Test class for the TeachingHourResource REST controller.
 *
 * @see TeachingHourResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Wiss3NApp.class)
public class TeachingHourResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_WEEKDAY = 1;
    private static final Integer UPDATED_WEEKDAY = 2;

    private static final Integer DEFAULT_HOUR = 1;
    private static final Integer UPDATED_HOUR = 2;

    @Autowired
    private TeachingHourRepository teachingHourRepository;

    

    @Autowired
    private TeachingHourService teachingHourService;

    /**
     * This repository is mocked in the de.wiss3n.webapp.repository.search test package.
     *
     * @see de.wiss3n.webapp.repository.search.TeachingHourSearchRepositoryMockConfiguration
     */
    @Autowired
    private TeachingHourSearchRepository mockTeachingHourSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTeachingHourMockMvc;

    private TeachingHour teachingHour;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeachingHourResource teachingHourResource = new TeachingHourResource(teachingHourService);
        this.restTeachingHourMockMvc = MockMvcBuilders.standaloneSetup(teachingHourResource)
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
    public static TeachingHour createEntity(EntityManager em) {
        TeachingHour teachingHour = new TeachingHour()
            .name(DEFAULT_NAME)
            .weekday(DEFAULT_WEEKDAY)
            .hour(DEFAULT_HOUR);
        return teachingHour;
    }

    @Before
    public void initTest() {
        teachingHour = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeachingHour() throws Exception {
        int databaseSizeBeforeCreate = teachingHourRepository.findAll().size();

        // Create the TeachingHour
        restTeachingHourMockMvc.perform(post("/api/teaching-hours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingHour)))
            .andExpect(status().isCreated());

        // Validate the TeachingHour in the database
        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeCreate + 1);
        TeachingHour testTeachingHour = teachingHourList.get(teachingHourList.size() - 1);
        assertThat(testTeachingHour.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTeachingHour.getWeekday()).isEqualTo(DEFAULT_WEEKDAY);
        assertThat(testTeachingHour.getHour()).isEqualTo(DEFAULT_HOUR);

        // Validate the TeachingHour in Elasticsearch
        verify(mockTeachingHourSearchRepository, times(1)).save(testTeachingHour);
    }

    @Test
    @Transactional
    public void createTeachingHourWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teachingHourRepository.findAll().size();

        // Create the TeachingHour with an existing ID
        teachingHour.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeachingHourMockMvc.perform(post("/api/teaching-hours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingHour)))
            .andExpect(status().isBadRequest());

        // Validate the TeachingHour in the database
        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeCreate);

        // Validate the TeachingHour in Elasticsearch
        verify(mockTeachingHourSearchRepository, times(0)).save(teachingHour);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingHourRepository.findAll().size();
        // set the field null
        teachingHour.setName(null);

        // Create the TeachingHour, which fails.

        restTeachingHourMockMvc.perform(post("/api/teaching-hours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingHour)))
            .andExpect(status().isBadRequest());

        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWeekdayIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingHourRepository.findAll().size();
        // set the field null
        teachingHour.setWeekday(null);

        // Create the TeachingHour, which fails.

        restTeachingHourMockMvc.perform(post("/api/teaching-hours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingHour)))
            .andExpect(status().isBadRequest());

        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHourIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachingHourRepository.findAll().size();
        // set the field null
        teachingHour.setHour(null);

        // Create the TeachingHour, which fails.

        restTeachingHourMockMvc.perform(post("/api/teaching-hours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingHour)))
            .andExpect(status().isBadRequest());

        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTeachingHours() throws Exception {
        // Initialize the database
        teachingHourRepository.saveAndFlush(teachingHour);

        // Get all the teachingHourList
        restTeachingHourMockMvc.perform(get("/api/teaching-hours?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachingHour.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].weekday").value(hasItem(DEFAULT_WEEKDAY)))
            .andExpect(jsonPath("$.[*].hour").value(hasItem(DEFAULT_HOUR)));
    }
    

    @Test
    @Transactional
    public void getTeachingHour() throws Exception {
        // Initialize the database
        teachingHourRepository.saveAndFlush(teachingHour);

        // Get the teachingHour
        restTeachingHourMockMvc.perform(get("/api/teaching-hours/{id}", teachingHour.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teachingHour.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.weekday").value(DEFAULT_WEEKDAY))
            .andExpect(jsonPath("$.hour").value(DEFAULT_HOUR));
    }
    @Test
    @Transactional
    public void getNonExistingTeachingHour() throws Exception {
        // Get the teachingHour
        restTeachingHourMockMvc.perform(get("/api/teaching-hours/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeachingHour() throws Exception {
        // Initialize the database
        teachingHourService.save(teachingHour);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockTeachingHourSearchRepository);

        int databaseSizeBeforeUpdate = teachingHourRepository.findAll().size();

        // Update the teachingHour
        TeachingHour updatedTeachingHour = teachingHourRepository.findById(teachingHour.getId()).get();
        // Disconnect from session so that the updates on updatedTeachingHour are not directly saved in db
        em.detach(updatedTeachingHour);
        updatedTeachingHour
            .name(UPDATED_NAME)
            .weekday(UPDATED_WEEKDAY)
            .hour(UPDATED_HOUR);

        restTeachingHourMockMvc.perform(put("/api/teaching-hours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeachingHour)))
            .andExpect(status().isOk());

        // Validate the TeachingHour in the database
        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeUpdate);
        TeachingHour testTeachingHour = teachingHourList.get(teachingHourList.size() - 1);
        assertThat(testTeachingHour.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTeachingHour.getWeekday()).isEqualTo(UPDATED_WEEKDAY);
        assertThat(testTeachingHour.getHour()).isEqualTo(UPDATED_HOUR);

        // Validate the TeachingHour in Elasticsearch
        verify(mockTeachingHourSearchRepository, times(1)).save(testTeachingHour);
    }

    @Test
    @Transactional
    public void updateNonExistingTeachingHour() throws Exception {
        int databaseSizeBeforeUpdate = teachingHourRepository.findAll().size();

        // Create the TeachingHour

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTeachingHourMockMvc.perform(put("/api/teaching-hours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachingHour)))
            .andExpect(status().isBadRequest());

        // Validate the TeachingHour in the database
        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TeachingHour in Elasticsearch
        verify(mockTeachingHourSearchRepository, times(0)).save(teachingHour);
    }

    @Test
    @Transactional
    public void deleteTeachingHour() throws Exception {
        // Initialize the database
        teachingHourService.save(teachingHour);

        int databaseSizeBeforeDelete = teachingHourRepository.findAll().size();

        // Get the teachingHour
        restTeachingHourMockMvc.perform(delete("/api/teaching-hours/{id}", teachingHour.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TeachingHour> teachingHourList = teachingHourRepository.findAll();
        assertThat(teachingHourList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TeachingHour in Elasticsearch
        verify(mockTeachingHourSearchRepository, times(1)).deleteById(teachingHour.getId());
    }

    @Test
    @Transactional
    public void searchTeachingHour() throws Exception {
        // Initialize the database
        teachingHourService.save(teachingHour);
        when(mockTeachingHourSearchRepository.search(queryStringQuery("id:" + teachingHour.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(teachingHour), PageRequest.of(0, 1), 1));
        // Search the teachingHour
        restTeachingHourMockMvc.perform(get("/api/_search/teaching-hours?query=id:" + teachingHour.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachingHour.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].weekday").value(hasItem(DEFAULT_WEEKDAY)))
            .andExpect(jsonPath("$.[*].hour").value(hasItem(DEFAULT_HOUR)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeachingHour.class);
        TeachingHour teachingHour1 = new TeachingHour();
        teachingHour1.setId(1L);
        TeachingHour teachingHour2 = new TeachingHour();
        teachingHour2.setId(teachingHour1.getId());
        assertThat(teachingHour1).isEqualTo(teachingHour2);
        teachingHour2.setId(2L);
        assertThat(teachingHour1).isNotEqualTo(teachingHour2);
        teachingHour1.setId(null);
        assertThat(teachingHour1).isNotEqualTo(teachingHour2);
    }
}
