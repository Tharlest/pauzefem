import { useEffect, useState } from 'react'
import { useStore } from '../utils/store.jsx'
import { getBand } from '../utils/score.js'
import NeonBar from '../components/NeonBar.jsx'
import Footer from '../components/Footer.jsx'
import { Button, Card } from '../components/ui.jsx'

export default function Result({ onStartReset }) {
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
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-neon-green/80 animate-fade-up">
          Seu PAUZE Score™
        </p>

        <div className="mt-6 flex flex-col items-center animate-pop">
          <div
            className="relative flex h-44 w-44 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(${band.hex} ${value * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
            }}
          >
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-ink-900">
              <span
                className="text-5xl font-extrabold"
                style={{ color: band.hex, textShadow: `0 0 20px ${band.hex}66` }}
              >
                {display}
              </span>
              <span className="text-xs font-medium text-haze">de bem-estar</span>
            </div>
          </div>
        </div>

        <h2
          className="mt-7 text-center text-2xl font-bold animate-fade-up"
          style={{ color: band.hex }}
        >
          {band.label}
        </h2>

        <div className="mt-6 animate-fade-up">
          <NeonBar value={value} height={16} />
          <div className="mt-2 flex justify-between text-[10px] font-medium uppercase tracking-wide text-haze/70">
            <span>Fora do eixo</span>
            <span>Equilíbrio</span>
          </div>
        </div>

        <Card className="mt-7 animate-fade-up">
          <p className="text-center text-base font-semibold leading-relaxed text-white">
            “Você não fracassou. Seu corpo só pode estar pedindo um ritmo diferente
            agora.”
          </p>
          <p className="mt-3 text-center text-sm leading-relaxed text-haze">
            {band.message}
          </p>
        </Card>

        <div className="mt-8 animate-fade-up">
          <Button onClick={onStartReset} className="w-full">
            Começar meu PAUZE Reset — 7 Dias™
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
