const chunkDelimiters = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

export function corrupted(line) {
  let openChunks = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (Object.keys(chunkDelimiters).includes(char)) {
      openChunks.push(char);
    } else if (char !== chunkDelimiters[openChunks[openChunks.length - 1]]) {
      return [true, i, char];
    } else {
      openChunks.splice(openChunks.length - 1, 1);
    }
  }
  return [false, -1, null];
}

export function syntaxErrorScore(line) {
  const [isCorrupted, _, char] = corrupted(line);
  if (!isCorrupted)
    return 0;

  switch (char) {
    case ')':
      return 3;
    case ']':
      return 57;
    case '}':
      return 1197;
    case '>':
      return 25137;
  }
}

export function autocomplete(line) {
  let openChunks = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (Object.keys(chunkDelimiters).includes(char)) {
      openChunks.push(char);
    } else if (char !== chunkDelimiters[openChunks[openChunks.length - 1]]) {
      return [true, i, char];
    } else {
      openChunks.splice(openChunks.length - 1, 1);
    }
  }
  const missingClosings = openChunks.reverse().map(opener => chunkDelimiters[opener]).join('');
  return [line + missingClosings, missingClosings];
}

export function autocompleteScore(missingClosings) {
  let score = 0;
  for (let char of missingClosings) {
    score *= 5;
    switch (char) {
      case ')':
        score += 1;
        break;
      case ']':
        score += 2;
        break;
      case '}':
        score += 3;
        break;
      case '>':
        score += 4;
        break;
    }
  }
  return score;
}
