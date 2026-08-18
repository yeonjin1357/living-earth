import { useMemo } from 'react'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { BufferAttribute, BufferGeometry } from 'three'
import land110 from 'world-atlas/land-110m.json'
import { collectRings, ringsToLineSegments } from '../lib/lines'

export function Continents({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const topology = land110 as unknown as Topology
    const land = feature(
      topology,
      topology.objects.land as GeometryCollection,
    )
    const positions = ringsToLineSegments(
      collectRings(land),
      radius * 1.001,
    )
    const geom = new BufferGeometry()
    geom.setAttribute('position', new BufferAttribute(positions, 3))
    return geom
  }, [radius])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#5da9e9" transparent opacity={0.8} />
    </lineSegments>
  )
}
