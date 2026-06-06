import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { createIceParticle } from '../../utils/particleTexture'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'
import { useUniverseStore } from '../../store/universeStore'

function IceRing({ radius = 13, count = 1200 }) {
  const ref = useRef()
  const texture = useMemo(() => createIceParticle(), [])
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a      = (i / count) * Math.PI * 2
      const spread = (Math.random() - 0.5) * 2.5
      pos[i * 3]     = Math.cos(a) * (radius + spread)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.7
      pos[i * 3 + 2] = Math.sin(a) * (radius + spread)
    }
    return pos
  }, [radius, count])
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.1 })
  return (
    <points ref={ref} rotation={[0.2, 0, 0]} renderOrder={5}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial map={texture} size={0.42} sizeAttenuation transparent opacity={0.9}
        depthWrite={false} blending={THREE.NormalBlending} alphaTest={0.1} />
    </points>
  )
}

export default function ContactPlanet({ position = [-20, 15, -160] }) {
  const setActivePlanet = useUniverseStore((s) => s.setActivePlanet)
  const planetRef = useRef()
  const RADIUS = 9
  const SEG = window.innerWidth < 640 ? 64 : 128

  const textures = useTexture({
    map:          '/textures/contact/diff.jpg',
    normalMap:    '/textures/contact/nor.jpg',
    roughnessMap: '/textures/contact/rough.jpg',
  })

  useMemo(() => {
    if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace
  }, [textures])

  useFrame(({ clock }) => {
    if (planetRef.current) planetRef.current.rotation.y = clock.getElapsedTime() * 0.06
  })

  return (
    <group position={position}>
      <group ref={planetRef}
        onClick={() => setActivePlanet('contact')}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'none' }}
      >
        <mesh>
          <sphereGeometry args={[RADIUS, SEG, SEG]} />
          <meshStandardMaterial
            {...textures}
            color="#ccf0ff"
            roughness={0.2}
            metalness={0.55}
            normalScale={new THREE.Vector2(1.5, 1.5)}
            emissive="#003344"
            emissiveIntensity={0.05}
          />
        </mesh>
      </group>

      <mesh scale={1.06} renderOrder={10}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVert} fragmentShader={atmosphereFrag}
          uniforms={{ glowColor: { value: new THREE.Color('#00FFF0') }, intensity: { value: 0.8 }, power: { value: 7.0 } }}
          transparent depthWrite={false} side={THREE.BackSide} blending={THREE.AdditiveBlending}
        />
      </mesh>

      <IceRing radius={13} count={1200} />
      <pointLight color="#00FFF0" intensity={3.5} distance={55} decay={1.8} />
    </group>
  )
}
