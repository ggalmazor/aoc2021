package com.github.ggalmazor.aoc2021.day5;

import static com.github.ggalmazor.aoc2021.lib.Lists.range;
import static com.github.ggalmazor.aoc2021.lib.Lists.zip;

import java.util.List;

public record Segment(Coordinates a, Coordinates b) {
  public static Segment parse(String line) {
    String[] split = line.split(" -> ");
    Coordinates a = Coordinates.parse(split[0]);
    Coordinates b = Coordinates.parse(split[1]);
    return new Segment(a, b);
  }

  public List<Coordinates> expand() {
    if (isHorizontal())
      return range(a.x(), b.x(), true).stream().map(x -> new Coordinates(x, a.y())).toList();

    if (isVertical())
      return range(a.y(), b.y(), true).stream().map(y -> new Coordinates(a.x(), y)).toList();

    return zip(range(a.x(), b.x(), true), range(a.y(), b.y(), true)).stream().map(pair -> new Coordinates(pair.left(), pair.right())).toList();
  }

  private boolean isHorizontal() {
    return a.y() == b.y();
  }

  private boolean isVertical() {
    return a.x() == b.x();
  }

  public boolean isDiagonal() {
    return !isHorizontal() && !isVertical();
  }
}
