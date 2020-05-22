package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class FacilityGroupTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityGroupType.class);
        FacilityGroupType facilityGroupType1 = new FacilityGroupType();
        facilityGroupType1.setId(1L);
        FacilityGroupType facilityGroupType2 = new FacilityGroupType();
        facilityGroupType2.setId(facilityGroupType1.getId());
        assertThat(facilityGroupType1).isEqualTo(facilityGroupType2);
        facilityGroupType2.setId(2L);
        assertThat(facilityGroupType1).isNotEqualTo(facilityGroupType2);
        facilityGroupType1.setId(null);
        assertThat(facilityGroupType1).isNotEqualTo(facilityGroupType2);
    }
}
