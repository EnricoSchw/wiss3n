package de.wiss3n.webapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.wiss3n.webapp.domain.TeachingHour;
import de.wiss3n.webapp.service.TeachingHourService;
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
 * REST controller for managing TeachingHour.
 */
@RestController
@RequestMapping("/api")
public class TeachingHourResource {

    private final Logger log = LoggerFactory.getLogger(TeachingHourResource.class);

    private static final String ENTITY_NAME = "teachingHour";

    private final TeachingHourService teachingHourService;

    public TeachingHourResource(TeachingHourService teachingHourService) {
        this.teachingHourService = teachingHourService;
    }

    /**
     * POST  /teaching-hours : Create a new teachingHour.
     *
     * @param teachingHour the teachingHour to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teachingHour, or with status 400 (Bad Request) if the teachingHour has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teaching-hours")
    @Timed
    public ResponseEntity<TeachingHour> createTeachingHour(@Valid @RequestBody TeachingHour teachingHour) throws URISyntaxException {
        log.debug("REST request to save TeachingHour : {}", teachingHour);
        if (teachingHour.getId() != null) {
            throw new BadRequestAlertException("A new teachingHour cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeachingHour result = teachingHourService.save(teachingHour);
        return ResponseEntity.created(new URI("/api/teaching-hours/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teaching-hours : Updates an existing teachingHour.
     *
     * @param teachingHour the teachingHour to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teachingHour,
     * or with status 400 (Bad Request) if the teachingHour is not valid,
     * or with status 500 (Internal Server Error) if the teachingHour couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teaching-hours")
    @Timed
    public ResponseEntity<TeachingHour> updateTeachingHour(@Valid @RequestBody TeachingHour teachingHour) throws URISyntaxException {
        log.debug("REST request to update TeachingHour : {}", teachingHour);
        if (teachingHour.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeachingHour result = teachingHourService.save(teachingHour);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teachingHour.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teaching-hours : get all the teachingHours.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of teachingHours in body
     */
    @GetMapping("/teaching-hours")
    @Timed
    public ResponseEntity<List<TeachingHour>> getAllTeachingHours(Pageable pageable) {
        log.debug("REST request to get a page of TeachingHours");
        Page<TeachingHour> page = teachingHourService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/teaching-hours");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /teaching-hours/:id : get the "id" teachingHour.
     *
     * @param id the id of the teachingHour to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teachingHour, or with status 404 (Not Found)
     */
    @GetMapping("/teaching-hours/{id}")
    @Timed
    public ResponseEntity<TeachingHour> getTeachingHour(@PathVariable Long id) {
        log.debug("REST request to get TeachingHour : {}", id);
        Optional<TeachingHour> teachingHour = teachingHourService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teachingHour);
    }

    /**
     * DELETE  /teaching-hours/:id : delete the "id" teachingHour.
     *
     * @param id the id of the teachingHour to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teaching-hours/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeachingHour(@PathVariable Long id) {
        log.debug("REST request to delete TeachingHour : {}", id);
        teachingHourService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/teaching-hours?query=:query : search for the teachingHour corresponding
     * to the query.
     *
     * @param query the query of the teachingHour search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/teaching-hours")
    @Timed
    public ResponseEntity<List<TeachingHour>> searchTeachingHours(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of TeachingHours for query {}", query);
        Page<TeachingHour> page = teachingHourService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/teaching-hours");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
