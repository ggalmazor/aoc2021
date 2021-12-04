import {readLines} from "../lib/input.mjs";
import {window} from "../lib/lists.mjs";
import {sum, toInt} from "../lib/numbers.mjs";

const lines = readLines(import.meta.url).map(toInt)

const countDepthIncrements = sums => window(sums, 2).map(([a, b]) => a < b ? 1 : 0).reduce(sum);

const part1 = countDepthIncrements;
const part2 = lines => countDepthIncrements(window(lines, 3).map(numbers => numbers.reduce(sum)));

export default function run() {
  console.log("Day 1:")
  console.log("  (1) Depth:", part1(lines));
  console.log("  (2) Depth:", part2(lines));
}
