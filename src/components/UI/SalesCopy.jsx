import { useRef, useState, useEffect } from 'react'
import { useUniverseStore } from '../../store/universeStore'

// ─── TIMING MASTER TABLE ──────────────────────────────────────────────────────
// Regra: texto começa ANTES do painel para já estar visível quando ele abre.
// PLANET_ZONES (painel)  vs  ZONES (texto overlay):
//
//  Planeta   Painel abre   Texto começa  Diferença   Painel fecha  Texto some
//  ─────────────────────────────────────────────────────────────────────────────
//  hero      t=0.04        t=-0.10       texto já visível no load   0.16   0.16
//  projects  t=0.22        t=0.19        texto visível 3 ticks antes 0.50  0.50
//  wip       t=0.55        t=0.52        texto visível 3 ticks antes 0.74  0.74
//  contact   t=0.82        t=0.79        texto visível 3 ticks antes 0.99  1.00
//
// NÃO ALTERAR estes valores sem recalibrar os dois sistemas juntos.
// LOOK_TARGETS: câmera vira p/ projects em t=0.1875, WIP em t=0.50, contact em t=0.8125
// ─────────────────────────────────────────────────────────────────────────────
const ZONES = [
  {
    tMin: -0.10, tMax: 0.16, // hero: visível desde o load, some em t=0.16
    line1: 'SISTEMAS QUE',
    line2: 'TRABALHAM POR VOCÊ.',
    sub: 'Construo operações digitais completas — CRM, SaaS, e-commerce e IA — que escalam sem precisar de você no meio do processo. Cada planeta aqui é um sistema real.',
    micro: '5 anos · Live Academy Brasil · +10k usuários gerenciados por sistemas que eu mesmo construí',
    color: '#C77DFF',
    glow: '#7B2FF7',
  },
  {
    tMin: 0.19, tMax: 0.50, // SOLID: texto aparece 3 ticks antes do painel (t=0.22)
    line1: 'SOLID.',
    line2: 'ZERO PLANILHA.',
    sub: '100+ streamers. Motor financeiro T1/T2/T3. CEO Intelligence. Scout com IA. WhatsApp com classificação automática. Construído do zero porque nenhum CRM do mercado entendia a Kwai.',
    micro: '43 páginas · 210k registros · 270k operações financeiras/mês · Claude API integrado',
    color: '#42BFDD',
    glow: '#084B83',
  },
  {
    tMin: 0.52, tMax: 0.74, // Voigt: texto aparece 3 ticks antes do painel (t=0.55)
    line1: 'E-COMMERCE',
    line2: 'QUE CONVERTE.',
    sub: 'Voigt Store: loja completa com Mercado Pago nativo, carrinho persistente, checkout fluido e design mobile-first. Construída para converter — não para impressionar no Behance.',
    micro: 'Next.js · Mercado Pago · Mobile-first · Em produção',
    color: '#39FF14',
    glow: '#1B4332',
  },
  {
    tMin: 0.79, tMax: 1.00, // contact: texto aparece 3 ticks antes do painel (t=0.82)
    line1: 'VENHA FAZER PARTE',
    line2: 'DESTA CONSTELAÇÃO.',
    sub: 'Cada planeta aqui foi construído do zero. O próximo pode ser o seu projeto. SaaS, CRM, portal com IA, e-commerce — vamos conversar.',
    micro: 'Projetos sob medida · Resposta em até 24h · Próximos planetas em formação →',
    color: '#00FFF0',
    glow: '#00CCAA',
  },
]

export default function SalesCopy() {
  const { scrollProgress, panelOpen } = useUniverseStore()
  const lastZoneRef = useRef(null)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const zone = ZONES.find(z => scrollProgress >= z.tMin && scrollProgress <= z.tMax)
  if (zone) lastZoneRef.current = zone

  // Antes de qualquer zona ser visitada, não renderiza nada
  const displayZone = zone || lastZoneRef.current
  if (!displayZone) return null

  // Opacity: JS calcula o valor alvo; CSS transition assimétrica
  // — dentro da zona: transition 0.08s (quase instantâneo, JS conduz)
  // — fora da zona:   transition 1.4s (fade lento para a pessoa ainda conseguir ler)
  let opacity = 0
  if (zone) {
    const zoneRange = zone.tMax - zone.tMin
    const progress  = (scrollProgress - zone.tMin) / zoneRange
    // Fade-in rápido nos primeiros 4% da zona; depois 100% até sair
    opacity = Math.min(progress / 0.04, 1)
  }

  const compact = panelOpen

  // Mobile: texto no topo (acima do planeta) — desktop: centro vertical
  const topPos   = isMobile ? '12%' : '50%'
  const transform = isMobile ? 'none' : 'translateY(-50%)'

  return (
    <div
      className="fixed z-20 select-none pointer-events-none"
      style={{
        left: compact ? '1.25rem' : (isMobile ? '1rem' : '2.5rem'),
        top: topPos,
        transform,
        maxWidth: compact ? 'min(280px, calc(100vw - 2.5rem))' : (isMobile ? 'calc(100vw - 2rem)' : 'min(520px, calc(100vw - 2.5rem))'),
        opacity,
        // Assimétrico: entra rápido (JS controla), sai rápido (texto do planeta anterior some logo)
        transition: zone
          ? 'opacity 0.08s linear, max-width 0.5s ease, left 0.5s ease'
          : 'opacity 0.3s ease-out, max-width 0.5s ease, left 0.5s ease',
        // Fundo escuro sutil para garantir legibilidade sobre o 3D
        background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.0) 100%)',
        padding: '1.4rem 2rem 1.4rem 1rem',
        borderRadius: '0.5rem',
      }}
    >
      {/* Linha 1 */}
      <div
        style={{
          fontSize: compact ? '1.6rem' : (isMobile ? 'clamp(1.6rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3.4rem)'),
          fontWeight: 900,
          fontFamily: '"Space Grotesk", sans-serif',
          letterSpacing: '0.06em',
          lineHeight: 1.05,
          color: '#FFFFFF',
          textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 40px rgba(0,0,0,0.8)',
          transition: 'font-size 0.5s ease',
        }}
      >
        {displayZone.line1}
      </div>

      {/* Linha 2 — cor do planeta */}
      <div
        style={{
          fontSize: compact ? '1.6rem' : (isMobile ? 'clamp(1.6rem, 6vw, 2rem)' : 'clamp(2rem, 4vw, 3.4rem)'),
          fontWeight: 900,
          fontFamily: '"Space Grotesk", sans-serif',
          letterSpacing: '0.06em',
          lineHeight: 1.05,
          color: displayZone.color,
          textShadow: `0 2px 12px rgba(0,0,0,1), 0 0 30px ${displayZone.color}88`,
          marginBottom: compact ? '0.5rem' : '1rem',
          transition: 'font-size 0.5s ease',
        }}
      >
        {displayZone.line2}
      </div>

      {/* Subtítulo — desktop only */}
      {!compact && !isMobile && (
        <div
          style={{
            fontSize: 'clamp(0.8rem, 1.3vw, 1rem)',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk", sans-serif',
            lineHeight: 1.6,
            marginBottom: '0.6rem',
            textShadow: '0 1px 8px rgba(0,0,0,1)',
          }}
        >
          {displayZone.sub}
        </div>
      )}

      {/* Micro copy / prova social — desktop only */}
      {!compact && !isMobile && (
        <div
          style={{
            fontSize: 'clamp(0.7rem, 1vw, 0.82rem)',
            color: displayZone.color,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.04em',
            textShadow: '0 1px 6px rgba(0,0,0,1)',
          }}
        >
          {displayZone.micro}
        </div>
      )}

      {/* Barra decorativa lateral */}
      <div
        style={{
          position: 'absolute',
          left: '-16px',
          top: 0,
          bottom: 0,
          width: '3px',
          background: `linear-gradient(to bottom, ${displayZone.color}, ${displayZone.glow}44)`,
          borderRadius: '2px',
          boxShadow: `0 0 12px ${displayZone.color}88`,
        }}
      />
    </div>
  )
}