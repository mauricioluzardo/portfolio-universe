import { useState, useEffect } from 'react'

// Assinatura do Ateliê Monaco — fica fixa no canto, sobre a cena.
// O site é o portfólio do Mauricio mas mora no domínio do ateliê: sem marca
// visível, quem chega por ateliemonaco.com não liga as duas coisas.
//
// A marca: um M pintado à esquerda e exato à direita. O nome vem do bisavô
// dele, que era pintor, e a tese é a dele — "exatidão de técnica para chegar
// ao resultado esperado". A construção e o movimento estão documentados em
// src/index.css, na seção da assinatura.
export default function Assinatura() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  const t = isMobile ? 34 : 46

  return (
    <div
      className="fixed select-none pointer-events-none"
      style={{
        top: isMobile ? 12 : 20,
        left: isMobile ? 14 : 26,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? 9 : 12,
      }}
    >
      <svg width={t} height={t} viewBox="0 0 32 32" fill="none" aria-hidden="true"
        style={{ flexShrink: 0, color: '#C77DFF' }}>
        <defs>
          {/* borda de tinta: o ruído desloca o contorno, tirando a lisura de vetor */}
          <filter id="am-tinta" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4"
              seed="5" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="2.0"
              xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* onde a tinta termina e a exatidão começa */}
          <linearGradient id="am-grad" x1="0" x2="1">
            <stop offset="0.625" stopColor="#fff" />
            <stop offset="0.89"  stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="am-textura">
            <rect className="assinatura-textura" x="-32" y="0" width="64" height="32"
              fill="url(#am-grad)" />
          </mask>

          {/* a escrita: percorre o M na ordem da mão */}
          <mask id="am-escrita">
            <path
              className="assinatura-traco"
              pathLength="1"
              d="M 4 28 L 7 4 L 16 21 L 25 4 L 28 28"
              fill="none" stroke="#fff" strokeWidth="6"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </mask>

          {/* hastes grossas, o V do meio fino — contraste de escrita.
              Pontas em corte reto: ponta redonda denuncia vetor.
              As hastes abrem para baixo, como as pernas de um cavalete. */}
          <g id="am-emme" fill="none" stroke="currentColor"
             strokeLinecap="butt" strokeLinejoin="miter">
            <path d="M 4 28 L 7 4"   strokeWidth="3.6" />
            <path d="M 7 4 L 16 21"  strokeWidth="1.5" />
            <path d="M 16 21 L 25 4" strokeWidth="1.5" />
            <path d="M 25 4 L 28 28" strokeWidth="3.6" />
          </g>
        </defs>

        <g mask="url(#am-escrita)">
          <use href="#am-emme" />
          <g mask="url(#am-textura)">
            <use href="#am-emme" filter="url(#am-tinta)" />
          </g>
        </g>
      </svg>

      <span style={{ lineHeight: 1.05, display: 'block' }}>
        <span style={{
          display: 'block',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: isMobile ? 13 : 16,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.94)',
          letterSpacing: '0.01em',
          textShadow: '0 1px 10px rgba(0,0,0,0.9)',
        }}>
          Ateliê Monaco
        </span>
        <span style={{
          display: 'block',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: isMobile ? 6.5 : 7.5,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: 'rgba(199,125,255,0.75)',
          marginTop: 2,
        }}>
          Estúdio digital
        </span>
      </span>
    </div>
  )
}
