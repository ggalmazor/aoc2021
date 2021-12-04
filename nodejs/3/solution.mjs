import {readLines} from "../lib/input.mjs";
import {sum} from "../lib/numbers.mjs";
import {zip} from "../lib/lists.mjs";
import {bitwiseComplement} from "../lib/binary.mjs";

const lines = readLines(import.meta.url)


function filterLines(lines, filterMostFrequent = true) {
  let candidateLines = JSON.parse(JSON.stringify(lines));
  let bitIndex = 0;
  while (candidateLines.length > 1 && bitIndex < 12) {
    let bitBias = candidateLines.map(line => line[bitIndex] === '1' ? 1 : -1).reduce(sum, 0);
    const target = filterMostFrequent
      ? (bitBias >= 0 ? '1' : '0')
      : (bitBias >= 0 ? '0' : '1')
    candidateLines = candidateLines.filter(line => line[bitIndex] === target)
    bitIndex++;
  }
  return candidateLines;
}

function part1(lines) {
  const gammaRate = parseInt(lines
    .reduce((counts, line) => zip(counts, line.split('')
      .map(v => v === '0' ? -1 : 1))
      .map(([a, b]) => a + b), [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    .map(count => count > 0 ? '1' : '0')
    .join(''), 2);
  const epsilonRate = bitwiseComplement(gammaRate);
  return gammaRate * epsilonRate;
}

function part2(lines) {
  const oxygenGeneratorRating = parseInt(filterLines(lines)[0], 2);
  const co2ScrubberRating = parseInt(filterLines(lines, false)[0], 2);
  return oxygenGeneratorRating * co2ScrubberRating;
}

export default function run() {
  console.log("Day 3:")
  console.log("  (1) Result:", part1(lines));
  console.log("  (2) Result:", part2(lines));
}

run();
