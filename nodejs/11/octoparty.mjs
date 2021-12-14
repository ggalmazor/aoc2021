import {toInt} from "../lib/numbers.mjs";
import {pad} from "../lib/strings.mjs";
import {Grid} from "../lib/grid.mjs";

function coordsPresentIn(grid, x, y) {
  return grid.some(([basinX, basinY]) => basinX === x && basinY === y);
}

const flashes = ([x, y, level]) => level === 10;

const increaseLevel = level => level + 1;

const cycleLevel = level => level > 9 ? 0 : level;

export class Octoparty {
  grid;
  flashCount;
  allFlashed;
  stepNumber;

  constructor(grid, flashCount, allFlashed, stepNumber) {
    this.grid = grid;
    this.flashCount = flashCount;
    this.allFlashed = allFlashed;
    this.stepNumber = stepNumber;
  }

  static parse(lines) {
    return new Octoparty(Grid.of(lines.map(line => line.split('').map(toInt))), 0, false, 0);
  }

  step() {
    this.stepNumber++;
    this.grid.mapValues(increaseLevel);
    let flashingCells = this.grid.findCells(flashes);
    let flashingCellsInStep = 0;
    while (flashingCells.length > 0) {
      this.flashCount++;
      flashingCellsInStep++;
      const [x, y, level] = flashingCells.shift();
      const neighborsAt = this.grid.neighborsAt(x, y, 3, 3);
      neighborsAt.forEach(([x, y, level]) => this.grid.mapValueAt(x, y, increaseLevel));
      const allFlashes = this.grid.findCells(flashes);
      const newFlashingCells = allFlashes.filter(([x, y, level]) => !coordsPresentIn(flashingCells, x, y));
      flashingCells = flashingCells.concat(newFlashingCells);
    }
    this.allFlashed = flashingCellsInStep === this.grid.cellCount();
    this.grid.mapValues(cycleLevel)
    return this;
  }

  renderText() {
    return this.grid.cells.map(row => row.map(level => pad(2, level)).join(' ')).join("\n");
  }
}
