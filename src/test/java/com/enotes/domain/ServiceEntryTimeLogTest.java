package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class ServiceEntryTimeLogTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceEntryTimeLog.class);
        ServiceEntryTimeLog serviceEntryTimeLog1 = new ServiceEntryTimeLog();
        serviceEntryTimeLog1.setId(1L);
        ServiceEntryTimeLog serviceEntryTimeLog2 = new ServiceEntryTimeLog();
        serviceEntryTimeLog2.setId(serviceEntryTimeLog1.getId());
        assertThat(serviceEntryTimeLog1).isEqualTo(serviceEntryTimeLog2);
        serviceEntryTimeLog2.setId(2L);
        assertThat(serviceEntryTimeLog1).isNotEqualTo(serviceEntryTimeLog2);
        serviceEntryTimeLog1.setId(null);
        assertThat(serviceEntryTimeLog1).isNotEqualTo(serviceEntryTimeLog2);
    }
}
