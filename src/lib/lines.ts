import type { FeatureCollection } from 'geojson'
import { latLonToVector3 } from './geo'

/** FeatureCollection의 모든 (Multi)Polygon에서 링([lon, lat] 점 배열)을 모은다. */
export function collectRings(fc: FeatureCollection): number[][][] {
  const rings: number[][][] = []
  for (const f of fc.features) {
    if (f.geometry.type === 'Polygon') {
      rings.push(...f.geometry.coordinates)
    } else if (f.geometry.type === 'MultiPolygon') {
      for (const polygon of f.geometry.coordinates) {
        rings.push(...polygon)
      }
    }
  }
  return rings
}

/**
 * GeoJSON 링([lon, lat] 점 배열)들을 구 표면 위 선분 좌표 배열로 변환한다.
 * 결과는 LineSegments용 — 연속한 두 점마다 선분 하나(끝점 2개 x 좌표 3개).
 */
export function ringsToLineSegments(
  rings: number[][][],
  radius: number,
): Float32Array {
  const segments: number[] = []
  for (const ring of rings) {
    for (let i = 0; i < ring.length - 1; i++) {
      const a = latLonToVector3(ring[i][1], ring[i][0], radius)
      const b = latLonToVector3(ring[i + 1][1], ring[i + 1][0], radius)
      segments.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
  }
  return new Float32Array(segments)
}
