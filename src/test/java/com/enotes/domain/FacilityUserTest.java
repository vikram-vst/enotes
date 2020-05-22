package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class FacilityUserTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FacilityUser.class);
        FacilityUser facilityUser1 = new FacilityUser();
        facilityUser1.setId(1L);
        FacilityUser facilityUser2 = new FacilityUser();
        facilityUser2.setId(facilityUser1.getId());
        assertThat(facilityUser1).isEqualTo(facilityUser2);
        facilityUser2.setId(2L);
        assertThat(facilityUser1).isNotEqualTo(facilityUser2);
        facilityUser1.setId(null);
        assertThat(facilityUser1).isNotEqualTo(facilityUser2);
    }
}
