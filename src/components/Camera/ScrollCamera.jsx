import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useUniverseStore } from '../../store/universeStore'

// ─────────────────────────────────────────────────────────────────────────────
// Distâncias mínimas garantidas (raio + margem de segurança generosa):
//   Hero (0,0,0) r=12           → mín 28u (começa em 0,8,80)
//   Projects (-70,8,-60) r=10   → mín 25u
//   WIP (80,-10,-100) r=10      → mín 25u
//   Livro (30,18,-142) r=9      → mín 22u
//   Khepra (-40,12,-200) r=9    → mín 22u
//   Monaco (45,-6,-260) r=8     → mín 22u
//   Contact (-20,15,-330) r=9   → mín 22u (o fechamento final isolado)
//
// Estratégia: abordagem LATERAL (pelo lado do planeta), não pela frente.
// Assim o spline nunca cruza o eixo do planeta e não entra nele.
// ─────────────────────────────────────────────────────────────────────────────
const WAYPOINTS = [

  // ── ENTRADA (ORIGINAL INTOCADA) ───────────────────────────────────────────
  new THREE.Vector3(0, 8, 80),

  // ── HERO PLANET (0,0,0) (ORIGINAL INTOCADA) ───────────────────────────────
  new THREE.Vector3(0,   5,  30),   // 1 frente, dist=30 ✓
  new THREE.Vector3(-28, 8,  18),   // 2 lateral esquerda, dist=sqrt(784+64+324)≈32 ✓
  new THREE.Vector3(-50, 10,  2),   // 3 saindo, dist=sqrt(2500+100+4)≈50 ✓

  // ── TRANSIÇÃO (ORIGINAL INTOCADA) ─────────────────────────────────────────
  new THREE.Vector3(-62, 10, -25),  // 4

  // ── PROJECTS (-70,8,-60) (ORIGINAL INTOCADA) ──────────────────────────────
  new THREE.Vector3(-44, 10, -58),  // 5 direita: dist=sqrt(676+4+4)≈26 ✓
  new THREE.Vector3(-45, 9,  -60),  // 6 lado, dist=sqrt(625+1+0)=25 ✓
  new THREE.Vector3(-58, 8,  -84),  // 7 saindo para baixo-esquerda, dist=sqrt(144+0+576)≈27 ✓

  // ── TRANSIÇÃO (ORIGINAL INTOCADA) ─────────────────────────────────────────
  new THREE.Vector3(-10,  2, -88),  // 8
  new THREE.Vector3( 45, -4, -88),  // 9

  // ── WIP (80,-10,-100) (ORIGINAL INTOCADA) ─────────────────────────────────
  new THREE.Vector3( 55, -8, -100), // 10 esquerda: dist=sqrt(625+4+0)=25 ✓
  new THREE.Vector3( 56, -9, -100), // 11 lado, dist=sqrt(576+1+0)≈24 ✓
  new THREE.Vector3( 80, -6, -124), // 12 saindo acima, dist=sqrt(0+16+576)≈24 ✓

  // ── TRANSIÇÃO (ORIGINAL INTOCADA) ─────────────────────────────────────────
  new THREE.Vector3( 62,  4, -130), // 13

  // ── LIVRO (30,18,-142) (ORIGINAL INTOCADA) ────────────────────────────────
  new THREE.Vector3( 54, 16, -142), // 14 direita: dist=sqrt(576+4+0)≈24 ✓
  new THREE.Vector3( 52, 17, -144), // 15 lado, dist=sqrt(484+1+4)≈22 ✓
  new THREE.Vector3( 34, 20, -166), // 16 saindo para trás, dist=sqrt(16+4+576)≈24 ✓

  // ── TRANSIÇÃO LIVRO -> KHEPRA ─────────────────────────────────────────────
  new THREE.Vector3( -8, 16, -182), // 17

  // ── KHEPRA (-40,12,-200) ──────────────────────────────────────────────────
  new THREE.Vector3(-16, 12, -200), // 18 direita: dist=24 ✓
  new THREE.Vector3(-18, 13, -202), // 19 lado: dist=22 ✓
  new THREE.Vector3(-36, 15, -225), // 20 saindo para trás: dist=25 ✓

  // ── TRANSIÇÃO KHEPRA -> MONACO ────────────────────────────────────────────
  new THREE.Vector3( 12,  2, -242), // 21

  // ── MONACO (45,-6,-260) ───────────────────────────────────────────────────
  new THREE.Vector3( 23, -5, -258), // 22 esquerda: dist=22 ✓
  new THREE.Vector3( 24, -6, -260), // 23 lado: dist=21 ✓
  new THREE.Vector3( 38, -3, -285), // 24 saindo para trás: dist=26 ✓

  // ── TRANSIÇÃO MONACO -> CONTACT ───────────────────────────────────────────
  new THREE.Vector3(  6, 12, -305), // 25

  // ── CONTACT (-20,15,-330) — O FECHAMENTO FINAL ────────────────────────────
  new THREE.Vector3(  4, 16, -328), // 26 direita: dist=24 ✓
  new THREE.Vector3(  2, 15, -330), // 27 lado: dist=22 ✓
]

// Um alvo por waypoint — 28 no total, na mesma ordem de WAYPOINTS.
const LOOK_TARGETS = [
  new THREE.Vector3(  0,   0,    0),  // 0  hero
  new THREE.Vector3(  0,   0,    0),  // 1  hero
  new THREE.Vector3(  0,   0,    0),  // 2  hero
  new THREE.Vector3(-70,   8,  -60),  // 3  olha projects
  new THREE.Vector3(-70,   8,  -60),  // 4
  new THREE.Vector3(-70,   8,  -60),  // 5
  new THREE.Vector3(-70,   8,  -60),  // 6
  new THREE.Vector3(-70,   8,  -60),  // 7
  new THREE.Vector3( 80, -10, -100),  // 8  olha wip
  new THREE.Vector3( 80, -10, -100),  // 9
  new THREE.Vector3( 80, -10, -100),  // 10
  new THREE.Vector3( 80, -10, -100),  // 11
  new THREE.Vector3( 80, -10, -100),  // 12
  new THREE.Vector3( 30,  18, -142),  // 13 olha livro
  new THREE.Vector3( 30,  18, -142),  // 14
  new THREE.Vector3( 30,  18, -142),  // 15
  new THREE.Vector3( 30,  18, -142),  // 16
  new THREE.Vector3(-40,  12, -200),  // 17 olha khepra
  new THREE.Vector3(-40,  12, -200),  // 18
  new THREE.Vector3(-40,  12, -200),  // 19
  new THREE.Vector3(-40,  12, -200),  // 20
  new THREE.Vector3( 45,  -6, -260),  // 21 olha monaco
  new THREE.Vector3( 45,  -6, -260),  // 22
  new THREE.Vector3( 45,  -6, -260),  // 23
  new THREE.Vector3( 45,  -6, -260),  // 24
  new THREE.Vector3(-20,  15, -330),  // 25 olha contact (o fechamento final)
  new THREE.Vector3(-20,  15, -330),  // 26
  new THREE.Vector3(-20,  15, -330),  // 27
]

// ─── PLANET_ZONES — painel lateral abre/fecha ─────────────────────────────────
// São 28 waypoints (índices 0–27), logo t = índice / 27.
// Cada zona cobre a passagem diante do planeta:
//   hero     índices 1,2   → t ~0.03 a 0.12
//   projects índices 5,6   → t ~0.17 a 0.28
//   wip      índices 10,11 → t ~0.33 a 0.44
//   livro    índices 14,15 → t ~0.49 a 0.59
//   khepra   índices 18,19 → t ~0.64 a 0.74
//   monaco   índices 22,23 → t ~0.79 a 0.88
//   contact  índices 26,27 → t ~0.93 a 0.99
// ─────────────────────────────────────────────────────────────────────────────
const PLANET_ZONES = [
  { id: 'hero',     tMin: 0.03, tMax: 0.12 },
  { id: 'projects', tMin: 0.17, tMax: 0.28 },
  { id: 'wip',      tMin: 0.33, tMax: 0.44 },
  { id: 'livro',    tMin: 0.49, tMax: 0.59 },
  { id: 'khepra',   tMin: 0.64, tMax: 0.74 },
  { id: 'monaco',   tMin: 0.79, tMax: 0.88 },
  { id: 'contact',  tMin: 0.93, tMax: 0.99 },
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

  const setNearPlanet     = useUniverseStore((s) => s.setNearPlanet)
  const leavePlanetZone   = useUniverseStore((s) => s.leavePlanetZone)
  const setActivePlanet   = useUniverseStore((s) => s.setActivePlanet)
  const setScrollProgress = useUniverseStore((s) => s.setScrollProgress)

  useEffect(() => {
    const onWheel = (e) => {
      // Ignora scroll dentro do painel lateral — não move o universo
      if (e.target.closest('[data-scroll-ignore]')) return
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
