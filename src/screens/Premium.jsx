import Footer from '../components/Footer.jsx'
import { Button, Card } from '../components/ui.jsx'
import { openCheckout } from '../config.js'
import { useToast } from '../components/Toast.jsx'
import { tinyHaptic } from '../utils/feedback.js'

const BENEFITS = [
  'PAUZE Reset — 7 Dias™',
  'Dashboard inteligente do corpo',
  'Check-in emocional diário',
  'Score de evolução',
  'Termômetro corporal',
  'Sono, TPM, retenção, intestino e energia',
  'Pequenas rotinas simples',
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
        <h2 className="mt-2 text-[1.7rem] font-extrabold leading-tight">
          Seu corpo não precisa de punição. Precisa de suporte 💚
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-haze">
          Muitas mulheres só procuram ajuda quando o corpo já está exausto. O
          PAUZEfem™ foi criado para ajudar você a se reconectar com seu corpo antes
          disso — através de hábitos possíveis, alimentação acessível e pequenas
          mudanças consistentes.
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

      <div className="mt-6 grid grid-cols-2 gap-3 animate-fade-up">
        <div className="rounded-3xl border border-white/10 bg-ink-800/70 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-haze">
            Teste
          </p>
          <p className="mt-2 text-2xl font-extrabold text-white">
            R$9<span className="text-base">,90</span>
          </p>
          <p className="text-xs text-haze">7 dias</p>
        </div>
        <div className="relative rounded-3xl border border-neon-green/50 bg-neon-green/5 p-4 text-center shadow-neon-green">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-neon-green px-2 py-0.5 text-[10px] font-bold text-ink-900">
            POPULAR
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-neon-green">
            Plano
          </p>
          <p className="mt-2 text-2xl font-extrabold text-white">
            R$29<span className="text-base text-haze">/mês</span>
          </p>
          <p className="text-xs text-haze">acesso completo</p>
        </div>
      </div>

      <div className="mt-6 animate-fade-up">
        <Button onClick={handleBuy} className="w-full">
          Quero começar agora
        </Button>
        <p className="mt-2 text-center text-xs text-haze/70">
          Pagamento seguro · Cancele quando quiser
        </p>
      </div>

      <Footer />
    </div>
  )
}
