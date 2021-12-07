package com.github.ggalmazor.aoc2021.day2;

import java.util.List;
import java.util.function.Function;

public class Day2 {
  private static List<Command> parseCommands(List<String> lines) {
    return lines.stream().filter(line -> !line.trim().isEmpty()).map(Command::parse).toList();
  }

  public static class Part1 implements Function<List<String>, Integer> {
    public Integer apply(List<String> lines) {
      var commands = parseCommands(lines);
      var sub = new Submarine(0, 0, 0);

      for (var command : commands)
        switch (command) {
          case Command.Forward f:
            sub = sub.forward(f.units());
            break;
          case Command.Up u:
            sub = sub.up(u.units());
            break;
          case Command.Down d:
            sub = sub.down(d.units());
            break;
        }
      return sub.position() * sub.depth();
    }

  }

  public static class Part2 implements Function<List<String>, Integer> {
    public Integer apply(List<String> lines) {
      var commands = parseCommands(lines);
      var sub = new Submarine(0, 0, 0);

      for (var command : commands)
        switch (command) {
          case Command.Forward f:
            sub = sub.forward(f.units());
            break;
          case Command.Up u:
            sub = sub.aimUp(u.units());
            break;
          case Command.Down d:
            sub = sub.aimDown(d.units());
            break;
        }
      return sub.position() * sub.depth();
    }
  }


}
