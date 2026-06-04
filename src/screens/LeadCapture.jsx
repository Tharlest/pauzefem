import { useState, useEffect } from 'react'
import { Button, Card } from '../components/ui.jsx'
import Footer from '../components/Footer.jsx'
import { saveLead, hasLead } from '../utils/leads.js'
import { trackEvent, EVENTS } from '../utils/analytics.js'

// Captura opcional após o resultado, antes do PAUZEfem™ Completo.
// Sem fricção: dá para continuar sem salvar. Dados ficam só no navegador.
export default function LeadCapture({ onContinue, onSkip }) {
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')

  useEffect(() => {
    // Se já capturou antes, não repete a fricção: segue direto.
    if (hasLead()) {
      onContinue()
      return
    }
    trackEvent(EVENTS.LEAD_VIEW)
  }, [])

  function detectTipo(v) {
    if (v.includes('@')) return 'email'
    if (/\d/.test(v)) return 'whatsapp'
    return 'desconhecido'
  }

  function handleContinue() {
    const valor = contato.trim()
    if (valor) {
      saveLead({ nome: nome.trim() || null, contato: valor, tipo: detectTipo(valor) })
      trackEvent(EVENTS.LEAD_SUBMITTED)
    } else {
      trackEvent(EVENTS.LEAD_SKIPPED)
    }
    onContinue()
  }

  function handleSkip() {
    trackEvent(EVENTS.LEAD_SKIPPED)
    onSkip()
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <Card className="animate-fade-up">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-3 py-1 text-xs font-semibold text-neon-green">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-neon-green" />
          Quase lá 💚
        </span>
        <h1 className="mt-4 text-2xl font-extrabold leading-snug">
          Quer receber seu resumo e acompanhar sua evolução?
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-haze">
          Receba conteúdos, hábitos e lembretes gentis para cuidar melhor do seu corpo.
        </p>

        <div className="mt-6 space-y-3">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome (opcional)"
            className="w-full rounded-2xl border border-white/10 bg-ink-700/60 px-4 py-3 text-white outline-none focus:border-neon-green/50"
          />
          <input
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            placeholder="E-mail ou WhatsApp"
            inputMode="email"
            className="w-full rounded-2xl border border-white/10 bg-ink-700/60 px-4 py-3 text-white outline-none focus:border-neon-green/50"
          />
        </div>

        <Button onClick={handleContinue} className="mt-5 w-full">
          💚 Continuar
        </Button>
        <button
          onClick={handleSkip}
          className="mt-3 w-full text-center text-sm font-medium text-haze/80"
        >
          Continuar sem salvar
        </button>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-haze/60">
          Seus dados ficam no seu aparelho e são usados apenas para te enviar o resumo.
          Você pode não preencher — é opcional.
        </p>
      </Card>
      <Footer />
    </div>
  )
}
