import { describe, expect, it } from 'vitest'
import { parseQuakeFeed } from './usgs'

// 실제 USGS all_hour.geojson 응답에서 필요한 필드만 추린 형태
const feed = {
  type: 'FeatureCollection',
  metadata: { count: 2 },
  features: [
    {
      type: 'Feature',
      id: 'ak0259yfa123',
      properties: {
        mag: 2.71,
        place: '60 km W of Petrolia, CA',
        time: 1755529200000,
      },
      geometry: {
        type: 'Point',
        coordinates: [-124.9888, 40.3638, 0.7],
      },
    },
    {
      type: 'Feature',
      id: 'nc75222137',
      properties: {
        mag: 0.75,
        place: '5 km SSE of Idyllwild, CA',
        time: 1755528900000,
      },
      geometry: {
        type: 'Point',
        coordinates: [-116.7055, 33.6973, 18.48],
      },
    },
  ],
}

describe('parseQuakeFeed', () => {
  it('extracts id, magnitude, place, time and coordinates from each feature', () => {
    const quakes = parseQuakeFeed(feed)
    expect(quakes).toHaveLength(2)
    expect(quakes[0]).toEqual({
      id: 'ak0259yfa123',
      mag: 2.71,
      place: '60 km W of Petrolia, CA',
      time: 1755529200000,
      lon: -124.9888,
      lat: 40.3638,
      depth: 0.7,
    })
  })

  it('skips features whose magnitude is null', () => {
    const withNullMag = {
      ...feed,
      features: [
        {
          ...feed.features[0],
          properties: { ...feed.features[0].properties, mag: null },
        },
        feed.features[1],
      ],
    }
    const quakes = parseQuakeFeed(withNullMag)
    expect(quakes).toHaveLength(1)
    expect(quakes[0].id).toBe('nc75222137')
  })

  it('returns an empty array for an empty feed', () => {
    expect(parseQuakeFeed({ ...feed, features: [] })).toEqual([])
  })
})
