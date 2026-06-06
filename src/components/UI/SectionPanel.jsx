import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SOLID_ICONS } from './ModuleIcons'

// dvh ajusta quando teclado virtual iOS aparece; fallback para vh em browsers antigos
const SHEET_HEIGHT = (() => { try { return CSS.supports('height', '1dvh') ? '88dvh' : '88vh' } catch { return '88vh' } })()
import { useUniverseStore } from '../../store/universeStore'
import { OWNER, PROJECTS_DONE, PROJECTS_WIP } from '../../data/portfolio'

// â"€â"€â"€ Design System â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€
// Princípios: Agency Case Study + Stripe Impact Numbers + Linear whitespace
// Screenshot primeiro → hook → números grandes → módulos → galeria
// â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€

// Normaliza images: aceita strings (legado) ou objetos { src, mode }
function normalizeImages(images) {
  if (!images?.length) return []
  return images.map(img =>
    typeof img === 'string' ? { src: img, mode: 'dark' } : img
  )
}

// Thumbnail Voigt Store — fatia literal da homepage: announcement bar ouro,
// nav VOIGT STORE Playfair, hero heading + produto. Codigo do site exato.
function VoigtThumbCard({ img, index, isActive, onClick }) {
  const playfair = '"Playfair Display", Georgia, serif'
  const inter    = '"Inter", ui-sans-serif, system-ui'
  return (
    <button onClick={onClick} aria-label={`Ver tela ${index + 1}`} aria-pressed={isActive} style={{
      flexShrink: 0, width: 76, height: 58, borderRadius: 2,
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      position: 'relative', background: '#080808',
      border: `1px solid ${isActive ? 'rgba(200,169,110,0.6)' : 'rgba(200,169,110,0.12)'}`,
      boxShadow: isActive ? '0 0 18px rgba(200,169,110,0.2)' : 'none',
      opacity: isActive ? 1 : 0.44,
      transition: 'all 200ms cubic-bezier(0.25,0.46,0.45,0.94)',
      cursor: 'pointer',
    }}>
      {/* 1. Announcement bar — fundo ouro exato do site */}
      <div style={{
        height: 6, flexShrink: 0, background: '#C8A96E',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
      }}>
        {['FRETE GRATIS', 'PIX 5%', 'PARCELE 10x'].map((t, j) => (
          <span key={j} style={{
            fontSize: 3, fontWeight: 700, color: '#080808',
            fontFamily: inter, letterSpacing: '0.1em',
          }}>{t}</span>
        ))}
      </div>
      {/* 2. Navbar — VOIGT STORE logo Playfair + links + WA */}
      <div style={{
        height: 11, flexShrink: 0, background: '#080808',
        borderBottom: '1px solid #171717',
        display: 'flex', alignItems: 'center',
        paddingLeft: 4, paddingRight: 4,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{
            fontFamily: playfair, fontSize: 6, fontWeight: 700, letterSpacing: '0.12em',
            background: 'linear-gradient(135deg,#C8A96E,#E5C97E,#9A7C48)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>VOIGT</span>
          <span style={{
            fontFamily: inter, fontSize: 2.5, fontWeight: 400,
            letterSpacing: '0.25em', color: '#807870', marginTop: 0.5,
          }}>STORE</span>
        </div>
        <div style={{ display: 'flex', gap: 2, marginLeft: 4 }}>
          {[11, 9, 6, 9].map((w, j) => (
            <div key={j} style={{ width: w, height: 1.5, background: 'rgba(200,169,110,0.2)' }} />
          ))}
        </div>
        <div style={{
          marginLeft: 'auto', padding: '1.5px 3px',
          border: '1px solid rgba(45,154,90,0.5)', borderRadius: 1,
        }}>
          <span style={{ fontSize: 3, color: '#2D9A5A', fontFamily: inter, fontWeight: 700 }}>WA</span>
        </div>
      </div>
      {/* 3. Hero — esquerda: Playfair heading | direita: foto produto */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{
          width: 33, flexShrink: 0, padding: '3px 0 3px 4px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          background: '#080808',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
            <div style={{ width: 7, height: 1, background: '#C8A96E' }} />
            <span style={{ fontSize: 2.5, color: '#807870', fontFamily: inter, letterSpacing: '0.2em' }}>COLECAO</span>
          </div>
          <span style={{
            fontFamily: playfair, fontSize: 8.5, fontWeight: 400,
            color: '#F5EDD8', lineHeight: 1.05, display: 'block',
          }}>Fragr-</span>
          <span style={{
            fontFamily: playfair, fontSize: 8.5, fontWeight: 400,
            lineHeight: 1.05, display: 'block',
            background: 'linear-gradient(135deg,#C8A96E,#E5C97E)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>ancias</span>
          <span style={{
            fontFamily: playfair, fontSize: 6, fontStyle: 'italic', fontWeight: 400,
            color: '#D8D0C0', lineHeight: 1.1, display: 'block', marginTop: 1,
          }}>historias.</span>
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0D0D0D' }}>
          <img src={img.src} alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, #080808 0%, transparent 40%)',
          }} />
        </div>
      </div>
      {/* 4. Barra inferior — numero + gold-line decorativa */}
      <div style={{
        height: 7, flexShrink: 0, background: '#080808',
        borderTop: '1px solid rgba(200,169,110,0.1)',
        display: 'flex', alignItems: 'center', paddingLeft: 4, paddingRight: 4,
      }}>
        <span style={{
          fontSize: 5.5, fontWeight: 600, color: '#C8A96E',
          fontFamily: inter, letterSpacing: '0.06em',
        }}>{String(index + 1).padStart(2, '0')}</span>
        <div style={{
          flex: 1, height: 1, marginLeft: 3,
          background: 'linear-gradient(90deg, rgba(200,169,110,0.4), transparent)',
        }} />
      </div>
      {isActive && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg,#C8A96E,#E5C97E,#9A7C48)',
        }} />
      )}
    </button>
  )
}

function ScreenshotHero({ images, project }) {
  const [current, setCurrent] = useState(0)
  const imgs = normalizeImages(images)
  if (!imgs.length) return null

  const theme   = project?.thumbTheme
  const primary = theme?.primary || project?.glowColor || '#00FFF0'

  const LABELS = [
    'Dashboard Operacional', 'Motor T1/T2/T3', 'Base de Streamers',
    'Perfil Individual', 'Pipeline de Prospecção', 'Atendimento WhatsApp',
    'CEO Intelligence', 'OPS Workspace', 'Leaderboard',
    'Simulador Financeiro', 'Central de Alertas',
  ]

  // Resolve tokens do modo (dark/light) com base no código-fonte do sistema original
  function modeTokens(isDark) {
    if (!theme) return null
    return isDark ? theme.dark : theme.light
  }

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(imgs.length - 1, c + 1))

  return (
    <div className="mb-6">
      {/* Hero — imagem principal com setas */}
      <div className="relative w-full overflow-hidden"
        style={{ aspectRatio: '16/9', borderRadius: '8px', background: theme?.dark?.card || '#0a0a0f' }}>
        <img src={imgs[current].src} alt=""
          className="w-full h-full object-cover object-top transition-opacity duration-300" />

        {/* Seta esquerda */}
        {current > 0 && (
          <button onClick={prev} aria-label="Tela anterior" style={{
            position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)',
            width: 40, height: 40, borderRadius: 8,
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(4px)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Seta direita */}
        {current < imgs.length - 1 && (
          <button onClick={next} aria-label="Próxima tela" style={{
            position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
            width: 40, height: 40, borderRadius: 8,
            background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(4px)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3L9 7L5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Barra inferior — label + contador */}
        <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)' }}>
          <span style={{ fontSize: '11px', fontFamily: '"Inter",ui-sans-serif', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
            {LABELS[current] || `Tela ${current + 1}`}
          </span>
          <span style={{ fontSize: '10px', fontFamily: '"Inter",ui-sans-serif', fontWeight: 600, color: primary }}>
            {current + 1} / {imgs.length}
          </span>
        </div>
      </div>

      {/* Thumbnails strip — com fade right indicando scroll horizontal */}
      {imgs.length > 1 && (
        <div style={{ position: 'relative', marginTop: 10 }}>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {imgs.map((img, i) => {
            const isActive = i === current
            const isDark   = img.mode !== 'light'
            const t        = modeTokens(isDark)

            // Sem theme: fallback simples
            if (!t) return (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Ver tela ${i + 1}`} aria-pressed={isActive} style={{
                flexShrink: 0, width: 76, height: 46, borderRadius: 6, overflow: 'hidden',
                border: isActive ? `2px solid ${primary}` : '2px solid transparent',
                opacity: isActive ? 1 : 0.4, cursor: 'pointer',
              }}>
                <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
              </button>
            )

            // Voigt: renderiza product card exato do site (não screenshot genérico)
            if (project?.id === 'voigt') {
              return <VoigtThumbCard key={i} img={img} index={i} isActive={isActive} onClick={() => setCurrent(i)} />
            }

            // borderRadius do tema (Pinky DS=8px rounded)
            const thumbRadius = theme?.borderRadius ?? 8
            const activeBorderVal = t.activeBorder ||
              (isDark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.22)')

            return (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Ver tela ${i + 1}`} aria-pressed={isActive} style={{
                flexShrink: 0,
                width: 76,
                borderRadius: thumbRadius,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: `1px solid ${isActive ? activeBorderVal : t.border}`,
                background: t.card,
                boxShadow: isActive ? t.activeInset : 'none',
                opacity: isActive ? 1 : 0.42,
                transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
                cursor: 'pointer',
              }}>
                {/* Screenshot — 76px × 43px (16:9) */}
                <div style={{ width: 76, height: 43, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={img.src} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                </div>

                {/* Footer — identidade do sistema (fundo, texto, dot) */}
                <div style={{
                  height: 14, background: t.cardLow, borderTop: `1px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', paddingLeft: 6, gap: 4,
                }}>
                  <span style={{
                    fontSize: 7.5, fontFamily: '"Inter","Roboto",ui-sans-serif', fontWeight: 600,
                    color: isActive ? primary : t.mutedFg,
                    letterSpacing: '0.04em', lineHeight: 1,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    width: 3, height: 3, borderRadius: '50%', flexShrink: 0,
                    background: isActive ? primary + 'CC' : t.mutedFg + '50',
                  }} />
                </div>

                {/* Linha indicadora — primary color do sistema */}
                {isActive && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 2,
                    background: primary,
                  }} />
                )}
              </button>
            )
          })}
          </div>
          {/* Fade right — indica que há mais thumbnails para deslizar */}
          {imgs.length > 4 && (
            <div aria-hidden="true" style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 44,
              background: `linear-gradient(to right, transparent, ${project?.panelStyle?.bg || '#080808'})`,
              pointerEvents: 'none',
            }} />
          )}
        </div>
      )}
    </div>
  )
}

function Divider({ color }) {
  return <div style={{ height: 1, background: color || 'rgba(255,255,255,0.07)', margin: '20px 0' }} />
}

function ImpactGrid({ metrics, accent }) {
  // Separa métricas operacionais (primeiras 4) das de dados (restantes)
  const ops  = metrics.slice(0, 4)
  const data = metrics.slice(4)
  return (
    <div className="space-y-3">
      {/* Operacionais — 2 colunas, números grandes */}
      <div className="grid grid-cols-2 gap-2">
        {ops.map(({ value, label }) => (
          <div key={label} style={{ padding: '14px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 'clamp(1.3rem, 4.5vw, 2rem)', fontWeight: 900, lineHeight: 1, color: accent, fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '-0.02em' }}>
              {value}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', marginTop: 4, lineHeight: 1.3 }}>
              {label}
            </p>
          </div>
        ))}
      </div>
      {/* Dados — 1 linha horizontal compacta */}
      {data.length > 0 && (
        <div style={{ padding: '12px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.55)', fontFamily: '"JetBrains Mono", monospace', marginBottom: 10, textTransform: 'uppercase' }}>
            Volume processado
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {data.map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontFamily: '"Space Grotesk", sans-serif' }}>
                  {value}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.62)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ModuleList({ modules, accent = '#42BFDD' }) {
  return (
    <div>
      <p style={{ fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.55)', fontFamily: '"JetBrains Mono", monospace', textTransform: 'uppercase', marginBottom: 14 }}>
        Módulos do sistema
      </p>
      <div>
        {modules.map(({ icon, name, desc }, i) => {
          const IconSVG = SOLID_ICONS[icon]
          return (
            <div key={name}>
              {i > 0 && <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', margin: '12px 0' }} />}
              <div className="flex gap-3 items-center">
                {/* SVG ilustrado — fundo e cores próprias */}
                <div style={{ flexShrink: 0, borderRadius: 9, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                  {IconSVG && <IconSVG size={36} />}
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', fontFamily: '"Space Grotesk", sans-serif', display: 'block', lineHeight: 1.3 }}>
                    {name}
                  </span>
                  <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.62)', lineHeight: 1.45 }}>
                    {desc}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  const ps       = project.panelStyle
  const hasFull  = project.modules && project.metrics
  const accent   = ps?.accent || project.glowColor
  const titleFont   = ps?.titleFont   || '"Space Grotesk", ui-sans-serif'
  const titleWeight = ps?.titleWeight ?? 900
  const titleColor  = ps?.titleColor  || '#fff'
  const textColor   = ps?.textColor   || 'rgba(255,255,255,0.65)'
  const textMuted   = ps?.textMuted   || 'rgba(255,255,255,0.55)'
  const dividerCol  = ps?.divider     || 'rgba(255,255,255,0.07)'

  // Cor do dot de status: usa accent do projeto
  const dotColor = accent

  // Tech badge — Voigt usa borda gold, SOLID usa borda slate
  const tagBg      = ps?.id === 'voigt'
    ? 'rgba(8,8,8,0.9)'
    : 'rgba(30,41,59,0.9)'
  const tagBorder  = ps ? `1px solid ${ps.divider || 'rgba(51,65,85,0.7)'}` : '1px solid rgba(51,65,85,0.7)'
  const tagColor   = ps?.titleColor || '#F1F5F9'
  const tagFont    = ps?.titleFont  || '"Inter","Roboto",ui-sans-serif'
  const tagRadius  = project.thumbTheme?.borderRadius ?? 9999

  return (
    <div style={{ paddingBottom: 8 }}>

      {project.images?.length > 0 && (
        <ScreenshotHero images={project.images} project={project} />
      )}
      {!project.images?.length && (
        <div style={{ aspectRatio: '16/9', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: textMuted, fontFamily: titleFont }}>screenshots em breve</span>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center gap-2 mb-3">
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor, display: 'inline-block', boxShadow: `0 0 6px ${dotColor}` }} />
        <span style={{ fontSize: '10px', letterSpacing: '0.3em', color: textMuted, fontFamily: '"Inter",ui-sans-serif', textTransform: 'uppercase' }}>
          Live in production
        </span>
      </div>

      {/* Titulo */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: titleWeight, color: titleColor, lineHeight: 1.1, fontFamily: titleFont, letterSpacing: titleWeight >= 700 ? '-0.01em' : '0', marginBottom: 4 }}>
        {project.name}
      </h3>
      {/* Subtitulo */}
      <p style={{ fontSize: '14px', marginBottom: 16, fontFamily: titleFont,
        ...(ps?.accentGrad
          ? { background: ps.accentGrad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
          : { color: accent })
      }}>
        {project.subtitle}
      </p>

      {/* Hook */}
      <p style={{ fontSize: '15px', lineHeight: 1.7, color: textColor, marginBottom: 0 }}>
        {project.hook || project.description.split('.').slice(0, 2).join('.') + '.'}
      </p>

      {hasFull && (
        <>
          <div style={{ height: 1, background: dividerCol, margin: '20px 0' }} />
          <ImpactGrid metrics={project.metrics} accent={accent} />
        </>
      )}

      {hasFull && (
        <>
          <div style={{ height: 1, background: dividerCol, margin: '20px 0' }} />
          <ModuleList modules={project.modules} accent={accent} />
        </>
      )}

      {/* Tech tags */}
      <div style={{ height: 1, background: dividerCol, margin: '20px 0' }} />
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map(tech => (
          <span key={tech} style={{
            fontSize: '11px', padding: '2px 8px',
            borderRadius: tagRadius === 2 ? 2 : 9999,
            color: tagColor, background: tagBg, border: tagBorder,
            fontFamily: tagFont, fontWeight: 600,
            letterSpacing: '0.025em', lineHeight: '1.6',
          }}>
            {tech}
          </span>
        ))}
      </div>

    </div>
  )
}

function HeroContent() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs tracking-[0.4em] text-cyan-400 uppercase mb-2">Sistemas · IA · Operações Digitais</p>
        <h1 className="text-3xl font-bold text-white leading-tight">{OWNER.name}</h1>
        <p className="text-base text-violet-300 mt-1">{OWNER.title}</p>
      </div>

      {/* Números de impacto */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { n: '+10k', label: 'streamers gerenciados' },
          { n: '+1Bi', label: 'resultados gerados' },
          { n: '5+',   label: 'anos de operação' },
        ].map(({ n, label }) => (
          <div key={label} className="rounded-lg p-2 text-center" style={{ background: 'rgba(155,95,227,0.1)', border: '1px solid rgba(155,95,227,0.2)' }}>
            <p className="text-lg font-bold text-violet-300">{n}</p>
            <p className="text-[10px] text-gray-400 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      <blockquote className="border-l-2 border-cyan-400 pl-4 text-gray-200 italic text-sm leading-relaxed">
        "{OWNER.tagline}"
      </blockquote>
      <div className="space-y-2">
        {OWNER.description.map((line, i) => (
          <p key={i} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2">
            <span className="text-cyan-400 mt-1 shrink-0">▸</span>
            {line}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {OWNER.tags.map(tag => (
          <span key={tag} className="px-2.5 py-1 text-xs rounded-full border border-violet-500/40 text-violet-300 bg-violet-900/15">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-3">
        <a href={OWNER.social.linkedin} target="_blank" rel="noreferrer"
          className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 rounded-lg text-sm hover:bg-cyan-500/20 transition-all" style={{ pointerEvents: 'auto' }}>
          LinkedIn
        </a>
        <a href={`mailto:${OWNER.social.email}`}
          className="px-4 py-2 bg-violet-500/15 border border-violet-500/50 text-violet-200 rounded-lg text-sm font-medium hover:bg-violet-500/25 transition-all" style={{ pointerEvents: 'auto' }}>
          Conversar →
        </a>
      </div>
    </div>
  )
}

// Planeta 2 — SOLID dedicado
function ProjectsContent() {
  const solid = PROJECTS_DONE.find(p => p.id === 'solid')
  const ps    = solid?.panelStyle
  return (
    <div className="space-y-4">
      {ps && (
        <div className="flex items-center gap-2">
          <span style={{
            fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
            fontFamily: '"Space Grotesk", ui-sans-serif', fontWeight: 500,
            padding: '3px 8px', borderRadius: 4,
            background: ps.badgeBg, color: ps.badgeColor, border: `1px solid ${ps.badgeBorder}`,
          }}>{ps.badgeLabel}</span>
        </div>
      )}
      {solid && <ProjectCard project={solid} />}
    </div>
  )
}

function WIPContent() {
  const voigt = PROJECTS_DONE.find(p => p.id === 'voigt')
  const ps    = voigt?.panelStyle
  return (
    <div className="space-y-4">
      {ps && (
        <div className="flex items-center gap-2">
          {/* Announcement bar estilo Voigt — fundo ouro sólido */}
          <span style={{
            fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
            fontFamily: '"Inter", ui-sans-serif', fontWeight: 700,
            padding: '4px 10px',
            background: ps.badgeBg, color: ps.badgeColor,
          }}>{ps.badgeLabel}</span>
        </div>
      )}
      {voigt && <ProjectCard project={voigt} />}
    </div>
  )
}

// Planeta 4 — Faça Parte / Contato
function ContactContent() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const nome = data.get('nome') || ''
    const email = data.get('email') || ''
    const mensagem = data.get('mensagem') || ''
    const body = encodeURIComponent(`Olá Mauricio,\n\nMeu nome é ${nome}.\n\n${mensagem}\n\nEmail para contato: ${email}`)
    const subject = encodeURIComponent(`Contato pelo portfólio — ${nome}`)
    window.open(`mailto:${OWNER.social.email}?subject=${subject}&body=${body}`)
    setSubmitted(true)
  }

  return (
    <div className="space-y-5">

      {/* Headline */}
      <div>
        <p className="text-[10px] tracking-[0.35em] uppercase font-mono text-cyan-400 mb-2">
          Esta constelação está crescendo
        </p>
        <h2 className="text-2xl font-bold text-white leading-tight">
          Venha fazer parte.
        </h2>
        <p className="text-gray-300 text-sm mt-2 leading-relaxed">
          Cada planeta aqui foi construído do zero — sistema real, em produção,
          com resultado mensurável. O próximo pode ser o seu projeto.
        </p>
      </div>

      {/* Próximos planetas em formação */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-mono">
          Planetas em formação
        </p>
        <div className="space-y-2">
          {PROJECTS_WIP.map(p => (
            <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-lg"
              style={{ background: `${p.glowColor}10`, border: `1px solid ${p.glowColor}25` }}>
              <div className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                style={{ background: p.glowColor }} />
              <div>
                <p className="text-white text-xs font-semibold">{p.name}</p>
                <p className="text-gray-400 text-[11px]">{p.subtitle}</p>
              </div>
              <span className="ml-auto text-[10px] font-mono shrink-0"
                style={{ color: p.glowColor }}>em dev</span>
            </div>
          ))}
          {/* Slot para o projeto do visitante */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg border border-dashed border-white/15">
            <div className="w-2 h-2 rounded-full shrink-0 bg-white/20" />
            <p className="text-gray-500 text-xs italic">Seu projeto aqui →</p>
          </div>
        </div>
      </div>

      {/* O que posso entregar */}
      <div className="space-y-1.5">
        {[
          'Site ou sistema completo do zero',
          'IA integrada à operação (Claude, OpenAI)',
          'CRM, ERP ou plataforma SaaS',
          'Automações que eliminam trabalho manual',
          'Estratégia digital + execução técnica',
        ].map(item => (
          <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-cyan-400 shrink-0 text-xs">▸</span>
            {item}
          </div>
        ))}
      </div>

      {/* Formulário */}
      {submitted ? (
        <div className="rounded-xl p-5 text-center space-y-3"
          style={{ background: 'rgba(0,255,240,0.06)', border: '1px solid rgba(0,255,240,0.2)' }}>
          <p className="text-2xl">🚀</p>
          <p className="text-white font-bold text-base">Mensagem enviada!</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Seu cliente de email foi aberto com a mensagem pré-preenchida. Respondo em até 24h.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-cyan-400 underline underline-offset-2"
            style={{ pointerEvents: 'auto' }}>
            Enviar outra mensagem
          </button>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={handleSubmit}>
          {[
            { id: 'contact-nome', name: 'nome', label: 'Seu nome', type: 'text', placeholder: 'Como te chamo?', autoComplete: 'name' },
            { id: 'contact-email', name: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', autoComplete: 'email' },
          ].map(f => (
            <div key={f.id}>
              <label htmlFor={f.id} className="text-xs text-cyan-400 uppercase tracking-wider">{f.label}</label>
              <input id={f.id} name={f.name} type={f.type} autoComplete={f.autoComplete} required
                className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-colors"
                placeholder={f.placeholder} style={{ pointerEvents: 'auto' }} />
            </div>
          ))}
          <div>
            <label htmlFor="contact-mensagem" className="text-xs text-cyan-400 uppercase tracking-wider">Qual o seu desafio?</label>
            <textarea id="contact-mensagem" name="mensagem" rows={3} required
              className="w-full mt-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
              placeholder="Sistema, automacao, IA, site... me conta." style={{ pointerEvents: 'auto' }} />
          </div>
          <button type="submit"
            className="w-full py-3 rounded-lg text-sm font-bold tracking-wide transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,240,0.15), rgba(155,95,227,0.15))',
              border: '1px solid rgba(0,255,240,0.35)',
              color: '#fff',
              pointerEvents: 'auto',
            }}>
            Quero fazer parte desta constelação →
          </button>
        </form>
      )}

      <div className="space-y-2 pt-1 border-t border-white/10">
        <a href={`mailto:${OWNER.social.email}`}
          className="flex items-center gap-3 text-sm text-gray-300 hover:text-cyan-300 transition-colors"
          style={{ pointerEvents: 'auto' }}>
          <span className="text-cyan-400">✉</span> {OWNER.social.email}
        </a>
        <a href={OWNER.social.linkedin} target="_blank" rel="noreferrer"
          className="flex items-center gap-3 text-sm text-gray-300 hover:text-cyan-300 transition-colors"
          style={{ pointerEvents: 'auto' }}>
          <span className="text-cyan-400">in</span> linkedin.com/in/mauricio-luzardo
        </a>
      </div>
    </div>
  )
}

const PANEL_CONTENT = {
  hero: HeroContent,
  projects: ProjectsContent,
  wip: WIPContent,
  contact: ContactContent,
}

// Mapeia planeta -> projeto para pegar o panelStyle
const PLANET_PROJECT = {
  projects: () => PROJECTS_DONE.find(p => p.id === 'solid'),
  wip:      () => PROJECTS_DONE.find(p => p.id === 'voigt'),
}

export default function SectionPanel() {
  const panelRef    = useRef()
  const innerRef    = useRef()
  const swipeStartY = useRef(null)
  const swipeStartScroll = useRef(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640)
  const { activePlanet, panelOpen, closePanel } = useUniverseStore()
  const Content = activePlanet ? PANEL_CONTENT[activePlanet] : null

  const project     = PLANET_PROJECT[activePlanet]?.()
  const ps          = project?.panelStyle
  const panelBg     = ps?.bg     || '#080808'
  const panelBorder = ps?.border || 'rgba(155,95,227,0.2)'
  const accent      = ps?.accent || '#9B5FE3'

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Escape fecha o painel
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && panelOpen) closePanel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panelOpen, closePanel])

  // Foca o primeiro elemento interativo quando painel abre (keyboard navigation)
  useEffect(() => {
    if (!panelOpen || !panelRef.current) return
    const first = panelRef.current.querySelector('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')
    if (first) setTimeout(() => first.focus(), 520) // após animação GSAP
  }, [panelOpen])

  // Set initial GSAP position before paint — prevents flash
  useLayoutEffect(() => {
    if (!panelRef.current) return
    if (isMobile) {
      gsap.set(panelRef.current, { y: '100%', opacity: 1, x: 0 })
    } else {
      gsap.set(panelRef.current, { opacity: 0, y: 0, x: 0 })
    }
  }, [isMobile])

  useEffect(() => {
    if (!panelRef.current) return
    if (panelOpen) {
      if (isMobile) {
        gsap.to(panelRef.current, { y: 0, duration: 0.45, ease: 'power3.out' })
      } else {
        gsap.fromTo(panelRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
      }
    } else {
      if (isMobile) {
        gsap.to(panelRef.current, { y: '100%', duration: 0.35, ease: 'power3.in' })
      } else {
        gsap.to(panelRef.current, { x: 60, opacity: 0, duration: 0.3, ease: 'power3.in' })
      }
    }
  }, [panelOpen, isMobile])

  const containerStyle = isMobile ? {
    position: 'fixed',
    bottom: 0, left: 0, right: 0,
    height: SHEET_HEIGHT,
    zIndex: 30,
    pointerEvents: panelOpen ? 'auto' : 'none',
  } : {
    position: 'fixed',
    right: 0, top: 0,
    height: '100%', width: 400,
    zIndex: 30,
    pointerEvents: panelOpen ? 'auto' : 'none',
  }

  return (
    <div ref={panelRef} data-scroll-ignore style={containerStyle}>
      <div
        ref={innerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Detalhes do projeto"
        onTouchStart={e => {
          e.stopPropagation()
          if (isMobile) {
            swipeStartY.current = e.touches[0].clientY
            swipeStartScroll.current = innerRef.current?.scrollTop || 0
          }
        }}
        onTouchMove={e => {
          e.stopPropagation()
          if (!isMobile || swipeStartY.current === null) return
          const deltaY = e.touches[0].clientY - swipeStartY.current
          const isAtTop = (innerRef.current?.scrollTop || 0) <= 0 && swipeStartScroll.current <= 0
          if (isAtTop && deltaY > 0 && panelRef.current) {
            gsap.set(panelRef.current, { y: Math.min(deltaY * 0.6, 200) })
          }
        }}
        onTouchEnd={e => {
          if (!isMobile || swipeStartY.current === null) return
          const deltaY = (e.changedTouches[0]?.clientY || 0) - swipeStartY.current
          const isAtTop = swipeStartScroll.current <= 0
          swipeStartY.current = null
          if (isAtTop && deltaY > 80) {
            closePanel()
          } else if (panelRef.current) {
            gsap.to(panelRef.current, { y: 0, duration: 0.25, ease: 'power3.out' })
          }
        }}
        style={{
          height: '100%',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          padding: isMobile
            ? '0 20px calc(env(safe-area-inset-bottom, 0px) + 40px)'
            : '56px 20px 20px',
          background: panelBg,
          borderLeft: isMobile ? 'none' : `1px solid ${panelBorder}`,
          borderTop: isMobile ? `1px solid ${panelBorder}` : 'none',
          borderRadius: isMobile ? '20px 20px 0 0' : 0,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {isMobile ? (
          <div style={{
            position: 'sticky', top: 0, zIndex: 1,
            padding: '8px 0 10px',
            background: panelBg,
            marginBottom: 14,
          }}>
            {/* Accent gradient bar at very top of sheet */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${accent}99, transparent)`,
            }} />
            <div style={{ display: 'flex', alignItems: 'center', paddingTop: 8 }}>
              {/* Drag handle — centered */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: 40, height: 4, borderRadius: 2,
                  background: 'rgba(255,255,255,0.18)',
                }} />
              </div>
              {/* Close button */}
              <button onClick={closePanel} aria-label="Fechar painel" style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${panelBorder}`,
                color: ps?.textMuted || '#9ca3af', fontSize: 14,
                pointerEvents: 'auto', cursor: 'pointer',
              }}>&#x2715;</button>
            </div>
          </div>
        ) : (
          <button onClick={closePanel}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: ps?.textMuted || '#9ca3af', pointerEvents: 'auto',
              fontSize: 18, opacity: 0.6, cursor: 'pointer',
              background: 'none', border: 'none',
            }}>
            &#x2715;
          </button>
        )}
        {Content && <Content />}
      </div>
    </div>
  )
}
