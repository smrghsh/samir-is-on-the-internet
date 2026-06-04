import Experience from '../Experience.js'
import { NIGHT_DEFAULTS, DAY_DEFAULTS } from '../palettes.js'

// The "open me!" lil-gui panel (the XR inside joke): day/night toggle + live
// terrain params. lil-gui is dynamic-imported so it never runs during SSR.
export default class Debug {
  constructor() {
    this.experience = new Experience()
    this.gui = null
  }

  // night toggle: flip the <html> theme class (drives the CSS light-dark()
  // tokens), apply that mode's terrain defaults, and switch the palette.
  setMode(night) {
    const root = document.documentElement
    root.classList.toggle('theme-dark', night)
    root.classList.toggle('theme-light', !night)
    const terrain = this.experience.world.terrain
    terrain.setParams(night ? NIGHT_DEFAULTS : DAY_DEFAULTS)
    terrain.setMode(night)
  }

  async init() {
    const { default: GUI } = await import('lil-gui')
    const terrain = this.experience.world.terrain
    const params = terrain.getParams()

    const p = {
      night: this.experience.isDark,
      amp: params.amp,
      contourEvery: params.contourEvery,
      indexEvery: params.indexEvery,
      lineWidth: params.lineWidth,
      lineStrength: params.lineStrength,
      fogNear: params.fogNear,
      fogFar: params.fogFar,
      regenerate: () => terrain.setParams({ seed: Math.random() * 100 }),
    }

    const gui = new GUI({ title: 'open me!' })
    this.gui = gui

    gui.add(p, 'night').name('🌙 night/☀️day mode!?').onChange((v) => {
      this.setMode(v)
      // reflect the mode-default amp/contour/lineStrength back into the panel
      const d = v ? NIGHT_DEFAULTS : DAY_DEFAULTS
      p.amp = d.amp
      p.contourEvery = d.contourEvery
      p.lineStrength = d.lineStrength
      gui.controllersRecursive().forEach((c) => c.updateDisplay())
    })

    const ft = gui.addFolder('terrain')
    ft.add(p, 'amp', 0.4, 2.6, 0.01).name('amplitude').onChange((v) => terrain.setParams({ amp: v }))
    ft.add(p, 'contourEvery', 0.06, 0.4, 0.005).name('contour spacing').onChange((v) => terrain.setParams({ contourEvery: v }))
    ft.add(p, 'indexEvery', 2, 10, 1).name('index interval').onChange((v) => terrain.setParams({ indexEvery: v }))
    ft.add(p, 'lineWidth', 0.4, 2.4, 0.05).name('line weight').onChange((v) => terrain.setParams({ lineWidth: v }))
    ft.add(p, 'lineStrength', 0, 1.4, 0.02).name('line opacity').onChange((v) => terrain.setParams({ lineStrength: v }))

    const ff = gui.addFolder('fog')
    ff.close()
    ff.add(p, 'fogNear', 4, 30, 0.5).name('near').onChange((v) => terrain.setParams({ fogNear: v }))
    ff.add(p, 'fogFar', 16, 60, 0.5).name('far').onChange((v) => terrain.setParams({ fogFar: v }))

    gui.add(p, 'regenerate').name('↻ regenerate terrain')

    // Boot collapsed: just the "open me!" title bar shows (that's the joke).
    gui.close()
  }

  destroy() {
    this.gui?.destroy()
    this.gui = null
  }
}
