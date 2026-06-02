import { DAYS, CHECKLIST_ITEMS, MAX_DAILY_POINTS } from '../data/program.js'
import { ENCOURAGEMENTS } from '../data/lists.js'
import { useStore } from '../utils/store.jsx'
import { useToast } from '../components/Toast.jsx'
import NeonBar from '../components/NeonBar.jsx'
import { Card } from '../components/ui.jsx'
import { playChime, tinyHaptic } from '../utils/feedback.js'

export default function Reset() {
  const {
    currentDay,
    setCurrentDay,
    progress,
    toggleChecklistItem,
    dayPoints,
    isDayComplete,
  } = useStore()
  const { showToast } = useToast()

  const day = DAYS.find((d) => d.day === currentDay) || DAYS[0]
  const dayState = progress[currentDay] || {}
  const points = dayPoints(currentDay)
  const pct = (points / MAX_DAILY_POINTS) * 100
  const complete = isDayComplete(currentDay)

  function handleToggle(item) {
    const wasChecked = dayState[item.id]
    toggleChecklistItem(currentDay, item.id)
    if (!wasChecked) {
      tinyHaptic()
      playChime()
      const msg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
      showToast(`+${item.points} · ${msg}`)
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          PAUZE Reset — 7 Dias™
        </p>
        <h2 className="mt-1 text-2xl font-bold">Seu caminho de leveza</h2>
      </header>

      {/* Trilho de dias */}
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {DAYS.map((d) => {
          const active = d.day === currentDay
          const done = isDayComplete(d.day)
          return (
            <button
              key={d.day}
              onClick={() => setCurrentDay(d.day)}
              className={`flex min-w-[58px] flex-col items-center gap-1 rounded-2xl border px-3 py-2 transition-all ${
                active
                  ? 'border-neon-green bg-neon-green/10 shadow-neon-green'
                  : 'border-white/10 bg-ink-800/60'
              }`}
            >
              <span className="text-[10px] font-medium uppercase text-haze">Dia</span>
              <span
                className={`text-lg font-extrabold ${active ? 'text-neon-green' : 'text-white'}`}
              >
                {d.day}
              </span>
              <span className={`text-xs ${done ? 'opacity-100' : 'opacity-20'}`}>
                {done ? '✅' : '○'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Card do dia */}
      <Card key={currentDay} className="mt-5 animate-fade-up">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-neon-green/80">
              Dia {day.day}
            </span>
            <h3 className="text-xl font-bold">{day.title}</h3>
            <p className="text-sm text-haze">{day.subtitle}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-haze">{day.desc}</p>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-haze">
            <span>Pontos do dia</span>
            <span className="text-white">
              {points}
              <span className="text-haze">/{MAX_DAILY_POINTS}</span>
            </span>
          </div>
          <NeonBar value={pct} />
        </div>
      </Card>

      {/* Checklist */}
      <div className="mt-5 space-y-2.5">
        {CHECKLIST_ITEMS.map((item) => {
          const checked = !!dayState[item.id]
          return (
            <button
              key={item.id}
              onClick={() => handleToggle(item)}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 active:scale-[0.99] ${
                checked
                  ? 'border-neon-green/60 bg-neon-green/10'
                  : 'border-white/10 bg-ink-800/60'
              }`}
            >
              <span
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-lg border-2 text-sm font-bold transition-all ${
                  checked
                    ? 'border-neon-green bg-neon-green text-ink-900 shadow-neon-green'
                    : 'border-white/20 text-transparent'
                }`}
              >
                ✓
              </span>
              <span className="text-lg">{item.icon}</span>
              <span
                className={`flex-1 text-sm font-medium ${
                  checked ? 'text-white' : 'text-haze'
                }`}
              >
                {item.label}
              </span>
              <span
                className={`text-xs font-bold ${
                  checked ? 'text-neon-green' : 'text-haze/60'
                }`}
              >
                +{item.points}
              </span>
            </button>
          )
        })}
      </div>

      {complete && (
        <Card className="mt-5 animate-pop border-neon-green/40 bg-neon-green/5">
          <p className="text-center text-base font-semibold text-neon-green">
            🌿 Pequenos passos contam. Seu corpo agradece.
          </p>
          {currentDay < 7 && (
            <button
              onClick={() => setCurrentDay(currentDay + 1)}
              className="mx-auto mt-3 block rounded-full bg-neon-green/10 px-5 py-2 text-sm font-semibold text-neon-green ring-1 ring-neon-green/40"
            >
              Ir para o Dia {currentDay + 1} →
            </button>
          )}
        </Card>
      )}
    </div>
  )
}
