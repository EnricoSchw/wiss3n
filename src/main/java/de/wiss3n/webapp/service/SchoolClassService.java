package de.wiss3n.webapp.service;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.domain.TeachingHour;
import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.SchoolClassRepository;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.repository.search.SchoolClassSearchRepository;
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
 * Service Implementation for managing SchoolClass.
 */
@Service
@Transactional
public class SchoolClassService {

    private final Logger log = LoggerFactory.getLogger(SchoolClassService.class);

    private final SchoolClassRepository schoolClassRepository;

    private final SchoolClassSearchRepository schoolClassSearchRepository;

    private final TeachingHourService teachingHourService;

    private final UserRepository userRepository;

    public SchoolClassService(
        SchoolClassRepository schoolClassRepository,
        SchoolClassSearchRepository schoolClassSearchRepository,
        TeachingHourService teachingHourService,
        UserRepository userRepository
    ) {
        this.schoolClassRepository = schoolClassRepository;
        this.schoolClassSearchRepository = schoolClassSearchRepository;
        this.teachingHourService = teachingHourService;
        this.userRepository = userRepository;
    }

    /**
     * Save a schoolClass.
     *
     * @param schoolClass the entity to save
     * @return the persisted entity
     */
    public SchoolClass save(SchoolClass schoolClass) {
        log.debug("Request to save SchoolClass : {}", schoolClass);
        return this.saveInDB(schoolClass)
            .map(teachingHourService::createTeachingHour)
            .map((SchoolClass result) -> {
                schoolClassSearchRepository.save(result);
                return result;
            })
            .orElseThrow(IllegalArgumentException::new);
    }

    /**
     * update school class
     * @param schoolClass
     * @return
     */
    public SchoolClass update(SchoolClass schoolClass) {
        log.debug("Request to update SchoolClass : {}", schoolClass);
        return this.saveInDB(schoolClass)
            .map((SchoolClass result) -> {
                schoolClassSearchRepository.save(result);
                return result;
            })
            .orElseThrow(IllegalArgumentException::new);
    }

    /**
     * Save schoolClass in DB
     * @param schoolClass
     * @return
     */
    private Optional<SchoolClass> saveInDB(SchoolClass schoolClass) {
        return SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .map((User user) -> {
                schoolClass.setUser(user);
                return schoolClass;
            })
            .map(schoolClassRepository::save);
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
        return schoolClassRepository.findByUserIsCurrentUser(pageable);
    }

    /**
     * Get all active school classes
     *
     * @param pageable
     * @return
     */
    public Page<SchoolClass> findActive( Pageable pageable) {
        log.debug("Request to search for active SchoolClasses for user {}");
        return SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .map(User::getLogin)
            .map((String login) -> schoolClassRepository.findAllByUserIsCurrentUserAndActive(login, pageable))
            .map((Page<SchoolClass> page) -> page.map((SchoolClass schoolClass) -> {
                schoolClass.setTeachingHours(teachingHourService.findBySchoolClass(schoolClass));
                return schoolClass;
            }))
            .orElse(null);
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
        return schoolClassRepository.findOneByIdAndByUserIsCurrentUser(id);
    }

    /**
     * Delete the schoolClass by id.
     *
     * @param id the id of the entity
     */
    @Transactional
    public void delete(Long id) {
        log.debug("Request to delete SchoolClass : {}", id);
        Optional<SchoolClass> schoolClassOpt = schoolClassRepository.findOneByIdAndByUserIsCurrentUser(id);
        if (schoolClassOpt.isPresent()) {
            for (TeachingHour teachingHour : schoolClassOpt.get().getTeachingHours()) {
                this.teachingHourService.delete(teachingHour.getId());
            }
            schoolClassRepository.deleteById(id);
            schoolClassSearchRepository.deleteById(id);
        } else {
            log.debug("Request to delete SchoolClass : {} Not Found School Class", id);
        }
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


    public boolean isMySchoolClass(Long id) {
        return schoolClassRepository.existsByIdAndByUserIsCurrentUser(id);
    }
}
