package de.klassenchat.webapp.service.impl;

import de.klassenchat.webapp.domain.User;
import de.klassenchat.webapp.repository.UserRepository;
import de.klassenchat.webapp.security.SecurityUtils;
import de.klassenchat.webapp.service.TaskService;
import de.klassenchat.webapp.domain.Task;
import de.klassenchat.webapp.repository.TaskRepository;
import de.klassenchat.webapp.service.dto.TaskDTO;
import de.klassenchat.webapp.service.mapper.TaskMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Task.
 */
@Service
@Transactional
public class TaskServiceImpl implements TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskServiceImpl.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    private final UserRepository userRepository;

    public TaskServiceImpl(
        TaskRepository taskRepository,
        TaskMapper taskMapper,
        UserRepository userRepository
    ) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a task.
     *
     * @param taskDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public TaskDTO save(TaskDTO taskDTO) {
        log.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);

        return SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin)
            .map((User user) -> {
                task.setUser(user);
                return task;
            })
            .map(taskRepository::save)
            .map(taskMapper::toDto)
            .orElseThrow(IllegalArgumentException::new);
    }

    /**
     * Get all the tasks.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TaskDTO> findAll() {
        log.debug("Request to get all Tasks");
        return taskRepository.findByUserIsCurrentUser().stream()
            .map(taskMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one task by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public TaskDTO findOne(Long id) {
        log.debug("Request to get Task : {}", id);
        Task task = taskRepository.findOne(id);
        return taskMapper.toDto(task);
    }

    /**
     * Delete the task by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Task : {}", id);
        taskRepository.delete(id);
    }
}
