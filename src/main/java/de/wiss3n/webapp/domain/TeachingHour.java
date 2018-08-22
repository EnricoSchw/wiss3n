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

/**
 * A TeachingHour.
 */
@Entity
@Table(name = "teaching_hour")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "teachinghour")
public class TeachingHour implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    @Column(name = "weekday", nullable = false)
    private Integer weekday;

    @NotNull
    @Min(value = 1)
    @Max(value = 10)
    @Column(name = "hour", nullable = false)
    private Integer hour;

    @ManyToOne
    @JsonIgnoreProperties("teachingHours")
    @JsonIgnore
    private TeachingSubject teachingSubject;

    @ManyToOne
    @JsonIgnoreProperties("teachingHours")
    @JsonIgnore
    private SchoolClass schoolClass;

    @OneToMany(mappedBy = "teachingHour")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

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

    public TeachingHour name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getWeekday() {
        return weekday;
    }

    public TeachingHour weekday(Integer weekday) {
        this.weekday = weekday;
        return this;
    }

    public void setWeekday(Integer weekday) {
        this.weekday = weekday;
    }

    public Integer getHour() {
        return hour;
    }

    public TeachingHour hour(Integer hour) {
        this.hour = hour;
        return this;
    }

    public void setHour(Integer hour) {
        this.hour = hour;
    }

    public TeachingSubject getTeachingSubject() {
        return teachingSubject;
    }

    public TeachingHour teachingSubject(TeachingSubject teachingSubject) {
        this.teachingSubject = teachingSubject;
        return this;
    }

    public void setTeachingSubject(TeachingSubject teachingSubject) {
        this.teachingSubject = teachingSubject;
    }

    public SchoolClass getSchoolClass() {
        return schoolClass;
    }

    public TeachingHour schoolClass(SchoolClass schoolClass) {
        this.schoolClass = schoolClass;
        return this;
    }

    public void setSchoolClass(SchoolClass schoolClass) {
        this.schoolClass = schoolClass;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public TeachingHour tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public TeachingHour addTasks(Task task) {
        this.tasks.add(task);
        task.setTeachingHour(this);
        return this;
    }

    public TeachingHour removeTasks(Task task) {
        this.tasks.remove(task);
        task.setTeachingHour(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
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
        TeachingHour teachingHour = (TeachingHour) o;
        if (teachingHour.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teachingHour.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeachingHour{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", weekday=" + getWeekday() +
            ", hour=" + getHour() +
            "}";
    }
}
