import {toInt} from "../lib/numbers.mjs";
import {range, window} from "../lib/lists.mjs";
import chalk from "chalk";
import * as PImage from "pureimage";
import fs from "fs";

export function parseGrid(lines) {
  return lines.map(line => line.split('').map(toInt));
}

export function findLowPoints(grid) {
  const horizontalLowPointIndices = [];
  grid.forEach((row, y) => {
    if (row[0] < row[1])
      horizontalLowPointIndices.push([0, y]);
    window(row, 3).forEach(([left, middle, right], index) => {
      const x = index + 1;
      if (left > middle && middle < right)
        horizontalLowPointIndices.push([x, y]);
    });
    if (row[98] > row[99])
      horizontalLowPointIndices.push([99, y]);
  });
  const lowPoints = [];
  for (let [x, y] of horizontalLowPointIndices) {
    let middle = grid[y][x];
    if (y === 0 && middle < grid[y + 1][x])
      lowPoints.push([x, y, middle]);
    else if (y === 99 && grid[y - 1][x] > middle)
      lowPoints.push([x, y, middle]);
    else if (y > 0 && y < 99) {
      let top = grid[y - 1][x];
      let bottom = grid[y + 1][x];
      if (top > middle && middle < bottom)
        lowPoints.push([x, y, middle]);
    }
  }
  return lowPoints;
}

function coordsPresentIn(basin, x, y) {
  return basin.some(([basinX, basinY]) => basinX === x && basinY === y);
}

export function crawl(grid, startX, startY) {
  const basin = [];
  const pendingCoords = [[startX, startY]];
  const neighbors = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  while (pendingCoords.length > 0) {
    const [x, y] = pendingCoords.shift();
    basin.push([x, y]);
    neighbors.forEach(([dx, dy]) => {
      const x2 = x + dx;
      const y2 = y + dy;
      if (0 <= x2 && x2 < 100 && 0 <= y2 && y2 < 100 && grid[y2][x2] !== 9 && !coordsPresentIn(basin, x2, y2) && !coordsPresentIn(pendingCoords, x2, y2))
        pendingCoords.push([x2, y2]);
    });
  }
  return basin;
}

export function render(grid, basin) {
  for (let y of range(0, 100, false)) {
    const line = range(0, 100, false).map(x => {
      if (coordsPresentIn(basin, x, y))
        return chalk.bgWhiteBright(grid[y][x]);
      else
        return chalk.gray(grid[y][x]);
    }).join('');
    console.log(line);
  }
}

function color(depth, inBasin) {
  switch (depth) {
    case 0: return inBasin ? 0x221212ff : 0x122213ff;
    case 1: return inBasin ? 0x43211eff : 0x123121ff;
    case 2: return inBasin ? 0x653226ff : 0x0a4133ff;
    case 3: return inBasin ? 0x87462bff : 0x005148ff;
    case 4: return inBasin ? 0xa65d2bff : 0x006262ff;
    case 5: return inBasin ? 0xc27828ff : 0x00737fff;
    case 6: return inBasin ? 0xd99620ff : 0x00839fff;
    case 7: return inBasin ? 0xebb713ff : 0x0093bfff;
    case 8: return inBasin ? 0xf7da00ff : 0x00a1e0ff;
    case 9: return inBasin ? 0xfbff00ff : 0x00aeffff;
  }
}

export function renderImage(grid, basin, filename) {
  const img = PImage.make(500, 500);
  for (let x of range(0, 100, false))
    for (let y of range(0, 100, false))
      for (let xx of range(x * 5, (x + 1) * 5, false))
        for (let yy of range(y * 5, (y + 1) * 5, false))
          img.setPixelRGBA(x, y, color(grid[y][x], coordsPresentIn(basin, x, y)));
  return PImage.encodePNGToStream(img, fs.createWriteStream(filename))
    .then(() => console.log(`wrote out the png file to ${filename}`))
    .catch(() => console.log("there was an error writing"));
}

export function renderAllImage(grid, basins, filename) {
  const img = PImage.make(500, 500);
  for (let x of range(0, 100, false))
    for (let y of range(0, 100, false))
      for (let xx of range(x * 5, (x + 1) * 5, false))
        for (let yy of range(y * 5, (y + 1) * 5, false))
          img.setPixelRGBA(x, y, color(grid[y][x], basins.some(basin => coordsPresentIn(basin, x, y))));
  return PImage.encodePNGToStream(img, fs.createWriteStream(filename))
    .then(() => console.log(`wrote out the png file to ${filename}`))
    .catch(() => console.log("there was an error writing"));
}
