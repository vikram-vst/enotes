package com.enotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FacilityGroup.
 */
@Entity
@Table(name = "facility_group")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FacilityGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 25)
    @Column(name = "name", length = 25, unique = true)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("facilityGroups")
    private FacilityGroupType facilityGroupType;

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

    public FacilityGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FacilityGroupType getFacilityGroupType() {
        return facilityGroupType;
    }

    public FacilityGroup facilityGroupType(FacilityGroupType facilityGroupType) {
        this.facilityGroupType = facilityGroupType;
        return this;
    }

    public void setFacilityGroupType(FacilityGroupType facilityGroupType) {
        this.facilityGroupType = facilityGroupType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FacilityGroup)) {
            return false;
        }
        return id != null && id.equals(((FacilityGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FacilityGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
