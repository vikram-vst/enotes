package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class GeoAssocTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeoAssocType.class);
        GeoAssocType geoAssocType1 = new GeoAssocType();
        geoAssocType1.setId(1L);
        GeoAssocType geoAssocType2 = new GeoAssocType();
        geoAssocType2.setId(geoAssocType1.getId());
        assertThat(geoAssocType1).isEqualTo(geoAssocType2);
        geoAssocType2.setId(2L);
        assertThat(geoAssocType1).isNotEqualTo(geoAssocType2);
        geoAssocType1.setId(null);
        assertThat(geoAssocType1).isNotEqualTo(geoAssocType2);
    }
}
