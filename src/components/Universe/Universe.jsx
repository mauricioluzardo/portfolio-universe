import { Suspense } from 'react'
import { Environment } from '@react-three/drei'
import StarField from './StarField'
import Nebula from './Nebula'
import HeroPlanet from '../Planets/HeroPlanet'
import ProjectsPlanet from '../Planets/ProjectsPlanet'
import WIPPlanet from '../Planets/WIPPlanet'
import ContactPlanet from '../Planets/ContactPlanet'
import ScrollCamera from '../Camera/ScrollCamera'
import PostProcessing from '../Effects/PostProcessing'

export default function Universe() {
  return (
    <>
      <Suspense fallback={null}>
        <Environment
          files="/textures/space/night.hdr"
          background={false}
          environmentIntensity={0.2}
        />
      </Suspense>

      <directionalLight position={[150, 80, 100]} intensity={5.5} color="#FFE8C0" castShadow />
      <directionalLight position={[-200, -40, -150]} intensity={0.5} color="#3355FF" />
      <ambientLight intensity={0.03} color="#05010F" />

      <ScrollCamera />

      {/* Fundo: só estrelas — Nebula removida (causava claridade extrema) */}
      <Suspense fallback={null}>
        <StarField count={12000} />
      </Suspense>

      {/* 4 planetas com texturas PBR reais */}
      <Suspense fallback={null}>
        <HeroPlanet     position={[0,   0,   0]}   />
        <ProjectsPlanet position={[-70, 8,  -60]}  />
        <WIPPlanet      position={[80, -10, -100]} />
        <ContactPlanet  position={[-20, 15, -160]} />
      </Suspense>

      {/* SalesCopy 3D removido — usando HTML overlay */}

      {/* Bloom nativo Three.js */}
      <PostProcessing />
    </>
  )
}
