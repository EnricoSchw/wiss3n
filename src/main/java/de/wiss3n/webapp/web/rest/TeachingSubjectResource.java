package de.wiss3n.webapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.wiss3n.webapp.domain.TeachingHour;
import de.wiss3n.webapp.domain.TeachingSubject;
import de.wiss3n.webapp.service.TeachingSubjectService;
import de.wiss3n.webapp.web.rest.errors.BadRequestAlertException;
import de.wiss3n.webapp.web.rest.util.HeaderUtil;
import de.wiss3n.webapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing TeachingSubject.
 */
@RestController
@RequestMapping("/api")
public class TeachingSubjectResource {

    private final Logger log = LoggerFactory.getLogger(TeachingSubjectResource.class);

    private static final String ENTITY_NAME = "teachingSubject";

    private final TeachingSubjectService teachingSubjectService;

    public TeachingSubjectResource(TeachingSubjectService teachingSubjectService) {
        this.teachingSubjectService = teachingSubjectService;
    }

    /**
     * POST  /teaching-subjects : Create a new teachingSubject.
     *
     * @param teachingSubject the teachingSubject to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teachingSubject, or with status 400 (Bad Request) if the teachingSubject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teaching-subjects")
    @Timed
    public ResponseEntity<TeachingSubject> createTeachingSubject(@Valid @RequestBody TeachingSubject teachingSubject) throws URISyntaxException {
        log.debug("REST request to save TeachingSubject : {}", teachingSubject);
        if (teachingSubject.getId() != null) {
            throw new BadRequestAlertException("A new teachingSubject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeachingSubject result = teachingSubjectService.save(teachingSubject);
        return ResponseEntity.created(new URI("/api/teaching-subjects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teaching-subjects : Updates an existing teachingSubject.
     *
     * @param teachingSubject the teachingSubject to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teachingSubject,
     * or with status 400 (Bad Request) if the teachingSubject is not valid,
     * or with status 500 (Internal Server Error) if the teachingSubject couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teaching-subjects")
    @Timed
    public ResponseEntity<TeachingSubject> updateTeachingSubject(@Valid @RequestBody TeachingSubject teachingSubject) throws URISyntaxException {
        log.debug("REST request to update TeachingSubject : {}", teachingSubject);
        if (teachingSubject.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if (!teachingSubjectService.isMyTeachingSubject(teachingSubject.getId())) {
            throw new BadRequestAlertException("Invalid user", ENTITY_NAME, "not same user");
        }

        TeachingSubject result = teachingSubjectService.save(teachingSubject);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teachingSubject.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teaching-subjects : get all the teachingSubjects.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of teachingSubjects in body
     */
    @GetMapping("/teaching-subjects")
    @Timed
    public ResponseEntity<List<TeachingSubject>> getAllTeachingSubjects(Pageable pageable) {
        log.debug("REST request to get a page of TeachingSubjects");
        Page<TeachingSubject> page = teachingSubjectService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/teaching-subjects");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /teaching-subjects/:id : get the "id" teachingSubject.
     *
     * @param id the id of the teachingSubject to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teachingSubject, or with status 404 (Not Found)
     */
    @GetMapping("/teaching-subjects/{id}")
    @Timed
    public ResponseEntity<TeachingSubject> getTeachingSubject(@PathVariable Long id) {
        log.debug("REST request to get TeachingSubject : {}", id);
        Optional<TeachingSubject> teachingSubject = teachingSubjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teachingSubject);
    }

    /**
     * DELETE  /teaching-subjects/:id : delete the "id" teachingSubject.
     *
     * @param id the id of the teachingSubject to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teaching-subjects/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeachingSubject(@PathVariable Long id) {
        log.debug("REST request to delete TeachingSubject : {}", id);
        if (teachingSubjectService.isMyTeachingSubject(id)) {
            teachingSubjectService.delete(id);
            return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
        } else{
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    /**
     * SEARCH  /_search/teaching-subjects?query=:query : search for the teachingSubject corresponding
     * to the query.
     *
     * @param query    the query of the teachingSubject search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/teaching-subjects")
    @Timed
    public ResponseEntity<List<TeachingSubject>> searchTeachingSubjects(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TeachingSubjects for query {}", query);
        Page<TeachingSubject> page = teachingSubjectService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/teaching-subjects");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * SEARCH  /_search/schoolClasses/{id}/teaching-subjects: search for the teachingSubjects corresponding
     * to the user and school class.
     *
     * @param schoolClassId the query of the teachingHour search
     * @param pageable      the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/school-classes/{schoolClassId}/teaching-subjects")
    @Timed
    public ResponseEntity<List<TeachingSubject>> searchTeachingHoursBySchoolClass(@PathVariable Long schoolClassId, Pageable pageable) {
        log.debug("REST request to search for a page of TeachingSubjects for schoolClass Id {}", schoolClassId);
        Page<TeachingSubject> page = teachingSubjectService.searchBySchoolClass(schoolClassId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/_search/schoolClasses/" + schoolClassId + "/teaching-subjects");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
