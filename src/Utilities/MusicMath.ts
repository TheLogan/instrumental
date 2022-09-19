import { notes } from "./Constants";

export const dotLength = (nodeLength: number) => {
  return nodeLength + (nodeLength / 2)
}

export const tupletLength = (nodeLength: number, count: number) => {
  return nodeLength * (count - 1) / count; // triplet = 2/3
}

export const tieLength = (nodeLength: number, nodeLengthNext: number[]) => {
  return nodeLengthNext.reduce((sum, next) => sum + next, nodeLength);
}

export const getNoteByFreq = (freq: number) => {
  return notes.reduce(function (prev, curr) {
    return (Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev);
  });
}