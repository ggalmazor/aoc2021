import * as PImage from "pureimage";
import fs from "fs";
import {range} from "../lib/lists.mjs";

export class Map {
  constructor() {
    this.maxX = 0;
    this.maxY = 0;
    this.cells = [];
  }

  project(segment) {
    segment.expandCoords().forEach(([x, y]) => {
      this.cells[y] ||= [];
      this.cells[y][x] ||= 0;
      this.cells[y][x]++;
      this.maxX = Math.max(this.maxX, x);
      this.maxY = Math.max(this.maxY, y);
    });
  }

  render(filename) {
    const img = PImage.make(this.maxX + 1, this.maxY + 1);
    for (let x of range(0, this.maxX))
      for (let y of range(0, this.maxY))
        img.setPixelRGBA(x, y, this.color(this.getValue(x, y)));
    return PImage.encodePNGToStream(img, fs.createWriteStream(filename))
      .then(() => console.log("wrote out the png file to out.png"))
      .catch(() => console.log("there was an error writing"));
  }

  color(value) {
    switch (value) {
      case 0:
        return 0x778899ff; // grey
      case 1:
        return 0xffffe0ff; // light yellow
      case 2:
        return 0xffa500ff; // orange
      case 3:
        return 0xff4500ff; // orange-red
      default:
        return 0xff0000ff; // red
    }
  }

  getValue(x, y) {
    return this.cells[y] !== undefined && this.cells[y][x] !== undefined ? this.cells[y][x] : 0;
  }

  filter(predicate) {
    const cells = [];
    for (let x of range(0, this.maxX))
      for (let y of range(0, this.maxY))
        if (predicate(this.getValue(x, y)))
          cells.push([x, y]);
    return cells;
  }
}
