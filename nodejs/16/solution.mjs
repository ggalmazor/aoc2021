import {readLines} from "../lib/input.mjs";
import Packet from "./packet.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  return Packet.fromHex(lines[0])[0].versionSum()
}

function part2(lines) {
  return Packet.fromHex(lines[0])[0].value();
}

export default function run() {
  console.log("Day 14:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
