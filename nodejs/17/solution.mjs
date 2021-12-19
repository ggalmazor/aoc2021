import {readLines} from "../lib/input.mjs";
import {range, zip} from "../lib/lists.mjs";

const lines = readLines(import.meta.url)

class Target {
  x1;
  y1;
  x2;
  y2;

  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.xx = range(x1, x2);
    this.yy = range(y1, y2);
  }

  includes(x, y) {
    return this.xx.includes(x) && this.yy.includes(y);
  }

  includesY(y) {
    return this.yy.includes(y);
  }

  includesX(x) {
    return this.xx.includes(x);
  }
}

function launch(x, y, vx, vy, drag, g, boundsX, boundsY) {
  const coords = [];
  do {
    coords.push([x, y]);
    x += vx;
    y += vy;
    vx -= drag;
    vy += g;
  } while (x <= boundsX && y <= boundsY)
  return coords;
}

function* xSeries(startVx, drag) {
  let x = 0;
  let vx = startVx;

  while (true) {
    const yieldValue = x;
    x += vx;
    vx = Math.max(0, vx - drag);
    yield yieldValue;
  }
}

function* ySeries(startVy, g) {
  let y = 0;
  let vy = startVy;

  while (true) {
    const yieldValue = y;
    y += vy;
    vy += g;
    yield yieldValue;
  }
}

function take(generator, count) {
  const numbers = [];
  while (numbers.length < count)
    numbers.push(generator.next().value)
  return numbers;
}

function takeWhile(generator, predicate) {
  const numbers = [];
  let number = generator.next().value;
  while (predicate(number)) {
    numbers.push(number)
    number = generator.next().value;
  }
  return numbers;
}

function part1(lines) {
  const target = new Target(70, 121, 125, 159);
  const g = 1;

  return -1 * range(200, -200).map(vy => {
    const yy = takeWhile(ySeries(vy, g), n => n <= target.y2);
    const hitsTarget = yy.some(y => target.includesY(y));
    const maxY = yy.reduce((a, b) => a < b ? a : b, 0);
    return {vy, hitsTarget, maxY};
  }).filter(({hitsTarget}) => hitsTarget).map(({maxY}) => maxY).sort((a, b) => a - b)[0];
}

function part2(lines) {
  const target = new Target(70, 121, 125, 159);
  const g = 1;
  const drag = 1;

  const validVvSet = new Set();
  range(0, target.x2).forEach(vx => {
    range(-200, 200).forEach(vy => {
      const yy = takeWhile(ySeries(vy, g), n => n <= target.y2);
      const xx = take(xSeries(vx, drag), yy.length);
      if (zip(xx, yy).some(([x, y]) => target.includes(x, y)))
        validVvSet.add(`${vx},${vy}`);
    });
  });
  const validVv2 = [...validVvSet.values()];
  return validVv2.length;
}

export default function run() {
  console.log("Day 17:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
