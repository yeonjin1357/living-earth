import { useMemo } from 'react'
import { AdditiveBlending, BackSide, Color } from 'three'
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
} from '../shaders/atmosphere'

export function Atmosphere({ radius }: { radius: number }) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new Color('#3b7dd8') } }),
    [],
  )

  return (
    <mesh scale={1.15}>
      <sphereGeometry args={[radius, 48, 48]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        side={BackSide}
        uniforms={uniforms}
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
      />
    </mesh>
  )
}
