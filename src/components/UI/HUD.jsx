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

function MouseHint() {
  return (
    <>
      {/* Mouse body */}
      <div style={{
        width: 54, height: 90,
        border: '2px solid rgba(123,47,247,0.65)',
        borderRadius: 27,
        position: 'relative',
        background: 'rgba(123,47,247,0.03)',
      }}>
        {/* L/R click divider */}
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 1, height: 24,
          background: 'rgba(123,47,247,0.28)',
        }} />
        {/* Scroll wheel window */}
        <div style={{
          position: 'absolute', top: 19, left: '50%',
          transform: 'translateX(-50%)',
          width: 15, height: 26,
          borderRadius: 7.5,
          border: '1.5px solid rgba(123,47,247,0.6)',
          overflow: 'hidden',
          background: '#08001e',
        }}>
          {/* Belt scrolling down */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 4px, rgba(123,47,247,0.85) 4px, rgba(123,47,247,0.85) 6px)',
            animation: 'beltDown 0.55s linear infinite',
          }} />
          {/* Cylindrical sheen — edges dark = 3D depth */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.10) 35%, transparent 50%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0.70) 100%)',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          }} />
          {/* Top shine — cylinder curvature */}
          <div style={{
            position: 'absolute', top: 0, left: '15%', right: '15%',
            height: 4,
            background: 'linear-gradient(to bottom, rgba(180,130,255,0.25), transparent)',
            borderRadius: '4px 4px 0 0',
            zIndex: 2,
            pointerEvents: 'none',
          }} />
        </div>
      </div>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 8, letterSpacing: '0.45em',
        color: 'rgba(255,255,255,0.22)',
        textTransform: 'uppercase',
      }}>scroll</span>
    </>
  )
}

function PhoneHint() {
  return (
    <>
      <svg width="54" height="90" viewBox="0 0 54 90" fill="none">
        <defs>
          <clipPath id="hint-sc"><rect x="4" y="10" width="46" height="70" rx="3"/></clipPath>
          <radialGradient id="hint-rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7B2FF7" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#7B2FF7" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Phone body */}
        <rect x="1.5" y="1.5" width="51" height="87" rx="11"
          stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none"/>
        <circle cx="27" cy="7" r="2"
          stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none"/>
        <rect x="20" y="84" width="14" height="2.5" rx="1.25"
          fill="rgba(255,255,255,0.14)"/>
        <rect x="4" y="10" width="46" height="70" rx="3"
          fill="rgba(123,47,247,0.03)"/>
        <g clipPath="url(#hint-sc)">
          {/* Touch ripples */}
          <circle cx="27" cy="66" fill="url(#hint-rg)">
            <animate attributeName="r"       values="0;12"  dur="1.9s" repeatCount="indefinite" begin="0.1s"/>
            <animate attributeName="opacity" values="0.8;0" dur="1.9s" repeatCount="indefinite" begin="0.1s"/>
          </circle>
          <circle cx="27" cy="66" fill="url(#hint-rg)">
            <animate attributeName="r"       values="0;20"   dur="1.9s" repeatCount="indefinite" begin="0.3s"/>
            <animate attributeName="opacity" values="0.35;0" dur="1.9s" repeatCount="indefinite" begin="0.3s"/>
          </circle>
          {/* Speed trails */}
          <line x1="27" y1="60" x2="27" y2="38" stroke="#7B2FF7" strokeWidth="2" strokeLinecap="round"
            style={{ animation: 'fingerTrail 1.9s cubic-bezier(0.4,0,0.2,1) infinite' }}/>
          <line x1="23" y1="60" x2="23" y2="43" stroke="#7B2FF7" strokeWidth="1" strokeLinecap="round" opacity="0.35"
            style={{ animation: 'fingerTrail 1.9s cubic-bezier(0.4,0,0.2,1) infinite', animationDelay: '0.07s' }}/>
          <line x1="31" y1="60" x2="31" y2="43" stroke="#7B2FF7" strokeWidth="1" strokeLinecap="round" opacity="0.35"
            style={{ animation: 'fingerTrail 1.9s cubic-bezier(0.4,0,0.2,1) infinite', animationDelay: '0.07s' }}/>
          {/* Finger swiping up */}
          <g style={{ animation: 'fingerSwipeUp 1.9s cubic-bezier(0.4,0,0.2,1) infinite' }}>
            <path d="M20,70 L20,56 Q20,48 27,48 Q34,48 34,56 L34,70 Q34,76 27,77 Q20,76 20,70Z"
              fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3"/>
            <line x1="20.5" y1="61" x2="33.5" y2="61" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9"/>
            <line x1="21"   y1="67" x2="33"   y2="67" stroke="rgba(255,255,255,0.12)" strokeWidth="0.9"/>
            <ellipse cx="27" cy="51" rx="3.5" ry="1.6" fill="rgba(255,255,255,0.13)"/>
          </g>
        </g>
        {/* Arrow pulsing above phone */}
        <g style={{ animation: 'arrowFloat 1.4s ease-in-out infinite' }}>
          <path d="M22 7 L27 1 L32 7"
            stroke="#7B2FF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
      </svg>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 8, letterSpacing: '0.45em',
        color: 'rgba(255,255,255,0.22)',
        textTransform: 'uppercase',
      }}>deslize</span>
    </>
  )
}

function OnboardingHint({ scrollProgress }) {
  const [visible, setVisible] = useState(false)
  const [gone, setGone] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640
  )

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

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
      position: 'fixed', bottom: 48, left: '50%', transform: 'translateX(-50%)',
      zIndex: 22, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
    }}>
      {isMobile ? <PhoneHint /> : <MouseHint />}
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
