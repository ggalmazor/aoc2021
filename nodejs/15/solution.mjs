import {readLines} from "../lib/input.mjs";
import {Grid} from "../lib/grid.mjs";
import {range} from "../lib/lists.mjs";
import {toInt} from "../lib/numbers.mjs";
import {or} from "../lib/booleans.mjs";
import {dijkstra} from "./dijkstra.mjs";
import Node from './node.mjs';

const lines = readLines(import.meta.url)

function parseGrid(lines) {
  const riskMatrix = lines.map(row => row.split('').map(toInt));
  const grid = Grid.empty();
  range(0, 100, false).forEach(x => {
    range(0, 100, false).forEach(y => {
      grid.add(x, y, new Node(x, y, riskMatrix[y][x], false, x === 0 && y === 0 ? 0 : Number.MAX_SAFE_INTEGER));
    })
  })
  return grid;
}

const cycle = axis => node => new Node(
  node.x + (axis === 'x' ? 100 : 0),
  node.y + (axis === 'y' ? 100 : 0),
  node.risk === 9 ? 1 : node.risk + 1,
  false,
  Number.MAX_SAFE_INTEGER
);

function part1(lines) {
  const grid = parseGrid(lines);

  return dijkstra(grid, 0, 0, 99, 99);
}

function part2(lines) {
  let grid = parseGrid(lines);
  grid = grid.padRight(100).merge(grid.mapValues(cycle('x')).padLeft(100), or);
  grid = grid.padRight(100).merge(grid.mapValues(cycle('x')).padLeft(100), or);
  grid = grid.padRight(100).merge(grid.mapValues(cycle('x')).padLeft(100), or);
  grid = grid.padRight(100).merge(grid.mapValues(cycle('x')).padLeft(100), or);
  grid = grid.padBottom(100).merge(grid.mapValues(cycle('y')).padTop(100), or);
  grid = grid.padBottom(100).merge(grid.mapValues(cycle('y')).padTop(100), or);
  grid = grid.padBottom(100).merge(grid.mapValues(cycle('y')).padTop(100), or);
  grid = grid.padBottom(100).merge(grid.mapValues(cycle('y')).padTop(100), or);

  return dijkstra(grid, 0, 0, 499, 499);
}

export default function run() {
  console.log("Day 14:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
