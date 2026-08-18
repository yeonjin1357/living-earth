import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import type { Group, PerspectiveCamera } from 'three'
import { Atmosphere } from './components/Atmosphere'
import { Continents } from './components/Continents'
import { Hud } from './components/Hud'
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

// 세로 화면에서는 가로 시야각이 좁아지므로 지구본 전체가 보이도록 카메라를 뒤로 뺀다
function ResponsiveCamera() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera
  const size = useThree((s) => s.size)

  useEffect(() => {
    const vHalf = (camera.fov * Math.PI) / 360
    const hHalf = Math.atan(Math.tan(vHalf) * (size.width / size.height))
    // 정방형 기준 거리 2.8과 동일한 프레이밍을 유지하는 목표값
    const target = 2.8 * Math.sin(vHalf)
    camera.position.setLength(target / Math.sin(Math.min(vHalf, hHalf)))
    camera.updateProjectionMatrix()
  }, [camera, size])

  return null
}

export default function App() {
  const quakes = useEarthquakes()
  const [hover, setHover] = useState<HoverInfo | null>(null)

  return (
    <div className="app">
      <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#050510']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.2} />
        <Stars radius={80} depth={40} count={4000} factor={3} fade />
        <Earth
          quakes={quakes}
          onHover={(quake, x, y) => setHover({ quake, x, y })}
          onUnhover={() => setHover(null)}
        />
        <Atmosphere radius={GLOBE_RADIUS} />
        <ResponsiveCamera />
        <OrbitControls enablePan={false} minDistance={1.5} maxDistance={8} />
        <EffectComposer>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
      <Hud quakes={quakes} />
      <QuakeTooltip hover={hover} />
    </div>
  )
}
