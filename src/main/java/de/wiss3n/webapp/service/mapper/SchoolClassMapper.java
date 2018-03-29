package de.wiss3n.webapp.service.mapper;

import de.klassenchat.webapp.domain.*;
import de.wiss3n.webapp.service.dto.SchoolClassDTO;

import de.wiss3n.webapp.domain.SchoolClass;
import org.mapstruct.*;

/**
 * Mapper for the entity SchoolClass and its DTO SchoolClassDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface SchoolClassMapper extends EntityMapper<SchoolClassDTO, SchoolClass> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    SchoolClassDTO toDto(SchoolClass schoolClass);

    @Mapping(target = "teachingSubjects", ignore = true)
    @Mapping(source = "userId", target = "user")
    SchoolClass toEntity(SchoolClassDTO schoolClassDTO);

    default SchoolClass fromId(Long id) {
        if (id == null) {
            return null;
        }
        SchoolClass schoolClass = new SchoolClass();
        schoolClass.setId(id);
        return schoolClass;
    }
}
