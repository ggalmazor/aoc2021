package com.github.ggalmazor.aoc2021.lib;

import static com.github.ggalmazor.aoc2021.lib.Lists.range;
import static org.hamcrest.MatcherAssert.assertThat;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

class ListsTest {

  @Test
  public void range_test_1() {
    assertThat(range(0, 10), Matchers.contains(0, 1, 2, 3, 4, 5, 6, 7, 8, 9));
  }

  @Test
  public void range_test_2() {
    assertThat(range(10, 0), Matchers.contains(10, 9, 8, 7, 6, 5, 4, 3, 2, 1));
  }

  @Test
  public void range_test_3() {
    assertThat(range(0, 10, true), Matchers.contains(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
  }

  @Test
  public void range_test_4() {
    assertThat(range(10, 0, true), Matchers.contains(10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0));
  }

}
