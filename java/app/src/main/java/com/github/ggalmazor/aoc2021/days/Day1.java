package com.github.ggalmazor.aoc2021.days;

import static com.github.ggalmazor.aoc2021.lib.Lists.window;
import static java.util.stream.Collectors.toList;

import com.github.ggalmazor.aoc2021.lib.Lists;
import java.util.List;
import java.util.function.Function;

public class Day1 {
  private static List<Integer> parseDepths(List<String> lines) {
    return lines.stream()
        .map(Integer::parseInt)
        .collect(toList());
  }

  private static int countIncreases(List<List<Integer>> pairs) {
    return pairs.stream()
        .mapToInt(pair -> (pair.get(1) - pair.get(0)) > 0 ? 1 : 0)
        .sum();
  }

  public static class Part1 implements Function<List<String>, Integer> {
    public Integer apply(List<String> lines) {
      return countIncreases(window(parseDepths(lines), 2, 1));
    }
  }

  public static class Part2 implements Function<List<String>, Integer> {
    public Integer apply(List<String> lines) {
      List<Integer> sums = window(parseDepths(lines), 3, 1).stream()
          .map(Lists::sum)
          .collect(toList());

      return countIncreases(window(sums, 2, 1));
    }
  }
}
