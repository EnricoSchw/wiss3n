package de.wiss3n.webapp.service.impl;

import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.security.SecurityUtils;
import de.wiss3n.webapp.service.SchoolClassService;
import de.wiss3n.webapp.domain.SchoolClass;
import de.wiss3n.webapp.repository.SchoolClassRepository;
import de.wiss3n.webapp.service.dto.SchoolClassDTO;
import de.wiss3n.webapp.service.mapper.SchoolClassMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SchoolClass.
 */
@Service
@Transactional
public class SchoolClassServiceImpl implements SchoolClassService {

    private final Logger log = LoggerFactory.getLogger(SchoolClassServiceImpl.class);

    private final SchoolClassRepository schoolClassRepository;

    private final SchoolClassMapper schoolClassMapper;

    private final UserRepository userRepository;

    public SchoolClassServiceImpl(
        SchoolClassRepository schoolClassRepository,
        SchoolClassMapper schoolClassMapper,
        UserRepository userRepository) {
        this.userRepository = userRepository;
        this.schoolClassRepository = schoolClassRepository;
        this.schoolClassMapper = schoolClassMapper;
    }

    /**
     * Save a schoolClass.
     *
     * @param schoolClassDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SchoolClassDTO save(SchoolClassDTO schoolClassDTO) {
        log.debug("Request to save SchoolClass : {}", schoolClassDTO);
        SchoolClass schoolClass = schoolClassMapper.toEntity(schoolClassDTO);
        return SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .map((User user) -> {
                schoolClass.setUser(user);
                return schoolClass;
            })
            .map(schoolClassRepository::save)
            .map(schoolClassMapper::toDto)
            .orElseThrow(IllegalArgumentException::new);
    }

    /**
     * Get all the schoolClasses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SchoolClassDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SchoolClasses");
        return schoolClassRepository
            .findByUserIsCurrentUser(pageable)
            .map(schoolClassMapper::toDto);
    }

    /**
     * Get one schoolClass by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SchoolClassDTO findOne(Long id) {
        log.debug("Request to get SchoolClass : {}", id);
        SchoolClass schoolClass = schoolClassRepository.findOne(id);
        return schoolClassMapper.toDto(schoolClass);
    }

    /**
     * Delete the schoolClass by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SchoolClass : {}", id);
        schoolClassRepository.delete(id);
    }
}
