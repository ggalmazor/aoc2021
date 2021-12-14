import {Grid} from "./grid.mjs";
import {range, window} from "./lists.mjs";
import {toInt} from "./numbers.mjs";

test("neighborsAt", () => {
  const g = new Grid([[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 117, 18, 19], [20, 21, 22, 23, 24]], 5, 5);
  expect(g.neighborsAt(0, 0).length).toBe(4)
  expect(g.neighborsAt(0, 1).length).toBe(6)
  expect(g.neighborsAt(0, 4).length).toBe(4)
  expect(g.neighborsAt(4, 0).length).toBe(4)
  expect(g.neighborsAt(4, 1).length).toBe(6)
  expect(g.neighborsAt(1, 0).length).toBe(6)
  expect(g.neighborsAt(4, 0).length).toBe(4)
  expect(g.neighborsAt(1, 4).length).toBe(6)
  expect(g.neighborsAt(4, 4).length).toBe(4)
  expect(g.neighborsAt(1, 1).length).toBe(9)
  expect(g.neighborsAt(2, 2).length).toBe(9)
  expect(g.neighborsAt(3, 3).length).toBe(9)
});

test("splitX an odd width grid", () => {
  const g = new Grid([[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 117, 18, 19], [20, 21, 22, 23, 24]], 5, 5);
  const [left, right] = g.splitAlongYAt(2);
  expect(left.width).toBe(2);
  expect(left.height).toBe(5);
  expect(left.valueAt(0, 0)).toBe(0);
  expect(left.valueAt(1, 0)).toBe(1);
  expect(left.valueAt(1, 4)).toBe(21);
  expect(left.valueAt(0, 4)).toBe(20);

  expect(right.width).toBe(2);
  expect(right.height).toBe(5);
  expect(right.valueAt(0, 0)).toBe(3);
  expect(right.valueAt(1, 0)).toBe(4);
  expect(right.valueAt(1, 4)).toBe(24);
  expect(right.valueAt(0, 4)).toBe(23);
})

test("splitX an even width grid", () => {
  const g = new Grid(window(range(0, 16, false), 4, 4), 4, 4);
  const [left, right] = g.splitAlongYAt(2);
  expect(left.width).toBe(2);
  expect(left.height).toBe(4);
  expect(left.valueAt(0, 0)).toBe(0);
  expect(left.valueAt(1, 0)).toBe(1);
  expect(left.valueAt(1, 3)).toBe(13);
  expect(left.valueAt(0, 3)).toBe(12);

  expect(right.width).toBe(1);
  expect(right.height).toBe(4);
  expect(right.valueAt(0, 0)).toBe(3);
  expect(right.valueAt(0, 3)).toBe(15);
})

test("splitY an odd height grid", () => {
  const g = new Grid(window(range(0, 25, false), 5, 5), 5, 5);
  const [top, bottom] = g.splitAlongXAt(2);
  expect(top.width).toBe(5);
  expect(top.height).toBe(2);
  expect(top.valueAt(0, 0)).toBe(0);
  expect(top.valueAt(4, 0)).toBe(4);
  expect(top.valueAt(4, 1)).toBe(9);
  expect(top.valueAt(0, 1)).toBe(5);

  expect(bottom.width).toBe(5);
  expect(bottom.height).toBe(2);
  expect(bottom.valueAt(0, 0)).toBe(15);
  expect(bottom.valueAt(4, 0)).toBe(19);
  expect(bottom.valueAt(4, 1)).toBe(24);
  expect(bottom.valueAt(0, 1)).toBe(20);
})

test("splitY an even height grid", () => {
  const g = new Grid(window(range(0, 16, false), 4, 4), 4, 4);
  const [top, bottom] = g.splitAlongXAt(2);
  expect(top.width).toBe(4);
  expect(top.height).toBe(2);
  expect(top.valueAt(0, 0)).toBe(0);
  expect(top.valueAt(3, 0)).toBe(3);
  expect(top.valueAt(3, 1)).toBe(7);
  expect(top.valueAt(0, 1)).toBe(4);

  expect(bottom.width).toBe(4);
  expect(bottom.height).toBe(1);
  expect(bottom.valueAt(0, 0)).toBe(12);
  expect(bottom.valueAt(3, 0)).toBe(15);
})

test("mirror x", () => {
  const g = new Grid(window(range(0, 16, false), 4, 4), 4, 4);
  const mirrored = g.mirrorAlongX();
  range(0, 4).forEach(x => {
    expect(g.valueAt(x, 0)).toEqual(mirrored.valueAt(x, 3))
    expect(g.valueAt(x, 1)).toEqual(mirrored.valueAt(x, 2))
    expect(g.valueAt(x, 2)).toEqual(mirrored.valueAt(x, 1))
    expect(g.valueAt(x, 3)).toEqual(mirrored.valueAt(x, 0))
  })
})

test("mirror y", () => {
  const g = new Grid(window(range(0, 16, false), 4, 4), 4, 4);
  const mirrored = g.mirrorAlongY();
  range(0, 4).forEach(y => {
    expect(g.valueAt(0, y)).toEqual(mirrored.valueAt(3, y))
    expect(g.valueAt(1, y)).toEqual(mirrored.valueAt(2, y))
    expect(g.valueAt(2, y)).toEqual(mirrored.valueAt(1, y))
    expect(g.valueAt(3, y)).toEqual(mirrored.valueAt(0, y))
  })
})

test("merge", () => {
  const a = new Grid(window(range(0, 16, false).map(() => 1), 4, 4), 4, 4);
  const b = new Grid(window(range(0, 25, false).map(() => 1), 5, 5), 5, 5);
  const merged = a.merge(b, (a, b) => {
    if (a === undefined)
      return b;
    if (b === undefined)
      return a;
    return a + b;
  });
  expect(merged.valueAt(0, 0)).toBe(2);
  expect(merged.valueAt(1, 1)).toBe(2);
  expect(merged.valueAt(2, 2)).toBe(2);
  expect(merged.valueAt(3, 3)).toBe(2);
  expect(merged.valueAt(4, 4)).toBe(1);
})

test("pad right", () => {
  const g = new Grid(window(range(0, 16, false).map(() => 1), 4, 4), 4, 4);
  const padded = g.padRight(1);
  expect(padded.width).toBe(5);
  expect(padded.height).toBe(4);
  range(0, 3).forEach(y => expect(Object.keys(padded.cells[y]).map(toInt)).toEqual([0, 1, 2, 3, 4]));
})

test("pad bottom", () => {
  const g = new Grid(window(range(0, 16, false).map(() => 1), 4, 4), 4, 4);
  const padded = g.padBottom(1);
  expect(padded.width).toBe(4);
  expect(padded.height).toBe(5);
  expect(Object.keys(padded.cells).map(toInt)).toEqual([0, 1, 2, 3, 4]);
})

const nullsafeSum = (a, b) => a === undefined ? b : b === undefined ? a : a + b;

test("fold along X an odd height grid", () => {
  const g = new Grid(window(range(0, 25, false).map(() => 1), 5, 5), 5, 5);
  const folded = g.foldAlongXAt(2, nullsafeSum);
  expect(folded.height).toBe(2);
  expect(folded.width).toBe(5);
  expect(folded.findCells(([x, y, value]) => value === 2).length).toBe(10);
})

test("fold along X an even height grid", () => {
  const g = new Grid(window(range(0, 16, false).map(() => 1), 4, 4), 4, 4);
  const folded = g.foldAlongXAt(2, nullsafeSum);
  expect(folded.height).toBe(2);
  expect(folded.width).toBe(4);
  expect(folded.valuesAtRow(0)).toEqual([1, 1, 1, 1])
  expect(folded.valuesAtRow(1)).toEqual([2, 2, 2, 2])
})

test("fold along Y an odd height grid", () => {
  const g = new Grid(window(range(0, 25, false).map(() => 1), 5, 5), 5, 5);
  const folded = g.foldAlongYAt(2, nullsafeSum);
  expect(folded.height).toBe(5);
  expect(folded.width).toBe(2);
  expect(folded.findCells(([x, y, value]) => value === 2).length).toBe(10);
})

test("fold along Y an even height grid", () => {
  const g = new Grid(window(range(0, 16, false).map(() => 1), 4, 4), 4, 4);
  const folded = g.foldAlongYAt(2, nullsafeSum);
  expect(folded.height).toBe(4);
  expect(folded.width).toBe(2);
  expect(folded.valuesAtCol(0)).toEqual([1, 1, 1, 1])
  expect(folded.valuesAtCol(1)).toEqual([2, 2, 2, 2])
})
