import { describe, expect, it } from 'vitest'
import { magColor } from './color'

describe('magColor', () => {
  it('maps low magnitude to a yellow hue', () => {
    expect(magColor(0)).toBe('hsl(48, 100%, 65%)')
  })

  it('maps magnitude 7+ to a red hue', () => {
    expect(magColor(7)).toBe('hsl(0, 100%, 50%)')
    expect(magColor(9)).toBe(magColor(7))
  })

  it('clamps negative magnitudes to the low end', () => {
    expect(magColor(-0.5)).toBe(magColor(0))
  })
})
