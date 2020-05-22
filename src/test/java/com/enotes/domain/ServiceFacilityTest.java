package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class ServiceFacilityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceFacility.class);
        ServiceFacility serviceFacility1 = new ServiceFacility();
        serviceFacility1.setId(1L);
        ServiceFacility serviceFacility2 = new ServiceFacility();
        serviceFacility2.setId(serviceFacility1.getId());
        assertThat(serviceFacility1).isEqualTo(serviceFacility2);
        serviceFacility2.setId(2L);
        assertThat(serviceFacility1).isNotEqualTo(serviceFacility2);
        serviceFacility1.setId(null);
        assertThat(serviceFacility1).isNotEqualTo(serviceFacility2);
    }
}
