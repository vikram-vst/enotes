package com.enotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Facility.
 */
@Entity
@Table(name = "facility")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Facility implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 25)
    @Column(name = "name", length = 25, unique = true)
    private String name;

    @Size(max = 60)
    @Column(name = "description", length = 60, unique = true)
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("facilities")
    private FacilityType facilityType;

    @ManyToOne
    @JsonIgnoreProperties("facilities")
    private ProductStore productStore;

    @ManyToOne
    @JsonIgnoreProperties("facilities")
    private FacilityGroup facilityGroup;

    @ManyToOne
    @JsonIgnoreProperties("facilities")
    private User owner;

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

    public Facility name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Facility description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public FacilityType getFacilityType() {
        return facilityType;
    }

    public Facility facilityType(FacilityType facilityType) {
        this.facilityType = facilityType;
        return this;
    }

    public void setFacilityType(FacilityType facilityType) {
        this.facilityType = facilityType;
    }

    public ProductStore getProductStore() {
        return productStore;
    }

    public Facility productStore(ProductStore productStore) {
        this.productStore = productStore;
        return this;
    }

    public void setProductStore(ProductStore productStore) {
        this.productStore = productStore;
    }

    public FacilityGroup getFacilityGroup() {
        return facilityGroup;
    }

    public Facility facilityGroup(FacilityGroup facilityGroup) {
        this.facilityGroup = facilityGroup;
        return this;
    }

    public void setFacilityGroup(FacilityGroup facilityGroup) {
        this.facilityGroup = facilityGroup;
    }

    public User getOwner() {
        return owner;
    }

    public Facility owner(User user) {
        this.owner = user;
        return this;
    }

    public void setOwner(User user) {
        this.owner = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Facility)) {
            return false;
        }
        return id != null && id.equals(((Facility) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Facility{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
