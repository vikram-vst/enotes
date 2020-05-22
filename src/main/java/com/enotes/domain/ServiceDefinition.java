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
 * A ServiceDefinition.
 */
@Entity
@Table(name = "service_definition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceDefinition implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 25)
    @Column(name = "title", length = 25)
    private String title;

    @Min(value = 1)
    @Max(value = 100)
    @Column(name = "version")
    private Integer version;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "fields")
    private String fields;

    @ManyToOne
    @JsonIgnoreProperties("serviceDefinitions")
    private Status status;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("serviceDefinitions")
    private Service service;

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

    public ServiceDefinition title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getVersion() {
        return version;
    }

    public ServiceDefinition version(Integer version) {
        this.version = version;
        return this;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getImagePath() {
        return imagePath;
    }

    public ServiceDefinition imagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public ServiceDefinition createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public ServiceDefinition lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getFields() {
        return fields;
    }

    public ServiceDefinition fields(String fields) {
        this.fields = fields;
        return this;
    }

    public void setFields(String fields) {
        this.fields = fields;
    }

    public Status getStatus() {
        return status;
    }

    public ServiceDefinition status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Service getService() {
        return service;
    }

    public ServiceDefinition service(Service service) {
        this.service = service;
        return this;
    }

    public void setService(Service service) {
        this.service = service;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceDefinition)) {
            return false;
        }
        return id != null && id.equals(((ServiceDefinition) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ServiceDefinition{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", version=" + getVersion() +
            ", imagePath='" + getImagePath() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            ", fields='" + getFields() + "'" +
            "}";
    }
}
