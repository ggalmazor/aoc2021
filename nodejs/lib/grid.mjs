import {range} from "./lists.mjs";

export class Grid {
  cells;
  width;
  height;

  constructor(cells, width, height) {
    this.cells = cells;
    this.width = width;
    this.height = height;
  }

  static of(matrix) {
    return new Grid(matrix, matrix[0].length, matrix.length);
  }

  mapValues(mapper) {
    this.cells = this.cells.map(row => row.map(cell => mapper(cell)));
    return this;
  }

  mapValueAt(x, y, mapper) {
    this.cells[y][x] = mapper(this.cells[y][x]);
    return this;
  }

  findCells(predicate) {
    const matchingCells = [];
    for (let x = 0; x < this.width; x++)
      for (let y = 0; y < this.height; y++) {
        const cell = [x, y, this.cells[y][x]];
        if (predicate(cell))
          matchingCells.push(cell)
      }
    return matchingCells;
  }

  neighborsAt(x, y) {
    const xx = range(Math.max(0, x - 1), Math.min(this.width, x + 1), true);
    const yy = range(Math.max(0, y - 1), Math.min(this.height, y + 1), true);
    return this.findCells(([x, y, cell]) => xx.includes(x) && yy.includes(y));
  }

  size() {
    return this.width * this.height;
  }
}
