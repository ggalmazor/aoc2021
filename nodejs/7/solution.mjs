import {readLines} from "../lib/input.mjs";
import {toInt, triangularNumber} from "../lib/numbers.mjs";

const lines = readLines(import.meta.url)

const fuelFormula1 = (targetPosition, position) => Math.abs(targetPosition - position);
const fuelFormula2 = (targetPosition, position) => triangularNumber(Math.abs(targetPosition - position));

function findLeastFuelDemandingPosition(crabPositions, fuelFormula) {
  let leastFuelConsumed = Number.MAX_SAFE_INTEGER;
  for (let targetPosition of crabPositions) {
    const fuelConsumption = crabPositions.reduce((fuelConsumption, position) => fuelConsumption + fuelFormula(targetPosition, position), 0);
    leastFuelConsumed = Math.min(leastFuelConsumed, fuelConsumption);
  }
  return leastFuelConsumed;
}

function readCrabPositions(lines) {
  return lines[0].split(",").map(toInt);
}

function part1(lines) {
  return findLeastFuelDemandingPosition(readCrabPositions(lines), fuelFormula1);
}

function part2(lines) {
  return findLeastFuelDemandingPosition(readCrabPositions(lines), fuelFormula2);
}

export default function run() {
  console.log("Day 6:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
