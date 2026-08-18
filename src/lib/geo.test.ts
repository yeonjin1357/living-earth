import { describe, expect, it } from 'vitest'
import { latLonToVector3 } from './geo'

describe('latLonToVector3', () => {
  it('maps the north pole to the top of the sphere (+Y)', () => {
    const v = latLonToVector3(90, 0, 2)
    expect(v.x).toBeCloseTo(0)
    expect(v.y).toBeCloseTo(2)
    expect(v.z).toBeCloseTo(0)
  })

  it('maps the south pole to the bottom of the sphere (-Y)', () => {
    const v = latLonToVector3(-90, 0, 2)
    expect(v.x).toBeCloseTo(0)
    expect(v.y).toBeCloseTo(-2)
    expect(v.z).toBeCloseTo(0)
  })

  it('maps lat 0, lon 0 to +X on the equator', () => {
    const v = latLonToVector3(0, 0, 1)
    expect(v.x).toBeCloseTo(1)
    expect(v.y).toBeCloseTo(0)
    expect(v.z).toBeCloseTo(0)
  })

  it('maps lat 0, lon 90E to -Z on the equator', () => {
    const v = latLonToVector3(0, 90, 1)
    expect(v.x).toBeCloseTo(0)
    expect(v.y).toBeCloseTo(0)
    expect(v.z).toBeCloseTo(-1)
  })

  it('keeps every point at the given radius', () => {
    const v = latLonToVector3(37.5665, 126.978, 1.5) // 서울
    expect(v.length()).toBeCloseTo(1.5)
  })
})
