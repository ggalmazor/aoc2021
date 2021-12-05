import {toInt} from "../lib/numbers.mjs";
import {range, zip} from "../lib/lists.mjs";

export class Segment {
  x1;
  y1;
  x2;
  y2;

  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  static from(line) {
    const [_, x1, y1, x2, y2, ...__] = line.match(/^(\d+),(\d+) -> (\d+),(\d+)$/);
    return new Segment(toInt(x1), toInt(y1), toInt(x2), toInt(y2));
  }

  isDiagonal() {
    return !this.isVertical() && !this.isHorizontal();
  }

  isVertical() {
    return this.x1 === this.x2;
  }

  isHorizontal() {
    return this.y1 === this.y2;
  }

  expandCoords() {
    if (this.isHorizontal())
      return range(this.x1, this.x2).map(x => [x, this.y1]);

    if (this.isVertical())
      return range(this.y1, this.y2).map(y => [this.x1, y]);

    return zip(range(this.x1, this.x2), range(this.y1, this.y2))
  }
}


