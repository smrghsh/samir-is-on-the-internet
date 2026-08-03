import * as THREE from 'three'
import Experience from '../Experience.js'

// Birds: small flocks in loose V formation drifting across the sky every so
// often. Each bird is two flapping wing triangles — silhouettes, not models.

const FIRST_FLOCK = 6500      // ms after load
const INTERVAL = [16000, 34000] // ms between flocks (random in range)
const SPEED = 1.3             // units/sec — unhurried; a crossing takes ~30s
const EDGE = 18               // spawn/despawn |x| (just past the view cone)

function makeWingGeometry(side) {
  // one triangle per wing: root at the body, tip out on ±z
  const g = new THREE.BufferGeometry()
  const s = side // +1 left, -1 right
  g.setAttribute('position', new THREE.Float32BufferAttribute([
    0, 0, 0,
    -0.06, 0, s * 0.21,
    0.06, 0, s * 0.15,
  ], 3))
  g.computeVertexNormals()
  return g
}

class Flock {
  constructor(scene, material, rand) {
    this.group = new THREE.Group()
    this.dir = rand() > 0.35 ? 1 : -1 // mostly left-to-right
    this.y = 2.8 + rand() * 1.8
    this.z = -7 + rand() * 6
    this.x = -EDGE * this.dir
    this.speed = SPEED * (0.85 + rand() * 0.4)
    this.birds = []

    const n = 5 + Math.floor(rand() * 4)
    const geoL = makeWingGeometry(1)
    const geoR = makeWingGeometry(-1)
    for (let i = 0; i < n; i++) {
      const bird = new THREE.Group()
      const l = new THREE.Mesh(geoL, material)
      const r = new THREE.Mesh(geoR, material)
      bird.add(l, r)
      // loose V: alternate sides, drift back with rank
      const rank = Math.ceil(i / 2)
      const side = i === 0 ? 0 : (i % 2 ? 1 : -1)
      bird.userData = {
        ox: -rank * 0.55 * this.dir + (rand() - 0.5) * 0.18,
        oy: (rand() - 0.5) * 0.3,
        oz: side * rank * 0.42 + (rand() - 0.5) * 0.15,
        flapPhase: rand() * Math.PI * 2,
        flapFreq: 7 + rand() * 3,
        wings: [l, r],
      }
      this.birds.push(bird)
      this.group.add(bird)
    }
    scene.add(this.group)
  }

  // returns false when the flock has flown off the far edge
  update(dt, tSec) {
    this.x += this.dir * this.speed * dt
    for (const b of this.birds) {
      const u = b.userData
      b.position.set(
        this.x + u.ox,
        this.y + u.oy + Math.sin(tSec * 1.3 + u.flapPhase) * 0.12,
        this.z + u.oz,
      )
      const flap = Math.sin(tSec * u.flapFreq + u.flapPhase) * 0.7
      u.wings[0].rotation.x = flap
      u.wings[1].rotation.x = -flap
    }
    return this.dir > 0 ? this.x < EDGE : this.x > -EDGE
  }

  dispose(scene) {
    scene.remove(this.group)
  }
}

export default class Birds {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.isDark = this.experience.isDark
    this.rand = Math.random

    this.material = new THREE.MeshBasicMaterial({
      color: this.isDark ? '#b9d8c6' : '#5c675e',
      side: THREE.DoubleSide,
    })
    this.flocks = []
    this.nextAt = this.time.elapsed + FIRST_FLOCK
  }

  setMode(isDark) {
    this.isDark = isDark
    this.material.color.set(isDark ? '#b9d8c6' : '#5c675e')
  }

  update() {
    const now = this.time.elapsed
    if (now >= this.nextAt) {
      this.flocks.push(new Flock(this.scene, this.material, this.rand))
      this.nextAt = now + INTERVAL[0] + this.rand() * (INTERVAL[1] - INTERVAL[0])
    }
    const dt = Math.min(this.time.delta, 100) / 1000
    const tSec = now / 1000
    this.flocks = this.flocks.filter((f) => {
      const alive = f.update(dt, tSec)
      if (!alive) f.dispose(this.scene)
      return alive
    })
  }

  destroy() {
    for (const f of this.flocks) f.dispose(this.scene)
    this.flocks = []
    this.material.dispose()
  }
}
