import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useUniverseStore } from '../../store/universeStore'

// ─────────────────────────────────────────────────────────────────────────────
// Distâncias mínimas garantidas (raio + margem de segurança generosa):
//   Hero (0,0,0) r=12      → mín 28u
//   Projects (-70,8,-60) r=10 → mín 25u
//   WIP (80,-10,-100) r=10   → mín 25u
//   Contact (-20,15,-160) r=9 → mín 22u
//
// Estratégia: abordagem LATERAL (pelo lado do planeta), não pela frente.
// Assim o spline nunca cruza o eixo do planeta e não entra nele.
// ─────────────────────────────────────────────────────────────────────────────
const WAYPOINTS = [

  // ── ENTRADA ──────────────────────────────────────────────────────────────
  new THREE.Vector3(0, 8, 80),

  // ── HERO PLANET (0,0,0) ───────────────────────────────────────────────
  new THREE.Vector3(0,   5,  30),   // frente, dist=30 ✓
  new THREE.Vector3(-28, 8,  18),   // lateral esquerda, dist=sqrt(784+64+324)≈32 ✓
  new THREE.Vector3(-50, 10,  2),   // saindo, dist=sqrt(2500+100+4)≈50 ✓

  // ── TRANSIÇÃO ─────────────────────────────────────────────────────────
  new THREE.Vector3(-62, 10, -25),

  // ── PROJECTS (-70,8,-60) ──────────────────────────────────────────────
  // Abordagem pela DIREITA (+x) do planeta, não pela frente
  new THREE.Vector3(-44, 10, -58),  // direita: dist=sqrt(676+4+4)≈26 ✓
  new THREE.Vector3(-45, 9,  -60),  // lado, dist=sqrt(625+1+0)=25 ✓
  new THREE.Vector3(-58, 8,  -84),  // saindo para baixo-esquerda, dist=sqrt(144+0+576)≈27 ✓

  // ── TRANSIÇÃO ─────────────────────────────────────────────────────────
  new THREE.Vector3(-10,  2, -88),
  new THREE.Vector3( 45, -4, -88),

  // ── WIP (80,-10,-100) ─────────────────────────────────────────────────
  // Abordagem pela ESQUERDA (-x) do planeta
  new THREE.Vector3( 55, -8, -100), // esquerda: dist=sqrt(625+4+0)=25 ✓
  new THREE.Vector3( 56, -9, -100), // lado, dist=sqrt(576+1+0)≈24 ✓
  new THREE.Vector3( 80, -6, -124), // saindo acima, dist=sqrt(0+16+576)≈24 ✓

  // ── TRANSIÇÃO ─────────────────────────────────────────────────────────
  new THREE.Vector3( 40,  8, -138),
  new THREE.Vector3(  5, 14, -148),

  // ── CONTACT (-20,15,-160) ─────────────────────────────────────────────
  // Abordagem pela DIREITA (+x) do planeta
  new THREE.Vector3(  4, 16, -158), // direita: dist=sqrt(576+1+4)=24 ✓
  new THREE.Vector3(  2, 15, -160), // lado, dist=sqrt(484+0+0)=22 ✓
]

const LOOK_TARGETS = [
  new THREE.Vector3(0,    0,    0),    // olha hero
  new THREE.Vector3(0,    0,    0),
  new THREE.Vector3(0,    0,    0),
  new THREE.Vector3(-70,  8,  -60),   // olha projects
  new THREE.Vector3(-70,  8,  -60),
  new THREE.Vector3(-70,  8,  -60),
  new THREE.Vector3(-70,  8,  -60),
  new THREE.Vector3(-70,  8,  -60),
  new THREE.Vector3( 80, -10, -100),  // olha wip
  new THREE.Vector3( 80, -10, -100),
  new THREE.Vector3( 80, -10, -100),
  new THREE.Vector3( 80, -10, -100),
  new THREE.Vector3( 80, -10, -100),
  new THREE.Vector3(-20,  15, -160),  // olha contact
  new THREE.Vector3(-20,  15, -160),
  new THREE.Vector3(-20,  15, -160),
  new THREE.Vector3(-20,  15, -160),
]

// ─── PLANET_ZONES — painel lateral abre/fecha ─────────────────────────────────
// Referência: LOOK_TARGETS muda de planeta em:
//   hero→projects: t=0.1875 (índice 3/16)
//   projects→wip:  t=0.5000 (índice 8/16)
//   wip→contact:   t=0.8125 (índice 13/16)
//
// Texto (SalesCopy/ZONES) começa 3 ticks antes de cada zona para já estar
// visível quando o painel abre. Ver tabela em SalesCopy.jsx.
// NÃO ALTERAR sem recalibrar SalesCopy.jsx junto.
// ─────────────────────────────────────────────────────────────────────────────
const PLANET_ZONES = [
  { id: 'hero',     tMin: 0.04, tMax: 0.16 },
  { id: 'projects', tMin: 0.22, tMax: 0.50 },
  { id: 'wip',      tMin: 0.55, tMax: 0.74 },
  { id: 'contact',  tMin: 0.82, tMax: 0.99 },
]

const SCROLL_SENSITIVITY = 0.00018
const curve = new THREE.CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5)

export default function ScrollCamera() {
  const { camera } = useThree()
  const accumulated    = useRef(0)
  const progress       = useRef(0)
  const targetProgress = useRef(0)
  const currentZone    = useRef(null)
  const leaveTimerRef  = useRef(null)
  const lastT          = useRef(-1)
  const touchY         = useRef(0)
  // Seletores individuais — ScrollCamera não re-renderiza quando scrollProgress muda
  const setNearPlanet     = useUniverseStore((s) => s.setNearPlanet)
  const leavePlanetZone   = useUniverseStore((s) => s.leavePlanetZone)
  const setActivePlanet   = useUniverseStore((s) => s.setActivePlanet)
  const setScrollProgress = useUniverseStore((s) => s.setScrollProgress)

  useEffect(() => {
    const onWheel = (e) => {
      // Ignora scroll dentro do painel lateral — não move o universo
      if (e.target.closest('[data-scroll-ignore]')) return
      // Clamp por evento: mouse (120/notch) e trackpad (3-10/evento) tratados igual
      const raw   = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY
      const delta = Math.sign(raw) * Math.min(Math.abs(raw), 50)
      accumulated.current = Math.max(0, Math.min(1,
        accumulated.current + delta * SCROLL_SENSITIVITY
      ))
      targetProgress.current = accumulated.current
    }
    const onTouchStart = (e) => { touchY.current = e.touches[0].clientY }
    const onTouchMove  = (e) => {
      const delta = touchY.current - e.touches[0].clientY
      touchY.current = e.touches[0].clientY
      accumulated.current = Math.max(0, Math.min(1,
        accumulated.current + delta * SCROLL_SENSITIVITY * 1.4
      ))
      targetProgress.current = accumulated.current
    }
    const onNavigate = (e) => {
      accumulated.current    = e.detail.t
      targetProgress.current = e.detail.t
    }
    window.addEventListener('wheel',           onWheel,      { passive: true })
    window.addEventListener('touchstart',      onTouchStart, { passive: true })
    window.addEventListener('touchmove',       onTouchMove,  { passive: true })
    window.addEventListener('navigateToPlanet', onNavigate)
    return () => {
      window.removeEventListener('wheel',           onWheel)
      window.removeEventListener('touchstart',      onTouchStart)
      window.removeEventListener('touchmove',       onTouchMove)
      window.removeEventListener('navigateToPlanet', onNavigate)
    }
  }, [setScrollProgress])

  useFrame(() => {
    progress.current += (targetProgress.current - progress.current) * 0.055
    const t   = Math.max(0, Math.min(progress.current, 0.999))
    const pos = curve.getPoint(t)
    camera.position.lerp(pos, 0.08)

    const rawIdx = t * (LOOK_TARGETS.length - 1)
    const idx    = Math.min(Math.floor(rawIdx), LOOK_TARGETS.length - 2)
    const frac   = rawIdx - idx
    const target = new THREE.Vector3().lerpVectors(LOOK_TARGETS[idx], LOOK_TARGETS[idx + 1], frac)
    camera.lookAt(target)

    // Atualiza scrollProgress com valor lerped (sincronizado com câmera)
    // Throttle: só notifica React se mudou o suficiente para importar
    if (Math.abs(t - lastT.current) > 0.0008) {
      lastT.current = t
      setScrollProgress(t)
    }

    const zone   = PLANET_ZONES.find(z => t >= z.tMin && t <= z.tMax)
    const zoneId = zone ? zone.id : null
    if (zoneId !== currentZone.current) {
      currentZone.current = zoneId
      setNearPlanet(zoneId)
      if (zoneId !== null) {
        if (leaveTimerRef.current) { clearTimeout(leaveTimerRef.current); leaveTimerRef.current = null }
        setActivePlanet(zoneId)
      } else {
        leaveTimerRef.current = setTimeout(() => {
          leavePlanetZone()
          leaveTimerRef.current = null
        }, 350)
      }
    }
  })

  return null
}
