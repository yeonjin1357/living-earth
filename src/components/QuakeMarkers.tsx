import { useLayoutEffect, useRef } from 'react'
import { Color, Object3D } from 'three'
import type { InstancedMesh } from 'three'
import { latLonToVector3 } from '../lib/geo'
import { magColor } from '../lib/color'
import { markerRadius } from '../lib/marker'
import type { Quake } from '../lib/usgs'

interface Props {
  quakes: Quake[]
  radius: number
}

export function QuakeMarkers({ quakes, radius }: Props) {
  const mesh = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    const m = mesh.current
    if (!m) return
    const dummy = new Object3D()
    const color = new Color()
    quakes.forEach((q, i) => {
      dummy.position.copy(latLonToVector3(q.lat, q.lon, radius * 1.005))
      dummy.scale.setScalar(markerRadius(q.mag))
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
      m.setColorAt(i, color.set(magColor(q.mag)))
    })
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [quakes, radius])

  if (quakes.length === 0) return null

  return (
    <instancedMesh
      key={quakes.length}
      ref={mesh}
      args={[undefined, undefined, quakes.length]}
      // 인스턴스들이 원점 기준 지오메트리 경계 밖에 있어 컬링이 오판하므로 끈다
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}
