import { describe, expect, it } from 'vitest'
import { markerRadius } from './marker'

describe('markerRadius', () => {
  it('gives bigger quakes a larger marker', () => {
    expect(markerRadius(6)).toBeGreaterThan(markerRadius(2))
  })

  it('has a visible minimum size for tiny or negative magnitudes', () => {
    expect(markerRadius(0)).toBeCloseTo(0.006)
    expect(markerRadius(-1)).toBeCloseTo(0.006)
  })

  it('clamps magnitude to 7 at the top end', () => {
    expect(markerRadius(9)).toBeCloseTo(markerRadius(7))
    expect(markerRadius(7)).toBeCloseTo(0.034)
  })
})
