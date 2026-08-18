import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import type { Group } from 'three'
import { QuakeMarkers } from './components/QuakeMarkers'
import { QuakeRipples } from './components/QuakeRipples'
import { useEarthquakes } from './hooks/useEarthquakes'

const GLOBE_RADIUS = 1

function Earth() {
  const group = useRef<Group>(null)
  const quakes = useEarthquakes()

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshStandardMaterial color="#2b6cb0" wireframe />
      </mesh>
      <QuakeMarkers quakes={quakes} radius={GLOBE_RADIUS} />
      <QuakeRipples quakes={quakes} radius={GLOBE_RADIUS} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }}>
      <color attach="background" args={['#050510']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <Stars radius={80} depth={40} count={4000} factor={3} fade />
      <Earth />
      <OrbitControls enablePan={false} minDistance={1.5} maxDistance={6} />
    </Canvas>
  )
}
