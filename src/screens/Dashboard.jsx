import { useState, useEffect } from 'react'
import { useStore } from '../utils/store.jsx'
import { getBand } from '../utils/score.js'
import { CHECKIN_OPTIONS } from '../data/lists.js'
import { MAX_DAILY_POINTS, DAYS } from '../data/program.js'
import { todayKey } from '../utils/storage.js'
import Logo from '../components/Logo.jsx'
import NeonBar from '../components/NeonBar.jsx'
import { Card, Stat, Button } from '../components/ui.jsx'
import { tinyHaptic } from '../utils/feedback.js'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function Dashboard({ onOpenReset, onRetakeQuiz }) {
  const {
    scores,
    todayPoints,
    streak,
    currentDay,
    checkin,
    submitCheckin,
  } = useStore()

  const band = getBand(scores?.scoreBemEstar ?? 0)
  const day = DAYS.find((d) => d.day === currentDay) || DAYS[0]

  const alreadyToday = checkin?.date === todayKey()
  const [selected, setSelected] = useState(alreadyToday ? checkin.selected : [])
  const [submitted, setSubmitted] = useState(alreadyToday)

  useEffect(() => {
    if (alreadyToday) {
      setSelected(checkin.selected)
      setSubmitted(true)
    }
  }, [alreadyToday, checkin])

  function toggle(id) {
    tinyHaptic()
    setSubmitted(false)
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function confirm() {
    submitCheckin(selected)
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-haze">{greeting()},</p>
          <Logo size="sm" />
        </div>
        <button
          onClick={onRetakeQuiz}
          className="rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-haze ring-1 ring-white/10"
        >
          Refazer quiz
        </button>
      </header>

      {/* Score principal */}
      <Card className="mt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-haze">
              PAUZE Score™
            </p>
            <p className="mt-1 text-3xl font-extrabold" style={{ color: band.hex }}>
              {scores?.scoreBemEstar ?? 0}
              <span className="text-base text-haze">/100</span>
            </p>
            <p className="text-sm font-medium" style={{ color: band.hex }}>
              {band.label}
            </p>
          </div>
          <div className="text-4xl">🌗</div>
        </div>
        <div className="mt-4">
          <NeonBar value={scores?.scoreBemEstar ?? 0} />
        </div>
      </Card>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <Stat label="Pontos hoje" value={todayPoints} suffix={`/${MAX_DAILY_POINTS}`} />
        <Stat label="Sequência" value={streak} suffix={streak === 1 ? ' dia' : ' dias'} accent="#FFC857" />
        <Stat label="Dia do Reset" value={currentDay} suffix="/7" accent="#FF9F45" />
      </div>

      {/* Atalho para o dia atual */}
      <Card className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neon-green/80">
              Dia {day.day} · Reset
            </p>
            <p className="text-lg font-bold">{day.title}</p>
            <p className="text-sm text-haze">{day.subtitle}</p>
          </div>
          <Button variant="outline" onClick={onOpenReset} className="px-5 py-3 text-sm">
            Abrir
          </Button>
        </div>
      </Card>

      {/* Check-in rápido */}
      <Card className="mt-4">
        <p className="text-base font-bold">Como você está hoje?</p>
        <p className="text-xs text-haze">Toque no que sentir agora.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {CHECKIN_OPTIONS.map((opt) => {
            const active = selected.includes(opt.id)
            return (
              <button
                key={opt.id}
                onClick={() => toggle(opt.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all active:scale-95 ${
                  active
                    ? 'border-neon-amber/70 bg-neon-amber/10 text-neon-amber'
                    : 'border-white/10 bg-ink-700/50 text-haze'
                }`}
              >
                <span>{opt.icon}</span>
                {opt.label}
              </button>
            )
          })}
        </div>

        {!submitted && selected.length > 0 && (
          <Button onClick={confirm} className="mt-4 w-full animate-fade-up py-3 text-sm">
            Confirmar check-in
          </Button>
        )}

        {submitted && selected.length > 0 && (
          <div className="mt-4 animate-pop rounded-2xl border border-neon-green/30 bg-neon-green/5 px-4 py-3">
            <p className="text-sm font-semibold text-neon-green">
              Seu foco hoje: leveza, intestino, sono e menos retenção.
            </p>
          </div>
        )}
        {submitted && selected.length === 0 && (
          <p className="mt-4 text-sm text-haze">
            Que bom — nada pesando hoje. Siga no seu ritmo. ✨
          </p>
        )}
      </Card>
    </div>
  )
}
