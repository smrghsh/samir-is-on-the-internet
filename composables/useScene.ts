// composables/useScene.ts
// Single source of truth for the live terrain parameters + day/night mode.
// SceneControls.vue (the "open me!" lil-gui panel) writes to it; Topo.vue
// watches it and pushes changes into the WebGL TopoTerrain instance.
//
// Uses Nuxt's useState so the values survive HMR and are SSR-safe.

export interface SceneState {
  isDark: boolean
  amp: number
  contourEvery: number
  indexEvery: number
  lineWidth: number
  lineStrength: number
  fogNear: number
  fogFar: number
  seed: number
}

// Per-mode defaults. Night is the dramatic high-relief green-on-black;
// day is a calmer, lower, sage-on-paper landscape (see Samir's brief).
export const NIGHT_DEFAULTS = { amp: 1.55, contourEvery: 0.18, lineStrength: 1.0 }
export const DAY_DEFAULTS   = { amp: 1.18, contourEvery: 0.14, lineStrength: 0.8 }

export const useScene = () =>
  useState<SceneState>('scene', () => ({
    isDark: false,
    amp: 1.55,
    contourEvery: 0.18,
    indexEvery: 5.0,
    lineWidth: 1.05,
    lineStrength: 1.0,
    fogNear: 14,
    fogFar: 38,
    seed: 0,
  }))

// Flip mode AND apply that mode's terrain defaults in one shot, so the
// watcher in Topo.vue has a single coherent state to react to.
export function setMode(scene: SceneState, night: boolean) {
  scene.isDark = night
  Object.assign(scene, night ? NIGHT_DEFAULTS : DAY_DEFAULTS)
}
