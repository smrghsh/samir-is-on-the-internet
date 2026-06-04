varying vec3 vWorldPos;
varying float vHeight;

uniform float uContourEvery;
uniform float uIndexEvery;
uniform float uLineWidth;
uniform vec3  uLightDir;
uniform vec3  uBg, uC0, uC1, uC2, uC3, uC4, uLine, uIndexLine;
uniform float uFogNear, uFogFar;
uniform float uShadeLow, uShadeHigh;
uniform float uLineStrength;

vec3 ramp(float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.25) return mix(uC0, uC1,  t        / 0.25);
  if (t < 0.50) return mix(uC1, uC2, (t - 0.25) / 0.25);
  if (t < 0.75) return mix(uC2, uC3, (t - 0.50) / 0.25);
  return            mix(uC3, uC4, (t - 0.75) / 0.25);
}

void main() {
  vec3 dpx = dFdx(vWorldPos);
  vec3 dpy = dFdy(vWorldPos);
  vec3 n = normalize(cross(dpy, dpx));

  float t = clamp(vHeight * 0.32 + 0.5, 0.0, 1.0);
  vec3 base = ramp(t);

  float lambert = clamp(dot(n, normalize(uLightDir)), 0.0, 1.0);
  base *= mix(uShadeLow, uShadeHigh, lambert);

  float hd = fwidth(vHeight) + 1e-5;

  float cMinor = abs(fract(vHeight / uContourEvery) - 0.5);
  float minorLine = 1.0 - smoothstep(0.0, uLineWidth * hd / uContourEvery, cMinor);

  float idxStep = uContourEvery * uIndexEvery;
  float cMajor = abs(fract(vHeight / idxStep) - 0.5);
  float majorLine = 1.0 - smoothstep(0.0, uLineWidth * 1.4 * hd / idxStep, cMajor);

  vec3 col = base;
  col = mix(col, uLine,      minorLine * 0.55 * uLineStrength);
  col = mix(col, uIndexLine, majorLine * 0.85 * uLineStrength);

  float d = length(vWorldPos - cameraPosition);
  float fogFactor = smoothstep(uFogNear, uFogFar, d);
  col = mix(col, uBg, fogFactor);

  gl_FragColor = vec4(col, 1.0);
}
