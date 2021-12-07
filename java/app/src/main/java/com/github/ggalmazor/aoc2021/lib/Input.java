package com.github.ggalmazor.aoc2021.lib;

import static java.util.Objects.requireNonNull;
import static java.util.stream.Collectors.toList;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.function.Function;

public class Input {
  public static List<String> readLines(int day) {
    return readLines(day, Function.identity());
  }

  public static <T> List<T> readLines(int day, Function<String, T> mapper) {
    try {
      URL resource = Input.class.getClassLoader().getResource(String.format("input/day%d", day));
      Path path = Paths.get(requireNonNull(resource).toURI());
      return Files.readAllLines(path).stream().map(mapper).collect(toList());
    } catch (URISyntaxException | IOException e) {
      throw new RuntimeException(e);
    }
  }
}
