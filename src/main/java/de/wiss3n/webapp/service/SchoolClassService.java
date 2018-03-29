package de.wiss3n.webapp.service;

import de.wiss3n.webapp.service.dto.SchoolClassDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing SchoolClass.
 */
public interface SchoolClassService {

    /**
     * Save a schoolClass.
     *
     * @param schoolClassDTO the entity to save
     * @return the persisted entity
     */
    SchoolClassDTO save(SchoolClassDTO schoolClassDTO);

    /**
     * Get all the schoolClasses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SchoolClassDTO> findAll(Pageable pageable);

    /**
     * Get the "id" schoolClass.
     *
     * @param id the id of the entity
     * @return the entity
     */
    SchoolClassDTO findOne(Long id);

    /**
     * Delete the "id" schoolClass.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
