package de.klassenchat.webapp.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import de.klassenchat.webapp.domain.enumeration.GradeAdditional;

/**
 * A Grade.
 */
@Entity
@Table(name = "grade")
public class Grade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @NotNull
    @Min(value = 1)
    @Max(value = 6)
    @Column(name = "jhi_value", nullable = false)
    private Integer value;

    @Enumerated(EnumType.STRING)
    @Column(name = "additional")
    private GradeAdditional additional;

    @Min(value = 1)
    @Max(value = 15)
    @Column(name = "point")
    private Integer point;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Task task;

    @ManyToOne(optional = false)
    @NotNull
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Grade date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getValue() {
        return value;
    }

    public Grade value(Integer value) {
        this.value = value;
        return this;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public GradeAdditional getAdditional() {
        return additional;
    }

    public Grade additional(GradeAdditional additional) {
        this.additional = additional;
        return this;
    }

    public void setAdditional(GradeAdditional additional) {
        this.additional = additional;
    }

    public Integer getPoint() {
        return point;
    }

    public Grade point(Integer point) {
        this.point = point;
        return this;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Task getTask() {
        return task;
    }

    public Grade task(Task task) {
        this.task = task;
        return this;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public User getUser() {
        return user;
    }

    public Grade user(User user) {
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
        Grade grade = (Grade) o;
        if (grade.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), grade.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Grade{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", value=" + getValue() +
            ", additional='" + getAdditional() + "'" +
            ", point=" + getPoint() +
            "}";
    }
}
