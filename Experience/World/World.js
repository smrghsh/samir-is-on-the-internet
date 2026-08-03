import Experience from '../Experience.js'
import Terrain from './Terrain.js'
import Rivers from './Rivers.js'
import Meadows from './Meadows.js'
import Birds from './Birds.js'

// The living landscape. Terrain first, then the feature scripts load in
// staggered: rivers flood the valleys, meadows spread, and flocks of birds
// drift across the sky.
export default class World {
  constructor() {
    this.experience = new Experience()
    // self-register before building features: they reach back through
    // experience.world.terrain during their constructors
    this.experience.world = this

    this.terrain = new Terrain()

    // order matters only for readability — each script owns its own delay
    this.features = [
      new Rivers(),
      new Meadows(),
      (this.birds = new Birds()),
    ]
  }

  setMode(isDark) {
    for (const f of this.features) f.setMode?.(isDark)
  }

  update() {
    this.terrain.update()
    for (const f of this.features) f.update?.()
  }

  destroy() {
    for (const f of this.features) f.destroy?.()
    this.terrain.destroy()
  }
}
