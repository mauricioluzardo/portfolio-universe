import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import nebulaFrag from '../../shaders/nebula.frag.glsl'
import nebulaVert from '../../shaders/nebula.vert.glsl'

function NebulaCloud({ position, radius, timeOffset = 0 }) {
  const mat = useRef()

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = clock.getElapsedTime() + timeOffset
    }
  })

  return (
    <mesh position={position} renderOrder={-2}>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        ref={mat}
        vertexShader={nebulaVert}
        fragmentShader={nebulaFrag}
        uniforms={{ uTime: { value: timeOffset } }}
        transparent
        depthWrite={false}
        depthTest={true}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function Nebula() {
  return (
    <group>
      <NebulaCloud position={[0, 0, -60]}    radius={500} timeOffset={0} />
      <NebulaCloud position={[-80, 40, -90]} radius={400} timeOffset={3} />
      <NebulaCloud position={[100, -20, -80]} radius={380} timeOffset={6} />
    </group>
  )
}
