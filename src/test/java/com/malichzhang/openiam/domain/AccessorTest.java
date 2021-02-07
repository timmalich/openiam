package com.malichzhang.openiam.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.malichzhang.openiam.web.rest.TestUtil;

public class AccessorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Accessor.class);
        Accessor accessor1 = new Accessor();
        accessor1.setId(1L);
        Accessor accessor2 = new Accessor();
        accessor2.setId(accessor1.getId());
        assertThat(accessor1).isEqualTo(accessor2);
        accessor2.setId(2L);
        assertThat(accessor1).isNotEqualTo(accessor2);
        accessor1.setId(null);
        assertThat(accessor1).isNotEqualTo(accessor2);
    }
}
