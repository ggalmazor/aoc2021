package com.github.ggalmazor.aoc2021.day2;

sealed public interface Command permits Command.Forward, Command.Up, Command.Down {
  static Command parse(String line) {
    if (line.startsWith("up"))
      return new Up(parseUnits(line));
    if (line.startsWith("down"))
      return new Down(parseUnits(line));
    if (line.startsWith("forward"))
      return new Forward(parseUnits(line));

    throw new IllegalArgumentException(String.format("Can't parse command '%s'", line));
  }

  private static int parseUnits(String line) {
    return Integer.parseInt(line.substring(line.length() - 1));
  }

  record Forward(int units) implements Command {
  }

  record Up(int units) implements Command {
  }

  record Down(int units) implements Command {
  }
}
