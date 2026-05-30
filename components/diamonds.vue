<script>
export default {
  mounted() {
    const canvas = document.querySelector("canvas.diamonds");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const RINGS = 120;
    const PER_RING = 80;
    const rings = [];

    function rand(a, b) { return a + Math.random() * (b - a); }

    for (let i = 0; i < RINGS; i++) {
      const isGem = i % 3 === 0;
      rings.push({
        cx: rand(-0.3, 1.3),   // normalized screen coords
        cy: rand(-0.3, 1.3),
        rx: rand(0.04, 0.28),  // ellipse radii (normalized)
        ry: rand(0.01, 0.10),
        speed: rand(0.0003, 0.0015) * (Math.random() > 0.5 ? 1 : -1),
        phase: rand(0, Math.PI * 2),
        particles: Array.from({ length: PER_RING }, (_, j) => ({
          angle: (j / PER_RING) * Math.PI * 2,
          size: rand(1.0, 2.8),
          hue: isGem ? rand(210, 240) : (Math.random() > 0.7 ? rand(195, 230) : rand(40, 60)),
          sat: isGem ? rand(70, 95) : rand(0, 25),
          bri: rand(75, 100),
          flickerSpeed: rand(0.02, 0.09),
          flickerPhase: rand(0, Math.PI * 2),
        })),
      });
    }

    let frame = 0;
    let raf;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;

      // Trail effect
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, W, H);

      for (const r of rings) {
        r.phase += r.speed;
        for (const p of r.particles) {
          const flicker = 0.5 + 0.5 * Math.sin(frame * p.flickerSpeed + p.flickerPhase);
          const alpha = (flicker * flicker * 0.9 + 0.08);
          const size = p.size * (0.5 + 0.5 * flicker);

          const px = (r.cx + Math.cos(p.angle + r.phase) * r.rx) * W;
          const py = (r.cy + Math.sin(p.angle + r.phase) * r.ry) * H;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, ${p.sat}%, ${p.bri}%, ${alpha})`;
          ctx.fill();
        }
      }

      frame++;
      raf = requestAnimationFrame(tick);
    };

    tick();
    this._raf = raf;
    this._cleanup = () => cancelAnimationFrame(raf);
  },
  beforeUnmount() {
    if (this._cleanup) this._cleanup();
  },
};
</script>

<template>
  <canvas class="diamonds" />
</template>

<style>
canvas.diamonds {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  z-index: -1;
}
</style>
