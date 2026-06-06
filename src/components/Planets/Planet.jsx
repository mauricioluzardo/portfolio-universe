import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import atmosphereVert from '../../shaders/atmosphere.vert.glsl'
import atmosphereFrag from '../../shaders/atmosphere.frag.glsl'

// Glow de atmosfera — UMA única camada, sem sobreposição
export function AtmosphereGlow({ radius, color, intensity = 1.6, power = 3.0 }) {
  return (
    <mesh scale={1.2} renderOrder={10}>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        vertexShader={atmosphereVert}
        fragmentShader={atmosphereFrag}
        uniforms={{
          glowColor: { value: new THREE.Color(color) },
          intensity: { value: intensity },
          power: { value: power },
        }}
        transparent
        depthWrite={false}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function Planet({ radius = 8, color = '#7B2FBE', glowColor = '#00FFF0', speed = 0.1, children }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * speed
  })
  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.2}
          emissive={color} emissiveIntensity={0.4} />
      </mesh>
      <AtmosphereGlow radius={radius} color={glowColor} />
      {children}
    </group>
  )
}
