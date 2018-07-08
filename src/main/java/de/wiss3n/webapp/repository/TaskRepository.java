package de.wiss3n.webapp.repository;

import de.wiss3n.webapp.domain.Task;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Task entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("select task from Task task where task.user.login = ?#{principal.username}")
    List<Task> findByUserIsCurrentUser();

}
