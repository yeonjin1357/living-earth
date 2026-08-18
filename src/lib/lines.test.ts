import { describe, expect, it } from 'vitest'
import type { FeatureCollection } from 'geojson'
import { latLonToVector3 } from './geo'
import { collectRings, ringsToLineSegments } from './lines'

// GeoJSON 규약대로 각 점은 [lon, lat]
const triangle: [number, number][] = [
  [0, 0],
  [10, 0],
  [10, 10],
  [0, 0],
]

describe('ringsToLineSegments', () => {
  it('turns a ring of N points into N-1 segments (2 endpoints x 3 coords each)', () => {
    const positions = ringsToLineSegments([triangle], 1)
    expect(positions.length).toBe((triangle.length - 1) * 2 * 3)
  })

  it('places segment endpoints on the sphere via latLonToVector3', () => {
    const positions = ringsToLineSegments([triangle], 2)
    const start = latLonToVector3(0, 0, 2) // lat 0, lon 0
    const end = latLonToVector3(0, 10, 2) // lat 0, lon 10
    expect(positions[0]).toBeCloseTo(start.x)
    expect(positions[1]).toBeCloseTo(start.y)
    expect(positions[2]).toBeCloseTo(start.z)
    expect(positions[3]).toBeCloseTo(end.x)
    expect(positions[4]).toBeCloseTo(end.y)
    expect(positions[5]).toBeCloseTo(end.z)
  })

  it('concatenates segments from multiple rings', () => {
    const positions = ringsToLineSegments([triangle, triangle], 1)
    expect(positions.length).toBe(2 * (triangle.length - 1) * 2 * 3)
  })

  it('ignores rings with fewer than 2 points', () => {
    expect(ringsToLineSegments([[[0, 0]]], 1).length).toBe(0)
    expect(ringsToLineSegments([[]], 1).length).toBe(0)
  })
})

describe('collectRings', () => {
  const ringA = [
    [0, 0],
    [1, 1],
    [0, 0],
  ]
  const ringB = [
    [10, 10],
    [11, 11],
    [10, 10],
  ]

  it('collects rings from Polygon and MultiPolygon features', () => {
    const fc = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: { type: 'Polygon', coordinates: [ringA, ringB] },
        },
        {
          type: 'Feature',
          properties: {},
          geometry: { type: 'MultiPolygon', coordinates: [[ringA], [ringB]] },
        },
      ],
    } as FeatureCollection
    expect(collectRings(fc)).toEqual([ringA, ringB, ringA, ringB])
  })

  it('skips non-polygon geometries', () => {
    const fc = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: { type: 'Point', coordinates: [0, 0] },
        },
      ],
    } as FeatureCollection
    expect(collectRings(fc)).toEqual([])
  })
})
