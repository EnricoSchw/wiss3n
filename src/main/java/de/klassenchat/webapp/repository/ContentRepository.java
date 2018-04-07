package de.klassenchat.webapp.repository;

import de.klassenchat.webapp.domain.Content;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Content entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    @Query("select content from Content content where content.user.login = ?#{principal.username}")
    List<Content> findByUserIsCurrentUser();
    @Query("select distinct content from Content content left join fetch content.tags")
    List<Content> findAllWithEagerRelationships();

    @Query("select content from Content content left join fetch content.tags where content.id =:id")
    Content findOneWithEagerRelationships(@Param("id") Long id);

}
