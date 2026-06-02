import { neonColorFor } from '../utils/score.js'

// Barra de progresso neon. value 0-100. A cor segue as faixas PAUZE™,
// a menos que uma cor fixa seja passada via `color`.
export default function NeonBar({ value = 0, color, height = 14, showGlow = true }) {
  const v = Math.max(0, Math.min(100, value))
  const c = color || neonColorFor(v)
  return (
    <div
      className="w-full rounded-full bg-ink-700/80 overflow-hidden ring-1 ring-white/5"
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(v)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${v}%`,
          background: `linear-gradient(90deg, ${c}cc, ${c})`,
          boxShadow: showGlow ? `0 0 16px ${c}88, inset 0 0 8px ${c}55` : 'none',
        }}
      />
    </div>
  )
}
