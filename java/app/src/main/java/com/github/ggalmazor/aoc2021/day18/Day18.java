package com.github.ggalmazor.aoc2021.day18;

import static java.util.stream.Collectors.toCollection;

import com.github.ggalmazor.aoc2021.lib.Pair;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Day18 {
  public static class Node {
    public int value;
    public int depth;

    public Node(int value, int depth) {
      this.value = value;
      this.depth = depth;
    }

    public static Node from(char someChar, int depth) {
      return new Node(Integer.parseInt(String.valueOf(someChar)), depth);
    }

    public void incDepth() {
      depth++;
    }

    public void decDepth() {
      depth--;
    }

    public boolean needsToExplode() {
      return depth == 5;
    }

    public boolean needsToSplit() {
      return value >= 10;
    }

    public void sum(Node node) {
      value += node.value;
    }

    public void zeroValue() {
      value = 0;
      depth--;
    }

    @Override
    public String toString() {
      return "Node{" + "value=" + value + ", depth=" + depth + '}';
    }

    public boolean equalsValue(Node node) {
      return this.value == node.value && this.depth == node.depth;
    }
  }

  public static class Nodes {
    public LinkedList<Node> nodes;

    public Nodes(LinkedList<Node> nodes) {
      this.nodes = nodes;
    }

    static Nodes empty() {
      return new Nodes(new LinkedList<>());
    }

    public static Nodes parseLine(String line) {
      Nodes nodes = Nodes.empty();

      var depth = 0;
      for (var i = 0; i < line.length(); i++) {
        var charAtI = line.charAt(i);
        if (charAtI == '[') depth++;
        else if (charAtI == ']') depth--;
        else if (isNumber(charAtI)) nodes.append(Node.from(charAtI, depth));
      }

      return nodes;
    }

    private static boolean isNumber(char someChar) {
      try {
        Integer.parseInt(String.valueOf(someChar));
        return true;
      } catch (NumberFormatException e) {
        return false;
      }
    }

    public static int maxMagnitude(List<Nodes> nodesList) {
      return nodesList.parallelStream()
          .flatMap(left -> nodesList.parallelStream().filter(nodes1 -> !nodes1.equals(left)).map(right -> Pair.of(left.deepCLone(), right.deepCLone())))
          .mapToInt(pair -> pair.left().sum(pair.right()).magnitude()).max().orElseThrow();
    }

    private Nodes deepCLone() {
      return new Nodes(nodes.stream().map(node -> new Node(node.value, node.depth)).collect(Collectors.toCollection(LinkedList::new)));
    }

    private void append(Node node) {
      nodes.add(node);
    }

    public Nodes sum(Nodes nodes) {
      Nodes newNodes = new Nodes(Stream.of(this.nodes, nodes.nodes).flatMap(Collection::stream).collect(toCollection(LinkedList::new)));
      newNodes.forEach(Node::incDepth);

      return newNodes.needsToBeReduced() ? newNodes.reduce() : newNodes;
    }

    private void forEach(Consumer<Node> consumer) {
      nodes.forEach(consumer);
    }

    private Optional<Pair<Node, Integer>> find(Predicate<Node> predicate) {
      for (int i = 0; i < nodes.size(); i++)
        if (predicate.test(nodes.get(i))) return Optional.of(Pair.of(nodes.get(i), i));
      return Optional.empty();
    }

    private List<Pair<Node, Integer>> findAll(Predicate<Node> predicate) {
      List<Pair<Node, Integer>> matchingNodes = new ArrayList<>();
      for (int i = 0; i < nodes.size(); i++)
        if (predicate.test(nodes.get(i))) matchingNodes.add(Pair.of(nodes.get(i), i));
      return matchingNodes;
    }

    /**
     * lol
     **/
    private Pair<Pair<Node, Integer>, Pair<Node, Integer>> getFirstExplodingPair() {
      Pair<Node, Integer> left = find(Node::needsToExplode).orElseThrow();
      Pair<Node, Integer> right = Pair.of(nodes.get(left.right() + 1), left.right() + 1);
      return Pair.of(left, right);
    }

    private Pair<Node, Integer> getFirstSplittingNode() {
      return find(Node::needsToSplit).orElseThrow();
    }


    private Nodes reduce() {
      if (someNodeNeedsToExplode()) {
        var explodingPair = getFirstExplodingPair();
        var left = explodingPair.left();
        var right = explodingPair.right();
        get(left.right() - 1).ifPresent(node -> node.sum(left.left()));
        get(right.right() + 1).ifPresent(node -> node.sum(right.left()));
        left.left().zeroValue();
        nodes.remove((int) right.right());
      } else if (someNodeNeedsToSplit()) {
        var splittingNode = getFirstSplittingNode();
        var left = new Node((int) Math.floor((double) splittingNode.left().value / 2), splittingNode.left().depth + 1);
        var right = new Node((int) Math.ceil((double) splittingNode.left().value / 2), splittingNode.left().depth + 1);
        nodes.set(splittingNode.right(), left);
        nodes.add(splittingNode.right() + 1, right);
      }
      return needsToBeReduced() ? reduce() : this;
    }

    private Optional<Node> get(int index) {
      try {
        return Optional.of(nodes.get(index));
      } catch (IndexOutOfBoundsException e) {
        return Optional.empty();
      }
    }

    private boolean needsToBeReduced() {
      return someNodeNeedsToExplode() || someNodeNeedsToSplit();
    }

    private boolean someNodeNeedsToSplit() {
      return nodes.parallelStream().anyMatch(Node::needsToSplit);
    }

    private boolean someNodeNeedsToExplode() {
      return nodes.parallelStream().anyMatch(Node::needsToExplode);
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      Nodes otherNodes = (Nodes) o;
      if (this.nodes.size() != otherNodes.nodes.size()) return false;
      for (int i = 0; i < this.nodes.size(); i++)
        if (!this.nodes.get(i).equalsValue(otherNodes.nodes.get(i))) return false;
      return true;
    }

    @Override
    public int hashCode() {
      return Objects.hash(nodes);
    }

    public int magnitude() {
      reducePairsAtDepthToTheirMagnitude(4);
      reducePairsAtDepthToTheirMagnitude(3);
      reducePairsAtDepthToTheirMagnitude(2);
      reducePairsAtDepthToTheirMagnitude(1);
      return nodes.get(0).value;
    }

    private void reducePairsAtDepthToTheirMagnitude(int depth) {
      for (int i = 0, maxI = nodes.size(); i < maxI; i++) {
        if (nodes.get(i).depth == depth) {
          Node left = nodes.get(i);
          Optional<Node> maybeRight = get(i + 1);
          if (maybeRight.isPresent()) {
            Node right = maybeRight.orElseThrow();
            Node newLeft = new Node(left.value * 3 + right.value * 2, left.depth - 1);
            nodes.set(i, newLeft);
            nodes.remove(i + 1);
            maxI--;
          } else
            left.decDepth();
        }
      }
    }

  }

  public static class Part1 implements Function<List<String>, Integer> {
    @Override
    public Integer apply(List<String> lines) {
      var nodes = lines.stream().map(Nodes::parseLine).reduce(Nodes::sum).orElseThrow();
      return nodes.magnitude();
    }
  }

  public static class Part2 implements Function<List<String>, Integer> {
    @Override
    public Integer apply(List<String> lines) {
      return Nodes.maxMagnitude(lines.stream().map(Nodes::parseLine).toList());
    }
  }
}
