/** 규모 0 → 노란빛, 규모 7+ → 붉은빛. */
export function magColor(mag: number): string {
  const t = Math.min(Math.max(mag, 0), 7) / 7
  return `hsl(${Math.round(48 * (1 - t))}, 100%, ${Math.round(65 - t * 15)}%)`
}
