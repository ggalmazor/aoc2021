import {readLines} from "../lib/input.mjs";
import {Connections} from "./pathfinder.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  return Connections.parse(lines).findPaths("start", "end").length;
}

function part2(lines) {
  return Connections.parse(lines).findPaths("start", "end", true).length;
}

export default function run() {
  console.log("Day 12:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
