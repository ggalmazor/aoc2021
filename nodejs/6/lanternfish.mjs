import {range} from "../lib/lists.mjs";
import {sum} from "../lib/numbers.mjs";

const decreaseTimers = timer => timer === 0 ? 6 : timer - 1;
const computeFryNumber = school => school.filter(timer => timer === 0).length;

export function nextSchool(school) {
  const nextSchool = school.map(decreaseTimers);
  const fry = new Array(computeFryNumber(school)).fill(8);
  return nextSchool.concat(fry);
}

export function schoolSizeAfterDays(school, days) {
  const breedingSlots = new Array(9).fill(0);
  school.forEach(fish => breedingSlots[fish]++);

  range(0, days, false).forEach(day => {
    const slotThatBreedsToday = day % 9;
    const newSlot = (slotThatBreedsToday + 7) % 9;
    breedingSlots[newSlot] += breedingSlots[slotThatBreedsToday];
  });
  return breedingSlots.reduce(sum);
}

