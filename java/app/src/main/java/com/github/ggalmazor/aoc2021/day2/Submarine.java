package com.github.ggalmazor.aoc2021.day2;

public record Submarine(int position, int aim, int depth) {
  public Submarine forward(int units) {
    return new Submarine(position + units, aim, depth + aim * units);
  }

  public Submarine up(int units) {
    return new Submarine(position, aim, depth - units);
  }

  public Submarine down(int units) {
    return new Submarine(position, aim, depth + units);
  }

  public Submarine aimUp(int units) {
    return new Submarine(position, aim - units, depth);
  }

  public Submarine aimDown(int units) {
    return new Submarine(position, aim + units, depth);
  }
}
