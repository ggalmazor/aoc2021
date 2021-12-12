import {readLines} from "../lib/input.mjs";
import {Octoparty} from "./octoparty.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  const octoparty = Octoparty.parse(lines);
  for(let n= 0; n < 100; n++)
    octoparty.step();
  return octoparty.flashCount;
}

function part2(lines) {
  const octoparty = Octoparty.parse(lines);
  while(!octoparty.allFlashed)
    octoparty.step();
  return octoparty.stepNumber;
}

export default function run() {
  console.log("Day 6:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
