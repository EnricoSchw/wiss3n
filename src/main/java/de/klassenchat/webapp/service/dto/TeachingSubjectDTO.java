package de.klassenchat.webapp.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TeachingSubject entity.
 */
public class TeachingSubjectDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate year;

    @NotNull
    @Size(min = 2)
    private String name;

    @NotNull
    @Min(value = 1)
    @Max(value = 6)
    private Integer grade;

    private Long userId;

    private String userLogin;

    private Set<TagDTO> tags = new HashSet<>();

    private Long schoolClassId;

    private String schoolClassName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getYear() {
        return year;
    }

    public void setYear(LocalDate year) {
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
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

    public Set<TagDTO> getTags() {
        return tags;
    }

    public void setTags(Set<TagDTO> tags) {
        this.tags = tags;
    }

    public Long getSchoolClassId() {
        return schoolClassId;
    }

    public void setSchoolClassId(Long schoolClassId) {
        this.schoolClassId = schoolClassId;
    }

    public String getSchoolClassName() {
        return schoolClassName;
    }

    public void setSchoolClassName(String schoolClassName) {
        this.schoolClassName = schoolClassName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeachingSubjectDTO teachingSubjectDTO = (TeachingSubjectDTO) o;
        if(teachingSubjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teachingSubjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeachingSubjectDTO{" +
            "id=" + getId() +
            ", year='" + getYear() + "'" +
            ", name='" + getName() + "'" +
            ", grade=" + getGrade() +
            "}";
    }
}
