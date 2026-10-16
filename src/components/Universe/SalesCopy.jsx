import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const COPY_BLOCKS = [
  {
    // HERO — a câmera passa por aqui vindo de z=80 em direção a z=32
    position: [0, 8, 48],
    lines: [
      { text: 'DESAFIOS COMPLEXOS.', size: 2.8, color: '#FFFFFF', y: 4.5 },
      { text: 'PRODUTOS REAIS.', size: 2.8, color: '#C77DFF', y: 0.5 },
      { text: 'Sistemas empresariais · Produtos digitais · IA aplicada', size: 1.0, color: '#7B2FF7', y: -2.8 },
      { text: 'Ateliê Monaco — Engenharia, arquitetura e execução pragmática', size: 0.75, color: '#6B3FA0', y: -4.5 },
    ],
    fadeIn: 70, fadeOut: 22,
  },
  {
    // PROJECTS — câmera vem de (-62,10,-25) em direção a (-44,10,-58)
    position: [-52, 18, -36],
    lines: [
      { text: 'ENGENHARIA QUE', size: 3.0, color: '#FFFFFF', y: 4 },
      { text: 'SUSTENTA A OPERAÇÃO.', size: 2.6, color: '#00D4FF', y: 0.2 },
      { text: 'Sistemas reais em produção, com regras de negócio e estabilidade.', size: 1.0, color: '#00AACC', y: -2.5 },
      { text: 'Solid CRM · Gestão de ~500 criadores · +200 migrações SQL', size: 0.75, color: '#007799', y: -4.1 },
    ],
    fadeIn: 52, fadeOut: 16,
  },
  {
    // WIP — câmera vem de (40,-4,-82) em direção a (55,-8,-100)
    position: [62, 4, -86],
    lines: [
      { text: 'AUTONOMIA TÉCNICA', size: 2.8, color: '#FFFFFF', y: 3.8 },
      { text: 'E EXECUÇÃO COM IA.', size: 2.8, color: '#FF8C42', y: 0.2 },
      { text: 'Next.js · Orquestração de Agentes · Testes Automatizados', size: 1.0, color: '#CC5500', y: -2.4 },
      { text: 'A tecnologia certa para a necessidade real do seu negócio.', size: 0.75, color: '#993300', y: -4.0 },
    ],
    fadeIn: 48, fadeOut: 15,
  },
  {
    // CONTACT — câmera vem de (5,14,-148) em direção a (4,16,-158)
    position: [-4, 20, -147],
    lines: [
      { text: 'TRANSFORME SEU DESAFIO', size: 2.6, color: '#FFFFFF', y: 5.0 },
      { text: 'EM PRODUTO REAL.', size: 2.6, color: '#00FFF0', y: 0.8 },
      { text: 'Sistemas empresariais, produtos digitais e automações inteligentes.', size: 1.0, color: '#00CCAA', y: -2.2 },
      { text: 'Ateliê Monaco — Arquitetura de soluções e desenvolvimento', size: 0.75, color: '#008877', y: -3.8 },
    ],
    fadeIn: 38, fadeOut: 12,
  },
]

// Componente de um bloco de texto com fade baseado em distância
function CopyBlock({ data }) {
  const groupRef = useRef()
  const [opacity, setOpacity] = useState(0)
  const { camera } = useThree()
  const targetPos = new THREE.Vector3(...data.position)
  const currentOpacity = useRef(0)

  useFrame(() => {
    const dist = camera.position.distanceTo(targetPos)
    let target = 0

    if (dist < data.fadeIn && dist > data.fadeOut) {
      // Zona visível: fade in suave ao entrar, fade out ao sair
      const enter = Math.min(1, (data.fadeIn - dist) / (data.fadeIn * 0.25))
      const exit  = Math.min(1, (dist - data.fadeOut) / (data.fadeOut * 0.5))
      target = Math.min(enter, exit)
    }

    // Lerp suave
    currentOpacity.current = THREE.MathUtils.lerp(currentOpacity.current, target, 0.06)

    // Aplicar na escala (simula fade sem depender do fillOpacity do troika)
    if (groupRef.current) {
      const op = currentOpacity.current
      groupRef.current.visible = op > 0.02
      // Escala de 0.85→1 conforme opacity aumenta (fade-in com scale)
      const s = 0.85 + op * 0.15
      groupRef.current.scale.setScalar(s)
      // Atualizar fillOpacity de cada Text filho
      groupRef.current.traverse(child => {
        if (child.isText) {
          child.fillOpacity   = op
          child.strokeOpacity = op
        }
      })
    }
  })

  // A câmera olha para o centro do espaço — o texto precisa estar orientado
  // para a posição da câmera na abordagem (billboarding manual)
  return (
    <group ref={groupRef} position={data.position} visible={false}>
      {data.lines.map((line, i) => (
        <Text
          key={i}
          position={[0, line.y, 0]}
          fontSize={line.size}
          color={line.color}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          fillOpacity={0}
          strokeColor={i < 2 ? '#000000' : 'transparent'}
          strokeWidth={i < 2 ? 0.02 : 0}
          strokeOpacity={0}
          letterSpacing={i < 2 ? 0.08 : 0.04}
          maxWidth={60}
        >
          {line.text}
        </Text>
      ))}
    </group>
  )
}

export default function SalesCopy() {
  return (
    <>
      {COPY_BLOCKS.map((block, i) => (
        <CopyBlock key={i} data={block} />
      ))}
    </>
  )
}
