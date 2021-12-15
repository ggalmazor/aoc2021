import {polymerize} from "./polymerizer.mjs";

const rules = ["CH -> B", "HH -> N", "CB -> H", "NH -> C", "HB -> C", "HC -> B", "HN -> C", "NN -> C", "BH -> H", "NC -> B", "NB -> B", "BN -> B", "BB -> N", "BC -> B", "CC -> N", "CN -> C"].map(line => line.trim().split(" -> ")).reduce((rr, [pair, insertion]) => {
  rr[pair] = pair[0] + insertion + pair[1];
  return rr;
}, {});

test("Counts frequency of components after polymerization", () => {
  expect(polymerize(rules, "NNCB", 1, true)).toEqual({"B": 1, "C": 3, "H": 1, "N": 2});
  expect(polymerize(rules, "NNCB", 2, true)).toEqual({"B": 6, "C": 4, "H": 1, "N": 2});
  expect(polymerize(rules, "NNCB", 3, true)).toEqual({"B": 11, "C": 5, "H": 4, "N": 5});
  expect(polymerize(rules, "NNCB", 4, true)).toEqual({"B": 23, "C": 10, "H": 5, "N": 11});

  expect(polymerize(rules, "NCNBCHB", 1, true)).toEqual({"B": 6, "C": 4, "H": 1, "N": 2});
  expect(polymerize(rules, "NCNBCHB", 2, true)).toEqual({"B": 11, "C": 5, "H": 4, "N": 5});
  expect(polymerize(rules, "NCNBCHB", 3, true)).toEqual({"B": 23, "C": 10, "H": 5, "N": 11});

  expect(polymerize(rules, "NBCCNBBBCBHCB", 1, true)).toEqual({"B": 11, "C": 5, "H": 4, "N": 5});
  expect(polymerize(rules, "NBCCNBBBCBHCB", 2, true)).toEqual({"B": 23, "C": 10, "H": 5, "N": 11});

  expect(polymerize(rules, "NBBBCNCCNBBNBNBBCHBHHBCHB", 1, true)).toEqual({"B": 23, "C": 10, "H": 5, "N": 11});
});

