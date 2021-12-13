import {readLines} from "../lib/input.mjs";
import {sum} from "../lib/numbers.mjs";
import {crawl, findLowPoints, parseGrid, renderAllImage, renderImage} from "./basin.mjs";

const lines = readLines(import.meta.url)

function part1(lines) {
  return findLowPoints(parseGrid(lines)).map(([_, __, height]) => 1 + height).reduce(sum);
}

function part2(lines) {
  const grid = parseGrid(lines);
  const basins = findLowPoints(lines).map(([x, y, _]) => {
    return crawl(grid, x, y);
  }).sort((a, b) => b.length - a.length);

  renderImage(grid, [], 'no_basins.png');
  renderImage(grid, basins[0], 'basin0.png');
  renderImage(grid, basins[1], 'basin1.png');
  renderImage(grid, basins[2], 'basin2.png');
  renderAllImage(grid, basins.slice(0, 3), '3_basins.png');
  renderAllImage(grid, basins, 'all_basins.png');
  return basins.slice(0, 3).map(basin => basin.length).reduce((a, b) => a * b, 1);
}

export default function run() {
  console.log("Day 9:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
