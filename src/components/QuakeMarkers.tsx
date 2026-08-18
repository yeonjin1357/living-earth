import { latLonToVector3 } from '../lib/geo'
import type { Quake } from '../lib/usgs'

// 규모 0 → 노란빛, 규모 7+ → 붉은빛
function magColor(mag: number): string {
  const t = Math.min(Math.max(mag, 0), 7) / 7
  return `hsl(${Math.round(48 * (1 - t))}, 100%, ${Math.round(65 - t * 15)}%)`
}

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
