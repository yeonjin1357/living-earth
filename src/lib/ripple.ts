export interface RippleParams {
  maxRadius: number
  period: number
}

/** 지진 규모에 따른 파문 크기(구 반지름 1 기준)와 반복 주기(초). */
export function rippleParams(mag: number): RippleParams {
  const t = Math.min(Math.max(mag, 0), 7) / 7
  return {
    maxRadius: 0.04 + t * 0.2,
    period: 2 + t * 3,
  }
}
