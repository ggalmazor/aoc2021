export function window(list, size, step = 1) {
  const output = [];
  for (let i = 0; i < list.length - size + 1; i += step)
    output.push(list.slice(i, i + size));
  return output;
}

export function zip(...arrays) {
  return arrays[0].map((_, i) => arrays.map(array => array[i]));
}
