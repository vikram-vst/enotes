package com.enotes.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.enotes.web.rest.TestUtil;

public class ProductStoreTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductStore.class);
        ProductStore productStore1 = new ProductStore();
        productStore1.setId(1L);
        ProductStore productStore2 = new ProductStore();
        productStore2.setId(productStore1.getId());
        assertThat(productStore1).isEqualTo(productStore2);
        productStore2.setId(2L);
        assertThat(productStore1).isNotEqualTo(productStore2);
        productStore1.setId(null);
        assertThat(productStore1).isNotEqualTo(productStore2);
    }
}
