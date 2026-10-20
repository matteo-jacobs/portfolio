// Small deterministic random generator: same seed -> same numbers.
// Used with React's useId so a component looks "random" but the same on
// every render (TitleFrame).
export function randomFrom(seed) {
  let h = 2166136261
  for (const char of seed) h = Math.imul(h ^ char.charCodeAt(0), 16777619)
  h ||= 1 // the generator below gets stuck on 0
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return (h >>> 0) / 4294967296
  }
}

// Value between min and max: t = 0 gives min, t = 1 gives max
export const lerp = ([min, max], t) => min + (max - min) * t
