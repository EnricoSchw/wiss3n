package de.wiss3n.webapp.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import de.wiss3n.webapp.domain.enumeration.TaskType;

/**
 * A DTO for the Task entity.
 */
public class TaskDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 2)
    private String titel;

    @Lob
    private String content;

    @NotNull
    private TaskType type;

    @NotNull
    private LocalDate start;

    @NotNull
    private LocalDate end;

    private Long userId;

    private String userLogin;

    private Long teachingSubjectId;

    private String teachingSubjectName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public TaskType getType() {
        return type;
    }

    public void setType(TaskType type) {
        this.type = type;
    }

    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Long getTeachingSubjectId() {
        return teachingSubjectId;
    }

    public void setTeachingSubjectId(Long teachingSubjectId) {
        this.teachingSubjectId = teachingSubjectId;
    }

    public String getTeachingSubjectName() {
        return teachingSubjectName;
    }

    public void setTeachingSubjectName(String teachingSubjectName) {
        this.teachingSubjectName = teachingSubjectName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TaskDTO taskDTO = (TaskDTO) o;
        if(taskDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), taskDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
            "id=" + getId() +
            ", titel='" + getTitel() + "'" +
            ", content='" + getContent() + "'" +
            ", type='" + getType() + "'" +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }
}
