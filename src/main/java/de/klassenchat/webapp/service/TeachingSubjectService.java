package de.klassenchat.webapp.service;

import de.klassenchat.webapp.service.dto.TeachingSubjectDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing TeachingSubject.
 */
public interface TeachingSubjectService {

    /**
     * Save a teachingSubject.
     *
     * @param teachingSubjectDTO the entity to save
     * @return the persisted entity
     */
    TeachingSubjectDTO save(TeachingSubjectDTO teachingSubjectDTO);

    /**
     * Get all the teachingSubjects.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TeachingSubjectDTO> findAll(Pageable pageable);

    /**
     * Get the "id" teachingSubject.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TeachingSubjectDTO findOne(Long id);

    /**
     * Delete the "id" teachingSubject.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
