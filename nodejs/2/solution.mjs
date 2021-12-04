import {readLines} from "../lib/input.mjs";
import {sum, toInt} from "../lib/numbers.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  const ups = lines.filter(line => line.startsWith("up")).map(line => toInt(line.substr(3)));
  const downs = lines.filter(line => line.startsWith("down")).map(line => toInt(line.substr(5)));
  const forwards = lines.filter(line => line.startsWith("forward")).map(line => toInt(line.substr(8)));

  const forward = forwards.reduce(sum);
  const up = ups.reduce(sum);
  const down = downs.reduce(sum);
  return forward * (down - up);
}

function part2(lines) {
  let position = 0;
  let depth = 0;
  let aim = 0;
  for (let line of lines) {
    if (line.startsWith("up")) {
      const value = toInt(line.substr(3));
      aim -= value;
    }

    if (line.startsWith("down")) {
      const value = toInt(line.substr(5));
      aim += value;
    }

    if (line.startsWith("forward")) {
      const value = toInt(line.substr(8)  );
      position += value;
      depth += value * aim;
    }
  }
  return position * depth;
}

export default function run() {
  console.log("Day 2:")
  console.log("  (1) Result:", part1(lines));
  console.log("  (2) Result:", part2(lines));
}

run();


