package de.wiss3n.webapp.service;

import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.domain.TeachingHour;
import de.wiss3n.webapp.repository.TeachingHourRepository;
import de.wiss3n.webapp.repository.search.TeachingHourSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.text.DateFormatSymbols;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing TeachingHour.
 */
@Service
@Transactional
public class TeachingHourService {

    private final Logger log = LoggerFactory.getLogger(TeachingHourService.class);

    private final TeachingHourRepository teachingHourRepository;

    private final TeachingHourSearchRepository teachingHourSearchRepository;

    public TeachingHourService(TeachingHourRepository teachingHourRepository, TeachingHourSearchRepository teachingHourSearchRepository) {
        this.teachingHourRepository = teachingHourRepository;
        this.teachingHourSearchRepository = teachingHourSearchRepository;
    }

    /**
     * Save a teachingHour.
     *
     * @param teachingHour the entity to save
     * @return the persisted entity
     */
    public TeachingHour save(TeachingHour teachingHour) {
        log.debug("Request to save TeachingHour : {}", teachingHour);
        TeachingHour result = teachingHourRepository.save(teachingHour);
        teachingHourSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the teachingHours.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TeachingHour> findAll(Pageable pageable) {
        log.debug("Request to get all TeachingHours");
        return teachingHourRepository.findAll(pageable);
    }


    /**
     * Get one teachingHour by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<TeachingHour> findOne(Long id) {
        log.debug("Request to get TeachingHour : {}", id);
        return teachingHourRepository.findById(id);
    }

    /**
     * Delete the teachingHour by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TeachingHour : {}", id);
        teachingHourRepository.deleteById(id);
        teachingHourSearchRepository.deleteById(id);
    }

    /**
     * Search for the teachingHour corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TeachingHour> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of TeachingHours for query {}", query);
        return teachingHourSearchRepository.search(queryStringQuery(query), pageable);    }

    @Transactional()
    public List<TeachingHour> createTeachingHour(SchoolClass schoolClass) {
        List list = new ArrayList<String>();
        String[] weekdays = { "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"};

        for(int weekday= 1; weekday <= 5; weekday++) {
            for(int hour= 1; hour <= 10; hour++) {
                TeachingHour teachingHour = new TeachingHour();
                teachingHour.setName(weekdays[weekday - 1] + ", " + hour + ". Stunde");
                teachingHour.setHour(hour);
                teachingHour.setWeekday(weekday);
                teachingHour.setSchoolClass(schoolClass);
                TeachingHour result = this.save(teachingHour);
                list.add(result);
            }
        }

        return list;
    }

}
