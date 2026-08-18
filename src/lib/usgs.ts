export interface Quake {
  id: string
  mag: number
  place: string
  time: number
  lon: number
  lat: number
  depth: number
}

interface UsgsFeature {
  id: string
  properties: { mag: number | null; place: string | null; time: number }
  geometry: { coordinates: [number, number, number] }
}

interface UsgsFeed {
  features: UsgsFeature[]
}

export const FEED_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'

export function parseQuakeFeed(feed: unknown): Quake[] {
  const { features } = feed as UsgsFeed
  return features
    .filter((f) => f.properties.mag !== null)
    .map((f) => ({
      id: f.id,
      mag: f.properties.mag as number,
      place: f.properties.place ?? '',
      time: f.properties.time,
      lon: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1],
      depth: f.geometry.coordinates[2],
    }))
}

export async function fetchQuakes(): Promise<Quake[]> {
  const res = await fetch(FEED_URL)
  if (!res.ok) throw new Error(`USGS feed request failed: ${res.status}`)
  return parseQuakeFeed(await res.json())
}
