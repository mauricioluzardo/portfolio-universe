import { useEffect, useRef, useState } from 'react'
import { useUniverseStore } from '../../store/universeStore'

// ─── ZONES — textos sincronizados com a jornada de scroll ────────────────────
// Regra: texto começa ~0.03 antes do painel lateral abrir para já estar
// visível no momento do encontro com o planeta.
//
// Planetas na jornada (28 waypoints, t = índice / 27):
// 1. Hero:      t=0.07  (Início)
// 2. Projects:  t=0.22  (SOLID CRM)
// 3. WIP:       t=0.38  (E-commerce que Converte)
// 4. Livro:     t=0.54  (livrodoadriano.com.br — Livro + Audiolivro)
// 5. Khepra:    t=0.69  (KHEPRA: The Last Tomb — Terror 1v7 Roblox Luau strict)
// 6. Monaco:    t=0.83  (MONACO-RE-MCP — Servidor de Análise Binária)
// 7. Contact:   t=0.98  (Contato / Fechamento Solitário)
// ─────────────────────────────────────────────────────────────────────────────

const ZONES = [
  {
    tMin: -0.10, tMax: 0.13, // hero: visível desde o load, some em t=0.13
    line1: 'TECNOLOGIA QUE',
    line2: 'RESOLVE O PROBLEMA.',
    sub: 'Não me limito a ferramentas ou metodologias. Investigo desafios complexos, encontro caminhos tecnicamente viáveis e construo sistemas reais, produtos digitais e automações funcionais.',
    micro: 'Liderança operacional · Desenvolvimento com IA pragmática · Sistemas em produção',
    color: '#C77DFF',
    glow: '#7B2FF7',
  },
  {
    tMin: 0.14, tMax: 0.29, // SOLID: texto entra antes do painel (t=0.17)
    line1: 'SOLID CRM.',
    line2: 'OPERAÇÃO REAL.',
    sub: 'Plataforma de inteligência e gestão da Live Academy Brasil. 6 operadores gerenciando ~500 criadores de lives. Motor financeiro, atendimento com IA e zero planilhas na operação.',
    micro: 'Em produção desde mar/2026 · +200 migrações SQL · Pinky DS v4.5',
    color: '#42BFDD',
    glow: '#084B83',
  },
  {
    tMin: 0.30, tMax: 0.45, // e-commerce: texto entra antes do painel (t=0.33)
    line1: 'E-COMMERCE',
    line2: 'QUE CONVERTE.',
    sub: 'Loja com arquitetura moderna Next.js, checkout fluido com Mercado Pago nativo, carrinho persistente e design mobile-first refinado.',
    micro: 'Next.js · React · Mercado Pago nativo · Mobile-first',
    color: '#39FF14',
    glow: '#1B4332',
  },
  {
    tMin: 0.46, tMax: 0.60, // livro: texto entra antes do painel (t=0.49)
    line1: 'LIVRO & AUDIOLIVRO.',
    line2: 'CONCEPÇÃO REAL.',
    sub: 'livrodoadriano.com.br: produto integral concebido a partir dos relatos reais do pai sobre o Adriano (autista nível 3). Design editorial com seus hiperfocos, audiolivro com voz real do escritor e mais de 300 vendas registradas.',
    micro: 'Relatos reais · Hiperfocos do Adriano · Audiolivro com voz real · +300 vendas',
    color: '#F0AF1E',
    glow: '#22262E',
  },
  {
    tMin: 0.61, tMax: 0.75, // khepra: texto entra antes do painel (t=0.64)
    line1: 'KHEPRA.',
    line2: 'ENGENHARIA ROBLOX.',
    sub: 'Terror assimétrico multijogador 1v7 construído com arquitetura profissional: Luau com tipagem estrita, 534 testes automatizados e netcode autoritativo.',
    micro: '534 testes unitários · Luau --!strict · Netcode autoritativo · 1v7',
    color: '#C8A96E',
    glow: '#3A2808',
  },
  {
    tMin: 0.76, tMax: 0.89, // monaco: texto entra antes do painel (t=0.79)
    line1: 'MONACO-RE.',
    line2: 'INFRAESTRUTURA MCP.',
    sub: 'Servidor Model Context Protocol em Node.js puro com zero dependências para análise estrutural de binários PE, ELF, Mach-O e metadados .NET com sandbox estrito.',
    micro: 'Zero deps · Sandboxing rigoroso · Protocolo MCP · Open-source',
    color: '#38BDF8',
    glow: '#001830',
  },
  {
    tMin: 0.90, tMax: 1.00, // contact: o grande fechamento final (t=0.93..1.00)
    line1: 'VAMOS CONSTRUIR',
    line2: 'SEU PRÓXIMO SISTEMA.',
    sub: 'Seja um CRM corporativo, automação com agentes de IA, plataforma SaaS ou produto digital completo: transformamos necessidades complexas em engenharia funcional.',
    micro: 'Sistemas sob medida · IA aplicada a processos · Resposta em até 24h',
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
