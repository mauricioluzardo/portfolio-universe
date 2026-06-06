import { useUniverseStore } from '../../store/universeStore'

const PLANETS = [
  { id: 'hero',     label: 'Início',   color: '#7B2FF7' },
  { id: 'projects', label: 'SOLID',    color: '#42BFDD' },
  { id: 'wip',      label: 'Voigt',    color: '#39FF14' },
  { id: 'contact',  label: 'Contato',  color: '#00FFF0' },
]

export default function PlanetDots() {
  const { nearPlanet, setActivePlanet, panelOpen } = useUniverseStore()

  return (
    <div
      aria-label="Navegação entre planetas"
      style={{
        position: 'fixed',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        pointerEvents: 'auto',
      }}
    >
      {PLANETS.map(({ id, label, color }) => {
        const isActive = nearPlanet === id
        return (
          <button
            key={id}
            onClick={() => setActivePlanet(id)}
            aria-label={`Navegar para ${label}`}
            title={label}
            style={{
              width: isActive ? 8 : 5,
              height: isActive ? 8 : 5,
              borderRadius: '50%',
              border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.3)'}`,
              background: isActive ? color : 'transparent',
              boxShadow: isActive ? `0 0 8px ${color}99` : 'none',
              transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              cursor: 'pointer',
              padding: 0,
              display: 'block',
              alignSelf: 'center',
            }}
          />
        )
      })}
    </div>
  )
}
