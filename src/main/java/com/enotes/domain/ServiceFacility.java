package com.enotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.time.Duration;

/**
 * A ServiceFacility.
 */
@Entity
@Table(name = "service_facility")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceFacility implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "from_date")
    private Instant fromDate;

    @Column(name = "thru_date")
    private Instant thruDate;

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

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @ManyToOne
    @JsonIgnoreProperties("serviceFacilities")
    private Frequency frequency;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFromDate() {
        return fromDate;
    }

    public ServiceFacility fromDate(Instant fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(Instant fromDate) {
        this.fromDate = fromDate;
    }

    public Instant getThruDate() {
        return thruDate;
    }

    public ServiceFacility thruDate(Instant thruDate) {
        this.thruDate = thruDate;
        return this;
    }

    public void setThruDate(Instant thruDate) {
        this.thruDate = thruDate;
    }

    public Duration getStartTime() {
        return startTime;
    }

    public ServiceFacility startTime(Duration startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(Duration startTime) {
        this.startTime = startTime;
    }

    public Duration getEndTime() {
        return endTime;
    }

    public ServiceFacility endTime(Duration endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(Duration endTime) {
        this.endTime = endTime;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public ServiceFacility startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public ServiceFacility endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Integer getRecurrence() {
        return recurrence;
    }

    public ServiceFacility recurrence(Integer recurrence) {
        this.recurrence = recurrence;
        return this;
    }

    public void setRecurrence(Integer recurrence) {
        this.recurrence = recurrence;
    }

    public Duration getInterval() {
        return interval;
    }

    public ServiceFacility interval(Duration interval) {
        this.interval = interval;
        return this;
    }

    public void setInterval(Duration interval) {
        this.interval = interval;
    }

    public Duration getGracePeriod() {
        return gracePeriod;
    }

    public ServiceFacility gracePeriod(Duration gracePeriod) {
        this.gracePeriod = gracePeriod;
        return this;
    }

    public void setGracePeriod(Duration gracePeriod) {
        this.gracePeriod = gracePeriod;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public ServiceFacility createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public ServiceFacility lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Frequency getFrequency() {
        return frequency;
    }

    public ServiceFacility frequency(Frequency frequency) {
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
        if (!(o instanceof ServiceFacility)) {
            return false;
        }
        return id != null && id.equals(((ServiceFacility) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ServiceFacility{" +
            "id=" + getId() +
            ", fromDate='" + getFromDate() + "'" +
            ", thruDate='" + getThruDate() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", recurrence=" + getRecurrence() +
            ", interval='" + getInterval() + "'" +
            ", gracePeriod='" + getGracePeriod() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
