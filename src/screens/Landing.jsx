import { useState, useEffect, useMemo } from 'react'
import Logo from '../components/Logo.jsx'
import { Button } from '../components/ui.jsx'
import { HEADLINES, getActiveVariant } from '../data/headlines.js'
import { trackEvent, EVENTS } from '../utils/analytics.js'

// Headlines A/B/C vêm de ../data/headlines.js (com atribuição/CTR).
const CTA_LABEL = '💚 Fazer meu diagnóstico gratuito'

function GlowOrb({ className = '', color = '#39FF8B' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{ background: color, opacity: 0.18 }}
    />
  )
}

function Section({ children, className = '' }) {
  return <section className={`relative px-5 py-12 ${className}`}>{children}</section>
}

function CTA({ onStart, label = CTA_LABEL, micro }) {
  return (
    <div className="mt-7">
      <Button onClick={onStart} className="w-full">
        {label}
      </Button>
      {micro && <p className="mt-2 text-center text-xs text-haze/70">{micro}</p>}
    </div>
  )
}

// Faixa suave de micro UX (acolhimento).
function SoftNote({ children }) {
  return (
    <p className="mx-auto mt-8 max-w-xs text-center text-sm font-medium text-neon-green/80">
      {children}
    </p>
  )
}

export default function Landing({ onStart, onContinue }) {
  const [showModal, setShowModal] = useState(false)
  const variant = useMemo(() => getActiveVariant(), [])
  const hero = HEADLINES[variant] || HEADLINES.A

  // Impressão da headline (para CTR do teste A/B) + entrada na landing.
  useEffect(() => {
    trackEvent(EVENTS.LANDING_VIEW, { variant })
  }, [variant])

  // CTA: registra clique com a variante e segue para o quiz.
  function start() {
    trackEvent(EVENTS.LANDING_CTA_CLICK, { variant })
    onStart()
  }

  return (
    <div className="relative mx-auto max-w-md overflow-hidden pb-24">
      {/* HERO */}
      <Section className="pt-8">
        <GlowOrb className="-right-16 -top-10 h-56 w-56" color="#39FF8B" />
        <GlowOrb className="-left-20 top-40 h-52 w-52" color="#FF9F45" />

        <header className="relative flex items-center justify-between">
          <Logo size="md" />
          <button
            onClick={onContinue}
            className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-haze ring-1 ring-white/10"
          >
            Entrar
          </button>
        </header>

        <div className="relative mt-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-3 py-1 text-xs font-semibold text-neon-green animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-neon-green" />
            Bem-estar para mulheres 40+
          </span>

          <h1
            className="mt-6 text-[2.1rem] font-extrabold leading-[1.12] tracking-tight animate-fade-up"
            style={{ animationDelay: '0.06s' }}
          >
            {hero.lead}
            <span className="text-neon-green drop-shadow-[0_0_14px_rgba(57,255,139,0.55)]">
              {hero.highlight}
            </span>
            {hero.tail}
          </h1>

          <div
            className="mt-5 space-y-1.5 text-base leading-relaxed text-haze animate-fade-up"
            style={{ animationDelay: '0.14s' }}
          >
            <p>Barriga mais estufada. Cansaço do nada. Sono estranho.</p>
            <p>Inchaço. A sensação de que algo saiu do eixo.</p>
          </div>
          <p
            className="mt-3 text-base font-semibold text-white animate-fade-up"
            style={{ animationDelay: '0.18s' }}
          >
            Talvez seu corpo esteja apenas pedindo suporte diferente agora.
          </p>

          <CTA onStart={start} micro="Leva apenas 2 minutos · Sem cadastro" />
        </div>
      </Section>

      {/* 2. WOW EMOCIONAL */}
      <Section>
        <GlowOrb className="-left-24 top-6 h-56 w-56" color="#39FF8B" />
        <div className="relative rounded-3xl border border-neon-green/20 bg-gradient-to-b from-neon-green/8 to-transparent p-6">
          <h2 className="text-2xl font-extrabold leading-snug">
            Talvez você não esteja falhando 💚
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-haze">
            Talvez você não esteja “engordando”. Talvez seu corpo esteja apenas tentando
            pedir ajuda de outro jeito.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Hormônios', 'Sono', 'Estresse', 'Intestino', 'Retenção', 'Inflamação'].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-ink-700/60 px-3 py-1.5 text-xs font-medium text-haze"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <p className="mt-4 text-sm text-haze">
            Tudo isso pode influenciar como você se sente.
          </p>
          <CTA onStart={start} label="Descobrir o que meu corpo pode estar tentando dizer" />
        </div>
        <SoftNote>Você não está sozinha nisso. 💚</SoftNote>
      </Section>

      {/* 3. IDENTIFICAÇÃO EMOCIONAL */}
      <Section>
        <GlowOrb className="-right-24 top-10 h-52 w-52" color="#FFC857" />
        <h2 className="relative text-2xl font-bold leading-snug">
          Você não está imaginando isso.
        </h2>
        <p className="relative mt-3 text-sm text-haze">
          Muitas mulheres após os 40 relatam sentir:
        </p>
        <ul className="relative mt-4 space-y-2.5">
          {[
            'corpo mais inchado',
            'barriga diferente "do nada"',
            'cansaço mesmo dormindo',
            'intestino mais lento',
            'ansiedade maior',
            'sono diferente',
            'sensação de não se reconhecer mais',
          ].map((t) => (
            <li
              key={t}
              className="flex items-center gap-3 rounded-2xl border border-white/8 bg-ink-800/60 px-4 py-3 text-sm text-haze"
            >
              <span className="text-neon-green">✓</span>
              {t}
            </li>
          ))}
        </ul>
        <p className="relative mt-6 rounded-2xl border border-neon-amber/25 bg-neon-amber/5 px-4 py-3 text-center text-base font-semibold text-neon-amber">
          “Meu corpo saiu do controle.”
        </p>
        <CTA onStart={start} label="Descobrir o que meu corpo pode estar tentando dizer" />
      </Section>

      {/* 4. PROVA EMOCIONAL */}
      <Section>
        <GlowOrb className="-left-20 top-0 h-52 w-52" color="#FF5C6C" />
        <h2 className="relative text-2xl font-bold">Talvez você se identifique…</h2>
        <div className="relative mt-5 space-y-3">
          {[
            'Parecia que meu corpo não era mais meu.',
            'Acordei inchada do nada.',
            'Não me reconhecia no espelho.',
            'Achei que estava enlouquecendo.',
            'Eu tentava me cuidar e nada parecia funcionar.',
          ].map((q) => (
            <div
              key={q}
              className="rounded-2xl border border-white/8 bg-ink-800/60 px-4 py-3.5"
            >
              <p className="text-sm italic leading-relaxed text-white">“{q}”</p>
            </div>
          ))}
        </div>
        <p className="relative mt-5 text-center text-sm text-haze">
          Muitas mulheres 40+ relatam sentimentos parecidos.
        </p>
        <CTA onStart={start} />
      </Section>

      {/* 5. COMO FUNCIONA */}
      <Section>
        <h2 className="text-2xl font-bold">Como funciona o PAUZEfem™</h2>
        <div className="mt-5 space-y-3">
          {[
            { n: 1, t: 'Faça seu diagnóstico gratuito', i: '🧭' },
            { n: 2, t: 'Entenda melhor os sinais do seu corpo', i: '🌗' },
            { n: 3, t: 'Receba caminhos simples e possíveis para o seu momento atual', i: '🌱' },
            { n: 4, t: 'Acompanhe sua evolução', i: '📈' },
          ].map((s) => (
            <div
              key={s.n}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-ink-800/60 px-4 py-4"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-neon-green/10 text-base font-extrabold text-neon-green ring-1 ring-neon-green/30">
                {s.n}
              </div>
              <p className="flex-1 text-sm font-medium text-white">{s.t}</p>
              <span className="text-xl">{s.i}</span>
            </div>
          ))}
        </div>
        <SoftNote>Pequenos passos também contam 💚</SoftNote>
      </Section>

      {/* 6. BENEFÍCIOS */}
      <Section>
        <GlowOrb className="-right-20 top-0 h-52 w-52" color="#39FF8B" />
        <h2 className="relative text-2xl font-bold">Pequenos passos também contam 💚</h2>
        <div className="relative mt-5 grid grid-cols-2 gap-3">
          {[
            { i: '🌿', t: 'Hábitos simples' },
            { i: '🥗', t: 'Alimentação acessível' },
            { i: '😴', t: 'Sono e energia' },
            { i: '🧘', t: 'Bem-estar e equilíbrio' },
            { i: '💧', t: 'Retenção e sensação de peso' },
            { i: '🌸', t: 'Rotina feminina 40+' },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-2xl border border-white/8 bg-ink-800/60 p-4 text-center"
            >
              <div className="text-2xl">{c.i}</div>
              <p className="mt-2 text-xs font-medium leading-tight text-haze">{c.t}</p>
            </div>
          ))}
        </div>
        <CTA onStart={start} micro="Leva apenas 2 minutos" />
      </Section>

      {/* 7. OBJEÇÕES */}
      <Section>
        <h2 className="text-2xl font-bold">Não é sobre perfeição.</h2>
        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl border border-neon-red/20 bg-neon-red/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neon-red/90">
              Não precisa
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-haze">
              {['dieta impossível', 'academia pesada', 'rotina perfeita', 'gastar uma fortuna'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="text-neon-red">✘</span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-neon-green/25 bg-neon-green/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neon-green">
              O objetivo é
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-haze">
              {['entender melhor seu corpo', 'pequenos ajustes possíveis', 'criar hábitos sustentáveis'].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="text-neon-green">✔</span>
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
        <SoftNote>Consistência vale mais que perfeição.</SoftNote>
      </Section>

      {/* 8. CTA FINAL */}
      <Section className="pb-4">
        <GlowOrb className="left-1/2 top-0 h-60 w-60 -translate-x-1/2" color="#39FF8B" />
        <div className="relative rounded-3xl border border-white/10 bg-ink-800/70 p-7 text-center shadow-neon-soft">
          <h2 className="text-2xl font-extrabold leading-snug">
            Seu corpo dá sinais antes de pedir socorro.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-haze">
            Talvez começar a entender esses sinais seja um bom começo.
          </p>
          <CTA onStart={start} micro="Leva menos de 2 minutos" />
        </div>
        <SoftNote>Seu corpo ainda está aqui por você 🌿</SoftNote>
      </Section>

      {/* RODAPÉ */}
      <footer className="px-5 pb-6 pt-6 text-center">
        <p className="mx-auto max-w-sm text-xs leading-relaxed text-haze/80">
          Ferramenta educativa de bem-estar feminino. Não substitui atendimento médico.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-3 text-xs font-semibold text-neon-green/90 underline underline-offset-4"
        >
          Uso responsável do PAUZEfem™
        </button>
        <p className="mt-3 text-[10px] text-haze/40">
          © {new Date().getFullYear()} PAUZEfem™ · Seu corpo de volta ao eixo.
        </p>
      </footer>

      {/* CTA FIXO MOBILE — sempre visível no scroll */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900 to-transparent" />
        <button
          onClick={start}
          className="relative mx-auto flex w-full max-w-md items-center justify-center gap-2 rounded-2xl bg-neon-green px-6 py-4 text-base font-bold text-ink-900 shadow-neon-green transition-all active:scale-[0.98]"
        >
          💚 Fazer meu diagnóstico
        </button>
      </div>

      {/* Modal uso responsável */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md animate-fade-up rounded-3xl border border-white/10 bg-ink-800 p-6 shadow-neon-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Uso responsável do PAUZEfem™</h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full bg-white/5 px-3 py-1 text-sm text-haze ring-1 ring-white/10"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-haze">
              <p>
                O PAUZEfem™ é uma ferramenta educativa de bem-estar. Ele não diagnostica,
                não trata, não cura e não previne doenças.
              </p>
              <p>
                O conteúdo não substitui a avaliação de profissionais de saúde. Sempre
                consulte seu médico ou nutricionista antes de mudar hábitos, iniciar
                suplementação ou alterar qualquer medicação.
              </p>
              <p>
                As sugestões são gerais e podem não se aplicar ao seu caso individual.
                Escute seu corpo e busque orientação profissional quando necessário.
              </p>
            </div>
            <Button onClick={() => setShowModal(false)} variant="ghost" className="mt-5 w-full">
              Entendi
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
