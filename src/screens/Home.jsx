import Logo from '../components/Logo.jsx'
import Footer from '../components/Footer.jsx'
import { Button } from '../components/ui.jsx'
import { useStore } from '../utils/store.jsx'

export default function Home({ onStart, onContinue }) {
  const { scores } = useStore()

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-8 pt-8">
      <header className="flex items-center justify-between animate-fade-up">
        <Logo size="md" />
        {scores && (
          <button
            onClick={onContinue}
            className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-haze ring-1 ring-white/10"
          >
            Meu painel →
          </button>
        )}
      </header>

      <main className="flex flex-1 flex-col justify-center py-10">
        <div className="animate-fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-3 py-1 text-xs font-semibold text-neon-green">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-neon-green" />
            Bem-estar para mulheres 40+
          </span>
        </div>

        <h1
          className="mt-6 text-[2rem] font-extrabold leading-[1.15] tracking-tight animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          Você sente que seu corpo{' '}
          <span className="text-neon-green drop-shadow-[0_0_12px_rgba(57,255,139,0.5)]">
            mudou
          </span>
          … e não te avisou?
        </h1>

        <p
          className="mt-5 text-base leading-relaxed text-haze animate-fade-up"
          style={{ animationDelay: '0.18s' }}
        >
          Barriga mais estufada. Cansaço do nada. Sono estranho. Inchaço. A sensação
          de que algo saiu do eixo.
        </p>
        <p
          className="mt-3 text-base font-semibold leading-relaxed text-white animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          Seu corpo dá sinais antes de pedir socorro.
        </p>
        <p
          className="mt-3 text-sm leading-relaxed text-haze animate-fade-up"
          style={{ animationDelay: '0.22s' }}
        >
          Descubra em 2 minutos o que ele pode estar tentando te dizer.
        </p>

        <div
          className="mt-9 space-y-3 animate-fade-up"
          style={{ animationDelay: '0.28s' }}
        >
          <Button onClick={onStart} className="w-full">
            Fazer meu diagnóstico gratuito
          </Button>
          <p className="text-center text-xs text-haze/70">
            Leva 2 minutos · Sem cadastro · 100% no seu aparelho
          </p>
        </div>

        <div
          className="mt-10 grid grid-cols-3 gap-3 animate-fade-up"
          style={{ animationDelay: '0.34s' }}
        >
          {[
            { icon: '🧭', label: 'Diagnóstico\nPAUZE™' },
            { icon: '🌱', label: 'Reset de\n7 dias' },
            { icon: '✨', label: 'Acompanhamento\ndiário' },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-white/8 bg-ink-800/60 px-3 py-4 text-center"
            >
              <div className="text-2xl">{f.icon}</div>
              <div className="mt-2 whitespace-pre-line text-[11px] font-medium leading-tight text-haze">
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="text-center">
        <p className="text-sm font-medium text-haze/80">
          <span className="text-white">PAUZEfem™</span> — Seu corpo de volta ao eixo.
        </p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-neon-green/70">
          Mais saúde. Menos dependência.
        </p>
      </div>

      <Footer />
    </div>
  )
}
