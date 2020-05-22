package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class ServiceEntryStatusLogTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceEntryStatusLog.class);
        ServiceEntryStatusLog serviceEntryStatusLog1 = new ServiceEntryStatusLog();
        serviceEntryStatusLog1.setId(1L);
        ServiceEntryStatusLog serviceEntryStatusLog2 = new ServiceEntryStatusLog();
        serviceEntryStatusLog2.setId(serviceEntryStatusLog1.getId());
        assertThat(serviceEntryStatusLog1).isEqualTo(serviceEntryStatusLog2);
        serviceEntryStatusLog2.setId(2L);
        assertThat(serviceEntryStatusLog1).isNotEqualTo(serviceEntryStatusLog2);
        serviceEntryStatusLog1.setId(null);
        assertThat(serviceEntryStatusLog1).isNotEqualTo(serviceEntryStatusLog2);
    }
}
