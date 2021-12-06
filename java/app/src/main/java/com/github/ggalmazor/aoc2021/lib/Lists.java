package com.github.ggalmazor.aoc2021.lib;

import java.util.ArrayList;
import java.util.List;

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
}
