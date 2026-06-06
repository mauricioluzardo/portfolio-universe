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

export default function HUD() {
  const { nearPlanet, scrollProgress } = useUniverseStore()

  return (
    <>
      {/* ── Bottom left: barra de progresso + hint inicial ── */}
      <div className="fixed bottom-5 left-4 z-20 select-none pointer-events-none">
        <div className="space-y-1.5">
          {scrollProgress < 0.02 && (
            <>
              <p className="hidden sm:block text-gray-500 text-[10px] tracking-widest uppercase font-mono animate-pulse">
                ↓ scroll para explorar
              </p>
              <p className="sm:hidden text-gray-400 text-[11px] tracking-widest uppercase font-mono animate-pulse">
                deslize para explorar
              </p>
            </>
          )}
          <div className="w-32 h-px bg-white/8 relative overflow-hidden rounded-full">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${scrollProgress * 100}%`,
                background: 'linear-gradient(to right, #7B2FBE, #00D4FF)',
              }}
            />
          </div>
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
