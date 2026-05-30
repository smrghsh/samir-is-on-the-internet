<template>
  <div />
</template>

<script>
export default {
  mounted() {
    this.loadP5(() => this.initSketch());
  },
  beforeUnmount() {
    if (this._p5) this._p5.remove();
    if (this._el && this._el.parentNode) this._el.parentNode.removeChild(this._el);
  },
  methods: {
    loadP5(cb) {
      if (window.p5) return cb();
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
      s.onload = cb;
      document.head.appendChild(s);
    },
    initSketch() {
      const PARTICLES_PER_RING = 120;
      let rings = [];
      const self = this;

      const sketch = (p) => {
        function makeGemParticles() {
          return Array.from({ length: PARTICLES_PER_RING }, (_, j) => ({
            angle: (j / PARTICLES_PER_RING) * p.TWO_PI,
            size: p.random(1.4, 3.2),
            hue: p.random(210, 240),
            sat: p.random(70, 95),
            bri: p.random(75, 100),
            flickerSpeed: p.random(0.02, 0.09),
            flickerPhase: p.random(p.TWO_PI),
          }));
        }

        function makeRings() {
          rings = [];
          const count = Math.floor(p.map(p.windowWidth, 320, 2560, 40, 160, true));
          for (let i = 0; i < count; i++) {
            let r = {
              radius: p.random(40, 380),
              tiltX: p.random(p.TWO_PI), tiltY: p.random(p.TWO_PI), tiltZ: p.random(p.TWO_PI),
              cx: p.random(-500, 500), cy: p.random(-500, 500), cz: p.random(-600, 200),
              speed: p.random(0.001, 0.004) * (p.random() > 0.5 ? 1 : -1),
              phase: p.random(p.TWO_PI),
              particles: Array.from({ length: PARTICLES_PER_RING }, () => ({
                angle: p.random(p.TWO_PI),
                size: p.random(1.2, 3.8),
                hue: p.random() > 0.7 ? p.random(195, 230) : p.random(40, 60),
                sat: p.random(0, 30), bri: p.random(80, 100),
                flickerSpeed: p.random(0.02, 0.09),
                flickerPhase: p.random(p.TWO_PI),
              })),
            };
            rings.push(r);
            if (i % 3 === 0) {
              rings.push({ ...r,
                cx: r.cx + p.random(-18, 18), cy: r.cy + p.random(-18, 18),
                radius: r.radius + p.random(-8, 8),
                phase: r.phase + p.random(0.05, 0.2),
                particles: makeGemParticles(),
              });
            }
          }
        }

        p.setup = () => {
          let cnv = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
          // Mount directly to body, same as twist canvas
          document.body.appendChild(cnv.elt);
          self._el = cnv.elt;
          cnv.elt.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;display:block;outline:none;';
          p.colorMode(p.HSB, 360, 100, 100, 100);
          p.frameRate(60);
          p.noStroke();
          makeRings();
        };

        p.draw = () => {
          p.background(0, 0, 3, 18);
          let t = p.frameCount * 0.001;
          for (let r of rings) {
            p.push();
            p.translate(r.cx, r.cy, r.cz);
            p.rotateX(r.tiltX);
            p.rotateY(r.tiltY + t * r.speed * 60);
            p.rotateZ(r.tiltZ);
            r.phase += r.speed;
            for (let pt of r.particles) {
              let flicker = 0.5 + 0.5 * Math.sin(p.frameCount * pt.flickerSpeed + pt.flickerPhase);
              let alpha = flicker * flicker * 92 + 8;
              let x = Math.cos(pt.angle + r.phase) * r.radius;
              let y = Math.sin(pt.angle + r.phase) * r.radius;
              p.fill(pt.hue, pt.sat, pt.bri * (0.6 + 0.4 * flicker), alpha);
              p.push();
              p.translate(x, y, 0);
              p.sphere(pt.size * (0.5 + 0.5 * flicker), 3, 3);
              p.pop();
            }
            p.pop();
          }
        };

        p.windowResized = () => p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      this._p5 = new window.p5(sketch);
    },
  },
};
</script>
