package com.enotes.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;

/**
 * A OtpAuth.
 */
@Entity
@Table(name = "otp_auth")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OtpAuth implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 10)
    @Column(name = "otp", length = 10)
    private String otp;

    @Column(name = "otp_sent")
    private Boolean otpSent;

    @Column(name = "verification_success")
    private Boolean verificationSuccess;

    @Column(name = "otp_expired")
    private Boolean otpExpired;

    @Column(name = "otp_sent_time")
    private Instant otpSentTime;

    @Column(name = "sent_counter")
    private Integer sentCounter;

    @Column(name = "fail_counter")
    private Integer failCounter;

    @Column(name = "otp_reset_counter")
    private Integer otpResetCounter;

    @Column(name = "max_resend")
    private Integer maxResend;

    @Column(name = "max_reset")
    private Integer maxReset;

    @Column(name = "max_failures")
    private Integer maxFailures;

    @Column(name = "otp_active_time")
    private Integer otpActiveTime;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "last_modified_date")
    private Instant lastModifiedDate;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOtp() {
        return otp;
    }

    public OtpAuth otp(String otp) {
        this.otp = otp;
        return this;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public Boolean isOtpSent() {
        return otpSent;
    }

    public OtpAuth otpSent(Boolean otpSent) {
        this.otpSent = otpSent;
        return this;
    }

    public void setOtpSent(Boolean otpSent) {
        this.otpSent = otpSent;
    }

    public Boolean isVerificationSuccess() {
        return verificationSuccess;
    }

    public OtpAuth verificationSuccess(Boolean verificationSuccess) {
        this.verificationSuccess = verificationSuccess;
        return this;
    }

    public void setVerificationSuccess(Boolean verificationSuccess) {
        this.verificationSuccess = verificationSuccess;
    }

    public Boolean isOtpExpired() {
        return otpExpired;
    }

    public OtpAuth otpExpired(Boolean otpExpired) {
        this.otpExpired = otpExpired;
        return this;
    }

    public void setOtpExpired(Boolean otpExpired) {
        this.otpExpired = otpExpired;
    }

    public Instant getOtpSentTime() {
        return otpSentTime;
    }

    public OtpAuth otpSentTime(Instant otpSentTime) {
        this.otpSentTime = otpSentTime;
        return this;
    }

    public void setOtpSentTime(Instant otpSentTime) {
        this.otpSentTime = otpSentTime;
    }

    public Integer getSentCounter() {
        return sentCounter;
    }

    public OtpAuth sentCounter(Integer sentCounter) {
        this.sentCounter = sentCounter;
        return this;
    }

    public void setSentCounter(Integer sentCounter) {
        this.sentCounter = sentCounter;
    }

    public Integer getFailCounter() {
        return failCounter;
    }

    public OtpAuth failCounter(Integer failCounter) {
        this.failCounter = failCounter;
        return this;
    }

    public void setFailCounter(Integer failCounter) {
        this.failCounter = failCounter;
    }

    public Integer getOtpResetCounter() {
        return otpResetCounter;
    }

    public OtpAuth otpResetCounter(Integer otpResetCounter) {
        this.otpResetCounter = otpResetCounter;
        return this;
    }

    public void setOtpResetCounter(Integer otpResetCounter) {
        this.otpResetCounter = otpResetCounter;
    }

    public Integer getMaxResend() {
        return maxResend;
    }

    public OtpAuth maxResend(Integer maxResend) {
        this.maxResend = maxResend;
        return this;
    }

    public void setMaxResend(Integer maxResend) {
        this.maxResend = maxResend;
    }

    public Integer getMaxReset() {
        return maxReset;
    }

    public OtpAuth maxReset(Integer maxReset) {
        this.maxReset = maxReset;
        return this;
    }

    public void setMaxReset(Integer maxReset) {
        this.maxReset = maxReset;
    }

    public Integer getMaxFailures() {
        return maxFailures;
    }

    public OtpAuth maxFailures(Integer maxFailures) {
        this.maxFailures = maxFailures;
        return this;
    }

    public void setMaxFailures(Integer maxFailures) {
        this.maxFailures = maxFailures;
    }

    public Integer getOtpActiveTime() {
        return otpActiveTime;
    }

    public OtpAuth otpActiveTime(Integer otpActiveTime) {
        this.otpActiveTime = otpActiveTime;
        return this;
    }

    public void setOtpActiveTime(Integer otpActiveTime) {
        this.otpActiveTime = otpActiveTime;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public OtpAuth createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public OtpAuth lastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
        return this;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public User getUser() {
        return user;
    }

    public OtpAuth user(User user) {
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
        if (!(o instanceof OtpAuth)) {
            return false;
        }
        return id != null && id.equals(((OtpAuth) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OtpAuth{" +
            "id=" + getId() +
            ", otp='" + getOtp() + "'" +
            ", otpSent='" + isOtpSent() + "'" +
            ", verificationSuccess='" + isVerificationSuccess() + "'" +
            ", otpExpired='" + isOtpExpired() + "'" +
            ", otpSentTime='" + getOtpSentTime() + "'" +
            ", sentCounter=" + getSentCounter() +
            ", failCounter=" + getFailCounter() +
            ", otpResetCounter=" + getOtpResetCounter() +
            ", maxResend=" + getMaxResend() +
            ", maxReset=" + getMaxReset() +
            ", maxFailures=" + getMaxFailures() +
            ", otpActiveTime=" + getOtpActiveTime() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", lastModifiedDate='" + getLastModifiedDate() + "'" +
            "}";
    }
}
