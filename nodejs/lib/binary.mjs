export function bitwiseComplement(n) {
  return n ^ (Math.pow(2, n.toString(2).length) - 1);
}
