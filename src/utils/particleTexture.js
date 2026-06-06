import * as THREE from 'three'

// Partícula de asteroide/rocha — core sólido com borda desfocada
// Parece fragmento real de rocha espacial, não blob brilhante
export function createRockParticle() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const half = size / 2

  // Núcleo sólido rochoso
  const inner = ctx.createRadialGradient(half, half, 0, half, half, half * 0.38)
  inner.addColorStop(0.0, 'rgba(240, 210, 140, 1.0)')
  inner.addColorStop(0.6, 'rgba(200, 165, 90, 0.95)')
  inner.addColorStop(1.0, 'rgba(150, 110, 50, 0.85)')
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.arc(half, half, half * 0.38, 0, Math.PI * 2)
  ctx.fill()

  // Poeira/halo externo mínimo — só 10% de opacidade
  const outer = ctx.createRadialGradient(half, half, half * 0.3, half, half, half * 0.7)
  outer.addColorStop(0.0, 'rgba(200, 160, 80, 0.15)')
  outer.addColorStop(1.0, 'rgba(100, 60, 20, 0.0)')
  ctx.fillStyle = outer
  ctx.fillRect(0, 0, size, size)

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// Partícula de gelo/ciano — pequena, nítida, como cristal de gelo
export function createIceParticle() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const half = size / 2

  const inner = ctx.createRadialGradient(half, half, 0, half, half, half * 0.35)
  inner.addColorStop(0.0, 'rgba(220, 245, 255, 1.0)')
  inner.addColorStop(0.5, 'rgba(100, 210, 240, 0.9)')
  inner.addColorStop(1.0, 'rgba(30, 140, 180, 0.7)')
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.arc(half, half, half * 0.35, 0, Math.PI * 2)
  ctx.fill()

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// Partícula de magma/lava — braseiro laranja-vermelho
export function createEmberParticle() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const half = size / 2

  const inner = ctx.createRadialGradient(half, half, 0, half, half, half * 0.4)
  inner.addColorStop(0.0, 'rgba(255, 230, 150, 1.0)')
  inner.addColorStop(0.4, 'rgba(255, 100, 20, 0.95)')
  inner.addColorStop(1.0, 'rgba(150, 30, 0, 0.7)')
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.arc(half, half, half * 0.4, 0, Math.PI * 2)
  ctx.fill()

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// Partícula de dados/metal — pontinho azul metálico
export function createDataParticle() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const half = size / 2

  const inner = ctx.createRadialGradient(half, half, 0, half, half, half * 0.35)
  inner.addColorStop(0.0, 'rgba(180, 240, 255, 1.0)')
  inner.addColorStop(0.5, 'rgba(0, 180, 220, 0.9)')
  inner.addColorStop(1.0, 'rgba(0, 80, 140, 0.6)')
  ctx.fillStyle = inner
  ctx.beginPath()
  ctx.arc(half, half, half * 0.35, 0, Math.PI * 2)
  ctx.fill()

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}
