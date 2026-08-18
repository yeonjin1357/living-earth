import { describe, expect, it } from 'vitest'
import { rippleParams } from './ripple'

describe('rippleParams', () => {
  it('gives bigger quakes a larger ripple radius', () => {
    expect(rippleParams(6).maxRadius).toBeGreaterThan(rippleParams(3).maxRadius)
  })

  it('gives bigger quakes a slower ripple period', () => {
    expect(rippleParams(6).period).toBeGreaterThan(rippleParams(3).period)
  })

  it('clamps magnitude to the 0-7 range', () => {
    expect(rippleParams(9)).toEqual(rippleParams(7))
    expect(rippleParams(-1)).toEqual(rippleParams(0))
  })

  it('keeps the radius within sane bounds for the unit globe', () => {
    for (const mag of [0, 2.5, 5, 7]) {
      const { maxRadius } = rippleParams(mag)
      expect(maxRadius).toBeGreaterThanOrEqual(0.03)
      expect(maxRadius).toBeLessThanOrEqual(0.3)
    }
  })
})
