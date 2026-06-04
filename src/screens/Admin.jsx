import { useState, useEffect } from 'react'
import { Button, Card } from '../components/ui.jsx'
import { openCheckout } from '../config.js'
import {
  isConfigured,
  checkPassword,
  isUnlocked,
  unlock,
  lock,
} from '../utils/adminAuth.js'
import {
  getQuizConfig,
  getDefaultConfig,
  saveQuizConfig,
  resetQuizConfig,
  hasCustomConfig,
  exportJSON,
  importJSON,
} from '../utils/questionStorage.js'
import { getMetrics, resetMetrics, countSince, isActiveNow } from '../utils/metrics.js'
import { HEADLINES, getOverride, setOverride } from '../data/headlines.js'

// Navega para o app público numa tela específica (deep-link via sessionStorage).
function openScreen(screen) {
  try {
    sessionStorage.setItem('pauzefem:adminGoto', screen)
  } catch {
    /* noop */
  }
  window.location.href = '/'
}

// Resultado simulado: semeia um score de exemplo e abre a tela de resultado.
function openResultadoSimulado() {
  try {
    localStorage.setItem(
      'pauzefem:scores',
      JSON.stringify({ raw: 26, scoreRisco: 58, scoreBemEstar: 42 }),
    )
  } catch {
    /* noop */
  }
  openScreen('result')
}

function Login({ onUnlocked }) {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (checkPassword(pwd)) {
      unlock()
      onUnlocked()
    } else {
      setError('Senha inválida.')
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5">
      <Card>
        <h1 className="text-xl font-bold">Área Admin · PAUZEfem™</h1>
        <p className="mt-1 text-sm text-haze">Acesso restrito de revisão.</p>

        {!isConfigured() && (
          <p className="mt-4 rounded-2xl border border-neon-amber/30 bg-neon-amber/5 px-4 py-3 text-xs leading-relaxed text-neon-amber">
            Defina <code>VITE_ADMIN_PASSWORD</code> nas variáveis de ambiente da Vercel
            para ativar o acesso.
          </p>
        )}

        <form onSubmit={submit} className="mt-5">
          <input
            type="password"
            value={pwd}
            onChange={(e) => {
              setPwd(e.target.value)
              setError('')
            }}
            placeholder="Senha"
            className="w-full rounded-2xl border border-white/10 bg-ink-700/60 px-4 py-3 text-white outline-none focus:border-neon-green/50"
          />
          {error && <p className="mt-2 text-sm font-semibold text-neon-red">{error}</p>}
          <Button type="submit" className="mt-4 w-full">
            Entrar
          </Button>
        </form>
        <button
          onClick={() => (window.location.href = '/')}
          className="mt-3 w-full text-center text-xs text-haze/70"
        >
          ← Voltar ao site
        </button>
      </Card>
    </div>
  )
}

function VerifyCard({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/8 bg-ink-800/60 px-3 py-4 text-center transition-all active:scale-[0.98]"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium text-haze">{label}</span>
    </button>
  )
}

function Editor() {
  const [config, setConfig] = useState(() => getQuizConfig())
  const [msg, setMsg] = useState('')
  const [jsonText, setJsonText] = useState('')
  const [showJson, setShowJson] = useState(false)

  function flash(m) {
    setMsg(m)
    setTimeout(() => setMsg(''), 2500)
  }

  function updateQuestion(idx, patch) {
    setConfig((c) => {
      const questions = c.questions.map((q, i) => (i === idx ? { ...q, ...patch } : q))
      return { ...c, questions }
    })
  }

  function updateLabel(idx, value) {
    setConfig((c) => {
      const answerLabels = c.answerLabels.map((l, i) => (i === idx ? value : l))
      return { ...c, answerLabels }
    })
  }

  function handleSave() {
    try {
      saveQuizConfig(config)
      flash('Alterações salvas ✓')
    } catch (e) {
      flash('Erro ao salvar: ' + e.message)
    }
  }

  function handleReset() {
    resetQuizConfig()
    setConfig(getDefaultConfig())
    flash('Padrão original restaurado ✓')
  }

  function handleExport() {
    const data = exportJSON()
    setJsonText(data)
    setShowJson(true)
    // download opcional
    try {
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pauzefem-perguntas.json'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      /* se o download falhar, o JSON ainda fica visível na textarea */
    }
    flash('JSON exportado ✓')
  }

  function handleImport() {
    try {
      const blob = importJSON(jsonText)
      setConfig(blob)
      flash('JSON importado e salvo ✓')
    } catch (e) {
      flash('Erro ao importar: ' + e.message)
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-sm font-bold text-white">Opções de resposta (globais)</p>
        <p className="text-xs text-haze">
          Os 4 rótulos usados em todas as perguntas. A pontuação vai de 0 a 3 nessa ordem.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {config.answerLabels.map((label, i) => (
            <input
              key={i}
              value={label}
              onChange={(e) => updateLabel(i, e.target.value)}
              className="rounded-xl border border-white/10 bg-ink-700/60 px-3 py-2 text-sm text-white outline-none focus:border-neon-green/50"
            />
          ))}
        </div>
      </Card>

      <div className="space-y-3">
        {config.questions.map((q, idx) => (
          <Card key={q.id}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-neon-green/80">
                Pergunta {idx + 1}
              </span>
              <label className="flex items-center gap-2 text-xs text-haze">
                <input
                  type="checkbox"
                  checked={!!q.positive}
                  onChange={(e) => updateQuestion(idx, { positive: e.target.checked })}
                />
                Pontuação invertida (hábito positivo)
              </label>
            </div>
            <textarea
              value={q.text}
              onChange={(e) => updateQuestion(idx, { text: e.target.value })}
              rows={2}
              className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-ink-700/60 px-3 py-2 text-sm text-white outline-none focus:border-neon-green/50"
            />
          </Card>
        ))}
      </div>

      {/* Ações */}
      <div className="sticky bottom-4 z-10 rounded-3xl border border-white/10 bg-ink-900/90 p-4 backdrop-blur">
        {msg && (
          <p className="mb-3 text-center text-sm font-semibold text-neon-green">{msg}</p>
        )}
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleSave} className="py-3 text-sm">
            Salvar alterações
          </Button>
          <Button onClick={handleReset} variant="ghost" className="py-3 text-sm">
            Restaurar padrão
          </Button>
          <Button onClick={handleExport} variant="outline" className="py-3 text-sm">
            Exportar JSON
          </Button>
          <Button
            onClick={() => setShowJson((v) => !v)}
            variant="outline"
            className="py-3 text-sm"
          >
            {showJson ? 'Ocultar JSON' : 'Importar JSON'}
          </Button>
        </div>
        {hasCustomConfig() && (
          <p className="mt-2 text-center text-[11px] text-neon-amber/80">
            O quiz público está usando perguntas personalizadas (localStorage).
          </p>
        )}
        {showJson && (
          <div className="mt-3">
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={6}
              placeholder="Cole aqui um JSON de perguntas para importar…"
              className="w-full resize-none rounded-xl border border-white/10 bg-ink-700/60 px-3 py-2 font-mono text-xs text-white outline-none focus:border-neon-green/50"
            />
            <Button onClick={handleImport} className="mt-2 w-full py-3 text-sm">
              Importar este JSON
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function StatBox({ label, value, sub, accent = '#FFFFFF' }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-ink-700/50 px-3 py-3 text-center">
      <div className="text-2xl font-extrabold" style={{ color: accent }}>
        {value}
      </div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-haze">
        {label}
      </div>
      {sub && <div className="mt-0.5 text-[10px] text-haze/60">{sub}</div>}
    </div>
  )
}

function pct(a, b) {
  return b > 0 ? Math.round((a / b) * 100) : 0
}

function ConvRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/8 bg-ink-700/40 px-4 py-2.5">
      <span className="text-sm text-haze">{label}</span>
      <span className="text-sm font-bold text-neon-green">{value}%</span>
    </div>
  )
}

function ActivityPanel() {
  const [m, setM] = useState(() => getMetrics())
  useEffect(() => {
    const id = setInterval(() => setM(getMetrics()), 5000)
    return () => clearInterval(id)
  }, [])

  const c = m.counts || {}
  const day = 24 * 60 * 60 * 1000
  const visits24 = countSince('landing_view', day)
  const ativos = isActiveNow()
  const landingViews = c.landing_view || 0
  const quizStarted = c.quiz_started || 0
  const quizCompleted = c.quiz_completed || 0
  const checkout = c.checkout_click || 0

  const aband = (m.byQuestion && m.byQuestion.quiz_abandon) || {}
  const abandList = Object.entries(aband).sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <StatBox label="Ativos agora" value={ativos} accent="#39FF8B" sub="sua sessão" />
        <StatBox label="Visitas 24h" value={visits24} />
        <StatBox label="Quizzes iniciados" value={quizStarted} accent="#FFC857" />
        <StatBox label="Quizzes concluídos" value={quizCompleted} accent="#39FF8B" />
        <StatBox label="Cliques checkout" value={checkout} accent="#FF9F45" />
        <StatBox label="Landing views" value={landingViews} />
      </div>

      <div className="space-y-2">
        <ConvRow label="Landing → Quiz" value={pct(quizStarted, landingViews)} />
        <ConvRow label="Quiz → Resultado" value={pct(quizCompleted, quizStarted)} />
        <ConvRow label="Resultado → Checkout" value={pct(checkout, quizCompleted)} />
      </div>

      {abandList.length > 0 && (
        <div className="rounded-2xl border border-white/8 bg-ink-700/40 p-3">
          <p className="text-xs font-semibold text-white">Onde abandonam o quiz</p>
          <div className="mt-2 space-y-1">
            {abandList.map(([q, n]) => (
              <div key={q} className="flex items-center justify-between text-xs text-haze">
                <span>Pergunta {q}</span>
                <span className="font-bold text-neon-red">{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="rounded-2xl border border-neon-amber/25 bg-neon-amber/5 px-3 py-2.5 text-[11px] leading-relaxed text-neon-amber">
        Métricas locais e anônimas (este navegador) — LGPD-friendly: sem IP, sem cookies
        de rastreamento. Para números globais entre usuárias e região aproximada, use o
        Vercel Web Analytics (anônimo/cookieless).
      </p>

      <button
        onClick={() => {
          resetMetrics()
          setM(getMetrics())
        }}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-haze"
      >
        Zerar métricas locais
      </button>
    </div>
  )
}

function HeadlineABPanel() {
  const [override, setOv] = useState(() => getOverride())
  const m = getMetrics()
  const bv = m.byVariant || {}

  function choose(v) {
    setOverride(v)
    setOv(v)
  }

  const options = [
    { key: 'A', label: HEADLINES.A.lead + HEADLINES.A.highlight + HEADLINES.A.tail },
    { key: 'B', label: HEADLINES.B.lead + HEADLINES.B.highlight + HEADLINES.B.tail },
    { key: 'C', label: HEADLINES.C.lead + HEADLINES.C.highlight + HEADLINES.C.tail },
  ]

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {options.map((o) => {
          const v = bv[o.key] || {}
          const imp = v.landing_view || 0
          const clk = v.landing_cta_click || 0
          const ctr = imp > 0 ? Math.round((clk / imp) * 100) : 0
          const active = override === o.key
          return (
            <button
              key={o.key}
              onClick={() => choose(o.key)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition-all ${
                active
                  ? 'border-neon-green bg-neon-green/10'
                  : 'border-white/10 bg-ink-700/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neon-green">Headline {o.key}</span>
                <span className="text-xs text-haze">
                  CTR {ctr}% · {clk}/{imp}
                </span>
              </div>
              <p className="mt-1 text-sm text-white">{o.label}</p>
            </button>
          )
        })}
      </div>
      <button
        onClick={() => choose('')}
        className={`w-full rounded-xl border px-4 py-2 text-xs font-semibold ${
          override === ''
            ? 'border-neon-green/50 text-neon-green'
            : 'border-white/10 text-haze'
        }`}
      >
        Automático (aleatório entre visitantes)
      </button>
      <p className="text-[11px] leading-relaxed text-haze/60">
        "Automático" distribui as headlines entre visitantes e mede o CTR real. Escolher
        uma força essa headline (preview/teste). CTR = cliques no CTA ÷ visualizações.
      </p>
    </div>
  )
}

export default function Admin({ onExit }) {
  const [unlocked, setUnlocked] = useState(() => isUnlocked())
  const [checkoutMsg, setCheckoutMsg] = useState('')

  if (!unlocked) return <Login onUnlocked={() => setUnlocked(true)} />

  return (
    <div className="mx-auto max-w-md px-5 pb-16 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Admin · <span className="text-neon-green">PAUZEfem™</span>
          </h1>
          <p className="text-xs text-haze">Revisão e edição de perguntas</p>
        </div>
        <button
          onClick={() => {
            lock()
            if (onExit) onExit()
            window.location.href = '/'
          }}
          className="rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-haze ring-1 ring-white/10"
        >
          Sair
        </button>
      </header>

      {/* A) Dashboard de verificação */}
      <section className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          Verificação rápida
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <VerifyCard icon="🏠" label="Landing" onClick={() => openScreen('landing')} />
          <VerifyCard icon="🧭" label="Quiz" onClick={() => openScreen('quiz')} />
          <VerifyCard
            icon="📊"
            label="Resultado"
            onClick={openResultadoSimulado}
          />
          <VerifyCard
            icon="✨"
            label="Completo"
            onClick={() => openScreen('premium')}
          />
          <VerifyCard
            icon="💳"
            label="Checkout"
            onClick={() => openCheckout((m) => setCheckoutMsg(m))}
          />
          <VerifyCard icon="🏡" label="Dashboard" onClick={() => openScreen('dashboard')} />
        </div>
        {checkoutMsg && (
          <p className="mt-2 text-center text-xs text-neon-amber">{checkoutMsg}</p>
        )}
      </section>

      {/* Atividade & Conversão */}
      <section className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          Atividade &amp; conversão
        </p>
        <div className="mt-3">
          <ActivityPanel />
        </div>
      </section>

      {/* Teste A/B de headline */}
      <section className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          Teste A/B da headline
        </p>
        <div className="mt-3">
          <HeadlineABPanel />
        </div>
      </section>

      {/* B) Editor de perguntas */}
      <section className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          Editor de perguntas
        </p>
        <p className="mt-1 text-xs text-haze">
          As alterações ficam só no seu navegador (localStorage). O quiz público passa a
          usá-las; "Restaurar padrão" volta ao original.
        </p>
        <div className="mt-3">
          <Editor />
        </div>
      </section>
    </div>
  )
}
