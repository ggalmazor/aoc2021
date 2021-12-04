import {window} from './lists.mjs'

describe("Window function", () => {
  [
    [[0, 1, 2], 2, [[0, 1], [1, 2]]],
    [[0, 1, 2, 3], 3, [[0, 1, 2], [1, 2, 3]]]
  ].forEach(([input, size, expectedOutput]) => {
    it(`${JSON.stringify(input)} => ${JSON.stringify(expectedOutput)}`, () => {
      expect(window(input, size)).toEqual(expectedOutput);
    });
  });
});
