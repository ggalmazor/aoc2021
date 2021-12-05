import {Segment} from "./segment.mjs";

[
  [[0, 0, 0, 1], false],
  [[0, 0, 1, 0], false],
  [[0, 1, 0, 0], false],
  [[1, 0, 0, 0], false],
  [[1, 0, 0, 1], true],
  [[0, 1, 1, 0], true],
  [[0, 0, 1, 1], true],
  [[1, 1, 0, 0], true]
].forEach(function ([coords, expectedResult]) {
  test(`A segment with coords ${coords.join(",")} should ${expectedResult ? "be" : "not be"} diagonal`, () => {
    expect(new Segment(...coords).isDiagonal()).toBe(expectedResult);
  });
});

[
  [[0, 0, 3, 0], [[0, 0], [1, 0], [2, 0], [3, 0]]],
  [[0, 0, 0, 3], [[0, 0], [0, 1], [0, 2], [0, 3]]],
  [[3, 0, 0, 0], [[3, 0], [2, 0], [1, 0], [0, 0]]],
  [[0, 3, 0, 0], [[0, 3], [0, 2], [0, 1], [0, 0]]],
  [[1, 1, 1, 3], [[1, 1], [1, 2], [1, 3]]],
  [[9, 7, 7, 7], [[9, 7], [8, 7], [7, 7]]],
  [[0,0, 2,2], [[0,0], [1,1], [2,2]]],
].forEach(function ([coords, expectedCoords]) {
  test(`A segment with coords (${coords[0]},${coords[1]}),(${coords[2]},${coords[3]}) should expand to ${expectedCoords.map(([x, y]) => `(${x},${y})`).join(",")}`, () => {
    expect(JSON.stringify(new Segment(...coords).expandCoords())).toStrictEqual(JSON.stringify(expectedCoords));
  });
});

[
  ["9,4 -> 3,4", [[9, 4], [8, 4], [7, 4], [6, 4], [5, 4], [4, 4], [3, 4]]]
].forEach(function ([coords, expectedCoords]) {
  test(`${coords} should expand to ${expectedCoords.map(([x, y]) => `(${x},${y})`).join(",")}`, () => {
    expect(Segment.from(coords).expandCoords()).toStrictEqual(expectedCoords);
  });
});
