package com.github.ggalmazor.aoc2021.day8;

import java.util.HashMap;
import java.util.Map;

record Decoder(String base, Map<String, Integer> encodings) {

  public static Decoder of(String base, String[] baseNumbers) {
    Map<String, Integer> encodings = new HashMap<>();
    for (int i = 0; i < 10; i++)
      encodings.put(baseNumbers[i], i);
    return new Decoder(base, encodings);
  }

  public Integer decode(String number) {
    return encodings.get(number);
  }
}
