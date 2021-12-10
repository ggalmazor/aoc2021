package com.github.ggalmazor.aoc2021.day8;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toMap;
import static java.util.stream.Collectors.toSet;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Stream;

record DecoderFactory(Map<String, String> keyToBase) {
  private static Set<String> findPermutations(String str) {
    Set<String> permutations = new HashSet<>();
    if (str == null) {
      return null;
    } else if (str.length() == 0) {
      permutations.add("");
      return permutations;
    }
    char initial = str.charAt(0);
    String remaining = str.substring(1);
    Set<String> words = findPermutations(remaining);
    for (String word : words)
      for (int i = 0; i <= word.length(); i++)
        permutations.add(insert(word, initial, i));
    return permutations;
  }

  private static String insert(String word, char c, int position) {
    String begin = word.substring(0, position);
    String end = word.substring(position);
    return begin + c + end;
  }

  public static DecoderFactory of(String segments) {
    Map<String, String> keyToBase = findPermutations(segments).stream().collect(toMap(
        base -> buildKey(getNumberEncodings(base)),
        Function.identity()
    ));
    return new DecoderFactory(keyToBase);
  }

  private static String[] getNumberEncodings(String base) {
    String[] s = base.split("");
    String[] numbers = new String[10];
    // 0:a 1:b 2:c 3:d 4:e 5:f 6:g
    numbers[0] = Stream.of(0, 1, 2, 4, 5, 6).map(i -> s[i]).sorted().collect(joining());
    numbers[1] = Stream.of(2, 5).map(i -> s[i]).sorted().collect(joining());
    numbers[2] = Stream.of(0, 2, 3, 4, 6).map(i -> s[i]).sorted().collect(joining());
    numbers[3] = Stream.of(0, 2, 3, 5, 6).map(i -> s[i]).sorted().collect(joining());
    numbers[4] = Stream.of(1, 2, 3, 5).map(i -> s[i]).sorted().collect(joining());
    numbers[5] = Stream.of(0, 1, 3, 5, 6).map(i -> s[i]).sorted().collect(joining());
    numbers[6] = Stream.of(0, 1, 3, 4, 5, 6).map(i -> s[i]).sorted().collect(joining());
    numbers[7] = Stream.of(0, 2, 5).map(i -> s[i]).sorted().collect(joining());
    numbers[8] = Stream.of(0, 1, 2, 3, 4, 5, 6).map(i -> s[i]).sorted().collect(joining());
    numbers[9] = Stream.of(0, 1, 2, 3, 5, 6).map(i -> s[i]).sorted().collect(joining());
    return numbers;
  }

  private static String buildKey(String... numbers) {
    Set<String> uniqueNumbers = Stream.of(numbers).map(n -> Stream.of(n.split("")).sorted().collect(joining())).collect(toSet());
    Map<Integer, List<String>> numbersByLength = uniqueNumbers.stream().collect(groupingBy(String::length));
    return numbersByLength.get(2).get(0) +
        numbersByLength.get(3).get(0) +
        numbersByLength.get(4).get(0) +
        numbersByLength.get(5).stream().sorted().collect(joining()) +
        numbersByLength.get(6).stream().sorted().collect(joining()) +
        numbersByLength.get(7).get(0);
  }

  public Decoder getDecoderFor(String... tokens) {
    String key = buildKey(tokens);
    String base = keyToBase.get(key);

    return Decoder.of(base, getNumberEncodings(base));
  }
}
