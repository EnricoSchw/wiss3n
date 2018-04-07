package de.klassenchat.webapp.service.impl;

import de.klassenchat.webapp.service.TeachingSubjectService;
import de.klassenchat.webapp.domain.TeachingSubject;
import de.klassenchat.webapp.repository.TeachingSubjectRepository;
import de.klassenchat.webapp.service.dto.TeachingSubjectDTO;
import de.klassenchat.webapp.service.mapper.TeachingSubjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing TeachingSubject.
 */
@Service
@Transactional
public class TeachingSubjectServiceImpl implements TeachingSubjectService {

    private final Logger log = LoggerFactory.getLogger(TeachingSubjectServiceImpl.class);

    private final TeachingSubjectRepository teachingSubjectRepository;

    private final TeachingSubjectMapper teachingSubjectMapper;

    public TeachingSubjectServiceImpl(TeachingSubjectRepository teachingSubjectRepository, TeachingSubjectMapper teachingSubjectMapper) {
        this.teachingSubjectRepository = teachingSubjectRepository;
        this.teachingSubjectMapper = teachingSubjectMapper;
    }

    /**
     * Save a teachingSubject.
     *
     * @param teachingSubjectDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TeachingSubjectDTO save(TeachingSubjectDTO teachingSubjectDTO) {
        log.debug("Request to save TeachingSubject : {}", teachingSubjectDTO);
        TeachingSubject teachingSubject = teachingSubjectMapper.toEntity(teachingSubjectDTO);
        teachingSubject = teachingSubjectRepository.save(teachingSubject);
        return teachingSubjectMapper.toDto(teachingSubject);
    }

    /**
     * Get all the teachingSubjects.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TeachingSubjectDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TeachingSubjects");
        return teachingSubjectRepository.findAll(pageable)
            .map(teachingSubjectMapper::toDto);
    }

    /**
     * Get one teachingSubject by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TeachingSubjectDTO findOne(Long id) {
        log.debug("Request to get TeachingSubject : {}", id);
        TeachingSubject teachingSubject = teachingSubjectRepository.findOneWithEagerRelationships(id);
        return teachingSubjectMapper.toDto(teachingSubject);
    }

    /**
     * Delete the teachingSubject by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TeachingSubject : {}", id);
        teachingSubjectRepository.delete(id);
    }
}
