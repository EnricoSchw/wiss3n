package de.wiss3n.webapp.service.impl;

import de.wiss3n.webapp.domain.User;
import de.wiss3n.webapp.repository.UserRepository;
import de.wiss3n.webapp.security.SecurityUtils;
import de.wiss3n.webapp.service.GradeService;
import de.wiss3n.webapp.domain.Grade;
import de.wiss3n.webapp.repository.GradeRepository;
import de.wiss3n.webapp.service.dto.GradeDTO;
import de.wiss3n.webapp.service.mapper.GradeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Grade.
 */
@Service
@Transactional
public class GradeServiceImpl implements GradeService {

    private final Logger log = LoggerFactory.getLogger(GradeServiceImpl.class);

    private final GradeRepository gradeRepository;

    private final GradeMapper gradeMapper;

    private final UserRepository userRepository;

    public GradeServiceImpl(
        GradeRepository gradeRepository,
        GradeMapper gradeMapper,
        UserRepository userRepository
    ) {
        this.gradeRepository = gradeRepository;
        this.gradeMapper = gradeMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a grade.
     *
     * @param gradeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public GradeDTO save(GradeDTO gradeDTO) {
        log.debug("Request to save Grade : {}", gradeDTO);
        Grade grade = gradeMapper.toEntity(gradeDTO);

        return SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .map((User user) -> {
                grade.setUser(user);
                return grade;
            })
            .map(gradeRepository::save)
            .map(gradeMapper::toDto)
            .orElseThrow(IllegalArgumentException::new);
    }

    /**
     * Get all the grades.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<GradeDTO> findAll() {
        log.debug("Request to get all Grades");
        return gradeRepository.findByUserIsCurrentUser().stream()
            .map(gradeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one grade by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public GradeDTO findOne(Long id) {
        log.debug("Request to get Grade : {}", id);
        Grade grade = gradeRepository.findOne(id);
        return gradeMapper.toDto(grade);
    }

    /**
     * Delete the grade by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Grade : {}", id);
        gradeRepository.delete(id);
    }
}
