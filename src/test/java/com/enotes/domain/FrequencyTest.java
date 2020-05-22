package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class FrequencyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Frequency.class);
        Frequency frequency1 = new Frequency();
        frequency1.setId(1L);
        Frequency frequency2 = new Frequency();
        frequency2.setId(frequency1.getId());
        assertThat(frequency1).isEqualTo(frequency2);
        frequency2.setId(2L);
        assertThat(frequency1).isNotEqualTo(frequency2);
        frequency1.setId(null);
        assertThat(frequency1).isNotEqualTo(frequency2);
    }
}
