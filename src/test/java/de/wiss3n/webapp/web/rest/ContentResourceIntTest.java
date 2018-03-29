package de.wiss3n.webapp.web.rest;

import de.wiss3n.webapp.Wiss3nApp;

import de.wiss3n.webapp.domain.Content;
import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.ContentRepository;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.service.ContentService;
import de.wiss3n.webapp.service.dto.ContentDTO;
import de.wiss3n.webapp.service.mapper.ContentMapper;
import de.wiss3n.webapp.web.rest.errors.ExceptionTranslator;

import org.assertj.core.api.Assertions;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ContentResource REST controller.
 *
 * @see ContentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Wiss3nApp.class)
public class ContentResourceIntTest {

    private static final String DEFAULT_TITEL = "AAAAAAAAAA";
    private static final String UPDATED_TITEL = "BBBBBBBBBB";

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private ContentMapper contentMapper;

    @Autowired
    private ContentService contentService;

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

    private MockMvc restContentMockMvc;

    private Content content;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContentResource contentResource = new ContentResource(contentService);
        this.restContentMockMvc = MockMvcBuilders.standaloneSetup(contentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(TestUtil.createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Content createEntity(EntityManager em) {
        Content content = new Content()
            .titel(DEFAULT_TITEL)
            .text(DEFAULT_TEXT);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        content.setUser(user);
        return content;
    }

    @Before
    public void initTest() {
        content = createEntity(em);
        content.user(userRepository.findOneByLogin("user").get());
    }

    @Test
    @Transactional
    @WithMockUser
    public void createContent() throws Exception {
        int databaseSizeBeforeCreate = contentRepository.findAll().size();

        // Create the Content
        ContentDTO contentDTO = contentMapper.toDto(content);
        restContentMockMvc.perform(post("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isCreated());

        // Validate the Content in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeCreate + 1);
        Content testContent = contentList.get(contentList.size() - 1);
        assertThat(testContent.getTitel()).isEqualTo(DEFAULT_TITEL);
        assertThat(testContent.getText()).isEqualTo(DEFAULT_TEXT);
    }

    @Test
    @Transactional
    public void createContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contentRepository.findAll().size();

        // Create the Content with an existing ID
        content.setId(1L);
        ContentDTO contentDTO = contentMapper.toDto(content);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContentMockMvc.perform(post("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Content in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitelIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentRepository.findAll().size();
        // set the field null
        content.setTitel(null);

        // Create the Content, which fails.
        ContentDTO contentDTO = contentMapper.toDto(content);

        restContentMockMvc.perform(post("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isBadRequest());

        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    @WithMockUser
    public void getAllContents() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);

        // Get all the contentList
        restContentMockMvc.perform(get("/api/contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(content.getId().intValue())))
            .andExpect(jsonPath("$.[*].titel").value(hasItem(DEFAULT_TITEL.toString())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())));
    }

    @Test
    @Transactional
    public void getContent() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);

        // Get the content
        restContentMockMvc.perform(get("/api/contents/{id}", content.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(content.getId().intValue()))
            .andExpect(jsonPath("$.titel").value(DEFAULT_TITEL.toString()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContent() throws Exception {
        // Get the content
        restContentMockMvc.perform(get("/api/contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    @WithMockUser
    public void updateContent() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);
        int databaseSizeBeforeUpdate = contentRepository.findAll().size();

        // Update the content
        Content updatedContent = contentRepository.findOne(content.getId());
        // Disconnect from session so that the updates on updatedContent are not directly saved in db
        em.detach(updatedContent);
        updatedContent
            .titel(UPDATED_TITEL)
            .text(UPDATED_TEXT);
        ContentDTO contentDTO = contentMapper.toDto(updatedContent);

        restContentMockMvc.perform(put("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isOk());

        // Validate the Content in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeUpdate);
        Content testContent = contentList.get(contentList.size() - 1);
        assertThat(testContent.getTitel()).isEqualTo(UPDATED_TITEL);
        assertThat(testContent.getText()).isEqualTo(UPDATED_TEXT);
    }

    @Test
    @Transactional
    @WithMockUser
    public void updateNonExistingContent() throws Exception {
        int databaseSizeBeforeUpdate = contentRepository.findAll().size();

        // Create the Content
        ContentDTO contentDTO = contentMapper.toDto(content);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContentMockMvc.perform(put("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isCreated());

        // Validate the Content in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContent() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);
        int databaseSizeBeforeDelete = contentRepository.findAll().size();

        // Get the content
        restContentMockMvc.perform(delete("/api/contents/{id}", content.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Content.class);
        Content content1 = new Content();
        content1.setId(1L);
        Content content2 = new Content();
        content2.setId(content1.getId());
        assertThat(content1).isEqualTo(content2);
        content2.setId(2L);
        assertThat(content1).isNotEqualTo(content2);
        content1.setId(null);
        assertThat(content1).isNotEqualTo(content2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContentDTO.class);
        ContentDTO contentDTO1 = new ContentDTO();
        contentDTO1.setId(1L);
        ContentDTO contentDTO2 = new ContentDTO();
        assertThat(contentDTO1).isNotEqualTo(contentDTO2);
        contentDTO2.setId(contentDTO1.getId());
        assertThat(contentDTO1).isEqualTo(contentDTO2);
        contentDTO2.setId(2L);
        assertThat(contentDTO1).isNotEqualTo(contentDTO2);
        contentDTO1.setId(null);
        assertThat(contentDTO1).isNotEqualTo(contentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        Assertions.assertThat(contentMapper.fromId(42L).getId()).isEqualTo(42);
        Assertions.assertThat(contentMapper.fromId(null)).isNull();
    }
}
