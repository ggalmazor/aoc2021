import _ from 'lodash';
import {nullsafeSum} from "../lib/numbers.mjs";
import {merge} from "../lib/objects.mjs";

const {memoize} = _;

export const polymerize = memoize((rules, template, depth, firstRun = false) => {
  if (template.length > 2) {
    const [a, b, ...rest] = template;
    const polymerHeadCounts = polymerize(rules, `${a}${b}`, depth, firstRun);
    const polymerTailCounts = polymerize(rules, `${b}${rest.join('')}`, depth);
    return merge(polymerHeadCounts, polymerTailCounts, nullsafeSum);
  }

  if (template.length === 2 && depth > 0)
    return polymerize(rules, rules[template], depth - 1, firstRun);

  if (firstRun)
    return {[template[0]]: 1, [template[1]]: 1};

  return {[template[0]]: 1};
}, (...args) => args.join(''));
