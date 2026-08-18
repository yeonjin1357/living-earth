/** 지진 규모에 따른 마커 반지름(구 반지름 1 기준). */
export function markerRadius(mag: number): number {
  return 0.006 + Math.min(Math.max(mag, 0), 7) * 0.004
}
