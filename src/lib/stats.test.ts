import { describe, expect, it } from 'vitest'
import { quakeStats } from './stats'
import type { Quake } from './usgs'

const quake = (id: string, mag: number): Quake => ({
  id,
  mag,
  place: `place-${id}`,
  time: 0,
  lon: 0,
  lat: 0,
  depth: 10,
})

describe('quakeStats', () => {
  it('counts quakes and finds the strongest one', () => {
    const stats = quakeStats([quake('a', 2.1), quake('b', 5.6), quake('c', 4.0)])
    expect(stats.count).toBe(3)
    expect(stats.strongest?.id).toBe('b')
  })

  it('returns zero count and null strongest for an empty list', () => {
    expect(quakeStats([])).toEqual({ count: 0, strongest: null })
  })
})
