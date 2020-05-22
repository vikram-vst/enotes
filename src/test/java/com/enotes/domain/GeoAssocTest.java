package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class GeoAssocTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeoAssoc.class);
        GeoAssoc geoAssoc1 = new GeoAssoc();
        geoAssoc1.setId(1L);
        GeoAssoc geoAssoc2 = new GeoAssoc();
        geoAssoc2.setId(geoAssoc1.getId());
        assertThat(geoAssoc1).isEqualTo(geoAssoc2);
        geoAssoc2.setId(2L);
        assertThat(geoAssoc1).isNotEqualTo(geoAssoc2);
        geoAssoc1.setId(null);
        assertThat(geoAssoc1).isNotEqualTo(geoAssoc2);
    }
}
