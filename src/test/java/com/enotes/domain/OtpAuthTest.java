package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class OtpAuthTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OtpAuth.class);
        OtpAuth otpAuth1 = new OtpAuth();
        otpAuth1.setId(1L);
        OtpAuth otpAuth2 = new OtpAuth();
        otpAuth2.setId(otpAuth1.getId());
        assertThat(otpAuth1).isEqualTo(otpAuth2);
        otpAuth2.setId(2L);
        assertThat(otpAuth1).isNotEqualTo(otpAuth2);
        otpAuth1.setId(null);
        assertThat(otpAuth1).isNotEqualTo(otpAuth2);
    }
}
