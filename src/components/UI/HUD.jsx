import { useEffect, useState } from 'react'
import { useUniverseStore } from '../../store/universeStore'

const PLANET_INFO = {
  hero:     { color: '#C77DFF' },
  projects: { color: '#42BFDD' },
  wip:      { color: '#39FF14' },
  contact:  { color: '#00FFF0' },
}

const MINIMAP_DOTS = [
  { id: 'hero',     x: 50, y: 22 },
  { id: 'projects', x: 22, y: 45 },
  { id: 'wip',      x: 76, y: 58 },
  { id: 'contact',  x: 38, y: 78 },
]

function OnboardingHint({ scrollProgress }) {
  const [visible, setVisible] = useState(false)
  const [gone, setGone] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (scrollProgress > 0.015) {
      setVisible(false)
      setTimeout(() => setGone(true), 600)
    }
  }, [scrollProgress])

  if (gone || scrollProgress > 0.015) return null

  return (
    <div style={{
      position: 'fixed', bottom: 60, left: '50%', transform: 'translateX(-50%)',
      zIndex: 22, pointerEvents: 'none', display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: 10,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>
      {/* Animated finger / swipe icon */}
      <div style={{ position: 'relative', width: 28, height: 44 }}>
        {/* Hand outline */}
        <svg width="28" height="44" viewBox="0 0 28 44" fill="none" style={{ position: 'absolute', inset: 0 }}>
          <rect x="9" y="16" width="10" height="20" rx="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
          <line x1="14" y1="16" x2="14" y2="8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {/* Animated arrow going up */}
        <svg
          width="28" height="44" viewBox="0 0 28 44" fill="none"
          style={{
            position: 'absolute', inset: 0,
            animation: 'swipeUp 1.6s ease-in-out infinite',
          }}
        >
          <path d="M14 38 L14 26" stroke="rgba(123,47,247,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10 30 L14 26 L18 30" stroke="rgba(123,47,247,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <p style={{
        fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)', fontFamily: '"JetBrains Mono", monospace',
        whiteSpace: 'nowrap',
      }}>
        {isMobile ? 'deslize para explorar' : 'scroll para explorar'}
      </p>
      {/* 4 dots preview of planets */}
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {['#7B2FF7','#42BFDD','#39FF14','#00FFF0'].map((c, i) => (
          <div key={i} style={{
            width: i === 0 ? 6 : 4, height: i === 0 ? 6 : 4,
            borderRadius: '50%', background: c,
            opacity: i === 0 ? 1 : 0.4,
            boxShadow: i === 0 ? `0 0 6px ${c}` : 'none',
          }}/>
        ))}
      </div>
    </div>
  )
}

export default function HUD() {
  const { nearPlanet, scrollProgress } = useUniverseStore()

  return (
    <>
      <OnboardingHint scrollProgress={scrollProgress} />
      {/* ── Bottom left: barra de progresso ── */}
      <div className="fixed bottom-5 left-4 z-20 select-none pointer-events-none">
        <div className="w-32 h-px bg-white/8 relative overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(to right, #7B2FF7, #00D4FF)',
            }}
          />
        </div>
      </div>

      {/* ── Bottom right: minimap ── */}
      <div className="fixed bottom-4 right-4 z-20 select-none pointer-events-none hidden sm:block">
        <div
          className="relative w-16 h-16 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(123,47,190,0.08) 0%, rgba(5,1,15,0.88) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {MINIMAP_DOTS.map(p => {
            const info = PLANET_INFO[p.id]
            const isActive = nearPlanet === p.id
            return (
              <div
                key={p.id}
                className="absolute rounded-full transition-all duration-500"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: isActive ? 6 : 3,
                  height: isActive ? 6 : 3,
                  background: info.color,
                  boxShadow: isActive ? `0 0 6px 2px ${info.color}` : 'none',
                  opacity: isActive ? 1 : 0.35,
                }}
              />
            )
          })}

          {/* Posição da câmera */}
          <div
            className="absolute rounded-full bg-white transition-all duration-300"
            style={{
              width: 4, height: 4,
              left: '50%',
              top: `${15 + scrollProgress * 70}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 4px 1px rgba(255,255,255,0.6)',
            }}
          />
        </div>
      </div>
    </>
  )
}
