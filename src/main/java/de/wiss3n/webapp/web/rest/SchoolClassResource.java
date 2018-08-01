package de.wiss3n.webapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.security.SecurityUtils;
import de.wiss3n.webapp.service.SchoolClassService;
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
 * REST controller for managing SchoolClass.
 */
@RestController
@RequestMapping("/api")
public class SchoolClassResource {

    private final Logger log = LoggerFactory.getLogger(SchoolClassResource.class);

    private static final String ENTITY_NAME = "schoolClass";

    private final SchoolClassService schoolClassService;

    public SchoolClassResource(SchoolClassService schoolClassService) {
        this.schoolClassService = schoolClassService;
    }

    /**
     * POST  /school-classes : Create a new schoolClass.
     *
     * @param schoolClass the schoolClass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new schoolClass, or with status 400 (Bad Request) if the schoolClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/school-classes")
    @Timed
    public ResponseEntity<SchoolClass> createSchoolClass(@Valid @RequestBody SchoolClass schoolClass) throws URISyntaxException {
        log.debug("REST request to save SchoolClass : {}", schoolClass);
        if (schoolClass.getId() != null) {
            throw new BadRequestAlertException("A new schoolClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchoolClass result = schoolClassService.save(schoolClass);
        return ResponseEntity.created(new URI("/api/school-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /school-classes : Updates an existing schoolClass.
     *
     * @param schoolClass the schoolClass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated schoolClass,
     * or with status 400 (Bad Request) if the schoolClass is not valid,
     * or with status 500 (Internal Server Error) if the schoolClass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/school-classes")
    @Timed
    public ResponseEntity<SchoolClass> updateSchoolClass(@Valid @RequestBody SchoolClass schoolClass) throws URISyntaxException {
        log.debug("REST request to update SchoolClass : {}", schoolClass);
        this.hasAccess(schoolClass);

        if (schoolClass.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SchoolClass result = schoolClassService.save(schoolClass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, schoolClass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /school-classes : get all the schoolClasses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of schoolClasses in body
     */
    @GetMapping("/school-classes")
    @Timed
    public ResponseEntity<List<SchoolClass>> getAllSchoolClasses(Pageable pageable) {
        log.debug("REST request to get a page of SchoolClasses");
        Page<SchoolClass> page = schoolClassService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/school-classes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /school-classes/:id : get the "id" schoolClass.
     *
     * @param id the id of the schoolClass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the schoolClass, or with status 404 (Not Found)
     */
    @GetMapping("/school-classes/{id}")
    @Timed
    public ResponseEntity<SchoolClass> getSchoolClass(@PathVariable Long id) {
        log.debug("REST request to get SchoolClass : {}", id);
        Optional<SchoolClass> schoolClass = schoolClassService.findOne(id);
        return ResponseUtil.wrapOrNotFound(schoolClass);
    }

    /**
     * DELETE  /school-classes/:id : delete the "id" schoolClass.
     *
     * @param id the id of the schoolClass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/school-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteSchoolClass(@PathVariable Long id) {
        log.debug("REST request to delete SchoolClass : {}", id);
        schoolClassService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/school-classes?query=:query : search for the schoolClass corresponding
     * to the query.
     *
     * @param query the query of the schoolClass search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/school-classes")
    @Timed
    public ResponseEntity<List<SchoolClass>> searchSchoolClasses(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of SchoolClasses for query {}", query);
        Page<SchoolClass> page = schoolClassService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/school-classes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    private void hasAccess(SchoolClass schoolClass) {
        if (!schoolClass.getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().orElse(null))) {
            throw new BadRequestAlertException("Invalid user", ENTITY_NAME, "not same user");
        }
    }

}
