import {readLines} from "../lib/input.mjs";
import {Segment} from "./segment.mjs";
import {Map} from "./map.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  const map = new Map();
  lines.map(Segment.from)
    .filter(segment => !segment.isDiagonal())
    .forEach(segment => map.project(segment));
  map.render("part1.png");
  return map.filter(cell => cell >= 2).length;
}

function part2(lines) {
  const map = new Map();
  lines.map(Segment.from)
    .forEach(segment => map.project(segment));
  map.render("part2.png");
  return map.filter(cell => cell >= 2).length;
}

export default function run() {
  console.log("Day 5:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
