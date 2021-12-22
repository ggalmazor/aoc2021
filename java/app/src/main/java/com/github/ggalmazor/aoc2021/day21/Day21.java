package com.github.ggalmazor.aoc2021.day21;

import static java.util.stream.Collectors.toCollection;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

public class Day21 {

  private static void playGame(Dice dice, Player player1, Player player2) {
    var somebodyWon = false;
    while (!somebodyWon) {
      player1.roll(dice);
      somebodyWon = player1.won();
      if (!somebodyWon) {
        player2.roll(dice);
        somebodyWon = player2.won();
      }
    }
  }

  interface Dice {
    int roll();
  }

  public static class DeterministicDice implements Dice {
    private final AtomicInteger seq = new AtomicInteger(0);
    public int rolls = 0;

    @Override
    public int roll() {
      rolls++;
      return (seq.getAndIncrement() % 100) + 1;
    }
  }

  public static class DiracDice implements Dice {
    public final int[] values;
    public int rolls = 0;
    private int index = 0;

    public DiracDice(int[] values) {
      this.values = values;
    }

    @Override
    public int roll() {
      rolls++;
      if (index == 50)
        throw new RuntimeException("Dirac dice out of values");
      return values[index++] + 1;
    }
  }

  public static class DiracDiceFactory {
    private static final AtomicInteger seedSeq = new AtomicInteger(0);

    public static DiracDice next() {
      int seed = seedSeq.getAndIncrement();
      List<Integer> threeBaseSeed = Arrays.stream(Integer.toString(seed, 3).split("")).map(Integer::parseInt).collect(toCollection(CopyOnWriteArrayList::new));
      while (threeBaseSeed.size() < 50)
        threeBaseSeed.add(0, 0);
      return new DiracDice(threeBaseSeed.stream().mapToInt(Integer::intValue).toArray());
    }
  }

  public static class Player {
    public int positionIndex;
    private int winScore = 1000;
    private int score = 0;

    public Player(int positionIndex) {
      this.positionIndex = positionIndex;
    }

    public Player(int positionIndex, int winScore) {
      this.positionIndex = positionIndex;
      this.winScore = winScore;
    }

    static Player at(int position) {
      return new Player(position - 1);
    }

    static Player at(int position, int winScore) {
      return new Player(position - 1, winScore);
    }

    public void roll(Dice dice) {
      int roll = dice.roll() + dice.roll() + dice.roll();
      positionIndex = (positionIndex + roll) % 10;
      score += positionIndex + 1;
    }

    public boolean won() {
      return score >= winScore;
    }

    @Override
    public String toString() {
      return "Player{" +
          "positionIndex=" + positionIndex +
          ", winScore=" + winScore +
          ", score=" + score +
          '}';
    }
  }

  public static class Part1 implements Function<List<String>, Integer> {
    @Override
    public Integer apply(List<String> lines) {
      var dice = new DeterministicDice();
      Player player1 = Player.at(10);
      Player player2 = Player.at(7);
      playGame(dice, player1, player2);
      return (player1.won() ? player2.score : player1.score) * dice.rolls;
    }
  }
}
