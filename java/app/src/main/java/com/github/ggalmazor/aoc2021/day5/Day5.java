package com.github.ggalmazor.aoc2021.day5;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.groupingBy;

import java.util.List;
import java.util.function.Function;

public class Day5 {
  private static List<Segment> parseSegments(List<String> lines) {
    return lines.stream().filter(line -> !line.trim().isEmpty()).map(Segment::parse).toList();
  }

  private static int count(List<Segment> segments) {
    return Math.toIntExact(segments.stream()
        .flatMap(segment -> segment.expand().stream())
        .collect(groupingBy(identity()))
        .values().stream()
        .map(List::size)
        .filter(count -> count > 1).count());
  }

  public static class Part1 implements Function<List<String>, Integer> {
    @Override
    public Integer apply(List<String> lines) {
      List<Segment> segments = parseSegments(lines).stream()
          .filter(segment -> !segment.isDiagonal())
          .toList();
      return count(segments);
    }
  }

  public static class Part2 implements Function<List<String>, Integer> {
    @Override
    public Integer apply(List<String> lines) {
      List<Segment> segments = parseSegments(lines);
      return count(segments);
    }
  }
}
