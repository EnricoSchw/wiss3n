package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    Page<Content> findByUserIsCurrentUser(Pageable pageable);

    @Query("select distinct content from Content content left join fetch content.tags")
    List<Content> findAllWithEagerRelationships();

    @Query("select content from Content content left join fetch content.tags where content.id =:id")
    Content findOneWithEagerRelationships(@Param("id") Long id);

}
