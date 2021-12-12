import {Octoparty} from "./octoparty.mjs";
import {window} from "../lib/lists.mjs";
import {toInt} from "../lib/numbers.mjs";


[
  `
    11111 34543 45654
    19991 40004 51115
    19191 50005 61116
    19991 40004 51115
    11111 34543 45654
  `,
  `
    5483143223 6594254334 8807476555 0050900866 2263031977 4484144000 5595255111 6707366222 7818477333 9060000644 0481112976
    2745854711 3856965822 5089087054 8500800575 0923031697 2044144000 3155255222 4377366333 5488477444 7800000976 0031112009
    5264556173 6375667284 8597889608 9900000039 0032221150 2253333493 3364444605 4475555827 5697666949 6900000080 0041112504
    6141336146 7252447257 8485769600 9700000041 0041111163 1152333274 2263444496 3496655709 4608766830 5840000082 0081111406
    6357385478 7468496589 8700908800 9935080063 0076191174 1187303285 2298414396 3500625609 4734946730 5858000093 0099111306
    4167524645 5278635756 6600088989 7712300000 0053411122 1164633233 2275744344 3509955566 4740097688 6962400000 0093511233
    2176841721 3287952832 6800005943 7911250009 0042361120 1153472231 2264583342 3486694453 6900007564 8021250009 0442361130
    6882881134 7993992245 0000007456 2211130000 5532241122 6643352233 7754463344 8865585555 0000009666 2221130009 5532252350
    4846848554 5957959665 9000000876 0421125000 1532247211 2643358322 3754469433 4865580644 8000004755 9111128097 0532250600
    5283751526 6394862637 8700006848 0021119000 1132230211 2243341322 3354452433 4465574644 6800007755 7911119976 0032240000
  `
].forEach(function (scenario) {
  const scenarioLines = scenario
    .split("\n")
    .filter(line => line.trim().length > 0)
    .map(line => window(line.trim().split(" "), 2));
  for (let i = 0; i < scenarioLines[0].length; i++) {
    test(`Simulates steps - window ${i}`, () => {
      const initialStateLines = scenarioLines.map(pair => pair[i][0]);
      const expectedOutputLevels = scenarioLines.map(pair => pair[i][1].split('').map(toInt));

      const octoparty = Octoparty.parse(initialStateLines).step();
      for (let number = 0; number < expectedOutputLevels.length; number++)
        expect(octoparty.grid.cells[number]).toEqual(expectedOutputLevels[number]);
    });
  }
});


[`
  5483143223 0481112976 3936556452 0643334118 6211111981 9655556447 2533334200 8211111164 1755555697 7433333522 0397666866 
  2745854711 0031112009 5686556806 4253334611 0421111119 4865556805 2743334640 0421111166 5965555609 2643333522 0749766918 
  5264556173 0041112504 4496555690 3374333458 0042111115 4486555690 2264333458 0042111114 4486555680 2264333458 0053976933 
  6141336146 0081111406 4448655580 2225333337 0003111115 4458655580 2225333337 0004211115 4458655580 2226433337 0004297822 
  6357385478 0099111306 4456865570 2229333338 0003111116 4574865570 2225333338 0000211116 4570865570 2222433338 0004229892 
  4167524645 0093511233 5680086577 2276733333 0065611111 5700086566 2287833333 0065611111 5700086566 2287833333 0053222877 
  2176841721 0442361130 7000009896 2754574565 0532351111 6000009887 3854573455 0532351111 7000008666 2854573333 0532222966 
  6882881134 5532252350 0000000344 5544458511 3322234597 8000000533 1854458611 7322235117 0000000990 4854458333 9322228966 
  4846848554 0532250600 6000000364 9444447111 2222222976 6800000633 1175447111 5722223475 0000000800 3387779333 7922286866 
  5283751526 0032240000 4600009543 7944446119 2222222762 5680000538 1115446111 4572222754 0000000000 3333333333 6789998766 
`].forEach(function (scenario) {
  const scenarioLines = scenario
    .split("\n")
    .filter(line => line.trim().length > 0)
    .map(line => window(line.trim().split(" "), 2));
  for (let i = 0; i < scenarioLines[0].length; i++) {
    test(`Simulates levels step by step (testing 10 step increment) window n. ${i}`, () => {
      const initialStateLines = scenarioLines.map(pair => pair[i][0]);
      const expectedOutputLevels = scenarioLines.map(pair => pair[i][1].split('').map(toInt));

      const octoparty = Octoparty.parse(initialStateLines);
      for (let i = 0; i < 10; i++)
        octoparty.step();
      for (let number = 0; number < expectedOutputLevels.length; number++)
        expect(octoparty.grid.cells[number]).toEqual(expectedOutputLevels[number]);
    });
  }
})

test("Counts flashes", () => {
  const octoparty = Octoparty.parse([
    "5483143223",
    "2745854711",
    "5264556173",
    "6141336146",
    "6357385478",
    "4167524645",
    "2176841721",
    "6882881134",
    "4846848554",
    "5283751526",
  ]);
  for (let n = 0; n < 10; n++)
    octoparty.step();
  expect(octoparty.flashCount).toBe(204);
  for (let n = 0; n < 90; n++)
    octoparty.step();
  expect(octoparty.flashCount).toBe(1656);
})

test("knows if all octopuses flashed in a step", () => {
  const octoparty = Octoparty.parse([
    "5483143223",
    "2745854711",
    "5264556173",
    "6141336146",
    "6357385478",
    "4167524645",
    "2176841721",
    "6882881134",
    "4846848554",
    "5283751526",
  ]);
  for (let n = 0; n < 194; n++) {
    octoparty.step();
    expect(octoparty.allFlashed).toBe(false);
  }
  console.log(octoparty.renderText());
  octoparty.step();
  console.log(octoparty.renderText());
  expect(octoparty.allFlashed).toBe(true);
  octoparty.step();
  console.log(octoparty.renderText());
  expect(octoparty.allFlashed).toBe(false);
})