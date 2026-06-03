import { useEffect, useState } from 'react'
import { useStore } from '../utils/store.jsx'
import { getBand } from '../utils/score.js'
import NeonBar from '../components/NeonBar.jsx'
import Footer from '../components/Footer.jsx'
import { Button, Card } from '../components/ui.jsx'

const FOCUS = [
  'retenção corporal',
  'intestino',
  'sono',
  'energia',
  'equilíbrio hormonal',
]

export default function Result({ onStartReset, onSeePremium }) {
  const { scores } = useStore()
  const value = scores?.scoreBemEstar ?? 0
  const band = getBand(value)

  // Animação de contagem do número.
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const dur = 900
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * value))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-10">
      <main className="flex flex-1 flex-col">
        <h2 className="text-center text-2xl font-extrabold leading-tight animate-fade-up">
          TALVEZ VOCÊ NÃO TENHA FALHADO 💚
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-haze animate-fade-up">
          Seu corpo pode apenas estar operando sob regras diferentes agora.
        </p>

        <div className="mt-7 flex flex-col items-center animate-pop">
          <div
            className="relative flex h-40 w-40 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${band.hex} ${value * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
            }}
          >
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-ink-900">
              <span
                className="text-5xl font-extrabold"
                style={{ color: band.hex, textShadow: `0 0 20px ${band.hex}66` }}
              >
                {display}
              </span>
              <span className="text-xs font-medium text-haze">de bem-estar</span>
            </div>
          </div>
          <p className="mt-4 text-center text-lg font-bold" style={{ color: band.hex }}>
            {band.label}
          </p>
        </div>

        <div className="mt-6 animate-fade-up">
          <NeonBar value={value} height={16} />
          <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wide text-haze/70">
            <span>Fora do eixo</span>
            <span>Equilíbrio</span>
          </div>
        </div>

        <Card className="mt-7 animate-fade-up">
          <p className="text-sm font-semibold text-white">
            Seu resultado sugere atenção maior para:
          </p>
          <ul className="mt-3 space-y-2">
            {FOCUS.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-haze">
                <span className="text-neon-green">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-2xl border border-neon-green/20 bg-neon-green/5 px-4 py-3 text-sm leading-relaxed text-neon-green/90">
            A boa notícia? Pequenos ajustes consistentes podem começar a fazer
            diferença.
          </p>
        </Card>

        <div className="mt-8 space-y-3 animate-fade-up">
          <Button onClick={onStartReset} className="w-full">
            Começar meu PAUZE Reset — 7 Dias™
          </Button>
          <button
            onClick={onSeePremium}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-haze"
          >
            Conhecer o PAUZEfem™ Completo ✨
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
