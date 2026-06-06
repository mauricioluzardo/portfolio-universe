import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useProgress } from '@react-three/drei'
import * as THREE from 'three'
import Universe from './components/Universe/Universe'
import HUD from './components/UI/HUD'
import SalesCopy from './components/UI/SalesCopy'
import SectionPanel from './components/UI/SectionPanel'
import Cursor from './components/UI/Cursor'

function Loader() {
  const { active, progress } = useProgress()
  const done = !active && progress === 100
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: '#05010F',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 20,
      opacity: done ? 0 : 1,
      pointerEvents: done ? 'none' : 'all',
      transition: 'opacity 0.9s ease',
    }}>
      <div className="animate-spin" style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '2px solid rgba(155,95,227,0.12)',
        borderTop: '2px solid #9B5FE3',
      }} />
      <p style={{
        color: 'rgba(255,255,255,0.28)', fontSize: 10,
        letterSpacing: '0.4em', textTransform: 'uppercase',
        fontFamily: '"JetBrains Mono", monospace',
      }}>
        Carregando universo
        {progress > 0 && progress < 100 && ` — ${Math.round(progress)}%`}
      </p>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#05010F' }}>
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 1200, position: [0, 5, 50] }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,
        }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        style={{ width: '100%', height: '100%', display: 'block', background: '#05010F' }}
      >
        <Suspense fallback={null}>
          <Universe />
        </Suspense>
      </Canvas>

      <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <HUD />
        <SalesCopy />
        <SectionPanel />
      </div>
      <Cursor />
      <Loader />
    </div>
  )
}
