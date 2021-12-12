import {flatten} from "./lists.mjs";

export function pad(size, str, padChar = " ") {
  let pad = '';
  for (let i = 0; i < size; i++)
    pad += padChar;
  return (pad + str.toString()).slice(-pad.length);
}

export function diff(a, ...bb) {
  const uniqueCharsOnAllB = [...new Set(flatten(bb)).values()].join('');
  return a.split('').filter(i => !uniqueCharsOnAllB.includes(i)).join('');
}
