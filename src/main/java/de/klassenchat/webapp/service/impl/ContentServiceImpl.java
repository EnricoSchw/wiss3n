package de.klassenchat.webapp.service.impl;

import de.klassenchat.webapp.service.ContentService;
import de.klassenchat.webapp.domain.Content;
import de.klassenchat.webapp.repository.ContentRepository;
import de.klassenchat.webapp.service.dto.ContentDTO;
import de.klassenchat.webapp.service.mapper.ContentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Content.
 */
@Service
@Transactional
public class ContentServiceImpl implements ContentService {

    private final Logger log = LoggerFactory.getLogger(ContentServiceImpl.class);

    private final ContentRepository contentRepository;

    private final ContentMapper contentMapper;

    public ContentServiceImpl(ContentRepository contentRepository, ContentMapper contentMapper) {
        this.contentRepository = contentRepository;
        this.contentMapper = contentMapper;
    }

    /**
     * Save a content.
     *
     * @param contentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ContentDTO save(ContentDTO contentDTO) {
        log.debug("Request to save Content : {}", contentDTO);
        Content content = contentMapper.toEntity(contentDTO);
        content = contentRepository.save(content);
        return contentMapper.toDto(content);
    }

    /**
     * Get all the contents.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contents");
        return contentRepository.findAll(pageable)
            .map(contentMapper::toDto);
    }

    /**
     * Get one content by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ContentDTO findOne(Long id) {
        log.debug("Request to get Content : {}", id);
        Content content = contentRepository.findOneWithEagerRelationships(id);
        return contentMapper.toDto(content);
    }

    /**
     * Delete the content by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Content : {}", id);
        contentRepository.delete(id);
    }
}
