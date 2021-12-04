export function pad(size, str, padChar = " ") {
  let pad = '';
  for (let i = 0; i < size; i++)
    pad += padChar;
  return (pad + str.toString()).slice(-pad.length);
}
