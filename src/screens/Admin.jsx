import { useState } from 'react'
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
