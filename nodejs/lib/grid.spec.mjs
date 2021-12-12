import {Grid} from "./grid.mjs";

test("neighborsAt", () => {
  const g = new Grid([[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,117,18,19],[20,21,22,23,24],[25,26,27,28,29]], 5, 5);
  expect(g.neighborsAt(0,0).length).toBe(4)
  expect(g.neighborsAt(0,1).length).toBe(6)
  expect(g.neighborsAt(0,4).length).toBe(4)
  expect(g.neighborsAt(4,0).length).toBe(4)
  expect(g.neighborsAt(4,1).length).toBe(6)
  expect(g.neighborsAt(1,0).length).toBe(6)
  expect(g.neighborsAt(4,0).length).toBe(4)
  expect(g.neighborsAt(1,4).length).toBe(6)
  expect(g.neighborsAt(4,4).length).toBe(4)
  expect(g.neighborsAt(1,1).length).toBe(9)
  expect(g.neighborsAt(2,2).length).toBe(9)
  expect(g.neighborsAt(3,3).length).toBe(9)
})
