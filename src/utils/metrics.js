// Métricas de funil LOCAIS e anônimas (localStorage). LGPD-friendly:
// não coleta IP, não usa cookies de rastreamento, não guarda dados pessoais.
// São contadores deste navegador — úteis para QA e aprendizado de conversão.
// Para números globais entre usuárias, usar o Vercel Web Analytics (anônimo/cookieless).
const KEY = 'pauzefem:metrics'
const LOG_CAP = 800

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}
function write(o) {
  try {
    localStorage.setItem(KEY, JSON.stringify(o))
  } catch {
    /* noop */
  }
}

// Registra um evento de funil (nome + dimensões opcionais: variant, question).
export function record(name, props = {}) {
  const m = read()
  m.counts = m.counts || {}
  m.counts[name] = (m.counts[name] || 0) + 1

  if (props.variant) {
    m.byVariant = m.byVariant || {}
    m.byVariant[props.variant] = m.byVariant[props.variant] || {}
    m.byVariant[props.variant][name] = (m.byVariant[props.variant][name] || 0) + 1
  }
  if (props.question != null) {
    m.byQuestion = m.byQuestion || {}
    m.byQuestion[name] = m.byQuestion[name] || {}
    const q = String(props.question)
    m.byQuestion[name][q] = (m.byQuestion[name][q] || 0) + 1
  }

  m.log = m.log || []
  m.log.push({ n: name, t: Date.now() })
  if (m.log.length > LOG_CAP) m.log = m.log.slice(-LOG_CAP)
  m.updatedAt = Date.now()
  write(m)
}

export function getMetrics() {
  return read()
}
export function resetMetrics() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}

// Quantidade de um evento numa janela de tempo (ms). Ex.: visitas 24h.
export function countSince(name, ms) {
  const m = read()
  const since = Date.now() - ms
  return (m.log || []).filter((e) => e.n === name && e.t >= since).length
}

// "Ativo agora" (proxy): houve atividade nos últimos 5 min nesta sessão/dispositivo.
export function isActiveNow() {
  const m = read()
  const since = Date.now() - 5 * 60 * 1000
  return (m.log || []).some((e) => e.t >= since) ? 1 : 0
}
