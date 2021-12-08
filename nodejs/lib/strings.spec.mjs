import {diff} from "./strings.mjs";

[
  ["abc", ['bc'], 'a'],
  ["abc", ['b', 'c'], 'a'],
  ["abc", ['b', 'c', 'bc'], 'a'],
].forEach(function([a, bb,expectedOutput]) {
  test(`${a} - ${bb.join(',')} = ${expectedOutput}`, () => {
    expect(diff(a, ...bb)).toBe(expectedOutput);
  })
})
