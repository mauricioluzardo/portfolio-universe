import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'
import { useUniverseStore } from '../../store/universeStore'
import { createDataParticle } from '../../utils/particleTexture'

// Planeta MONACO-RE-MCP — Engenharia Reversa & Infraestrutura de Baixo Nível
// Estética: cyber azul escuro, bitstream, hologram wireframe e precisão binária.
// Segue rigorosamente o padrão dos outros planetas do universo Ateliê Monaco:
// PBR reutilizado, atmosfera shader nativa, anéis de dados digitais e iluminação sincronizada.

function DataStreamRing({ radius = 12, speed = 0.25 }) {
  const ref = useRef()
  const texture = useMemo(() => createDataParticle(), [])
  const positions = useMemo(() => {
    const pos = new Float32Array(1100 * 3)
    for (let i = 0; i < 1100; i++) {
      const a = (i / 1100) * Math.PI * 2
      const spread = (Math.random() - 0.5) * 2.2
      pos[i * 3]     = Math.cos(a) * (radius + spread)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.8
      pos[i * 3 + 2] = Math.sin(a) * (radius + spread)
    }
    return pos
  }, [radius])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed
  })

  return (
    <points ref={ref} rotation={[-0.2, 0, 0.3]} renderOrder={5}>
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

export default function MonacoPlanet({ position = [45, -6, -260] }) {
  const setActivePlanet = useUniverseStore((s) => s.setActivePlanet)
  const planetRef = useRef()
  const RADIUS = 8
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
      planetRef.current.rotation.y = clock.getElapsedTime() * 0.08
    }
  })

  return (
    <group position={position}>
      <group
        ref={planetRef}
        onClick={() => setActivePlanet('monaco')}
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
            color="#0A5C96"
            roughness={0.22}
            metalness={0.9}
            normalScale={new THREE.Vector2(2.0, 2.0)}
            emissive="#001830"
            emissiveIntensity={0.22}
          />
        </mesh>

        {/* Wireframe holográfico de análise de estruturas PE/ELF/Mach-O */}
        <mesh scale={1.015}>
          <sphereGeometry args={[RADIUS, 28, 28]} />
          <meshBasicMaterial
            color="#38BDF8"
            wireframe
            transparent
            opacity={0.16}
          />
        </mesh>
      </group>

      {/* Atmosfera ciber-azul MCP */}
      <mesh scale={1.06} renderOrder={10}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVert}
          fragmentShader={atmosphereFrag}
          uniforms={{
            glowColor: { value: new THREE.Color('#38BDF8') },
            intensity: { value: 0.95 },
            power:     { value: 6.8 },
          }}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <DataStreamRing radius={RADIUS + 3.8} speed={0.3} />
      <DataStreamRing radius={RADIUS + 6.5} speed={-0.2} />
      <pointLight color="#38BDF8" intensity={3.8} distance={55} decay={1.8} />
    </group>
  )
}
