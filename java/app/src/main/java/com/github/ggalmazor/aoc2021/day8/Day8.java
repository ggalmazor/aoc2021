package com.github.ggalmazor.aoc2021.day8;

import static java.util.stream.Collectors.joining;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Stream;

public class Day8 {
  public static class Part2 implements Function<List<String>, Integer> {
    @Override
    public Integer apply(List<String> lines) {
      DecoderFactory decoderFactory = DecoderFactory.of("abcdefg");

      return lines.stream().mapToInt(line -> {
        Decoder decoder = decoderFactory.getDecoderFor(line.replace(" | ", " ").split(" "));

        return Integer.parseInt(
            Stream.of(line.split(" \\| ")[1].split(" "))
                .map(s -> Stream.of(s.split("")).sorted().collect(joining()))
                .map(k -> decoder.decode(k).toString())
                .collect(joining())
        );
      }).sum();
    }
  }

}
