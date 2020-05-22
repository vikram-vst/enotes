package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class FacilityGroupTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityGroup.class);
        FacilityGroup facilityGroup1 = new FacilityGroup();
        facilityGroup1.setId(1L);
        FacilityGroup facilityGroup2 = new FacilityGroup();
        facilityGroup2.setId(facilityGroup1.getId());
        assertThat(facilityGroup1).isEqualTo(facilityGroup2);
        facilityGroup2.setId(2L);
        assertThat(facilityGroup1).isNotEqualTo(facilityGroup2);
        facilityGroup1.setId(null);
        assertThat(facilityGroup1).isNotEqualTo(facilityGroup2);
    }
}
