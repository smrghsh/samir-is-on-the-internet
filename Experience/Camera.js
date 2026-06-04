import * as THREE from 'three'
import Experience from './Experience.js'

const lerp = (a, b, t) => a + (b - a) * t

// Fixed backdrop camera: eases toward the ridgeline on scroll and drifts with
// the mouse for parallax. No OrbitControls — the viewer never drives it.
export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.scroll = this.experience.scroll

    this.start = { pos: [0, 6.2, 11], look: [0, 0.4, -2], fov: 34 }
    this.end = null // optional scroll target; default branch eases procedurally
    this.parallax = 0.55

    this.setInstance()
  }

  setInstance() {
    const s = this.start
    this.instance = new THREE.PerspectiveCamera(
      s.fov,
      this.sizes.width / this.sizes.height,
      0.1,
      200,
    )
    this.instance.position.set(...s.pos)
    this.instance.lookAt(...s.look)
    this.scene.add(this.instance)

    this.cam = {
      baseX: s.pos[0], baseY: s.pos[1], baseZ: s.pos[2],
      lookX: s.look[0], lookY: s.look[1], lookZ: s.look[2],
      curX: s.pos[0], curY: s.pos[1],
    }
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    const c = this.cam
    const p = this.scroll.progress
    const m = this.experience.mouse

    // scroll-eased base (subtle descent / push-in toward the ridges)
    let baseY, baseZ, lookY
    if (this.end) {
      baseY = lerp(c.baseY, this.end.pos[1], p)
      baseZ = lerp(c.baseZ, this.end.pos[2], p)
      lookY = lerp(c.lookY, this.end.look[1], p)
    } else {
      baseY = c.baseY - p * 3.0
      baseZ = c.baseZ - p * 3.5
      lookY = c.lookY - p * 0.5
    }

    // mouse parallax target, relative to the un-scrolled base
    const tgtX = c.baseX - m.x * this.parallax
    const tgtY = baseY + m.y * (this.parallax * 0.6)

    c.curX += (tgtX - c.curX) * 0.05
    c.curY += (tgtY - c.curY) * 0.05

    this.instance.position.set(c.curX, c.curY, baseZ)
    this.instance.lookAt(c.lookX, lookY, c.lookZ)
  }
}
