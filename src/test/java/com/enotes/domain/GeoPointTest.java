package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class GeoPointTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeoPoint.class);
        GeoPoint geoPoint1 = new GeoPoint();
        geoPoint1.setId(1L);
        GeoPoint geoPoint2 = new GeoPoint();
        geoPoint2.setId(geoPoint1.getId());
        assertThat(geoPoint1).isEqualTo(geoPoint2);
        geoPoint2.setId(2L);
        assertThat(geoPoint1).isNotEqualTo(geoPoint2);
        geoPoint1.setId(null);
        assertThat(geoPoint1).isNotEqualTo(geoPoint2);
    }
}
