import {toInt} from "../lib/numbers.mjs";
import {diff} from "../lib/strings.mjs";


/**
 0:      1:      2:      3:      4:
  aaaa    ....    aaaa    aaaa    ....
 b    c  .    c  .    c  .    c  b    c
 b    c  .    c  .    c  .    c  b    c
  ....    ....    dddd    dddd    dddd
 e    f  .    f  e    .  .    f  .    f
 e    f  .    f  e    .  .    f  .    f
  gggg    ....    gggg    gggg    ....

 5:      6:      7:      8:      9:
  aaaa    aaaa    aaaa    aaaa    aaaa
 b    .  b    .  .    c  b    c  b    c
 b    .  b    .  .    c  b    c  b    c
  dddd    dddd    ....    dddd    dddd
 .    f  e    f  .    f  e    f  .    f
 .    f  e    f  .    f  e    f  .    f
  gggg    gggg    ....    gggg    gggg
 */
const segmentTranslations = {
  'abcefg': 0,
  'cf': 1,
  'acdeg': 2,
  'acdfg': 3,
  'bcdf': 4,
  'abdfg': 5,
  'abdefg': 6,
  'acf': 7,
  'abcdefg': 8,
  'abcdfg': 9,
};

function extractSegmentsTable(line) {
  let rawSegmentsPerLength = [];
  line.replace(" | ", " ").split(" ").map(segment => segment.split("").sort().join('')).forEach(segment => {
    rawSegmentsPerLength[segment.length] ||= new Set();
    rawSegmentsPerLength[segment.length].add(segment);
  })
  rawSegmentsPerLength = rawSegmentsPerLength.map(s => [...s.values()]);

  const rawSegmentsPerNumber = [];
  rawSegmentsPerNumber[1] = rawSegmentsPerLength[2][0];
  rawSegmentsPerNumber[4] = rawSegmentsPerLength[4][0];
  rawSegmentsPerNumber[7] = rawSegmentsPerLength[3][0];
  rawSegmentsPerNumber[8] = rawSegmentsPerLength[7][0];

  const segments = {};

  // [a] = 7 - 1
  segments['a'] = diff(rawSegmentsPerNumber[7], rawSegmentsPerNumber[1])

  // [dg] = ([3 with 5 segments] - 7 and take the one with 2 segments)
  const dg = rawSegmentsPerLength[5].map(rawSegment => {
    return diff(rawSegment, rawSegmentsPerNumber[7]);
  }).filter(rs => rs.length === 2)[0];

  // [aeg] = ([3 with 5 segments] - 4 and take the one with 3 segments)
  // [e] = [aeg] - [a] - [dg]
  const aeg = rawSegmentsPerLength[5].map(rawSegment => {
    return diff(rawSegment, rawSegmentsPerNumber[4]);
  }).filter(rs => rs.length === 3)[0];
  segments['e'] = diff(aeg, dg, segments['a']);

  // [bdg] = ([[3 with 5 segments] - 7] - [e] and take the one with 3 segments)
  // [b] =  [bdg] - [dg]
  const bdg = rawSegmentsPerLength[5].map(rawSegment => {
    return diff(rawSegment, rawSegmentsPerNumber[7]);
  }).map(rawSegment => {
    return diff(rawSegment, segments['e']);
  }).filter(rs => rs.length === 3)[0];
  segments['b'] = diff(bdg, dg);

  // [g] = [bdg] - 4
  segments['g'] = diff(bdg, rawSegmentsPerNumber[4]);

  // [d] = [dg] - [g]
  segments['d'] = diff(dg, segments['g']);

  //  [abdefg] = ([3 with 6 segments] - 1 and take the original that resulted in 5 segments)
  //  [f] = [abdefg] - [a] - [b] - [d] - [e] - [g]
  const abdefg = rawSegmentsPerLength[6].map(rawSegment => {
    return [rawSegment, diff(rawSegment, rawSegmentsPerNumber[1])];
  }).filter(([_, rawSegment]) => {
    return rawSegment.length === 5;
  }).map(([original, _]) => original)[0];
  segments['f'] = diff(abdefg, segments['a'], segments['b'], segments['d'], segments['e'], segments['g']);

  // [c] = 1 - [f]
  segments['c'] = diff(rawSegmentsPerNumber[1], segments['f']);
  return segments;
}

function reverseTable(segmentsTable) {
  const reverseSegmentsTable = {};
  Object.keys(segmentsTable).forEach(key => reverseSegmentsTable[segmentsTable[key]] = key);
  return reverseSegmentsTable;
}

export default class Decoder {
  decodingTable;
  reverseDecodingTable;

  constructor(decodingTable, reverseDecodingTable) {
    this.decodingTable = decodingTable;
    this.reverseDecodingTable = reverseDecodingTable;
  }

  static analyze(line) {
    const segmentsTable = extractSegmentsTable(line);
    return new Decoder(segmentsTable, reverseTable(segmentsTable));
  }

  decode(segments) {
    if (segments.indexOf(" ") === -1) {
      const decodedSegment = segments.split('').map(segment => this.reverseDecodingTable[segment]).sort().join('');
      return segmentTranslations[decodedSegment];
    }

    return toInt(segments.split(" ").map(segments => this.decode(segments)).join(''));
  }
}
