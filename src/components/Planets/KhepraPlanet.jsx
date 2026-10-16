import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'
import { useUniverseStore } from '../../store/universeStore'
import { createRockParticle } from '../../utils/particleTexture'

// Planeta Khepra — A Tumba Egípcia & O Selado (Kheper-Ankh)
// Estética: ouro antigo, obsidiana e areia dourada.
// Segue rigorosamente o padrão dos outros planetas do universo Ateliê Monaco:
// PBR reutilizado, atmosfera shader nativa, anel de partículas e iluminação sincronizada.

function HieroglyphRing({ radius = 13, count = 900 }) {
  const ref = useRef()
  const texture = useMemo(() => createRockParticle(), [])
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const spread = (Math.random() - 0.5) * 2.8
      pos[i * 3]     = Math.cos(a) * (radius + spread)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.2
      pos[i * 3 + 2] = Math.sin(a) * (radius + spread)
    }
    return pos
  }, [radius, count])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.07
  })

  return (
    <points ref={ref} rotation={[0.35, 0, 0.15]} renderOrder={5}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.42}
        sizeAttenuation
        transparent
        opacity={0.92}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        alphaTest={0.08}
      />
    </points>
  )
}

export default function KhepraPlanet({ position = [-40, 12, -200] }) {
  const setActivePlanet = useUniverseStore((s) => s.setActivePlanet)
  const planetRef = useRef()
  const RADIUS = 9
  const SEG = typeof window !== 'undefined' && window.innerWidth < 640 ? 64 : 128

  const textures = useTexture({
    map:          '/textures/projects/diff.webp',
    normalMap:    '/textures/projects/nor.webp',
    roughnessMap: '/textures/projects/rough.webp',
  })

  useMemo(() => {
    if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace
    Object.values(textures).forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping
      t.repeat.set(2, 2)
    })
  }, [textures])

  useFrame(({ clock }) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group position={position}>
      <group
        ref={planetRef}
        onClick={() => setActivePlanet('khepra')}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
      >
        <mesh>
          <sphereGeometry args={[RADIUS, SEG, SEG]} />
          <meshStandardMaterial
            {...textures}
            color="#D4AF37"
            roughness={0.32}
            metalness={0.78}
            normalScale={new THREE.Vector2(1.8, 1.8)}
            emissive="#3A2808"
            emissiveIntensity={0.24}
          />
        </mesh>

        {/* Anel de ouro cerimonial egípcio */}
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <ringGeometry args={[RADIUS * 1.32, RADIUS * 1.52, 64]} />
          <meshStandardMaterial
            color="#E3B23C"
            emissive="#7A5200"
            emissiveIntensity={0.25}
            side={THREE.DoubleSide}
            transparent
            opacity={0.45}
            metalness={0.88}
            roughness={0.22}
          />
        </mesh>
      </group>

      {/* Atmosfera mística dourada */}
      <mesh scale={1.06} renderOrder={10}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVert}
          fragmentShader={atmosphereFrag}
          uniforms={{
            glowColor: { value: new THREE.Color('#E3B23C') },
            intensity: { value: 0.9 },
            power:     { value: 6.2 },
          }}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <HieroglyphRing radius={RADIUS + 4.5} count={950} />
      <pointLight color="#E3B23C" intensity={3.6} distance={55} decay={1.8} />
    </group>
  )
}
