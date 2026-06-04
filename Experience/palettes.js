// Palette presets + per-mode terrain defaults.
// Each palette: bg + 5 elevation colors (c0 low -> c4 high) + line colors.
export const PALETTES = {
  // Dark — black sky, teal valleys, green ridgelines.
  darkClassic: {
    bg: '#000000',
    c0: '#0a1018', c1: '#102634', c2: '#1b4d5b', c3: '#3a8a78', c4: '#7fd49a',
    line: '#5fd49a', indexLine: '#9be8b8',
  },
  // Light — warm paper, sage valleys, deep-green ridges.
  lightClassic: {
    bg: '#f5f3ee',
    c0: '#ece5d3', c1: '#d6cdb2', c2: '#bdc89b', c3: '#7eaa78', c4: '#2ea36a',
    line: '#2e7a4d', indexLine: '#1a4a30',
  },
  // Deep bathymetric — the bottom-of-scroll palette in dark mode.
  darkAbyss: {
    bg: '#03070d',
    c0: '#04121f', c1: '#0a2b44', c2: '#114e6b', c3: '#1f86a6', c4: '#56d0d6',
    line: '#43b8c4', indexLine: '#8af0ee',
  },
  // Bottom-of-scroll palette in light mode.
  lightBathy: {
    bg: '#eef3f3',
    c0: '#d6e6e6', c1: '#b3d4d4', c2: '#88bcc2', c3: '#4f97a6', c4: '#2e6f86',
    line: '#2e6f86', indexLine: '#163f52',
  },
}

// Night is the dramatic high-relief green-on-black; day is calmer/lower.
export const NIGHT_DEFAULTS = { amp: 1.55, contourEvery: 0.18, lineStrength: 1.0 }
export const DAY_DEFAULTS = { amp: 1.18, contourEvery: 0.14, lineStrength: 0.8 }
