package com.github.ggalmazor.aoc2021.days;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import java.util.List;
import org.junit.jupiter.api.Test;

class Day1Test {
  @Test
  void returns_the_number_of_times_depth_has_increased() {
    var lines = """
        199
        200
        208
        210
        200
        207
        240
        269
        260
        263""";
    assertThat(new Day1.Part1().apply(List.of(lines.split("\n"))), is(7));
    assertThat(new Day1.Part2().apply(List.of(lines.split("\n"))), is(5));
  }
}
