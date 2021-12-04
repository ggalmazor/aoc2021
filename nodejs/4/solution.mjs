import chalk from 'chalk';
import {readLines} from "../lib/input.mjs";
import {sum, toInt} from "../lib/numbers.mjs";
import {window} from "../lib/lists.mjs";
import {Board} from "./board.mjs";


const lines = readLines(import.meta.url)

function drawNumbers(lines) {
  return lines[0].split(",").map(toInt);
}

function goForBingo(bingoedBoard, draw) {
  const unmarkedNumbers = bingoedBoard.unmarkedNumbers();
  const unmarkedNumbersSum = unmarkedNumbers.reduce(sum);
  const score = unmarkedNumbersSum * draw;
  
  console.log(chalk.bgWhiteBright("Bingo!"))
  bingoedBoard.render();
  console.log("Unmarked numbers: ", unmarkedNumbers.join(","), "(sum: ", unmarkedNumbersSum, ")");
  console.log("Draw: ", draw);
  console.log();
  return score;
}

function readBoards(lines) {
  return window(lines.slice(2), 5, 6).map(Board.from);
}

function part1(lines) {
  const boards = readBoards(lines);
  for (let draw of drawNumbers(lines)) {
    boards.forEach(board => board.mark(draw));
    const bingoedBoard = boards.filter(board => board.isBingo())[0];
    if (bingoedBoard !== undefined)
      return goForBingo(bingoedBoard, draw);
  }
}

function part2(lines) {
  const boards = readBoards(lines);
  let bingoedBoards = [];
  const bingoedDraws = [];
  for (let draw of drawNumbers(lines)) {
    boards.forEach(board => board.mark(draw));
    const newBingoedBoards = boards.filter(board => !bingoedBoards.includes(board) && board.isBingo());
    if (newBingoedBoards.length > 0) {
      bingoedBoards = bingoedBoards.concat(newBingoedBoards);
      bingoedDraws.push(draw);
    }
  }
  const lastBingoedBoard = bingoedBoards[bingoedBoards.length - 1];
  const lastDraw = bingoedDraws[bingoedDraws.length - 1];
  return goForBingo(lastBingoedBoard, lastDraw);
}

export default function run() {
  console.log("Day 4:")
  let result1 = part1(lines);
  let result2 = part2(lines);
  console.log("  (1) Result:", result1);
  console.log("  (2) Result:", result2);
}

run();
