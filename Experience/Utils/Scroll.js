// Tracks page scroll as a 0..1 progress value that drives the camera ease
// and the palette top->bottom lerp. Read each tick; no events needed.
export default class Scroll {
  constructor() {
    this.progress = 0
    this.onScroll = () => this.compute()
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.compute()
  }

  // recomputed on scroll AND on resize (range depends on viewport height)
  compute() {
    const range = window.innerHeight * 1.6
    this.progress = Math.min(1, Math.max(0, window.scrollY / range))
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
