package com.github.ggalmazor.aoc2021.day5;

public record Coordinates(int x, int y) {
  public static Coordinates parse(String line) {
    String[] split = line.split(",");
    return new Coordinates(Integer.parseInt(split[0]), Integer.parseInt(split[1]));
  }
}
