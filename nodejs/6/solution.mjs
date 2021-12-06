import {readLines} from "../lib/input.mjs";
import {toInt} from "../lib/numbers.mjs";
import {range} from "../lib/lists.mjs";
import {nextSchool, schoolSizeAfterDays} from "./lanternfish.mjs";

const lines = readLines(import.meta.url)

function readSchool(lines) {
  return lines[0].split(",").map(toInt);
}

function part1(lines) {
  let school = readSchool(lines);
  range(0, 80, false).forEach(day => {
    school = nextSchool(school)
  });
  return school.length;
}

function part2(lines) {
  return schoolSizeAfterDays(readSchool(lines), 256);
}

export default function run() {
  console.log("Day 6:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
