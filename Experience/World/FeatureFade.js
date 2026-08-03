import Experience from '../Experience.js'

// Base for terrain-feature scripts (Rivers, Meadows, SnowCaps): each one
// "loads in" by easing a terrain shader strength uniform 0 -> 1 after a delay,
// so the landscape assembles piece by piece instead of arriving all at once.
export default class FeatureFade {
  constructor(uniformName, { delay = 0, duration = 2500 } = {}) {
    this.experience = new Experience()
    this.time = this.experience.time
    this.uniformName = uniformName
    this.delay = delay
    this.duration = duration
    this.t0 = this.time.elapsed
  }

  get uniform() {
    return this.experience.world.terrain.uniforms[this.uniformName]
  }

  update() {
    const t = this.time.elapsed - this.t0 - this.delay
    if (t <= 0) return
    const x = Math.min(1, t / this.duration)
    this.uniform.value = x * x * (3 - 2 * x) // smoothstep ease
  }

  destroy() {}
}
