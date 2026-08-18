import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Color, DoubleSide, Quaternion, Vector3 } from 'three'
import type { ShaderMaterial } from 'three'
import { latLonToVector3 } from '../lib/geo'
import { magColor } from '../lib/color'
import { rippleParams } from '../lib/ripple'
import { rippleFragmentShader, rippleVertexShader } from '../shaders/ripple'
import type { Quake } from '../lib/usgs'

const MIN_RIPPLE_MAG = 2.5
const Z_AXIS = new Vector3(0, 0, 1)

function Ripple({ quake, radius }: { quake: Quake; radius: number }) {
  const material = useRef<ShaderMaterial>(null)
  const { maxRadius, period } = rippleParams(quake.mag)

  const { position, quaternion, uniforms } = useMemo(() => {
    const position = latLonToVector3(quake.lat, quake.lon, radius * 1.01)
    return {
      position,
      quaternion: new Quaternion().setFromUnitVectors(
        Z_AXIS,
        position.clone().normalize(),
      ),
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(magColor(quake.mag)) },
        uPeriod: { value: period },
        // 지진마다 위상을 다르게 해 파문이 동기화되지 않도록 한다
        uPhase: { value: (quake.time % 97_000) / 9_700 },
      },
    }
  }, [quake, radius, period])

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <mesh position={position} quaternion={quaternion}>
      <circleGeometry args={[maxRadius, 48]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        side={DoubleSide}
        uniforms={uniforms}
        vertexShader={rippleVertexShader}
        fragmentShader={rippleFragmentShader}
      />
    </mesh>
  )
}

export function QuakeRipples({
  quakes,
  radius,
}: {
  quakes: Quake[]
  radius: number
}) {
  const notable = quakes.filter((q) => q.mag >= MIN_RIPPLE_MAG)
  return (
    <>
      {notable.map((q) => (
        <Ripple key={q.id} quake={q} radius={radius} />
      ))}
    </>
  )
}
