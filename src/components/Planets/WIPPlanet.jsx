import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'
import { useUniverseStore } from '../../store/universeStore'
import { PROJECTS_WIP } from '../../data/portfolio'
import { createEmberParticle } from '../../utils/particleTexture'

// Detritos vulcânicos em anel — braseiros de rocha quente
function DustField({ count = 1600 }) {
  const ref = useRef()
  const texture = useMemo(() => createEmberParticle(), [])
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle  = Math.random() * Math.PI * 2
      const radius = 12 + Math.random() * 12
      const height = (Math.random() - 0.5) * 4
      pos[i * 3]     = Math.cos(angle) * radius
      pos[i * 3 + 1] = height
      pos[i * 3 + 2] = Math.sin(angle) * radius
    }
    return pos
  }, [count])
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.05
  })
  return (
    <points ref={ref} renderOrder={5}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={texture} size={0.5} sizeAttenuation transparent opacity={0.85}
        depthWrite={false} blending={THREE.NormalBlending} alphaTest={0.1} />
    </points>
  )
}

function WIPCard({ project, index, total }) {
  const angle = (index / total) * Math.PI * 2 + Math.PI / total
  const r = 21
  const x = Math.cos(angle) * r
  const z = Math.sin(angle) * r
  return (
    <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.8}>
      <group position={[x, index % 2 === 0 ? 2.5 : -2.5, z]} rotation={[0, -angle + Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[9.5, 5.5]} />
          <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={0.4}
            transparent opacity={0.85} roughness={0.2} metalness={0.5} depthWrite={false} />
        </mesh>
        <Text position={[0, 1.4, 0.05]} fontSize={0.5} color="white" anchorX="center" anchorY="middle" maxWidth={9}>{project.name}</Text>
        <Text position={[0, 0.65, 0.05]} fontSize={0.27} color={project.glowColor} anchorX="center" anchorY="middle" maxWidth={9}>{project.subtitle}</Text>
        <Text position={[0, 0, 0.05]} fontSize={0.2} color="#aaa" anchorX="center" anchorY="middle" maxWidth={9}>{project.tech.join(' · ')}</Text>
        <Text position={[0, -1.3, 0.05]} fontSize={0.22} color="#FFD700" anchorX="center" anchorY="middle">◈ EM CONSTRUÇÃO</Text>
      </group>
    </Float>
  )
}

export default function WIPPlanet({ position = [80, -10, -100] }) {
  const setActivePlanet = useUniverseStore((s) => s.setActivePlanet)
  const planetRef = useRef()
  const matRef = useRef()
  const RADIUS = 10
  const SEG = window.innerWidth < 640 ? 64 : 128

  const textures = useTexture({
    map:          '/textures/wip/diff.jpg',
    normalMap:    '/textures/wip/nor.jpg',
    roughnessMap: '/textures/wip/rough.jpg',
  })

  useMemo(() => {
    Object.values(textures).forEach(t => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping
      t.repeat.set(2, 2)
    })
  }, [textures])

  useFrame(({ clock }) => {
    if (planetRef.current) planetRef.current.rotation.y = clock.getElapsedTime() * 0.08
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2
    }
  })

  return (
    <group position={position}>
      <group ref={planetRef}
        onClick={() => setActivePlanet('wip')}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'none' }}
      >
        <mesh>
          <sphereGeometry args={[RADIUS, SEG, SEG]} />
          <meshStandardMaterial
            ref={matRef}
            {...textures}
            color="#BB5522"
            roughness={0.92}
            metalness={0.04}
            normalScale={new THREE.Vector2(2.5, 2.5)}
            emissive="#441100"
            emissiveIntensity={0.07}
          />
        </mesh>
      </group>

      <mesh scale={1.06} renderOrder={10}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVert} fragmentShader={atmosphereFrag}
          uniforms={{ glowColor: { value: new THREE.Color('#FF6B35') }, intensity: { value: 0.8 }, power: { value: 7.0 } }}
          transparent depthWrite={false} side={THREE.BackSide} blending={THREE.AdditiveBlending}
        />
      </mesh>

      <DustField count={500} />
      {PROJECTS_WIP.map((p, i) => <WIPCard key={p.id} project={p} index={i} total={PROJECTS_WIP.length} />)}
      <pointLight color="#FF4500" intensity={4} distance={60} decay={1.8} />
    </group>
  )
}
