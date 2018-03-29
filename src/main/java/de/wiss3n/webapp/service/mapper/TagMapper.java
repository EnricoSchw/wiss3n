package de.wiss3n.webapp.service.mapper;

import de.klassenchat.webapp.domain.*;
import de.wiss3n.webapp.service.dto.TagDTO;

import de.wiss3n.webapp.domain.Tag;
import org.mapstruct.*;

/**
 * Mapper for the entity Tag and its DTO TagDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface TagMapper extends EntityMapper<TagDTO, Tag> {



    default Tag fromId(Long id) {
        if (id == null) {
            return null;
        }
        Tag tag = new Tag();
        tag.setId(id);
        return tag;
    }
}
