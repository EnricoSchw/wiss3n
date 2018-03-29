package de.wiss3n.webapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TeachingSubject.
 */
@Entity
@Table(name = "teaching_subject")
public class TeachingSubject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_year", nullable = false)
    private LocalDate year;

    @NotNull
    @Size(min = 2)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Min(value = 1)
    @Max(value = 6)
    @Column(name = "grade", nullable = false)
    private Integer grade;

    @ManyToOne(optional = false)
    @NotNull
    private User user;

    @ManyToMany
    @JoinTable(name = "teaching_subject_tag",
               joinColumns = @JoinColumn(name="teaching_subjects_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tags_id", referencedColumnName="id"))
    private Set<Tag> tags = new HashSet<>();

    @ManyToOne
    private SchoolClass schoolClass;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getYear() {
        return year;
    }

    public TeachingSubject year(LocalDate year) {
        this.year = year;
        return this;
    }

    public void setYear(LocalDate year) {
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public TeachingSubject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getGrade() {
        return grade;
    }

    public TeachingSubject grade(Integer grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    public User getUser() {
        return user;
    }

    public TeachingSubject user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public TeachingSubject tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public TeachingSubject addTag(Tag tag) {
        this.tags.add(tag);
        return this;
    }

    public TeachingSubject removeTag(Tag tag) {
        this.tags.remove(tag);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public SchoolClass getSchoolClass() {
        return schoolClass;
    }

    public TeachingSubject schoolClass(SchoolClass schoolClass) {
        this.schoolClass = schoolClass;
        return this;
    }

    public void setSchoolClass(SchoolClass schoolClass) {
        this.schoolClass = schoolClass;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TeachingSubject teachingSubject = (TeachingSubject) o;
        if (teachingSubject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teachingSubject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeachingSubject{" +
            "id=" + getId() +
            ", year='" + getYear() + "'" +
            ", name='" + getName() + "'" +
            ", grade=" + getGrade() +
            "}";
    }
}
