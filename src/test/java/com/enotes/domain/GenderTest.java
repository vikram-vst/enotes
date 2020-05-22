package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class GenderTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gender.class);
        Gender gender1 = new Gender();
        gender1.setId(1L);
        Gender gender2 = new Gender();
        gender2.setId(gender1.getId());
        assertThat(gender1).isEqualTo(gender2);
        gender2.setId(2L);
        assertThat(gender1).isNotEqualTo(gender2);
        gender1.setId(null);
        assertThat(gender1).isNotEqualTo(gender2);
    }
}
