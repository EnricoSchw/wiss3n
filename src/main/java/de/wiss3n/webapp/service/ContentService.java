package de.wiss3n.webapp.service;

import de.wiss3n.webapp.domain.Content;
import de.wiss3n.webapp.repository.ContentRepository;
import de.wiss3n.webapp.repository.search.ContentSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Content.
 */
@Service
@Transactional
public class ContentService {

    private final Logger log = LoggerFactory.getLogger(ContentService.class);

    private final ContentRepository contentRepository;

    private final ContentSearchRepository contentSearchRepository;

    public ContentService(ContentRepository contentRepository, ContentSearchRepository contentSearchRepository) {
        this.contentRepository = contentRepository;
        this.contentSearchRepository = contentSearchRepository;
    }

    /**
     * Save a content.
     *
     * @param content the entity to save
     * @return the persisted entity
     */
    public Content save(Content content) {
        log.debug("Request to save Content : {}", content);        Content result = contentRepository.save(content);
        contentSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the contents.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Content> findAll(Pageable pageable) {
        log.debug("Request to get all Contents");
        return contentRepository.findAll(pageable);
    }


    /**
     * Get one content by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Content> findOne(Long id) {
        log.debug("Request to get Content : {}", id);
        return contentRepository.findById(id);
    }

    /**
     * Delete the content by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Content : {}", id);
        contentRepository.deleteById(id);
        contentSearchRepository.deleteById(id);
    }

    /**
     * Search for the content corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Content> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Contents for query {}", query);
        return contentSearchRepository.search(queryStringQuery(query), pageable);    }
}
