import {Connections, findPaths} from "./pathfinder.mjs";

[
  [
    0, ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"],
    ["start,A,b,A,c,A,end", "start,A,b,A,end", "start,A,b,end", "start,A,c,A,b,A,end", "start,A,c,A,b,end", "start,A,c,A,end", "start,A,end", "start,b,A,c,A,end", "start,b,A,end", "start,b,end"]
  ],
  [
    1, ["dc-end", "HN-start", "start-kj", "dc-start", "dc-HN", "LN-dc", "HN-end", "kj-sa", "kj-HN", "kj-dc"],
    ["start,HN,dc,HN,end", "start,HN,dc,HN,kj,HN,end", "start,HN,dc,end", "start,HN,dc,kj,HN,end", "start,HN,end", "start,HN,kj,HN,dc,HN,end", "start,HN,kj,HN,dc,end", "start,HN,kj,HN,end", "start,HN,kj,dc,HN,end", "start,HN,kj,dc,end", "start,dc,HN,end", "start,dc,HN,kj,HN,end", "start,dc,end", "start,dc,kj,HN,end", "start,kj,HN,dc,HN,end", "start,kj,HN,dc,end", "start,kj,HN,end", "start,kj,dc,HN,end", "start,kj,dc,end"]
  ]
].forEach(function ([example, links, expectedPaths]) {
  test(`Path example ${example}`, () => {
    const paths = Connections.parse(links).findPaths("start", "end");
    expect(paths.map(path => path.nodes.map(node => node.key).join(',')).sort()).toEqual(expectedPaths);
  });
});

[
  [1, ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"], false, 10],
  [2, ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"], true, 36],
  [3, ["dc-end", "HN-start", "start-kj", "dc-start", "dc-HN", "LN-dc", "HN-end", "kj-sa", "kj-HN", "kj-dc"], false, 19],
  [4, ["dc-end", "HN-start", "start-kj", "dc-start", "dc-HN", "LN-dc", "HN-end", "kj-sa", "kj-HN", "kj-dc"], true, 103],
  [5, ["fs-end", "he-DX", "fs-he", "start-DX", "pj-DX", "end-zg", "zg-sl", "zg-pj", "pj-he", "RW-he", "fs-DX", "pj-RW", "zg-RW", "start-pj", "he-WI", "zg-he", "pj-fs", "start-RW"], false, 226],
  [6, ["fs-end", "he-DX", "fs-he", "start-DX", "pj-DX", "end-zg", "zg-sl", "zg-pj", "pj-he", "RW-he", "fs-DX", "pj-RW", "zg-RW", "start-pj", "he-WI", "zg-he", "pj-fs", "start-RW"], true, 3509]
].forEach(function ([example, links, canVisitSmallCavesTwice, expectedNumberOfPaths]) {
  const paths = Connections.parse(links).findPaths("start", "end", canVisitSmallCavesTwice);
  test(`Example ${example}`, () => {
    expect(paths.length).toBe(expectedNumberOfPaths);
  })
});
