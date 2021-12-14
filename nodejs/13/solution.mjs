import {readLines} from "../lib/input.mjs";
import {Grid} from "../lib/grid.mjs";
import {toInt} from "../lib/numbers.mjs";
import {or} from "../lib/booleans.mjs";

const lines = readLines(import.meta.url)

function parseGrid(lines) {
  let grid = new Grid([], 0, 0);
  lines.slice(0, 879).forEach(line => {
    const [x, y] = line.split(',').map(toInt);
    grid.add(x, y, true);
  });
  return grid;
}

function parseFolds(lines) {
  return lines.slice(880).map(line => {
    const [_, axis, position, ...__] = line.match(/^fold along ([xy])=(\d+)$/);
    return [axis, toInt(position)];
  });
}

function part1(lines) {
  return parseGrid(lines).foldAlongYAt(665, or).findCells(([_, __, value]) => value === true).length;
}

async function part2(lines) {
  return parseFolds(lines).reduce((grid, [axis, position]) => {
    return axis === 'x' ? grid.foldAlongYAt(position, or) : grid.foldAlongXAt(position, or);
  }, parseGrid(lines)).render('folded.png', null, null, value => !value ? 0x000000ff : 0xffffffff); // Reads "ZUJUAFHP"
}

export default async function run() {
  console.log("Day 13:")
  console.log("  (1) Result:", part1(lines));
  return part2(lines);
}

run().catch(e => console.log(e));
