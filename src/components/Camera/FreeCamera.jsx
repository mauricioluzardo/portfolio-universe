import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const SPEED = 0.5
const keys = {}

export default function FreeCamera() {
  const { camera, gl } = useThree()
  const isLocked = useRef(false)
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))

  useEffect(() => {
    const onKeyDown = (e) => { keys[e.code] = true }
    const onKeyUp   = (e) => { keys[e.code] = false }

    const onMouseMove = (e) => {
      if (!isLocked.current) return
      euler.current.y -= e.movementX * 0.002
      euler.current.x -= e.movementY * 0.002
      euler.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, euler.current.x))
    }

    const onLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement
    }

    // Só ativa pointer lock ao pressionar F — não ao clicar no canvas
    const onKeyDownLock = (e) => {
      if (e.code === 'KeyF') gl.domElement.requestPointerLock()
      if (e.code === 'Escape') document.exitPointerLock?.()
    }

    document.addEventListener('pointerlockchange', onLockChange)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keydown', onKeyDownLock)
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('pointerlockchange', onLockChange)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keydown', onKeyDownLock)
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('mousemove', onMouseMove)
      document.exitPointerLock?.()
    }
  }, [gl])

  useFrame(() => {
    camera.quaternion.setFromEuler(euler.current)

    const dir = new THREE.Vector3()
    if (keys['KeyW'] || keys['ArrowUp'])    dir.z -= 1
    if (keys['KeyS'] || keys['ArrowDown'])  dir.z += 1
    if (keys['KeyA'] || keys['ArrowLeft'])  dir.x -= 1
    if (keys['KeyD'] || keys['ArrowRight']) dir.x += 1
    if (keys['Space'])                       dir.y += 1
    if (keys['ShiftLeft'])                   dir.y -= 1

    if (dir.length() > 0) {
      dir.normalize().multiplyScalar(SPEED)
      dir.applyQuaternion(camera.quaternion)
      camera.position.add(dir)
    }
  })

  return null
}
