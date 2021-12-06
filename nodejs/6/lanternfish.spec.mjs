import {nextSchool, schoolSizeAfterDays} from "./lanternfish.mjs";
import {toInt} from "../lib/numbers.mjs";

[
  ["3,4,3,1,2", "2,3,2,0,1"],
  ["2,3,2,0,1", "1,2,1,6,0,8"],
  ["1,2,1,6,0,8", "0,1,0,5,6,7,8"],
  ["0,1,0,5,6,7,8", "6,0,6,4,5,6,7,8,8"],
  ["6,0,6,4,5,6,7,8,8", "5,6,5,3,4,5,6,7,7,8"],
  ["5,6,5,3,4,5,6,7,7,8", "4,5,4,2,3,4,5,6,6,7"],
  ["4,5,4,2,3,4,5,6,6,7", "3,4,3,1,2,3,4,5,5,6"],
  ["3,4,3,1,2,3,4,5,5,6", "2,3,2,0,1,2,3,4,4,5"],
  ["2,3,2,0,1,2,3,4,4,5", "1,2,1,6,0,1,2,3,3,4,8"],
  ["1,2,1,6,0,1,2,3,3,4,8", "0,1,0,5,6,0,1,2,2,3,7,8"],
  ["0,1,0,5,6,0,1,2,2,3,7,8", "6,0,6,4,5,6,0,1,1,2,6,7,8,8,8"],
  ["6,0,6,4,5,6,0,1,1,2,6,7,8,8,8", "5,6,5,3,4,5,6,0,0,1,5,6,7,7,7,8,8"],
  ["5,6,5,3,4,5,6,0,0,1,5,6,7,7,7,8,8", "4,5,4,2,3,4,5,6,6,0,4,5,6,6,6,7,7,8,8"],
  ["4,5,4,2,3,4,5,6,6,0,4,5,6,6,6,7,7,8,8", "3,4,3,1,2,3,4,5,5,6,3,4,5,5,5,6,6,7,7,8"],
  ["3,4,3,1,2,3,4,5,5,6,3,4,5,5,5,6,6,7,7,8", "2,3,2,0,1,2,3,4,4,5,2,3,4,4,4,5,5,6,6,7"],
  ["2,3,2,0,1,2,3,4,4,5,2,3,4,4,4,5,5,6,6,7", "1,2,1,6,0,1,2,3,3,4,1,2,3,3,3,4,4,5,5,6,8"],
  ["1,2,1,6,0,1,2,3,3,4,1,2,3,3,3,4,4,5,5,6,8", "0,1,0,5,6,0,1,2,2,3,0,1,2,2,2,3,3,4,4,5,7,8"],
  ["0,1,0,5,6,0,1,2,2,3,0,1,2,2,2,3,3,4,4,5,7,8", "6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8"]
].forEach(function ([inputSchool, expectedSchool]) {
  test(`The next school for '${inputSchool}' is '${expectedSchool}'`, () => {
    const school = inputSchool.split(",").map(toInt);
    expect(nextSchool(school)).toStrictEqual(expectedSchool.split(",").map(toInt));
  });
});

test("'3,4,3,1,2' should produce 26 fish after 18 days", () => {
  let school = "3,4,3,1,2".split(",").map(toInt);
  let day;
  for (day = 0; day < 18; day++)
    school = nextSchool(school);
  expect(school.length).toBe(26);
})

test("'3,4,3,1,2' should produce 5934 fish after 80 days", () => {
  let school = "3,4,3,1,2".split(",").map(toInt);
  let day;
  for (day = 0; day < 80; day++)
    school = nextSchool(school);
  expect(school.length).toBe(5934);
})

test("'3,4,3,1,2' should produce 26984457539 fish after 256 days", () => {
  let school = "3,4,3,1,2".split(",").map(toInt);
  expect(schoolSizeAfterDays(school, 18)).toBe(26);
  expect(schoolSizeAfterDays(school, 80)).toBe(5934);
  expect(schoolSizeAfterDays(school, 256)).toBe(26984457539);
})

