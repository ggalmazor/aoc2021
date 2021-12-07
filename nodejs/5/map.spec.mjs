import {Segment} from "./segment.mjs";
import {Map} from "./map.mjs";

test("example map part 1", () => {
  const segments = [
    Segment.from("0,9 -> 5,9"),
    Segment.from("8,0 -> 0,8"),
    Segment.from("9,4 -> 3,4"),
    Segment.from("2,2 -> 2,1"),
    Segment.from("7,0 -> 7,4"),
    Segment.from("6,4 -> 2,0"),
    Segment.from("0,9 -> 2,9"),
    Segment.from("3,4 -> 1,4"),
    Segment.from("0,0 -> 8,8"),
    Segment.from("5,5 -> 8,2")
  ];
  const map = new Map(10, 10);
  segments.filter(segment => !segment.isDiagonal()).forEach(segment => map.project(segment));
  map.render("test_without_diagonals.png")
  expect(map.filter(cell => cell >= 2).length).toBe(5);
})

test("example map part 1", () => {
  const segments = [
    Segment.from("0,9 -> 5,9"),
    Segment.from("8,0 -> 0,8"),
    Segment.from("9,4 -> 3,4"),
    Segment.from("2,2 -> 2,1"),
    Segment.from("7,0 -> 7,4"),
    Segment.from("6,4 -> 2,0"),
    Segment.from("0,9 -> 2,9"),
    Segment.from("3,4 -> 1,4"),
    Segment.from("0,0 -> 8,8"),
    Segment.from("5,5 -> 8,2")
  ];
  const map = new Map(10, 10);
  segments.forEach(segment => map.project(segment));
  map.render("test_with_diagonals.png")
  expect(map.filter(cell => cell >= 2).length).toBe(12);
})
