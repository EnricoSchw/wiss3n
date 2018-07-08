package de.wiss3n.webapp.service;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.repository.SchoolClassRepository;
import de.wiss3n.webapp.repository.search.SchoolClassSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing SchoolClass.
 */
@Service
@Transactional
public class SchoolClassService {

    private final Logger log = LoggerFactory.getLogger(SchoolClassService.class);

    private final SchoolClassRepository schoolClassRepository;

    private final SchoolClassSearchRepository schoolClassSearchRepository;

    public SchoolClassService(SchoolClassRepository schoolClassRepository, SchoolClassSearchRepository schoolClassSearchRepository) {
        this.schoolClassRepository = schoolClassRepository;
        this.schoolClassSearchRepository = schoolClassSearchRepository;
    }

    /**
     * Save a schoolClass.
     *
     * @param schoolClass the entity to save
     * @return the persisted entity
     */
    public SchoolClass save(SchoolClass schoolClass) {
        log.debug("Request to save SchoolClass : {}", schoolClass);        SchoolClass result = schoolClassRepository.save(schoolClass);
        schoolClassSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the schoolClasses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SchoolClass> findAll(Pageable pageable) {
        log.debug("Request to get all SchoolClasses");
        return schoolClassRepository.findAll(pageable);
    }


    /**
     * Get one schoolClass by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<SchoolClass> findOne(Long id) {
        log.debug("Request to get SchoolClass : {}", id);
        return schoolClassRepository.findById(id);
    }

    /**
     * Delete the schoolClass by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SchoolClass : {}", id);
        schoolClassRepository.deleteById(id);
        schoolClassSearchRepository.deleteById(id);
    }

    /**
     * Search for the schoolClass corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SchoolClass> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of SchoolClasses for query {}", query);
        return schoolClassSearchRepository.search(queryStringQuery(query), pageable);    }
}
