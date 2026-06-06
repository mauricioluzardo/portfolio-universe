import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

export default function PostProcessing() {
  const { gl, scene, camera, size } = useThree()
  const composerRef = useRef()

  useEffect(() => {
    const composer = new EffectComposer(gl)
    composer.addPass(new RenderPass(scene, camera))

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.18,  // strength MUITO baixo — quase imperceptível no fundo
      0.4,   // radius
      0.85   // threshold ALTO — só cristais e bordas extremas brilham
    )
    composer.addPass(bloom)
    composer.addPass(new OutputPass())

    composerRef.current = composer
    return () => composer.dispose()
  }, [gl, scene, camera, size])

  useFrame(() => {
    if (composerRef.current) composerRef.current.render()
  }, 1)

  return null
}
