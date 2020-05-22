package com.enotes.web.rest;

import com.enotes.RedisTestContainerExtension;
import com.enotes.EnotesApp;
import com.enotes.domain.OtpAuth;
import com.enotes.repository.OtpAuthRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OtpAuthResource} REST controller.
 */
@SpringBootTest(classes = EnotesApp.class)
@ExtendWith({ RedisTestContainerExtension.class, MockitoExtension.class })
@AutoConfigureMockMvc
@WithMockUser
public class OtpAuthResourceIT {

    private static final String DEFAULT_OTP = "AAAAAAAAAA";
    private static final String UPDATED_OTP = "BBBBBBBBBB";

    private static final Boolean DEFAULT_OTP_SENT = false;
    private static final Boolean UPDATED_OTP_SENT = true;

    private static final Boolean DEFAULT_VERIFICATION_SUCCESS = false;
    private static final Boolean UPDATED_VERIFICATION_SUCCESS = true;

    private static final Boolean DEFAULT_OTP_EXPIRED = false;
    private static final Boolean UPDATED_OTP_EXPIRED = true;

    private static final Instant DEFAULT_OTP_SENT_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_OTP_SENT_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_SENT_COUNTER = 1;
    private static final Integer UPDATED_SENT_COUNTER = 2;

    private static final Integer DEFAULT_FAIL_COUNTER = 1;
    private static final Integer UPDATED_FAIL_COUNTER = 2;

    private static final Integer DEFAULT_OTP_RESET_COUNTER = 1;
    private static final Integer UPDATED_OTP_RESET_COUNTER = 2;

    private static final Integer DEFAULT_MAX_RESEND = 1;
    private static final Integer UPDATED_MAX_RESEND = 2;

    private static final Integer DEFAULT_MAX_RESET = 1;
    private static final Integer UPDATED_MAX_RESET = 2;

    private static final Integer DEFAULT_MAX_FAILURES = 1;
    private static final Integer UPDATED_MAX_FAILURES = 2;

    private static final Integer DEFAULT_OTP_ACTIVE_TIME = 1;
    private static final Integer UPDATED_OTP_ACTIVE_TIME = 2;

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private OtpAuthRepository otpAuthRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOtpAuthMockMvc;

    private OtpAuth otpAuth;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OtpAuth createEntity(EntityManager em) {
        OtpAuth otpAuth = new OtpAuth()
            .otp(DEFAULT_OTP)
            .otpSent(DEFAULT_OTP_SENT)
            .verificationSuccess(DEFAULT_VERIFICATION_SUCCESS)
            .otpExpired(DEFAULT_OTP_EXPIRED)
            .otpSentTime(DEFAULT_OTP_SENT_TIME)
            .sentCounter(DEFAULT_SENT_COUNTER)
            .failCounter(DEFAULT_FAIL_COUNTER)
            .otpResetCounter(DEFAULT_OTP_RESET_COUNTER)
            .maxResend(DEFAULT_MAX_RESEND)
            .maxReset(DEFAULT_MAX_RESET)
            .maxFailures(DEFAULT_MAX_FAILURES)
            .otpActiveTime(DEFAULT_OTP_ACTIVE_TIME)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return otpAuth;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OtpAuth createUpdatedEntity(EntityManager em) {
        OtpAuth otpAuth = new OtpAuth()
            .otp(UPDATED_OTP)
            .otpSent(UPDATED_OTP_SENT)
            .verificationSuccess(UPDATED_VERIFICATION_SUCCESS)
            .otpExpired(UPDATED_OTP_EXPIRED)
            .otpSentTime(UPDATED_OTP_SENT_TIME)
            .sentCounter(UPDATED_SENT_COUNTER)
            .failCounter(UPDATED_FAIL_COUNTER)
            .otpResetCounter(UPDATED_OTP_RESET_COUNTER)
            .maxResend(UPDATED_MAX_RESEND)
            .maxReset(UPDATED_MAX_RESET)
            .maxFailures(UPDATED_MAX_FAILURES)
            .otpActiveTime(UPDATED_OTP_ACTIVE_TIME)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
        return otpAuth;
    }

    @BeforeEach
    public void initTest() {
        otpAuth = createEntity(em);
    }

    @Test
    @Transactional
    public void createOtpAuth() throws Exception {
        int databaseSizeBeforeCreate = otpAuthRepository.findAll().size();

        // Create the OtpAuth
        restOtpAuthMockMvc.perform(post("/api/otp-auths")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpAuth)))
            .andExpect(status().isCreated());

        // Validate the OtpAuth in the database
        List<OtpAuth> otpAuthList = otpAuthRepository.findAll();
        assertThat(otpAuthList).hasSize(databaseSizeBeforeCreate + 1);
        OtpAuth testOtpAuth = otpAuthList.get(otpAuthList.size() - 1);
        assertThat(testOtpAuth.getOtp()).isEqualTo(DEFAULT_OTP);
        assertThat(testOtpAuth.isOtpSent()).isEqualTo(DEFAULT_OTP_SENT);
        assertThat(testOtpAuth.isVerificationSuccess()).isEqualTo(DEFAULT_VERIFICATION_SUCCESS);
        assertThat(testOtpAuth.isOtpExpired()).isEqualTo(DEFAULT_OTP_EXPIRED);
        assertThat(testOtpAuth.getOtpSentTime()).isEqualTo(DEFAULT_OTP_SENT_TIME);
        assertThat(testOtpAuth.getSentCounter()).isEqualTo(DEFAULT_SENT_COUNTER);
        assertThat(testOtpAuth.getFailCounter()).isEqualTo(DEFAULT_FAIL_COUNTER);
        assertThat(testOtpAuth.getOtpResetCounter()).isEqualTo(DEFAULT_OTP_RESET_COUNTER);
        assertThat(testOtpAuth.getMaxResend()).isEqualTo(DEFAULT_MAX_RESEND);
        assertThat(testOtpAuth.getMaxReset()).isEqualTo(DEFAULT_MAX_RESET);
        assertThat(testOtpAuth.getMaxFailures()).isEqualTo(DEFAULT_MAX_FAILURES);
        assertThat(testOtpAuth.getOtpActiveTime()).isEqualTo(DEFAULT_OTP_ACTIVE_TIME);
        assertThat(testOtpAuth.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testOtpAuth.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createOtpAuthWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = otpAuthRepository.findAll().size();

        // Create the OtpAuth with an existing ID
        otpAuth.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOtpAuthMockMvc.perform(post("/api/otp-auths")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpAuth)))
            .andExpect(status().isBadRequest());

        // Validate the OtpAuth in the database
        List<OtpAuth> otpAuthList = otpAuthRepository.findAll();
        assertThat(otpAuthList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOtpAuths() throws Exception {
        // Initialize the database
        otpAuthRepository.saveAndFlush(otpAuth);

        // Get all the otpAuthList
        restOtpAuthMockMvc.perform(get("/api/otp-auths?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(otpAuth.getId().intValue())))
            .andExpect(jsonPath("$.[*].otp").value(hasItem(DEFAULT_OTP)))
            .andExpect(jsonPath("$.[*].otpSent").value(hasItem(DEFAULT_OTP_SENT.booleanValue())))
            .andExpect(jsonPath("$.[*].verificationSuccess").value(hasItem(DEFAULT_VERIFICATION_SUCCESS.booleanValue())))
            .andExpect(jsonPath("$.[*].otpExpired").value(hasItem(DEFAULT_OTP_EXPIRED.booleanValue())))
            .andExpect(jsonPath("$.[*].otpSentTime").value(hasItem(DEFAULT_OTP_SENT_TIME.toString())))
            .andExpect(jsonPath("$.[*].sentCounter").value(hasItem(DEFAULT_SENT_COUNTER)))
            .andExpect(jsonPath("$.[*].failCounter").value(hasItem(DEFAULT_FAIL_COUNTER)))
            .andExpect(jsonPath("$.[*].otpResetCounter").value(hasItem(DEFAULT_OTP_RESET_COUNTER)))
            .andExpect(jsonPath("$.[*].maxResend").value(hasItem(DEFAULT_MAX_RESEND)))
            .andExpect(jsonPath("$.[*].maxReset").value(hasItem(DEFAULT_MAX_RESET)))
            .andExpect(jsonPath("$.[*].maxFailures").value(hasItem(DEFAULT_MAX_FAILURES)))
            .andExpect(jsonPath("$.[*].otpActiveTime").value(hasItem(DEFAULT_OTP_ACTIVE_TIME)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getOtpAuth() throws Exception {
        // Initialize the database
        otpAuthRepository.saveAndFlush(otpAuth);

        // Get the otpAuth
        restOtpAuthMockMvc.perform(get("/api/otp-auths/{id}", otpAuth.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(otpAuth.getId().intValue()))
            .andExpect(jsonPath("$.otp").value(DEFAULT_OTP))
            .andExpect(jsonPath("$.otpSent").value(DEFAULT_OTP_SENT.booleanValue()))
            .andExpect(jsonPath("$.verificationSuccess").value(DEFAULT_VERIFICATION_SUCCESS.booleanValue()))
            .andExpect(jsonPath("$.otpExpired").value(DEFAULT_OTP_EXPIRED.booleanValue()))
            .andExpect(jsonPath("$.otpSentTime").value(DEFAULT_OTP_SENT_TIME.toString()))
            .andExpect(jsonPath("$.sentCounter").value(DEFAULT_SENT_COUNTER))
            .andExpect(jsonPath("$.failCounter").value(DEFAULT_FAIL_COUNTER))
            .andExpect(jsonPath("$.otpResetCounter").value(DEFAULT_OTP_RESET_COUNTER))
            .andExpect(jsonPath("$.maxResend").value(DEFAULT_MAX_RESEND))
            .andExpect(jsonPath("$.maxReset").value(DEFAULT_MAX_RESET))
            .andExpect(jsonPath("$.maxFailures").value(DEFAULT_MAX_FAILURES))
            .andExpect(jsonPath("$.otpActiveTime").value(DEFAULT_OTP_ACTIVE_TIME))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOtpAuth() throws Exception {
        // Get the otpAuth
        restOtpAuthMockMvc.perform(get("/api/otp-auths/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOtpAuth() throws Exception {
        // Initialize the database
        otpAuthRepository.saveAndFlush(otpAuth);

        int databaseSizeBeforeUpdate = otpAuthRepository.findAll().size();

        // Update the otpAuth
        OtpAuth updatedOtpAuth = otpAuthRepository.findById(otpAuth.getId()).get();
        // Disconnect from session so that the updates on updatedOtpAuth are not directly saved in db
        em.detach(updatedOtpAuth);
        updatedOtpAuth
            .otp(UPDATED_OTP)
            .otpSent(UPDATED_OTP_SENT)
            .verificationSuccess(UPDATED_VERIFICATION_SUCCESS)
            .otpExpired(UPDATED_OTP_EXPIRED)
            .otpSentTime(UPDATED_OTP_SENT_TIME)
            .sentCounter(UPDATED_SENT_COUNTER)
            .failCounter(UPDATED_FAIL_COUNTER)
            .otpResetCounter(UPDATED_OTP_RESET_COUNTER)
            .maxResend(UPDATED_MAX_RESEND)
            .maxReset(UPDATED_MAX_RESET)
            .maxFailures(UPDATED_MAX_FAILURES)
            .otpActiveTime(UPDATED_OTP_ACTIVE_TIME)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restOtpAuthMockMvc.perform(put("/api/otp-auths")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOtpAuth)))
            .andExpect(status().isOk());

        // Validate the OtpAuth in the database
        List<OtpAuth> otpAuthList = otpAuthRepository.findAll();
        assertThat(otpAuthList).hasSize(databaseSizeBeforeUpdate);
        OtpAuth testOtpAuth = otpAuthList.get(otpAuthList.size() - 1);
        assertThat(testOtpAuth.getOtp()).isEqualTo(UPDATED_OTP);
        assertThat(testOtpAuth.isOtpSent()).isEqualTo(UPDATED_OTP_SENT);
        assertThat(testOtpAuth.isVerificationSuccess()).isEqualTo(UPDATED_VERIFICATION_SUCCESS);
        assertThat(testOtpAuth.isOtpExpired()).isEqualTo(UPDATED_OTP_EXPIRED);
        assertThat(testOtpAuth.getOtpSentTime()).isEqualTo(UPDATED_OTP_SENT_TIME);
        assertThat(testOtpAuth.getSentCounter()).isEqualTo(UPDATED_SENT_COUNTER);
        assertThat(testOtpAuth.getFailCounter()).isEqualTo(UPDATED_FAIL_COUNTER);
        assertThat(testOtpAuth.getOtpResetCounter()).isEqualTo(UPDATED_OTP_RESET_COUNTER);
        assertThat(testOtpAuth.getMaxResend()).isEqualTo(UPDATED_MAX_RESEND);
        assertThat(testOtpAuth.getMaxReset()).isEqualTo(UPDATED_MAX_RESET);
        assertThat(testOtpAuth.getMaxFailures()).isEqualTo(UPDATED_MAX_FAILURES);
        assertThat(testOtpAuth.getOtpActiveTime()).isEqualTo(UPDATED_OTP_ACTIVE_TIME);
        assertThat(testOtpAuth.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testOtpAuth.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingOtpAuth() throws Exception {
        int databaseSizeBeforeUpdate = otpAuthRepository.findAll().size();

        // Create the OtpAuth

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOtpAuthMockMvc.perform(put("/api/otp-auths")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpAuth)))
            .andExpect(status().isBadRequest());

        // Validate the OtpAuth in the database
        List<OtpAuth> otpAuthList = otpAuthRepository.findAll();
        assertThat(otpAuthList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOtpAuth() throws Exception {
        // Initialize the database
        otpAuthRepository.saveAndFlush(otpAuth);

        int databaseSizeBeforeDelete = otpAuthRepository.findAll().size();

        // Delete the otpAuth
        restOtpAuthMockMvc.perform(delete("/api/otp-auths/{id}", otpAuth.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OtpAuth> otpAuthList = otpAuthRepository.findAll();
        assertThat(otpAuthList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
