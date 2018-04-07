package de.klassenchat.webapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import de.klassenchat.webapp.service.TeachingSubjectService;
import de.klassenchat.webapp.web.rest.errors.BadRequestAlertException;
import de.klassenchat.webapp.web.rest.util.HeaderUtil;
import de.klassenchat.webapp.web.rest.util.PaginationUtil;
import de.klassenchat.webapp.service.dto.TeachingSubjectDTO;
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
     * @param teachingSubjectDTO the teachingSubjectDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teachingSubjectDTO, or with status 400 (Bad Request) if the teachingSubject has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teaching-subjects")
    @Timed
    public ResponseEntity<TeachingSubjectDTO> createTeachingSubject(@Valid @RequestBody TeachingSubjectDTO teachingSubjectDTO) throws URISyntaxException {
        log.debug("REST request to save TeachingSubject : {}", teachingSubjectDTO);
        if (teachingSubjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new teachingSubject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeachingSubjectDTO result = teachingSubjectService.save(teachingSubjectDTO);
        return ResponseEntity.created(new URI("/api/teaching-subjects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teaching-subjects : Updates an existing teachingSubject.
     *
     * @param teachingSubjectDTO the teachingSubjectDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teachingSubjectDTO,
     * or with status 400 (Bad Request) if the teachingSubjectDTO is not valid,
     * or with status 500 (Internal Server Error) if the teachingSubjectDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teaching-subjects")
    @Timed
    public ResponseEntity<TeachingSubjectDTO> updateTeachingSubject(@Valid @RequestBody TeachingSubjectDTO teachingSubjectDTO) throws URISyntaxException {
        log.debug("REST request to update TeachingSubject : {}", teachingSubjectDTO);
        if (teachingSubjectDTO.getId() == null) {
            return createTeachingSubject(teachingSubjectDTO);
        }
        TeachingSubjectDTO result = teachingSubjectService.save(teachingSubjectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teachingSubjectDTO.getId().toString()))
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
    public ResponseEntity<List<TeachingSubjectDTO>> getAllTeachingSubjects(Pageable pageable) {
        log.debug("REST request to get a page of TeachingSubjects");
        Page<TeachingSubjectDTO> page = teachingSubjectService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/teaching-subjects");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /teaching-subjects/:id : get the "id" teachingSubject.
     *
     * @param id the id of the teachingSubjectDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teachingSubjectDTO, or with status 404 (Not Found)
     */
    @GetMapping("/teaching-subjects/{id}")
    @Timed
    public ResponseEntity<TeachingSubjectDTO> getTeachingSubject(@PathVariable Long id) {
        log.debug("REST request to get TeachingSubject : {}", id);
        TeachingSubjectDTO teachingSubjectDTO = teachingSubjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(teachingSubjectDTO));
    }

    /**
     * DELETE  /teaching-subjects/:id : delete the "id" teachingSubject.
     *
     * @param id the id of the teachingSubjectDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teaching-subjects/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeachingSubject(@PathVariable Long id) {
        log.debug("REST request to delete TeachingSubject : {}", id);
        teachingSubjectService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
