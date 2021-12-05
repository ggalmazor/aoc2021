import {window, range} from './lists.mjs'

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

describe("Range function", () => {
  [
    [[0,3], false, [0,1,2]],
    [[0,3], true, [0,1,2,3]],
    [[3,0], false, [3,2,1]],
    [[3,0], true, [3,2,1,0]]
  ].forEach(function([input, inclusiveTo, expextedRange]) {
    it(`Range of [${input[0]},${input[1]}] (${inclusiveTo ? '' : 'non-'}inclusive) should produce ${JSON.stringify(expextedRange)}`, () => {
      expect(range(...input, inclusiveTo)).toStrictEqual(expextedRange);
    });
  });
});
