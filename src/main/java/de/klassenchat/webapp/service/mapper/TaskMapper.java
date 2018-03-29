package de.klassenchat.webapp.service.mapper;

import de.klassenchat.webapp.domain.*;
import de.klassenchat.webapp.service.dto.TaskDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Task and its DTO TaskDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TeachingSubjectMapper.class})
public interface TaskMapper extends EntityMapper<TaskDTO, Task> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "teachingSubject.id", target = "teachingSubjectId")
    @Mapping(source = "teachingSubject.name", target = "teachingSubjectName")
    TaskDTO toDto(Task task);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "teachingSubjectId", target = "teachingSubject")
    Task toEntity(TaskDTO taskDTO);

    default Task fromId(Long id) {
        if (id == null) {
            return null;
        }
        Task task = new Task();
        task.setId(id);
        return task;
    }
}
