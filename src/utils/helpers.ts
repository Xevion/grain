export const getEdgePoint = (
  n: number,
  width: number,
  height: number
): [number, number] => {
  const full = 2 * width + 2 * height;
  if (n > full) n %= full;
  if (n < 0) n = full - n;

  if (n < width) return [n, 0];
  if (n < width + height) return [width, n - width];
  if (n < 2 * width + height) return [n - (2 * width + height), height];
  return [0, height - (n - (2 * width + height))];
};
