import { magColor } from '../lib/color'
import { timeAgo } from '../lib/format'
import type { Quake } from '../lib/usgs'

export interface HoverInfo {
  quake: Quake
  x: number
  y: number
}

export function QuakeTooltip({ hover }: { hover: HoverInfo | null }) {
  if (!hover) return null
  const { quake, x, y } = hover
  return (
    <div
      className="tooltip"
      style={{
        left: x + 14,
        top: y + 14,
        borderLeftColor: magColor(quake.mag),
      }}
    >
      <div className="tooltip-mag" style={{ color: magColor(quake.mag) }}>
        M{quake.mag.toFixed(1)}
      </div>
      <div className="tooltip-place">{quake.place || '위치 정보 없음'}</div>
      <div className="tooltip-meta">
        깊이 {quake.depth.toFixed(0)}km · {timeAgo(Date.now(), quake.time)}
      </div>
    </div>
  )
}
