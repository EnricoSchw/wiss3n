package de.wiss3n.webapp.service;

import de.wiss3n.webapp.domain.TeachingSubject;
import de.wiss3n.webapp.repository.TeachingSubjectRepository;
import de.wiss3n.webapp.repository.search.TeachingSubjectSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TeachingSubject.
 */
@Service
@Transactional
public class TeachingSubjectService {

    private final Logger log = LoggerFactory.getLogger(TeachingSubjectService.class);

    private final TeachingSubjectRepository teachingSubjectRepository;

    private final TeachingSubjectSearchRepository teachingSubjectSearchRepository;

    public TeachingSubjectService(TeachingSubjectRepository teachingSubjectRepository, TeachingSubjectSearchRepository teachingSubjectSearchRepository) {
        this.teachingSubjectRepository = teachingSubjectRepository;
        this.teachingSubjectSearchRepository = teachingSubjectSearchRepository;
    }

    /**
     * Save a teachingSubject.
     *
     * @param teachingSubject the entity to save
     * @return the persisted entity
     */
    public TeachingSubject save(TeachingSubject teachingSubject) {
        log.debug("Request to save TeachingSubject : {}", teachingSubject);        TeachingSubject result = teachingSubjectRepository.save(teachingSubject);
        teachingSubjectSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the teachingSubjects.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TeachingSubject> findAll(Pageable pageable) {
        log.debug("Request to get all TeachingSubjects");
        return teachingSubjectRepository.findAll(pageable);
    }


    /**
     * Get one teachingSubject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TeachingSubject> findOne(Long id) {
        log.debug("Request to get TeachingSubject : {}", id);
        return teachingSubjectRepository.findById(id);
    }

    /**
     * Delete the teachingSubject by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TeachingSubject : {}", id);
        teachingSubjectRepository.deleteById(id);
        teachingSubjectSearchRepository.deleteById(id);
    }

    /**
     * Search for the teachingSubject corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TeachingSubject> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TeachingSubjects for query {}", query);
        return teachingSubjectSearchRepository.search(queryStringQuery(query), pageable);    }
}
