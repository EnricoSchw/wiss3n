package de.wiss3n.webapp.service;

import de.wiss3n.webapp.service.dto.ContentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Content.
 */
public interface ContentService {

    /**
     * Save a content.
     *
     * @param contentDTO the entity to save
     * @return the persisted entity
     */
    ContentDTO save(ContentDTO contentDTO);

    /**
     * Get all the contents.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ContentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" content.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ContentDTO findOne(Long id);

    /**
     * Delete the "id" content.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
