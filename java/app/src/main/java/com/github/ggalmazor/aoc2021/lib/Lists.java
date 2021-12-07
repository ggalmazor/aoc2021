package com.github.ggalmazor.aoc2021.lib;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

public class Lists {
  public static <T> List<List<T>> window(List<T> list, int size, int step) {
    List<List<T>> output = new ArrayList<>();
    for (int i = 0, maxI = list.size() - size + 1; i < maxI; i += step)
      output.add(list.subList(i, i + size));
    return output;
  }

  public static int sum(List<Integer> numbers) {
    return numbers.stream().mapToInt(i -> i).sum();
  }

  public static <T, U> List<Pair<T, U>> zip(List<T> left, List<U> right) {
    if (left.size() != right.size())
      throw new IllegalArgumentException("Can't zip lists with different sizes");

    return IntStream.range(0, left.size()).mapToObj(i -> new Pair<>(left.get(i), right.get(i))).toList();
  }

  public static List<Integer> range(int from, int to) {
    return range(from, to, false);
  }

  public static List<Integer> range(int from, int to, boolean inclusive) {
    if (from > to) {
      int adjustedTo = inclusive ? to - 1 : to;
      return IntStream.range(adjustedTo, from).map(i -> from - i + adjustedTo).boxed().toList();
    }

    return IntStream.range(from, inclusive ? to + 1 : to).boxed().toList();
  }
}
