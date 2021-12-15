import {flatten, range} from "./lists.mjs";
import * as PImage from "pureimage";
import fs from "fs";
import {isEven} from "./numbers.mjs";

export class Grid {
  cells;
  width;
  height;

  constructor(cells, width, height) {
    this.cells = cells;
    this.width = width;
    this.height = height;
  }

  static empty() {
    return new Grid([], 0, 0);
  }

  static of(matrix) {
    return new Grid(matrix, matrix[0].length, matrix.length);
  }

  add(x, y, value) {
    this.cells[y] ||= [];
    this.cells[y][x] = value;
    this.width = Math.max(this.width, x + 1);
    this.height = Math.max(this.height, y + 1);
    return this;
  }

  mapValues(mapper) {
    this.cells = this.cells.map(row => row.map(cell => mapper(cell)));
    return this;
  }

  mapValueAt(x, y, mapper) {
    this.cells[y][x] = mapper(this.cells[y][x]);
    return this;
  }

  valuesAtRow(y) {
    return this.cells[y];
  }

  valuesAtCol(x) {
    return this.cells.map(row => row[x]);
  }

  findCells(predicate) {
    return flatten(range(0, this.height, false)
      .map(y => range(0, this.width, false)
        .map(x => [x, y, this.valueAt(x, y)])))
      .filter(predicate);
  }

  neighborsAt(x, y) {
    const xx = range(Math.max(0, x - 1), Math.min(this.width, x + 1), true);
    const yy = range(Math.max(0, y - 1), Math.min(this.height, y + 1), true);
    return this.findCells(([tx, ty, _]) => (tx !== x || ty !== y) && xx.includes(tx) && yy.includes(ty));
  }

  neighborValuesAt(x, y, excludeDiagonals = false) {
    const values = [];
    if (excludeDiagonals) {
      if (x - 1 >= 0)
        values.push(this.valueAt(x - 1, y));
      if (x + 1 < this.width)
        values.push(this.valueAt(x + 1, y));
      if (y - 1 >= 0)
        values.push(this.valueAt(x, y - 1));
      if (y + 1 < this.height)
        values.push(this.valueAt(x, y + 1));
    } else {
      const xx = range(Math.max(0, x - 1), Math.min(this.width - 1, x + 1), true);
      const yy = range(Math.max(0, y - 1), Math.min(this.height - 1, y + 1), true);

      for (let tx of xx) {
        for (let ty of yy) {
          if (tx !== x || ty !== y) {
            values.push(this.valueAt(tx, ty));
          }
        }
      }
    }
    return values;
  }

  cellCount() {
    return this.width * this.height;
  }

  valueAt(x, y) {
    return this.cells[y] !== undefined ? this.cells[y][x] : undefined;
  }

  splitAlongYAt(x) {
    const left = [];
    const right = [];
    range(0, this.height, false).forEach(ty => {
      range(0, x, false).forEach(tx => {
        left[ty] ||= [];
        left[ty][tx] = this.valueAt(tx, ty);
      });
      range(x + 1, this.width, false).forEach(tx => {
        right[ty] ||= [];
        right[ty][tx - x - 1] = this.valueAt(tx, ty);
      });
    });
    return [new Grid(left, x, this.height), new Grid(right, right[0].length, this.height)];
  }

  splitAlongXAt(y) {
    const top = [];
    const bottom = [];
    range(0, this.width, false).forEach(tx => {
      range(0, y, false).forEach(ty => {
        top[ty] ||= [];
        top[ty][tx] = this.valueAt(tx, ty);
      });
      range(y + 1, this.height, false).forEach(ty => {
        bottom[ty - y - 1] ||= [];
        bottom[ty - y - 1][tx] = this.valueAt(tx, ty);
      });
    });
    return [new Grid(top, this.width, y), new Grid(bottom, this.width, bottom.length)];
  }

  mirrorAlongX() {
    return new Grid([...this.cells].reverse().map(row => [...row]), this.width, this.height);
  }

  mirrorAlongY() {
    return new Grid(this.cells.map(row => [...row].reverse()), this.width, this.height);
  }

  padLeft(cols) {
    if (cols === 0)
      return this;
    return new Grid(this.cells.map(row => new Array(cols).fill(undefined).concat(row)), this.width + cols, this.height);
  }

  padRight(cols) {
    if (cols === 0)
      return this;
    return new Grid(this.cells.map(row => row.concat(new Array(cols).fill(undefined))), this.width + cols, this.height);
  }

  padTop(rows) {
    if (rows === 0)
      return this;
    return new Grid(new Array(rows).fill(new Array(this.width).fill(undefined)).concat(this.cells), this.width, this.height + rows);
  }

  padBottom(rows) {
    if (rows === 0)
      return this;
    return new Grid(this.cells.concat(new Array(rows).fill(new Array(this.width).fill(undefined))), this.width, this.height + rows);
  }

  merge(other, mapper) {
    const newCells = range(0, Math.max(this.height, other.height), false)
      .map(y => range(0, Math.max(this.width, other.width), false)
        .map(x => mapper(this.valueAt(x, y), other.valueAt(x, y))));
    return new Grid(newCells, this.width, this.height);
  }

  foldAlongYAt(x, mapper) {
    const [left, right] = this.splitAlongYAt(x);
    return left.merge(right.padRight(isEven(this.width) ? 1 : 0).mirrorAlongY(), mapper);
  }

  foldAlongXAt(y, mapper) {
    const [top, bottom] = this.splitAlongXAt(y);
    return top.merge(bottom.padBottom(isEven(this.height) ? 1 : 0).mirrorAlongX(), mapper);
  }

  async render(filename, width = null, height = null, colorMapper) {
    const img = PImage.make(width || this.width, height || this.height);
    range(0, width || this.width, false).forEach(x => {
      range(0, height || this.height, false).forEach(y => {
        img.setPixelRGBA(x, y, colorMapper(this.valueAt(x, y)));
      });
    });
    return PImage.encodePNGToStream(img, fs.createWriteStream(filename))
      .then(() => console.log(`wrote out the png file to ${filename}`))
      .catch(() => console.log("there was an error writing"));
  }
}
