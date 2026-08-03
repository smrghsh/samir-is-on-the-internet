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

// landscape features (strengths animate 0->1 as their World scripts load in)
uniform float uTime;
uniform vec3  uWaterCol, uMeadowCol;
uniform float uWaterLevel;
uniform float uWaterStrength, uMeadowStrength;

vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0),
                          dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

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

  // ── landscape features ────────────────────────────────────────────
  // meadows: patchy warm greens on gentle mid-low slopes
  float mNoise = snoise(vWorldPos.xz * 0.32 + 7.3);
  float meadowBand = smoothstep(-0.30, -0.05, vHeight) * (1.0 - smoothstep(0.20, 0.42, vHeight));
  float meadow = smoothstep(0.12, 0.55, mNoise) * meadowBand * uMeadowStrength;
  base = mix(base, uMeadowCol * mix(uShadeLow, uShadeHigh, lambert), meadow * 0.55);

  // rivers/lakes: valley floors flood below the water level, with a soft
  // shoreline. The surface behaves like water: animated ripple normals, a
  // fresnel-weighted sky reflection, and a sun glint.
  float water = (1.0 - smoothstep(uWaterLevel - 0.05, uWaterLevel + 0.03, vHeight)) * uWaterStrength;
  if (water > 0.001) {
    vec3 V = normalize(cameraPosition - vWorldPos);
    // two scales of drifting ripples perturb an up-facing normal
    float r1 = snoise(vWorldPos.xz * 2.0 + vec2(uTime * 0.16, uTime * 0.10));
    float r2 = snoise(vWorldPos.xz * 4.3 - vec2(uTime * 0.11, uTime * 0.19));
    vec3 wN = normalize(vec3(r1 * 0.10 + r2 * 0.05, 1.0, r1 * 0.07 - r2 * 0.05));

    // depth shading: deeper water reads darker
    float depth = clamp((uWaterLevel - vHeight) / 0.14, 0.0, 1.0);
    vec3 waterCol = mix(uWaterCol * 1.08, uWaterCol * 0.72, depth);

    // sky reflection strengthens at grazing angles (schlick-ish fresnel)
    float fresnel = pow(1.0 - max(dot(wN, V), 0.0), 3.0);
    waterCol = mix(waterCol, uBg + (1.0 - uBg) * 0.25, fresnel * 0.5);

    // sun glint off the ripples
    float spec = pow(max(dot(reflect(-normalize(uLightDir), wN), V), 0.0), 90.0);
    waterCol += spec * 0.45;

    base = mix(base, waterCol, water * 0.92);
  }

  float hd = fwidth(vHeight) + 1e-5;

  float cMinor = abs(fract(vHeight / uContourEvery) - 0.5);
  float minorLine = 1.0 - smoothstep(0.0, uLineWidth * hd / uContourEvery, cMinor);

  float idxStep = uContourEvery * uIndexEvery;
  float cMajor = abs(fract(vHeight / idxStep) - 0.5);
  float majorLine = 1.0 - smoothstep(0.0, uLineWidth * 1.4 * hd / idxStep, cMajor);

  // contours quiet down over water (reads as lakes on a topo map)
  float lineDamp = 1.0 - water * 0.8;
  vec3 col = base;
  col = mix(col, uLine,      minorLine * 0.55 * uLineStrength * lineDamp);
  col = mix(col, uIndexLine, majorLine * 0.85 * uLineStrength * lineDamp);

  float d = length(vWorldPos - cameraPosition);
  float fogFactor = smoothstep(uFogNear, uFogFar, d);
  col = mix(col, uBg, fogFactor);

  gl_FragColor = vec4(col, 1.0);
}
