import { Vector3 } from 'three'

const DEG = Math.PI / 180

/**
 * 경위도(도 단위)를 반지름 radius인 구 표면의 3D 좌표로 변환한다.
 * Three.js SphereGeometry에 등장방형(equirectangular) 텍스처를 입혔을 때
 * 지리 좌표와 텍스처가 일치하는 규약을 따른다.
 */
export function latLonToVector3(
  lat: number,
  lon: number,
  radius: number,
): Vector3 {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}
