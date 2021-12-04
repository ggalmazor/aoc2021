import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function readLines(url) {
  const lines = readInput(url).split("\n");
  return lines[lines.length-1].trim() === '' ? lines.slice(0, lines.length-1) : lines;
}

export default function readInput(url) {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);
  return fs.readFileSync(`${__dirname}/input`).toString();
}
