import { latLonToVector3 } from '../lib/geo'
import { magColor } from '../lib/color'
import type { Quake } from '../lib/usgs'

interface Props {
  quakes: Quake[]
  radius: number
}

export function QuakeMarkers({ quakes, radius }: Props) {
  return (
    <>
      {quakes.map((q) => (
        <mesh
          key={q.id}
          position={latLonToVector3(q.lat, q.lon, radius * 1.005)}
        >
          <sphereGeometry args={[0.006 + Math.max(q.mag, 0) * 0.004, 8, 8]} />
          <meshBasicMaterial color={magColor(q.mag)} />
        </mesh>
      ))}
    </>
  )
}
