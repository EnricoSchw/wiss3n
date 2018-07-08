package de.wiss3n.webapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import de.wiss3n.webapp.domain.enumeration.SubjectType;

/**
 * A TeachingSubject.
 */
@Entity
@Table(name = "teaching_subject")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "teachingsubject")
public class TeachingSubject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Size(min = 2)
    @Column(name = "prefix", nullable = false)
    private String prefix;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private SubjectType type;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    @OneToMany(mappedBy = "teachingSubject")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeachingHour> teachingHours = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPrefix() {
        return prefix;
    }

    public TeachingSubject prefix(String prefix) {
        this.prefix = prefix;
        return this;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public SubjectType getType() {
        return type;
    }

    public TeachingSubject type(SubjectType type) {
        this.type = type;
        return this;
    }

    public void setType(SubjectType type) {
        this.type = type;
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

    public Set<TeachingHour> getTeachingHours() {
        return teachingHours;
    }

    public TeachingSubject teachingHours(Set<TeachingHour> teachingHours) {
        this.teachingHours = teachingHours;
        return this;
    }

    public TeachingSubject addTeachingHours(TeachingHour teachingHour) {
        this.teachingHours.add(teachingHour);
        teachingHour.setTeachingSubject(this);
        return this;
    }

    public TeachingSubject removeTeachingHours(TeachingHour teachingHour) {
        this.teachingHours.remove(teachingHour);
        teachingHour.setTeachingSubject(null);
        return this;
    }

    public void setTeachingHours(Set<TeachingHour> teachingHours) {
        this.teachingHours = teachingHours;
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
            ", name='" + getName() + "'" +
            ", prefix='" + getPrefix() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
