import { useUniverseStore } from '../../store/universeStore'

const PLANETS = [
  { id: 'hero',     label: 'Início',         color: '#7B2FF7', t: 0.07 },
  { id: 'projects', label: 'SOLID CRM',      color: '#42BFDD', t: 0.22 },
  { id: 'wip',      label: 'E-commerce',     color: '#39FF14', t: 0.38 },
  { id: 'livro',    label: 'Site Livro',     color: '#F0AF1E', t: 0.54 },
  { id: 'khepra',   label: 'KHEPRA',         color: '#C8A96E', t: 0.69 },
  { id: 'monaco',   label: 'MONACO-RE',      color: '#38BDF8', t: 0.83 },
  { id: 'contact',  label: 'Contato',        color: '#00FFF0', t: 0.98 },
]

export default function PlanetDots() {
  const { nearPlanet, setActivePlanet } = useUniverseStore()

  const handleClick = (id, t) => {
    setActivePlanet(id)
    window.dispatchEvent(new CustomEvent('navigateToPlanet', { detail: { t } }))
  }

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
      {PLANETS.map(({ id, label, color, t }) => {
        const isActive = nearPlanet === id
        return (
          <button
            key={id}
            onClick={() => handleClick(id, t)}
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
