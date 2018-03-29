package de.wiss3n.webapp.service;

import de.wiss3n.webapp.service.dto.GradeDTO;

import java.util.List;

/**
 * Service Interface for managing Grade.
 */
public interface GradeService {

    /**
     * Save a grade.
     *
     * @param gradeDTO the entity to save
     * @return the persisted entity
     */
    GradeDTO save(GradeDTO gradeDTO);

    /**
     * Get all the grades.
     *
     * @return the list of entities
     */
    List<GradeDTO> findAll();

    /**
     * Get the "id" grade.
     *
     * @param id the id of the entity
     * @return the entity
     */
    GradeDTO findOne(Long id);

    /**
     * Delete the "id" grade.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
