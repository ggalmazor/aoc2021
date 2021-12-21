package com.github.ggalmazor.aoc2021.lib;

public record Pair<T, U>(T left, U right) {
  public static <TT, UU> Pair<TT, UU> of(TT t, UU u) {
    return new Pair<>(t, u);
  }
}
