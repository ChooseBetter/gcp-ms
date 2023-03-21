export function randomSeed(seed: number, max?: number, min?: number) {
  max = max || 1;
  min = min || 0;
  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280.0;
  return min + rnd * (max - min);
}
