package com.enotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A ServiceEntry.
 */
@Entity
@Table(name = "service_entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "initiated_date")
    private Instant initiatedDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @Column(name = "service_start_date")
    private Instant serviceStartDate;

    @Column(name = "service_end_date")
    private Instant serviceEndDate;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "entry")
    private String entry;

    @ManyToOne
    @JsonIgnoreProperties("serviceEntries")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("serviceEntries")
    private Status status;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("serviceEntries")
    private ServiceDefinition serviceDefinition;

    @ManyToOne
    @JsonIgnoreProperties("serviceEntries")
    private GeoPoint geoPoint;

    @ManyToOne
    @JsonIgnoreProperties("serviceEntries")
    private Address address;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public ServiceEntry createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getInitiatedDate() {
        return initiatedDate;
    }

    public ServiceEntry initiatedDate(Instant initiatedDate) {
        this.initiatedDate = initiatedDate;
        return this;
    }

    public void setInitiatedDate(Instant initiatedDate) {
        this.initiatedDate = initiatedDate;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public ServiceEntry lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Instant getServiceStartDate() {
        return serviceStartDate;
    }

    public ServiceEntry serviceStartDate(Instant serviceStartDate) {
        this.serviceStartDate = serviceStartDate;
        return this;
    }

    public void setServiceStartDate(Instant serviceStartDate) {
        this.serviceStartDate = serviceStartDate;
    }

    public Instant getServiceEndDate() {
        return serviceEndDate;
    }

    public ServiceEntry serviceEndDate(Instant serviceEndDate) {
        this.serviceEndDate = serviceEndDate;
        return this;
    }

    public void setServiceEndDate(Instant serviceEndDate) {
        this.serviceEndDate = serviceEndDate;
    }

    public String getEntry() {
        return entry;
    }

    public ServiceEntry entry(String entry) {
        this.entry = entry;
        return this;
    }

    public void setEntry(String entry) {
        this.entry = entry;
    }

    public User getUser() {
        return user;
    }

    public ServiceEntry user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Status getStatus() {
        return status;
    }

    public ServiceEntry status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public ServiceDefinition getServiceDefinition() {
        return serviceDefinition;
    }

    public ServiceEntry serviceDefinition(ServiceDefinition serviceDefinition) {
        this.serviceDefinition = serviceDefinition;
        return this;
    }

    public void setServiceDefinition(ServiceDefinition serviceDefinition) {
        this.serviceDefinition = serviceDefinition;
    }

    public GeoPoint getGeoPoint() {
        return geoPoint;
    }

    public ServiceEntry geoPoint(GeoPoint geoPoint) {
        this.geoPoint = geoPoint;
        return this;
    }

    public void setGeoPoint(GeoPoint geoPoint) {
        this.geoPoint = geoPoint;
    }

    public Address getAddress() {
        return address;
    }

    public ServiceEntry address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceEntry)) {
            return false;
        }
        return id != null && id.equals(((ServiceEntry) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ServiceEntry{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", initiatedDate='" + getInitiatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", serviceStartDate='" + getServiceStartDate() + "'" +
            ", serviceEndDate='" + getServiceEndDate() + "'" +
            ", entry='" + getEntry() + "'" +
            "}";
    }
}
