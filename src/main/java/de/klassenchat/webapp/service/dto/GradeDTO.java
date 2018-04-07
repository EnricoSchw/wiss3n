package de.klassenchat.webapp.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import de.klassenchat.webapp.domain.enumeration.GradeAdditional;

/**
 * A DTO for the Grade entity.
 */
public class GradeDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    @Min(value = 1)
    @Max(value = 6)
    private Integer value;

    private GradeAdditional additional;

    @Min(value = 1)
    @Max(value = 15)
    private Integer point;

    private Long taskId;

    private Long userId;

    private String userLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public GradeAdditional getAdditional() {
        return additional;
    }

    public void setAdditional(GradeAdditional additional) {
        this.additional = additional;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GradeDTO gradeDTO = (GradeDTO) o;
        if(gradeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gradeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GradeDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", value=" + getValue() +
            ", additional='" + getAdditional() + "'" +
            ", point=" + getPoint() +
            "}";
    }
}
