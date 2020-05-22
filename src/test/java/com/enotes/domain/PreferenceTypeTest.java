package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class PreferenceTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PreferenceType.class);
        PreferenceType preferenceType1 = new PreferenceType();
        preferenceType1.setId(1L);
        PreferenceType preferenceType2 = new PreferenceType();
        preferenceType2.setId(preferenceType1.getId());
        assertThat(preferenceType1).isEqualTo(preferenceType2);
        preferenceType2.setId(2L);
        assertThat(preferenceType1).isNotEqualTo(preferenceType2);
        preferenceType1.setId(null);
        assertThat(preferenceType1).isNotEqualTo(preferenceType2);
    }
}
