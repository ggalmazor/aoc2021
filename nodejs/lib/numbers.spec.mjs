import {triangularNumber} from "./numbers.mjs";

[
  [1, 1],
  [2, 3],
  [3, 6],
  [4, 10],
  [5, 15],
  [6, 21]
].forEach(function ([input, expectedOutput]) {
  test("Triangular number", () => {
    expect(triangularNumber(input)).toBe(expectedOutput);
  })
})
