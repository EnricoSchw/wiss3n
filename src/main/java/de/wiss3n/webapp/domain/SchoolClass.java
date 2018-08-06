package de.wiss3n.webapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SchoolClass.
 */
@Entity
@Table(name = "school_class")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "schoolclass")
public class SchoolClass implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_start", nullable = false)
    private LocalDate start;

    @NotNull
    @Column(name = "jhi_end", nullable = false)
    private LocalDate end;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @NotNull
    @Size(min = 2)
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "schoolClass")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeachingHour> teachingHours = new HashSet<>();

    @OneToMany(mappedBy = "schoolClass")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeachingSubject> teachingSubjects = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStart() {
        return start;
    }

    public SchoolClass start(LocalDate start) {
        this.start = start;
        return this;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public SchoolClass end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Boolean isActive() {
        return active;
    }

    public SchoolClass active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public SchoolClass name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<TeachingHour> getTeachingHours() {
        return teachingHours;
    }

    public SchoolClass teachingHours(Set<TeachingHour> teachingHours) {
        this.teachingHours = teachingHours;
        return this;
    }

    public SchoolClass addTeachingHours(TeachingHour teachingHour) {
        this.teachingHours.add(teachingHour);
        teachingHour.setSchoolClass(this);
        return this;
    }

    public SchoolClass removeTeachingHours(TeachingHour teachingHour) {
        this.teachingHours.remove(teachingHour);
        teachingHour.setSchoolClass(null);
        return this;
    }

    public void setTeachingHours(Set<TeachingHour> teachingHours) {
        this.teachingHours = teachingHours;
    }

    public Set<TeachingSubject> getTeachingSubjects() {
        return teachingSubjects;
    }

    public SchoolClass teachingSubjects(Set<TeachingSubject> teachingSubjects) {
        this.teachingSubjects = teachingSubjects;
        return this;
    }

    public SchoolClass addTeachingSubjects(TeachingSubject teachingSubject) {
        this.teachingSubjects.add(teachingSubject);
        teachingSubject.setSchoolClass(this);
        return this;
    }

    public SchoolClass removeTeachingSubjects(TeachingSubject teachingSubject) {
        this.teachingSubjects.remove(teachingSubject);
        teachingSubject.setSchoolClass(null);
        return this;
    }

    public void setTeachingSubjects(Set<TeachingSubject> teachingSubjects) {
        this.teachingSubjects = teachingSubjects;
    }

    public User getUser() {
        return user;
    }

    public SchoolClass user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        SchoolClass schoolClass = (SchoolClass) o;
        if (schoolClass.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schoolClass.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SchoolClass{" +
            "id=" + getId() +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            ", active='" + isActive() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
