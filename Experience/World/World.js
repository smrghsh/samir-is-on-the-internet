import Experience from '../Experience.js'
import Terrain from './Terrain.js'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.terrain = new Terrain()
  }

  update() {
    this.terrain.update()
  }

  destroy() {
    this.terrain.destroy()
  }
}
