import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'
import { useUniverseStore } from '../../store/universeStore'
import { PROJECTS_DONE } from '../../data/portfolio'
import { createDataParticle } from '../../utils/particleTexture'

function DataRing({ radius, speed }) {
  const ref = useRef()
  const texture = useMemo(() => createDataParticle(), [])
  const positions = useMemo(() => {
    const pos = new Float32Array(1400 * 3)
    for (let i = 0; i < 1400; i++) {
      const a = (i / 1400) * Math.PI * 2
      const spread = (Math.random() - 0.5) * 2
      pos[i * 3]     = Math.cos(a) * (radius + spread)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.6
      pos[i * 3 + 2] = Math.sin(a) * (radius + spread)
    }
    return pos
  }, [radius])
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed })
  return (
    <points ref={ref} renderOrder={5}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial map={texture} size={0.45} sizeAttenuation transparent opacity={0.92}
        depthWrite={false} blending={THREE.NormalBlending} alphaTest={0.1} />
    </points>
  )
}

function ProjectCard({ project, index, total }) {
  const angle = (index / total) * Math.PI * 2
  const r = 19
  const x = Math.cos(angle) * r
  const z = Math.sin(angle) * r
  return (
    <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.7}>
      <group position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]}>
        <mesh>
          <planeGeometry args={[9, 5.5]} />
          <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={0.5}
            transparent opacity={0.88} roughness={0.15} metalness={0.6} depthWrite={false} />
        </mesh>
        <Text position={[0, 1.4, 0.05]} fontSize={0.52} color="white" anchorX="center" anchorY="middle" maxWidth={8.5}>{project.name}</Text>
        <Text position={[0, 0.65, 0.05]} fontSize={0.28} color={project.glowColor} anchorX="center" anchorY="middle" maxWidth={8.5}>{project.subtitle}</Text>
        <Text position={[0, 0, 0.05]} fontSize={0.2} color="#aac" anchorX="center" anchorY="middle" maxWidth={8.5}>{project.tech.join(' · ')}</Text>
        <Text position={[0, -1.3, 0.05]} fontSize={0.22} color="#66ffcc" anchorX="center" anchorY="middle">● LIVE</Text>
      </group>
    </Float>
  )
}

export default function ProjectsPlanet({ position = [-70, 8, -60] }) {
  const setActivePlanet = useUniverseStore((s) => s.setActivePlanet)
  const planetRef = useRef()
  const RADIUS = 10
  const SEG = window.innerWidth < 640 ? 64 : 128

  const textures = useTexture({
    map:          '/textures/projects/diff.jpg',
    normalMap:    '/textures/projects/nor.jpg',
    roughnessMap: '/textures/projects/rough.jpg',
  })

  useMemo(() => {
    Object.values(textures).forEach(t => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping
      t.repeat.set(2, 2)
    })
  }, [textures])

  useFrame(({ clock }) => {
    if (planetRef.current) planetRef.current.rotation.y = clock.getElapsedTime() * 0.1
  })

  return (
    <group position={position}>
      <group ref={planetRef}
        onClick={() => setActivePlanet('projects')}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'none' }}
      >
        <mesh>
          <sphereGeometry args={[RADIUS, SEG, SEG]} />
          <meshStandardMaterial
            {...textures}
            color="#4488BB"
            roughness={0.25}
            metalness={0.85}
            normalScale={new THREE.Vector2(2.0, 2.0)}
            emissive="#001133"
            emissiveIntensity={0.06}
          />
        </mesh>
      </group>

      <mesh scale={1.06} renderOrder={10}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVert} fragmentShader={atmosphereFrag}
          uniforms={{ glowColor: { value: new THREE.Color('#00D4FF') }, intensity: { value: 0.8 }, power: { value: 7.0 } }}
          transparent depthWrite={false} side={THREE.BackSide} blending={THREE.AdditiveBlending}
        />
      </mesh>

      <DataRing radius={RADIUS + 4} speed={0.35} />
      <DataRing radius={RADIUS + 7} speed={-0.2} />
      {PROJECTS_DONE.map((p, i) => <ProjectCard key={p.id} project={p} index={i} total={PROJECTS_DONE.length} />)}
      <pointLight color="#00D4FF" intensity={4} distance={60} decay={1.8} />
    </group>
  )
}
