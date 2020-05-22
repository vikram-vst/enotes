package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class ServiceProviderRoleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceProviderRole.class);
        ServiceProviderRole serviceProviderRole1 = new ServiceProviderRole();
        serviceProviderRole1.setId(1L);
        ServiceProviderRole serviceProviderRole2 = new ServiceProviderRole();
        serviceProviderRole2.setId(serviceProviderRole1.getId());
        assertThat(serviceProviderRole1).isEqualTo(serviceProviderRole2);
        serviceProviderRole2.setId(2L);
        assertThat(serviceProviderRole1).isNotEqualTo(serviceProviderRole2);
        serviceProviderRole1.setId(null);
        assertThat(serviceProviderRole1).isNotEqualTo(serviceProviderRole2);
    }
}
