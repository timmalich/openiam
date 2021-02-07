package com.malichzhang.openiam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.malichzhang.openiam.web.rest.TestUtil;

public class EntitlementTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Entitlement.class);
        Entitlement entitlement1 = new Entitlement();
        entitlement1.setId(1L);
        Entitlement entitlement2 = new Entitlement();
        entitlement2.setId(entitlement1.getId());
        assertThat(entitlement1).isEqualTo(entitlement2);
        entitlement2.setId(2L);
        assertThat(entitlement1).isNotEqualTo(entitlement2);
        entitlement1.setId(null);
        assertThat(entitlement1).isNotEqualTo(entitlement2);
    }
}
