import FeatureFade from './FeatureFade.js'

// Rivers & lakes: valley floors below the water level flood in first —
// the quiet blue arrives before anything else grows.
export default class Rivers extends FeatureFade {
  constructor() {
    super('uWaterStrength', { delay: 1200, duration: 3000 })
  }
}
