package com.github.ggalmazor.aoc2021.day5;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import org.junit.jupiter.api.Test;

class SegmentTest {
  @Test
  public void expands_to_its_component_coordinates() {
    assertThat(Segment.parse("9,4 -> 3,4").expand().size(), is(7));
  }

}
