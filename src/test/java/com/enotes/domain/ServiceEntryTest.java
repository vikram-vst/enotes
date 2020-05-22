package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class ServiceEntryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceEntry.class);
        ServiceEntry serviceEntry1 = new ServiceEntry();
        serviceEntry1.setId(1L);
        ServiceEntry serviceEntry2 = new ServiceEntry();
        serviceEntry2.setId(serviceEntry1.getId());
        assertThat(serviceEntry1).isEqualTo(serviceEntry2);
        serviceEntry2.setId(2L);
        assertThat(serviceEntry1).isNotEqualTo(serviceEntry2);
        serviceEntry1.setId(null);
        assertThat(serviceEntry1).isNotEqualTo(serviceEntry2);
    }
}
