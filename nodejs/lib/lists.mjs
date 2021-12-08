export function window(list, size, step = 1) {
  const output = [];
  for (let i = 0; i < list.length - size + 1; i += step)
    output.push(list.slice(i, i + size));
  return output;
}

export function zip(...arrays) {
  return arrays[0].map((_, i) => arrays.map(array => array[i]));
}

export function range(from, to, inclusiveTo = true) {
  const numbers = [];
  const step = (to - from) >= 0 ? 1 : -1;
  let n = from;
  const requestedLength = inclusiveTo ? Math.abs(to - from) + 1 : Math.abs(to - from);
  while (numbers.length !== requestedLength) {
    numbers.push(n);
    n += step;
  }
  return numbers;
}

export function flatMap(list) {
  return list.reduce((a, b) => a.concat(b), []);
}
