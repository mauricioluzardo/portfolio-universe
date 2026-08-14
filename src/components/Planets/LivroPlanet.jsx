import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'
import { useUniverseStore } from '../../store/universeStore'
import { createRockParticle } from '../../utils/particleTexture'

// Planeta do Livro do Adriano — céu noturno com estrelas douradas, que é o
// motivo visual da identidade do projeto. Reaproveita as texturas PBR de
// contact/ com tint azul-meia-noite: nenhum byte novo no carregamento inicial.

// Estrelas douradas orbitando em duas faixas inclinadas, como uma constelação
function ConstelacaoDourada({ radius, count = 420, tilt = 0.4, speed = 0.05 }) {
  const ref = useRef()
  // createRockParticle já é dourada na própria textura — tingir por cima
  // multiplicaria as cores e puxaria para o verde.
  const texture = useMemo(() => createRockParticle(), [])
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      const spread = (Math.random() - 0.5) * 3.2
      pos[i * 3]     = Math.cos(a) * (radius + spread)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.6
      pos[i * 3 + 2] = Math.sin(a) * (radius + spread)
    }
    return pos
  }, [radius, count])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed
  })

  return (
    <points ref={ref} rotation={[tilt, 0, tilt * 0.5]} renderOrder={5}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture} size={0.36} sizeAttenuation
        transparent opacity={0.9} depthWrite={false}
        blending={THREE.AdditiveBlending} alphaTest={0.05}
      />
    </points>
  )
}

export default function LivroPlanet({ position = [30, 18, -142] }) {
  const setActivePlanet = useUniverseStore((s) => s.setActivePlanet)
  const planetRef = useRef()
  const RADIUS = 9
  const SEG = window.innerWidth < 640 ? 64 : 128

  const textures = useTexture({
    map:          '/textures/contact/diff.webp',
    normalMap:    '/textures/contact/nor.webp',
    roughnessMap: '/textures/contact/rough.webp',
  })

  useMemo(() => {
    if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace
  }, [textures])

  useFrame(({ clock }) => {
    if (planetRef.current) planetRef.current.rotation.y = clock.getElapsedTime() * 0.05
  })

  return (
    <group position={position}>
      <group ref={planetRef}
        onClick={() => setActivePlanet('livro')}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'default' }}
      >
        <mesh>
          <sphereGeometry args={[RADIUS, SEG, SEG]} />
          <meshStandardMaterial
            {...textures}
            color="#3D55B8"
            roughness={0.35}
            metalness={0.5}
            normalScale={new THREE.Vector2(1.6, 1.6)}
            emissive="#1A2150"
            emissiveIntensity={0.22}
          />
        </mesh>
      </group>

      {/* Atmosfera dourada — o "céu noturno com estrelas douradas" da identidade */}
      <mesh scale={1.06} renderOrder={10}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVert} fragmentShader={atmosphereFrag}
          uniforms={{
            glowColor: { value: new THREE.Color('#E3B23C') },
            intensity: { value: 0.85 },
            power:     { value: 6.5 },
          }}
          transparent depthWrite={false} side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <ConstelacaoDourada radius={RADIUS + 5}  count={420} tilt={0.42}  speed={0.05} />
      <ConstelacaoDourada radius={RADIUS + 8.5} count={300} tilt={-0.3} speed={-0.03} />

      <pointLight color="#E3B23C" intensity={3.2} distance={55} decay={1.8} />
    </group>
  )
}