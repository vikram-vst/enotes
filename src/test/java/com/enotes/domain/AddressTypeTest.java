package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class AddressTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressType.class);
        AddressType addressType1 = new AddressType();
        addressType1.setId(1L);
        AddressType addressType2 = new AddressType();
        addressType2.setId(addressType1.getId());
        assertThat(addressType1).isEqualTo(addressType2);
        addressType2.setId(2L);
        assertThat(addressType1).isNotEqualTo(addressType2);
        addressType1.setId(null);
        assertThat(addressType1).isNotEqualTo(addressType2);
    }
}
