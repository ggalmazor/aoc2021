import {uniqueValues} from "./lists.mjs";

export function put(obj, key, value) {
  obj[key] = value;
  return obj;
}

export function merge(a, b, mapper) {
  return uniqueValues(Object.keys(a).concat(Object.keys(b))).reduce((out, key) =>
      put(out, key, mapper(a[key], b[key]))
    , {});
}
