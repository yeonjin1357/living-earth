import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import type { Group } from 'three'
import { Continents } from './components/Continents'
import { QuakeMarkers } from './components/QuakeMarkers'
import { QuakeRipples } from './components/QuakeRipples'
import { QuakeTooltip, type HoverInfo } from './components/QuakeTooltip'
import { useEarthquakes } from './hooks/useEarthquakes'
import type { Quake } from './lib/usgs'

const GLOBE_RADIUS = 1

interface EarthProps {
  quakes: Quake[]
  onHover: (quake: Quake, x: number, y: number) => void
  onUnhover: () => void
}

function Earth({ quakes, onHover, onUnhover }: EarthProps) {
  const group = useRef<Group>(null)

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
        <meshStandardMaterial color="#0b1526" />
      </mesh>
      <Continents radius={GLOBE_RADIUS} />
      <QuakeMarkers
        quakes={quakes}
        radius={GLOBE_RADIUS}
        onHover={onHover}
        onUnhover={onUnhover}
      />
      <QuakeRipples quakes={quakes} radius={GLOBE_RADIUS} />
    </group>
  )
}

export default function App() {
  const quakes = useEarthquakes()
  const [hover, setHover] = useState<HoverInfo | null>(null)

  return (
    <div className="app">
      <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }}>
        <color attach="background" args={['#050510']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <Stars radius={80} depth={40} count={4000} factor={3} fade />
        <Earth
          quakes={quakes}
          onHover={(quake, x, y) => setHover({ quake, x, y })}
          onUnhover={() => setHover(null)}
        />
        <OrbitControls enablePan={false} minDistance={1.5} maxDistance={6} />
      </Canvas>
      <QuakeTooltip hover={hover} />
    </div>
  )
}
