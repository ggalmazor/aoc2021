import {readLines} from "../lib/input.mjs";
import {autocomplete, autocompleteScore, corrupted, syntaxErrorScore} from "./chunk.mjs";
import {sum} from "../lib/numbers.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  return lines.map(syntaxErrorScore).reduce(sum);
}

function part2(lines) {
  const scores = lines.filter(line => !corrupted(line)[0]).map(line => autocomplete(line)[1]).map(line => autocompleteScore(line)).sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}

export default function run() {
  console.log("Day 10:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
