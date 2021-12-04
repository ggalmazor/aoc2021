import {Line} from "./line.mjs";

export class Board {
  rows;
  cols;
  bingoed;

  constructor(rows, cols, bingoed=false) {
    this.rows = rows;
    this.cols = cols;
    this.bingoed = bingoed;
  }

  static from(lines) {
    const rows = lines.map(Line.from);
    const cols = [];
    for (let col = 0, maxCol = rows[0].size(); col < maxCol; col++)
      cols.push(new Line(rows.map(row => row.numbers[col])))
    return new Board(rows, cols);
  }

  render() {
    for (let row of this.rows)
      row.render();
  }

  mark(number) {
    if (this.bingoed)
      return;

    this.rows.forEach(row => {
      row.mark(number);
      this.bingoed = this.bingoed || row.isBingo();
    });
    this.cols.forEach(col => {
      col.mark(number);
      this.bingoed = this.bingoed || col.isBingo();
    });
  }

  isBingo() {
    return this.bingoed;
  }

  unmarkedNumbers() {
    return this.rows.map(row => row.unmarkedNumbers()).reduce((a, b) => a.concat(b), [])
  }
}