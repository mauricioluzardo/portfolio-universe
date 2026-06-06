import { create } from 'zustand'

export const useUniverseStore = create((set) => ({
  activePlanet: null,  // planeta cujo painel está aberto (só via click)
  nearPlanet:   null,  // planeta mais próximo da câmera (scroll, só HUD)
  panelOpen: false,
  cameraMode: 'scroll',
  scrollProgress: 0,
  isTransitioning: false,

  // Abre painel — só chamado via click no planeta
  setActivePlanet: (planet) => set({ activePlanet: planet, panelOpen: planet !== null }),
  // Fecha painel sem mudar activePlanet (para animação de saída)
  closePanel: () => set({ panelOpen: false, activePlanet: null }),
  // Indica qual planeta está próximo (ScrollCamera) — não abre painel
  setNearPlanet: (planet) => set({ nearPlanet: planet }),
  // Fecha painel quando câmera sai de uma zona
  leavePlanetZone: () => set((s) => s.panelOpen ? { panelOpen: false, activePlanet: null } : {}),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setTransitioning: (val) => set({ isTransitioning: val }),
}))
