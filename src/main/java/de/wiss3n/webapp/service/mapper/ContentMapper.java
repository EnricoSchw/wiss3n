package de.wiss3n.webapp.service.mapper;

import de.klassenchat.webapp.domain.*;
import de.wiss3n.webapp.domain.Content;
import de.wiss3n.webapp.service.dto.ContentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Content and its DTO ContentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, TaskMapper.class, TagMapper.class})
public interface ContentMapper extends EntityMapper<ContentDTO, Content> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "task.id", target = "taskId")
    @Mapping(source = "task.titel", target = "taskTitel")
    ContentDTO toDto(Content content);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "taskId", target = "task")
    Content toEntity(ContentDTO contentDTO);

    default Content fromId(Long id) {
        if (id == null) {
            return null;
        }
        Content content = new Content();
        content.setId(id);
        return content;
    }
}
