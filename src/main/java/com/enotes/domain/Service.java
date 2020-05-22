package com.enotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.time.Duration;

/**
 * A Service.
 */
@Entity
@Table(name = "service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Service implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 25)
    @Column(name = "title", length = 25, unique = true)
    private String title;

    @Column(name = "sequence_no")
    private Integer sequenceNo;

    @Column(name = "start_time")
    private Duration startTime;

    @Column(name = "end_time")
    private Duration endTime;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    @Column(name = "recurrence")
    private Integer recurrence;

    @Column(name = "interval")
    private Duration interval;

    @Column(name = "grace_period")
    private Duration gracePeriod;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @ManyToOne
    @JsonIgnoreProperties("services")
    private ServiceCategory category;

    @ManyToOne
    @JsonIgnoreProperties("services")
    private Frequency frequency;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Service title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getSequenceNo() {
        return sequenceNo;
    }

    public Service sequenceNo(Integer sequenceNo) {
        this.sequenceNo = sequenceNo;
        return this;
    }

    public void setSequenceNo(Integer sequenceNo) {
        this.sequenceNo = sequenceNo;
    }

    public Duration getStartTime() {
        return startTime;
    }

    public Service startTime(Duration startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(Duration startTime) {
        this.startTime = startTime;
    }

    public Duration getEndTime() {
        return endTime;
    }

    public Service endTime(Duration endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(Duration endTime) {
        this.endTime = endTime;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Service startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Service endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Integer getRecurrence() {
        return recurrence;
    }

    public Service recurrence(Integer recurrence) {
        this.recurrence = recurrence;
        return this;
    }

    public void setRecurrence(Integer recurrence) {
        this.recurrence = recurrence;
    }

    public Duration getInterval() {
        return interval;
    }

    public Service interval(Duration interval) {
        this.interval = interval;
        return this;
    }

    public void setInterval(Duration interval) {
        this.interval = interval;
    }

    public Duration getGracePeriod() {
        return gracePeriod;
    }

    public Service gracePeriod(Duration gracePeriod) {
        this.gracePeriod = gracePeriod;
        return this;
    }

    public void setGracePeriod(Duration gracePeriod) {
        this.gracePeriod = gracePeriod;
    }

    public String getImagePath() {
        return imagePath;
    }

    public Service imagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Service createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public Service lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public ServiceCategory getCategory() {
        return category;
    }

    public Service category(ServiceCategory serviceCategory) {
        this.category = serviceCategory;
        return this;
    }

    public void setCategory(ServiceCategory serviceCategory) {
        this.category = serviceCategory;
    }

    public Frequency getFrequency() {
        return frequency;
    }

    public Service frequency(Frequency frequency) {
        this.frequency = frequency;
        return this;
    }

    public void setFrequency(Frequency frequency) {
        this.frequency = frequency;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Service)) {
            return false;
        }
        return id != null && id.equals(((Service) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Service{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", sequenceNo=" + getSequenceNo() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", recurrence=" + getRecurrence() +
            ", interval='" + getInterval() + "'" +
            ", gracePeriod='" + getGracePeriod() + "'" +
            ", imagePath='" + getImagePath() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
