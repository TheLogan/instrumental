import { notes } from "./Constants";

export const dotDuration = (nodeDuration: number, dottings: number) => {
  let duration = 0;
  for (let index = 0; index <= dottings; index++) {
    duration += nodeDuration*1/2^index;
  }
  return duration;
}

export const tupleDuration = (nodeDuration: number, count: number) => {
  return nodeDuration * (count - 1) / count; // triplet = 2/3
}

export const tieDuration = (nodeDuration: number, nodeDurationNext: number[]) => {
  return nodeDurationNext.reduce((sum, next) => sum + next, nodeDuration);
}

export const getNoteByFreq = (freq: number) => {
  return notes.reduce(function (prev, curr) {
    return (Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev);
  });
}

export const getClosestPercentage = (freq: number) => {
  const closest = getNoteByFreq(freq);

  const closestIndex = notes.findIndex(x => x.freq === closest.freq);

  let secondClosest;
  if (closest.freq > freq) {
    secondClosest = notes[closestIndex - 1];
    if (secondClosest?.freq === closest.freq) secondClosest = notes[closestIndex - 2];
  } else {
    secondClosest = notes[closestIndex + 1];
    if (secondClosest?.freq === closest.freq) secondClosest = notes[closestIndex + 2];
  }
  if (!secondClosest) return;

  let totalDiff = Math.abs(secondClosest.freq - closest.freq);

  let diff = closest.freq - freq;
  return diff / totalDiff * -100;
}