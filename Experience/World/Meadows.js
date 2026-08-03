import FeatureFade from './FeatureFade.js'

// Meadows: patchy warm greens spread across the gentle mid-slopes.
export default class Meadows extends FeatureFade {
  constructor() {
    super('uMeadowStrength', { delay: 2800, duration: 3200 })
  }
}
