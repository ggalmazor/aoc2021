import {readLines} from "../lib/input.mjs";
import {sum} from "../lib/numbers.mjs";
import Decoder from "./decoder.mjs";
import {flatten} from "../lib/lists.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  return flatten(lines.map(line => line.split(" | ")[1].split(" "))).map(s => s.length).filter(l => [2, 3, 4, 7].includes(l)).length
}

function part2(lines) {
  return lines.map(line => {
    const decoder = Decoder.analyze(line);
    return decoder.decode(line.split(" | ")[1]);
  }).reduce(sum);
}

export default function run() {
  console.log("Day 8:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
