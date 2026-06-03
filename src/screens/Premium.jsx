import Footer from '../components/Footer.jsx'
import { Button, Card } from '../components/ui.jsx'
import { openCheckout } from '../config.js'
import { useToast } from '../components/Toast.jsx'
import { tinyHaptic } from '../utils/feedback.js'

const BENEFITS = [
  'PAUZE Reset — 7 Dias',
  'Dashboard do corpo',
  'Check-ins diários',
  'Sono, energia e bem-estar',
  'Biblioteca educativa de alimentos e chás',
  'Rotinas simples e possíveis',
  'Acompanhamento do seu progresso',
]

export default function Premium({ onBack }) {
  const { showToast } = useToast()

  function handleBuy() {
    tinyHaptic()
    // Abre o checkout Kiwify; se a env var não existir, mostra fallback amigável.
    openCheckout((msg) => showToast(msg))
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-6">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-3 rounded-full bg-white/5 px-3 py-2 text-sm text-haze ring-1 ring-white/10"
          aria-label="Voltar"
        >
          ←
        </button>
      )}

      <header className="animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          PAUZEfem™ Premium
        </p>
        <h2 className="mt-2 text-[1.9rem] font-extrabold leading-tight">
          Comece hoje por{' '}
          <span className="text-neon-green drop-shadow-[0_0_12px_rgba(57,255,139,0.5)]">
            R$ 19,90
          </span>{' '}
          💚
        </h2>
        <p className="mt-3 text-base font-semibold text-white">
          Pequenos passos também contam.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-haze">
          Você não precisa fazer tudo perfeito. Mas talvez entender melhor o que seu
          corpo está tentando dizer já seja um bom começo.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-haze">
          O PAUZEfem™ foi criado para ajudar mulheres 40+ a compreender melhor os
          sinais do próprio corpo através de hábitos simples, alimentação acessível e
          pequenas mudanças consistentes.
        </p>
      </header>

      <Card className="mt-6 animate-fade-up">
        <p className="text-sm font-bold text-white">O que está incluído</p>
        <ul className="mt-3 space-y-2.5">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-haze">
              <span className="mt-0.5 text-neon-green">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Microcopy de valor */}
      <p className="mt-5 rounded-2xl border border-neon-green/20 bg-neon-green/5 px-4 py-3 text-sm leading-relaxed text-neon-green/90 animate-fade-up">
        Mais barato do que muitos suplementos comprados por impulso — e talvez muito
        mais útil para entender o que seu corpo está tentando dizer.
      </p>

      {/* Preço */}
      <div className="mt-6 flex items-center justify-center gap-3 animate-fade-up">
        <div className="text-center">
          <p className="text-4xl font-extrabold text-white">
            R$ 19<span className="text-2xl text-haze">,90</span>
          </p>
          <p className="text-xs text-haze">acesso ao PAUZEfem™ Premium</p>
        </div>
      </div>

      <div className="mt-6 animate-fade-up">
        <Button onClick={handleBuy} className="w-full">
          Quero começar agora
        </Button>
        <p className="mt-2 text-center text-xs text-haze/70">
          Pagamento seguro · Acesso imediato após a confirmação
        </p>
      </div>

      <Footer />
    </div>
  )
}
