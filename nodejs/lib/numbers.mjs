export function sum(a, b) {
  return a + b;
}

export function product(a, b) {
  return a * b;
}

export function min(a, b) {
  return a < b ? a : b;
}

export function max(a, b) {
  return a > b ? a : b;
}

export function nullsafeSum(a, b) {
  return a === undefined ? b : b === undefined ? a : a + b;
}

export function toInt(s) {
  return parseInt(s.trim(), 10);
}

export function isEven(n) {
  return n % 2 === 0;
}

/**
 * https://en.wikipedia.org/wiki/Triangular_number
 */
export function triangularNumber(n) {
  return (Math.pow(n, 2) + n) / 2;
}
