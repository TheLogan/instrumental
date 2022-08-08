export const dotLength = (nodeLength: number) => {
  return nodeLength + (nodeLength / 2)
}

export const tupletLength = (nodeLength: number, count: number) => {
  return nodeLength * (count-1)/count; // triplet = 2/3
}