package com.github.ggalmazor.aoc2021.day18;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

import com.github.ggalmazor.aoc2021.day18.Day18.Nodes;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;
import org.junit.jupiter.api.Test;

class Day18Test {
  @Test
  void sum1() {
    var nodes = Arrays.asList(
        Nodes.parseLine("[1,1]"),
        Nodes.parseLine("[2,2]"),
        Nodes.parseLine("[3,3]"),
        Nodes.parseLine("[4,4]")
    );

    var sum1 = nodes.get(0).sum(nodes.get(1));
    assertThat(sum1.nodes.get(0).value, is(1));
    assertThat(sum1.nodes.get(0).depth, is(2));
    assertThat(sum1.nodes.get(1).value, is(1));
    assertThat(sum1.nodes.get(1).depth, is(2));
    assertThat(sum1.nodes.get(2).value, is(2));
    assertThat(sum1.nodes.get(2).depth, is(2));
    assertThat(sum1.nodes.get(3).value, is(2));
    assertThat(sum1.nodes.get(3).depth, is(2));

    var sum2 = sum1.sum(nodes.get(2));
    assertThat(sum2.nodes.get(0).value, is(1));
    assertThat(sum2.nodes.get(0).depth, is(3));
    assertThat(sum2.nodes.get(1).value, is(1));
    assertThat(sum2.nodes.get(1).depth, is(3));
    assertThat(sum2.nodes.get(2).value, is(2));
    assertThat(sum2.nodes.get(2).depth, is(3));
    assertThat(sum2.nodes.get(3).value, is(2));
    assertThat(sum2.nodes.get(3).depth, is(3));
    assertThat(sum2.nodes.get(4).value, is(3));
    assertThat(sum2.nodes.get(4).depth, is(2));
    assertThat(sum2.nodes.get(5).value, is(3));
    assertThat(sum2.nodes.get(5).depth, is(2));

    var sum3 = sum2.sum(nodes.get(3));
    assertThat(sum3.nodes.get(0).value, is(1));
    assertThat(sum3.nodes.get(0).depth, is(4));
    assertThat(sum3.nodes.get(1).value, is(1));
    assertThat(sum3.nodes.get(1).depth, is(4));
    assertThat(sum3.nodes.get(2).value, is(2));
    assertThat(sum3.nodes.get(2).depth, is(4));
    assertThat(sum3.nodes.get(3).value, is(2));
    assertThat(sum3.nodes.get(3).depth, is(4));
    assertThat(sum3.nodes.get(4).value, is(3));
    assertThat(sum3.nodes.get(4).depth, is(3));
    assertThat(sum3.nodes.get(5).value, is(3));
    assertThat(sum3.nodes.get(5).depth, is(3));
    assertThat(sum3.nodes.get(6).value, is(4));
    assertThat(sum3.nodes.get(6).depth, is(2));
    assertThat(sum3.nodes.get(7).value, is(4));
    assertThat(sum3.nodes.get(7).depth, is(2));
  }

  @Test
  void sum2() {
    var sum = Nodes.parseLine("[[[[1,1],[2,2]],[3,3]],[4,4]]").sum(Nodes.parseLine("[5,5]"));
    assertThat(sum.nodes.get(0).value, is(3));
    assertThat(sum.nodes.get(1).value, is(0));
    assertThat(sum.nodes.get(2).value, is(5));
    assertThat(sum.nodes.get(3).value, is(3));
    assertThat(sum.nodes.get(4).value, is(4));
    assertThat(sum.nodes.get(5).value, is(4));
    assertThat(sum.nodes.get(6).value, is(5));
    assertThat(sum.nodes.get(7).value, is(5));

    assertThat(sum.nodes.get(0).depth, is(4));
    assertThat(sum.nodes.get(1).depth, is(4));
    assertThat(sum.nodes.get(2).depth, is(4));
    assertThat(sum.nodes.get(3).depth, is(4));
    assertThat(sum.nodes.get(4).depth, is(3));
    assertThat(sum.nodes.get(5).depth, is(3));
    assertThat(sum.nodes.get(6).depth, is(2));
    assertThat(sum.nodes.get(7).depth, is(2));
  }

  @Test
  void sum3() {
    var sum = Nodes.parseLine("[[[[3,0],[5,3]],[4,4]],[5,5]]").sum(Nodes.parseLine("[6,6]"));
    assertThat(sum.nodes.get(0).value, is(5));
    assertThat(sum.nodes.get(1).value, is(0));
    assertThat(sum.nodes.get(2).value, is(7));
    assertThat(sum.nodes.get(3).value, is(4));
    assertThat(sum.nodes.get(4).value, is(5));
    assertThat(sum.nodes.get(5).value, is(5));
    assertThat(sum.nodes.get(6).value, is(6));
    assertThat(sum.nodes.get(7).value, is(6));

    assertThat(sum.nodes.get(0).depth, is(4));
    assertThat(sum.nodes.get(1).depth, is(4));
    assertThat(sum.nodes.get(2).depth, is(4));
    assertThat(sum.nodes.get(3).depth, is(4));
    assertThat(sum.nodes.get(4).depth, is(3));
    assertThat(sum.nodes.get(5).depth, is(3));
    assertThat(sum.nodes.get(6).depth, is(2));
    assertThat(sum.nodes.get(7).depth, is(2));
  }

  @Test
  void sum4() {
    String[][] scenarios = {
        {"[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]", "[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]", "[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]"},
        {"[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]", "[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]", "[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]"},
        {"[[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]]", "[7,[5,[[3,8],[1,4]]]]", "[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]"},
        {"[[[[7,7],[7,8]],[[9,5],[8,7]]],[[[6,8],[0,8]],[[9,9],[9,0]]]]", "[[2,[2,2]],[8,[8,1]]]", "[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]"},
        {"[[[[6,6],[6,6]],[[6,0],[6,7]]],[[[7,7],[8,9]],[8,[8,1]]]]", "[2,9]", "[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]"},
        {"[[[[6,6],[7,7]],[[0,7],[7,7]]],[[[5,5],[5,6]],9]]", "[1,[[[9,3],9],[[9,0],[0,7]]]]", "[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]"},
        {"[[[[7,8],[6,7]],[[6,8],[0,8]]],[[[7,7],[5,0]],[[5,5],[5,6]]]]", "[[[5,[7,4]],7],1]", "[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]"},
        {"[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]", "[[[[4,2],2],6],[8,7]]", "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"}
    };

    Stream.of(scenarios).forEach(scenario -> {
      var a = Nodes.parseLine(scenario[0]);
      var b = Nodes.parseLine(scenario[1]);
      var expectedSum = Nodes.parseLine(scenario[2]);
      assertThat(a.sum(b), is(expectedSum));
    });
  }

  @Test
  void magnitude() {
    Object[][] scenarios = {
        {"[[1,2],[[3,4],5]]", 143},
        {"[[[[0,7],4],[[7,8],[6,0]]],[8,1]]", 1384},
        {"[[[[1,1],[2,2]],[3,3]],[4,4]]", 445},
        {"[[[[3,0],[5,3]],[4,4]],[5,5]]", 791},
        {"[[[[5,0],[7,4]],[5,5]],[6,6]]", 1137},
        {"[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]", 3488}
    };

    Stream.of(scenarios).forEach(scenario -> {
      var nodes = Nodes.parseLine((String) scenario[0]);
      var expectedMagnitude = (int) scenario[1];
      assertThat(nodes.magnitude(), is(expectedMagnitude));
    });
  }

}
