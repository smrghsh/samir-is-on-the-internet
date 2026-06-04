import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Scroll from './Utils/Scroll.js'
import Debug from './Utils/Debug.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'

let instance = null

export default class Experience {
  constructor(canvas) {
    // Singleton. Children call `new Experience()` (no args) to grab this one.
    if (instance) return instance
    instance = this
    window.experience = this

    this.canvas = canvas
    this.isDark = true // boot dark to match the SSR `theme-dark` html class

    // normalized mouse (-1..1) for camera parallax
    this.mouse = { x: 0, y: 0 }
    this.onMouseMove = (e) => {
      this.mouse.x = (e.clientX / this.sizes.width) * 2 - 1
      this.mouse.y = (e.clientY / this.sizes.height) * 2 - 1
    }
    window.addEventListener('mousemove', this.onMouseMove)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('#000000')
    this.scene.fog = new THREE.Fog('#000000', 14, 38)

    this.sizes = new Sizes()
    this.time = new Time()
    this.scroll = new Scroll()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()
    this.debug = new Debug()
    this.debug.init()

    this.sizes.on('resize', () => {
      this.camera.resize()
      this.renderer.resize()
      this.scroll.compute()
    })
    this.time.on('tick', () => this.update())
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.off('resize')
    this.time.off('tick')
    this.time.stop()

    window.removeEventListener('mousemove', this.onMouseMove)
    this.sizes.destroy()
    this.scroll.destroy()
    this.debug.destroy()
    this.world.destroy()
    this.renderer.instance.dispose()

    instance = null
    delete window.experience
  }
}
