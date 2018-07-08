package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.Content;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Content entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    @Query("select content from Content content where content.user.login = ?#{principal.username}")
    List<Content> findByUserIsCurrentUser();

}
