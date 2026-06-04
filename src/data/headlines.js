// Variantes de headline da hero para teste A/B. Cada uma tem lead/highlight/tail
// para destacar uma palavra em neon. CTR é medido em metrics.js (impressão x clique).
export const HEADLINES = {
  A: { lead: 'Você sente que seu corpo ', highlight: 'mudou', tail: '… e não te avisou?' },
  B: { lead: 'Seu corpo parece ', highlight: 'diferente', tail: '… e você não entende o porquê?' },
  C: { lead: 'Você olha no espelho e sente que algo ', highlight: 'mudou', tail: ' no seu corpo?' },
}

const VKEY = 'pauzefem:heroVariant' // atribuição estável por visitante
const OKEY = 'pauzefem:heroOverride' // forçado pelo admin (preview/teste)

export function getOverride() {
  try {
    const o = localStorage.getItem(OKEY)
    return o && HEADLINES[o] ? o : ''
  } catch {
    return ''
  }
}

export function setOverride(v) {
  try {
    if (v && HEADLINES[v]) localStorage.setItem(OKEY, v)
    else localStorage.removeItem(OKEY)
  } catch {
    /* noop */
  }
}

// Variante ativa: override do admin tem prioridade; senão, atribuição aleatória estável.
export function getActiveVariant() {
  try {
    const o = getOverride()
    if (o) return o
    let v = localStorage.getItem(VKEY)
    if (!v || !HEADLINES[v]) {
      const keys = Object.keys(HEADLINES)
      v = keys[Math.floor(Math.random() * keys.length)]
      localStorage.setItem(VKEY, v)
    }
    return v
  } catch {
    return 'A'
  }
}
