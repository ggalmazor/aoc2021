import {toInt} from "../lib/numbers.mjs";
import {pad} from "../lib/strings.mjs";
import chalk from "chalk";

export class Line {
  numbers;
  markedNumbers;
  unmarkedNumberCount;
  bingoed;

  constructor(numbers, markedNumbers = [], unmarkedNumberCount = 0, bingoed = false) {
    this.numbers = numbers;
    this.markedNumbers = markedNumbers;
    this.unmarkedNumberCount = numbers.length - markedNumbers.length;
    this.bingoed = bingoed;
  }

  static from(line) {
    return new Line(line.split(" ").filter(s => s.length > 0).map(toInt));
  }

  size() {
    return this.numbers.length
  }

  isMarked(number) {
    return this.markedNumbers.includes(number);
  }

  render() {
    console.log(this.numbers.map(n => {
      let text = pad(2, n);
      return this.isMarked(n) ? chalk.bgWhite(text) : text;
    }).join(" "))
  }

  mark(number) {
    if (this.numbers.includes(number)) {
      this.markedNumbers.push(number);
      this.unmarkedNumberCount--;
    }
    this.bingoed = this.bingoed || this.unmarkedNumberCount === 0;
  }

  isBingo() {
    return this.bingoed;
  }

  unmarkedNumbers() {
    return this.numbers.filter(number => !this.isMarked(number));
  }
}
