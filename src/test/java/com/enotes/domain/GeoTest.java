package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class GeoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Geo.class);
        Geo geo1 = new Geo();
        geo1.setId(1L);
        Geo geo2 = new Geo();
        geo2.setId(geo1.getId());
        assertThat(geo1).isEqualTo(geo2);
        geo2.setId(2L);
        assertThat(geo1).isNotEqualTo(geo2);
        geo1.setId(null);
        assertThat(geo1).isNotEqualTo(geo2);
    }
}
