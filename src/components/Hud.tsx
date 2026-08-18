import { magColor } from '../lib/color'
import { quakeStats } from '../lib/stats'
import type { Quake } from '../lib/usgs'

const LEGEND_GRADIENT = `linear-gradient(90deg, ${[0, 1.75, 3.5, 5.25, 7]
  .map((m) => magColor(m))
  .join(', ')})`

export function Hud({ quakes }: { quakes: Quake[] }) {
  const { count, strongest } = quakeStats(quakes)

  return (
    <div className="hud">
      <header className="hud-title">
        <h1>Living Earth</h1>
        <p>지난 24시간의 지진 · USGS</p>
      </header>

      <div className="hud-live">
        <span className="hud-live-dot" aria-hidden="true" />
        LIVE
        <p>60초마다 갱신</p>
      </div>

      <div className="hud-stats">
        {count === 0 ? (
          <p className="hud-loading">관측 데이터 수신 중…</p>
        ) : (
          <>
            <div className="hud-count">
              {count}
              <span className="hud-count-label">회</span>
            </div>
            {strongest && (
              <p className="hud-strongest">
                최대{' '}
                <strong style={{ color: magColor(strongest.mag) }}>
                  M{strongest.mag.toFixed(1)}
                </strong>{' '}
                {strongest.place}
              </p>
            )}
          </>
        )}
      </div>

      <div className="hud-legend">
        <div
          className="hud-legend-bar"
          style={{ background: LEGEND_GRADIENT }}
        />
        <div className="hud-legend-labels">
          <span>M0</span>
          <span>규모</span>
          <span>M7+</span>
        </div>
      </div>
    </div>
  )
}
