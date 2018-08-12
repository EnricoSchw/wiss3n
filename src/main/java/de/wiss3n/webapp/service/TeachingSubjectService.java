package de.wiss3n.webapp.service;

import de.wiss3n.webapp.domain.TeachingSubject;
import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.TeachingSubjectRepository;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.repository.search.TeachingSubjectSearchRepository;
import de.wiss3n.webapp.security.SecurityUtils;
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

    private final UserRepository userRepository;

    private final SchoolClassService schoolClassService;

    public TeachingSubjectService(
        TeachingSubjectRepository teachingSubjectRepository,
        TeachingSubjectSearchRepository teachingSubjectSearchRepository,
        SchoolClassService schoolClassService,
        UserRepository userRepository
    ) {
        this.teachingSubjectRepository = teachingSubjectRepository;
        this.teachingSubjectSearchRepository = teachingSubjectSearchRepository;
        this.schoolClassService = schoolClassService;
        this.userRepository = userRepository;
    }

    /**
     * Save a teachingSubject.
     *
     * @param teachingSubject the entity to save
     * @return the persisted entity
     */
    public TeachingSubject save(TeachingSubject teachingSubject) {
        log.debug("Request to save TeachingSubject : {}", teachingSubject);
        if (schoolClassService.isMySchoolClass(teachingSubject.getSchoolClass().getId())) {
            return SecurityUtils.getCurrentUserLogin()
                .flatMap(userRepository::findOneByLogin)
                .map((User user) -> {
                    teachingSubject.setUser(user);
                    return teachingSubject;
                })
                .map(teachingSubjectRepository::save)
                .map((result) -> {
                    teachingSubjectSearchRepository.save(result);
                    return result;
                })
                .orElseThrow(IllegalArgumentException::new);
        } else {
            log.debug("Request not allowed to save TeachingSubject : {}", teachingSubject);
            throw new IllegalArgumentException();
        }
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
        return teachingSubjectRepository.findByUserIsCurrentUser(pageable);
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
        return teachingSubjectRepository.findOneByIdAndByUserIsCurrentUser(id);
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

    @Transactional(readOnly = true)
    public Page<TeachingSubject> searchBySchoolClass(Long schoolClassId, Pageable pageable) {
        log.debug("Request to search for a page of TeachingSubject for schoolClass id {}", schoolClassId);
        return SecurityUtils.getCurrentUserLogin()
            .map((String login) -> teachingSubjectSearchRepository.findAllBySchoolClass(schoolClassId, login, pageable))
            .orElse(null);
    }

    public boolean isMyTeachingSubject(Long id) {
        return teachingSubjectRepository.existsByIdAndByUserIsCurrentUser(id);
    }
}
