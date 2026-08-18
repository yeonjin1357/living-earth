import type { Quake } from './usgs'

export interface QuakeStats {
  count: number
  strongest: Quake | null
}

export function quakeStats(quakes: Quake[]): QuakeStats {
  let strongest: Quake | null = null
  for (const q of quakes) {
    if (!strongest || q.mag > strongest.mag) strongest = q
  }
  return { count: quakes.length, strongest }
}
