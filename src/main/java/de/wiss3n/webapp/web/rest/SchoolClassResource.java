package de.wiss3n.webapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.wiss3n.webapp.service.SchoolClassService;
import de.wiss3n.webapp.web.rest.errors.BadRequestAlertException;
import de.wiss3n.webapp.web.rest.util.HeaderUtil;
import de.wiss3n.webapp.web.rest.util.PaginationUtil;
import de.wiss3n.webapp.service.dto.SchoolClassDTO;
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
     * @param schoolClassDTO the schoolClassDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new schoolClassDTO, or with status 400 (Bad Request) if the schoolClass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/school-classes")
    @Timed
    public ResponseEntity<SchoolClassDTO> createSchoolClass(@Valid @RequestBody SchoolClassDTO schoolClassDTO) throws URISyntaxException {
        log.debug("REST request to save SchoolClass : {}", schoolClassDTO);
        if (schoolClassDTO.getId() != null) {
            throw new BadRequestAlertException("A new schoolClass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SchoolClassDTO result = schoolClassService.save(schoolClassDTO);
        return ResponseEntity.created(new URI("/api/school-classes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /school-classes : Updates an existing schoolClass.
     *
     * @param schoolClassDTO the schoolClassDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated schoolClassDTO,
     * or with status 400 (Bad Request) if the schoolClassDTO is not valid,
     * or with status 500 (Internal Server Error) if the schoolClassDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/school-classes")
    @Timed
    public ResponseEntity<SchoolClassDTO> updateSchoolClass(@Valid @RequestBody SchoolClassDTO schoolClassDTO) throws URISyntaxException {
        log.debug("REST request to update SchoolClass : {}", schoolClassDTO);
        if (schoolClassDTO.getId() == null) {
            return createSchoolClass(schoolClassDTO);
        }
        SchoolClassDTO result = schoolClassService.save(schoolClassDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, schoolClassDTO.getId().toString()))
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
    public ResponseEntity<List<SchoolClassDTO>> getAllSchoolClasses(Pageable pageable) {
        log.debug("REST request to get a page of SchoolClasses");
        Page<SchoolClassDTO> page = schoolClassService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/school-classes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /school-classes/:id : get the "id" schoolClass.
     *
     * @param id the id of the schoolClassDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the schoolClassDTO, or with status 404 (Not Found)
     */
    @GetMapping("/school-classes/{id}")
    @Timed
    public ResponseEntity<SchoolClassDTO> getSchoolClass(@PathVariable Long id) {
        log.debug("REST request to get SchoolClass : {}", id);
        SchoolClassDTO schoolClassDTO = schoolClassService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(schoolClassDTO));
    }

    /**
     * DELETE  /school-classes/:id : delete the "id" schoolClass.
     *
     * @param id the id of the schoolClassDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/school-classes/{id}")
    @Timed
    public ResponseEntity<Void> deleteSchoolClass(@PathVariable Long id) {
        log.debug("REST request to delete SchoolClass : {}", id);
        schoolClassService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
