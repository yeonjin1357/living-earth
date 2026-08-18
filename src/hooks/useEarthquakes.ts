import { useEffect, useState } from 'react'
import { fetchQuakes, type Quake } from '../lib/usgs'

/** USGS 실시간 피드를 주기적으로 폴링해 지진 목록을 돌려준다. */
export function useEarthquakes(pollMs = 60_000): Quake[] {
  const [quakes, setQuakes] = useState<Quake[]>([])

  useEffect(() => {
    let cancelled = false
    const load = () => {
      fetchQuakes()
        .then((q) => {
          if (!cancelled) setQuakes(q)
        })
        .catch((e) => console.error('지진 데이터 로드 실패:', e))
    }
    load()
    const id = setInterval(load, pollMs)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [pollMs])

  return quakes
}
