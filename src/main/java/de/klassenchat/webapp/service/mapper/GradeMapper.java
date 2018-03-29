package de.klassenchat.webapp.service.mapper;

import de.klassenchat.webapp.domain.*;
import de.klassenchat.webapp.service.dto.GradeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Grade and its DTO GradeDTO.
 */
@Mapper(componentModel = "spring", uses = {TaskMapper.class, UserMapper.class})
public interface GradeMapper extends EntityMapper<GradeDTO, Grade> {

    @Mapping(source = "task.id", target = "taskId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "task.titel", target = "taskTitel")
    GradeDTO toDto(Grade grade);

    @Mapping(source = "taskId", target = "task")
    @Mapping(source = "userId", target = "user")
    Grade toEntity(GradeDTO gradeDTO);

    default Grade fromId(Long id) {
        if (id == null) {
            return null;
        }
        Grade grade = new Grade();
        grade.setId(id);
        return grade;
    }
}
