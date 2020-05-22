package com.enotes.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 60)
    @Column(name = "street_address", length = 60)
    private String streetAddress;

    @Size(max = 60)
    @Column(name = "street_address_2", length = 60)
    private String streetAddress2;

    @Size(max = 60)
    @Column(name = "city", length = 60)
    private String city;

    @Size(max = 60)
    @Column(name = "landmark", length = 60)
    private String landmark;

    @Size(max = 10)
    @Column(name = "postal_code", length = 10)
    private String postalCode;

    @Size(max = 255)
    @Column(name = "note", length = 255)
    private String note;

    @Column(name = "is_default")
    private Boolean isDefault;

    @Size(max = 25)
    @Column(name = "custom_address_type", length = 25)
    private String customAddressType;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Status status;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Geo state;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Geo pincode;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private Geo country;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private AddressType addressType;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private GeoPoint geoPoint;

    @ManyToOne
    @JsonIgnoreProperties("addresses")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public Address streetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
        return this;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getStreetAddress2() {
        return streetAddress2;
    }

    public Address streetAddress2(String streetAddress2) {
        this.streetAddress2 = streetAddress2;
        return this;
    }

    public void setStreetAddress2(String streetAddress2) {
        this.streetAddress2 = streetAddress2;
    }

    public String getCity() {
        return city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getLandmark() {
        return landmark;
    }

    public Address landmark(String landmark) {
        this.landmark = landmark;
        return this;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Address postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getNote() {
        return note;
    }

    public Address note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean isIsDefault() {
        return isDefault;
    }

    public Address isDefault(Boolean isDefault) {
        this.isDefault = isDefault;
        return this;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    public String getCustomAddressType() {
        return customAddressType;
    }

    public Address customAddressType(String customAddressType) {
        this.customAddressType = customAddressType;
        return this;
    }

    public void setCustomAddressType(String customAddressType) {
        this.customAddressType = customAddressType;
    }

    public Status getStatus() {
        return status;
    }

    public Address status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Geo getState() {
        return state;
    }

    public Address state(Geo geo) {
        this.state = geo;
        return this;
    }

    public void setState(Geo geo) {
        this.state = geo;
    }

    public Geo getPincode() {
        return pincode;
    }

    public Address pincode(Geo geo) {
        this.pincode = geo;
        return this;
    }

    public void setPincode(Geo geo) {
        this.pincode = geo;
    }

    public Geo getCountry() {
        return country;
    }

    public Address country(Geo geo) {
        this.country = geo;
        return this;
    }

    public void setCountry(Geo geo) {
        this.country = geo;
    }

    public AddressType getAddressType() {
        return addressType;
    }

    public Address addressType(AddressType addressType) {
        this.addressType = addressType;
        return this;
    }

    public void setAddressType(AddressType addressType) {
        this.addressType = addressType;
    }

    public GeoPoint getGeoPoint() {
        return geoPoint;
    }

    public Address geoPoint(GeoPoint geoPoint) {
        this.geoPoint = geoPoint;
        return this;
    }

    public void setGeoPoint(GeoPoint geoPoint) {
        this.geoPoint = geoPoint;
    }

    public User getUser() {
        return user;
    }

    public Address user(User user) {
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
        if (!(o instanceof Address)) {
            return false;
        }
        return id != null && id.equals(((Address) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + getId() +
            ", streetAddress='" + getStreetAddress() + "'" +
            ", streetAddress2='" + getStreetAddress2() + "'" +
            ", city='" + getCity() + "'" +
            ", landmark='" + getLandmark() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", note='" + getNote() + "'" +
            ", isDefault='" + isIsDefault() + "'" +
            ", customAddressType='" + getCustomAddressType() + "'" +
            "}";
    }
}
