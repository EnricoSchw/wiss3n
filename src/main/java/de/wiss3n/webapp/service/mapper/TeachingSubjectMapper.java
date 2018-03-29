package de.wiss3n.webapp.service.mapper;

import de.wiss3n.webapp.service.dto.TeachingSubjectDTO;

import de.wiss3n.webapp.domain.TeachingSubject;
import org.mapstruct.*;

/**
 * Mapper for the entity TeachingSubject and its DTO TeachingSubjectDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TagMapper.class, SchoolClassMapper.class})
public interface TeachingSubjectMapper extends EntityMapper<TeachingSubjectDTO, TeachingSubject> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "schoolClass.id", target = "schoolClassId")
    @Mapping(source = "schoolClass.name", target = "schoolClassName")
    TeachingSubjectDTO toDto(TeachingSubject teachingSubject);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "schoolClassId", target = "schoolClass")
    TeachingSubject toEntity(TeachingSubjectDTO teachingSubjectDTO);

    default TeachingSubject fromId(Long id) {
        if (id == null) {
            return null;
        }
        TeachingSubject teachingSubject = new TeachingSubject();
        teachingSubject.setId(id);
        return teachingSubject;
    }
}
