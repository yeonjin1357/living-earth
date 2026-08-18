import { useLayoutEffect, useRef } from 'react'
import { Color, Object3D } from 'three'
import type { InstancedMesh } from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import { latLonToVector3 } from '../lib/geo'
import { magColor } from '../lib/color'
import { markerRadius } from '../lib/marker'
import type { Quake } from '../lib/usgs'

interface Props {
  quakes: Quake[]
  radius: number
  onHover?: (quake: Quake, x: number, y: number) => void
  onUnhover?: () => void
}

export function QuakeMarkers({ quakes, radius, onHover, onUnhover }: Props) {
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

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === undefined || !onHover) return
    e.stopPropagation()
    document.body.style.cursor = 'pointer'
    onHover(quakes[e.instanceId], e.nativeEvent.clientX, e.nativeEvent.clientY)
  }
  const handleOut = () => {
    document.body.style.cursor = ''
    onUnhover?.()
  }

  return (
    <instancedMesh
      key={quakes.length}
      ref={mesh}
      args={[undefined, undefined, quakes.length]}
      // 인스턴스들이 원점 기준 지오메트리 경계 밖에 있어 컬링이 오판하므로 끈다
      frustumCulled={false}
      onPointerMove={handleMove}
      onPointerOut={handleOut}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial />
    </instancedMesh>
  )
}
