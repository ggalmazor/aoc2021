import {readLines} from "../lib/input.mjs";
import {polymerize} from "./polymerizer.mjs";

const lines = readLines(import.meta.url)

function readTemplate(lines) {
  return lines[0].trim().split('');
}

function readRules(lines) {
  return lines.slice(2)
    .map(line => line.split(" -> "))
    .reduce((rules, [pair, insertion]) => {
      rules[pair] = `${pair[0]}${insertion}${pair[1]}`;
      return rules;
    }, {});
}

function solve(polymerComponentCounts) {
  const counts = Object.values(polymerComponentCounts).sort((a, b) => a - b);
  return counts[counts.length - 1] - counts[0];
}

function part1(lines) {
  return solve(polymerize(readRules(lines), readTemplate(lines), 10, true));
}

function part2(lines) {
  return solve(polymerize(readRules(lines), readTemplate(lines), 40, true));
}

export default function run() {
  console.log("Day 14:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
