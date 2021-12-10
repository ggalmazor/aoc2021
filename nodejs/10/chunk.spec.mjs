import {autocomplete, autocompleteScore, corrupted, syntaxErrorScore} from "./chunk.mjs";


describe("Detects corrupted lines", () => {
  [
    ["(]", true],
    ["{()()()>", true],
    ["(((()))}", true],
    ["<([]){()}[{}])", true],
    ["()", false],
    ["[]", false],
    ["{}", false],
    ["<>", false],
    ["([])", false],
    ["{()()()}", false],
    ["<([{}])>", false],
    ["[<>({}){}[([])<>]]", false],
    ["(((((((((())))))))))", false]
  ].forEach(function ([input, expectedOutput]) {
    test(`${input} is ${expectedOutput} ? 'not ' : ''} corrupted`, () => {
      expect(corrupted(input)[0]).toBe(expectedOutput);
    });
  });

  test("detects corrupted lines in example", () => {
    const lines = [
      "[({(<(())[]>[[{[]{<()<>>",
      "[(()[<>])]({[<{<<[]>>(",
      "{([(<{}[<>[]}>{[]{[(<()>",
      "(((({<>}<{<{<>}{[]{[]{}",
      "[[<[([]))<([[{}[[()]]]",
      "[{[{({}]{}}([{[{{{}}([]",
      "{<[[]]>}<{[{[{[]{()[[[]",
      "[<(<(<(<{}))><([]([]()",
      "<{([([[(<>()){}]>(<<{{",
      "<{([{{}}[<[[[<>{}]]]>[]]"
    ];
    const corruptedLines = lines.filter(line => corrupted(line)[0]);
    expect(corruptedLines).toEqual([
      "{([(<{}[<>[]}>{[]{[(<()>",
      "[[<[([]))<([[{}[[()]]]",
      "[{[{({}]{}}([{[{{{}}([]",
      "[<(<(<(<{}))><([]([]()",
      "<{([([[(<>()){}]>(<<{{"
    ]);
  });
});

describe("Calculates a syntax error score of a corrupted line", () => {
  [
    ["[({(<(())[]>[[{[]{<()<>>", 0],
    ["{([(<{}[<>[]}>{[]{[(<()>", 1197],
    ["[[<[([]))<([[{}[[()]]]", 3],
    ["[{[{({}]{}}([{[{{{}}([]", 57],
    ["[<(<(<(<{}))><([]([]()", 3],
    ["<{([([[(<>()){}]>(<<{{", 25137],
  ].forEach(function ([line, expectedScore]) {
    test(`${line} has a score of ${expectedScore}`, () => {
      expect(syntaxErrorScore(line)).toBe(expectedScore);
    });
  });
});

describe("Completes incomplete lines", () => {
  [
    ["[({(<(())[]>[[{[]{<()<>>", "[({(<(())[]>[[{[]{<()<>>}}]])})]"],
    ["[(()[<>])]({[<{<<[]>>(", "[(()[<>])]({[<{<<[]>>()}>]})"],
    ["(((({<>}<{<{<>}{[]{[]{}", "(((({<>}<{<{<>}{[]{[]{}}}>}>))))"],
    ["{<[[]]>}<{[{[{[]{()[[[]", "{<[[]]>}<{[{[{[]{()[[[]]]}}]}]}>"],
    ["<{([{{}}[<[[[<>{}]]]>[]]", "<{([{{}}[<[[[<>{}]]]>[]]])}>"],
  ].forEach(function ([input, expectecdOutput]) {
    test(`${input} is completed into ${expectecdOutput}`, () => {
      expect(autocomplete(input)[0]).toBe(expectecdOutput);
    });
  });
});

describe("Calculates a score for the characters added when autocompleting a line", () => {
  [
    ["])}>", 294],
    ["}}]])})]", 288957],
    [")}>]})", 5566],
    ["}}>}>))))", 1480781],
    ["]]}}]}]}>", 995444],
  ].forEach(function ([missingClosings, expectedScore]) {
    expect(autocompleteScore(missingClosings)).toBe(expectedScore);
  });
});

