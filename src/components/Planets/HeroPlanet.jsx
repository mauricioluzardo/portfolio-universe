import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'
import cloudsVert     from '../../shaders/clouds.vert.glsl'
import cloudsFrag     from '../../shaders/clouds.frag.glsl'
import planetVert     from '../../shaders/hero-planet.vert.glsl'
import planetFrag     from '../../shaders/hero-planet.frag.glsl'
import { useUniverseStore } from '../../store/universeStore'
import { createRockParticle } from '../../utils/particleTexture'

function AsteroidRing({ radius, tilt = 0, speed = 0.3, count = 2000 }) {
  const ref = useRef()
  const texture = useMemo(() => createRockParticle(), [])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle  = (i / count) * Math.PI * 2
      const spread = (Math.random() - 0.5) * 4
      pos[i * 3]     = Math.cos(angle) * (radius + spread)
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.2
      pos[i * 3 + 2] = Math.sin(angle) * (radius + spread)
    }
    return pos
  }, [radius, count])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * speed
  })

  return (
    <points ref={ref} rotation={[tilt, 0, 0]} renderOrder={5}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.55}
        sizeAttenuation
        transparent
        opacity={0.88}
        depthWrite={false}
        blending={THREE.NormalBlending}
        alphaTest={0.1}
      />
    </points>
  )
}

function OrbitingMoon() {
  const ref = useRef()
  const textures = useTexture({
    map:          '/textures/contact/diff.jpg',
    normalMap:    '/textures/contact/nor.jpg',
    roughnessMap: '/textures/contact/rough.jpg',
  })
  useMemo(() => {
    if (textures.map) textures.map.colorSpace = THREE.SRGBColorSpace
  }, [textures])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.35
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * 32
      ref.current.position.y = Math.sin(t * 0.4) * 5
      ref.current.position.z = Math.sin(t) * 32
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial
        {...textures}
        roughness={0.55}
        metalness={0.1}
        normalScale={new THREE.Vector2(1.5, 1.5)}
      />
    </mesh>
  )
}

function CloudLayer({ radius }) {
  const ref = useRef()
  const uniforms = useMemo(() => ({
    uTime:    { value: 0 },
    uOpacity: { value: 0.38 },
  }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.035
  })

  return (
    <mesh ref={ref} scale={1.022} renderOrder={3}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={cloudsVert}
        fragmentShader={cloudsFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  )
}

export default function HeroPlanet({ position = [0, 0, 0] }) {
  const setActivePlanet = useUniverseStore((s) => s.setActivePlanet)
  const planetRef = useRef()
  const RADIUS = 12
  const SEG = window.innerWidth < 640 ? 64 : 128

  // Júpiter 2K como mapa de estrutura de bandas (488KB — leve)
  const jupiterMap = useTexture('/textures/hero/jupiter_2k.jpg')
  const planetUniforms = useMemo(() => ({
    uMap:  { value: jupiterMap },
    uTime: { value: 0 },
  }), [jupiterMap])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    planetUniforms.uTime.value = t
    if (planetRef.current) planetRef.current.rotation.y = t * 0.045
  })

  return (
    <group position={position}>
      <group ref={planetRef}>
        <mesh
          onClick={() => setActivePlanet('hero')}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = 'none' }}
        >
          <sphereGeometry args={[RADIUS, SEG, SEG]} />
          <shaderMaterial
            vertexShader={planetVert}
            fragmentShader={planetFrag}
            uniforms={planetUniforms}
          />
        </mesh>
      </group>

      {/* Nuvens sutis por cima do gas giant */}
      <CloudLayer radius={RADIUS} />

      {/* Rim atmosférico fino — só o limbo do planeta */}
      <mesh scale={1.06} renderOrder={8}>
        <sphereGeometry args={[RADIUS, 32, 32]} />
        <shaderMaterial
          vertexShader={atmosphereVert} fragmentShader={atmosphereFrag}
          uniforms={{
            glowColor: { value: new THREE.Color('#C090FF') },
            intensity: { value: 0.8 },
            power:     { value: 8.0 },
          }}
          transparent depthWrite={false} side={THREE.BackSide} blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Anéis de asteroide */}
      <AsteroidRing radius={RADIUS + 5}  tilt={0.3}  speed={0.18}  count={1400} />
      <AsteroidRing radius={RADIUS + 9}  tilt={0.55} speed={-0.11} count={900}  />

      {/* Lua texturizada */}
      <OrbitingMoon />
    </group>
  )
}