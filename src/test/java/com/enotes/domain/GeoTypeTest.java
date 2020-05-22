package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class GeoTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeoType.class);
        GeoType geoType1 = new GeoType();
        geoType1.setId(1L);
        GeoType geoType2 = new GeoType();
        geoType2.setId(geoType1.getId());
        assertThat(geoType1).isEqualTo(geoType2);
        geoType2.setId(2L);
        assertThat(geoType1).isNotEqualTo(geoType2);
        geoType1.setId(null);
        assertThat(geoType1).isNotEqualTo(geoType2);
    }
}
