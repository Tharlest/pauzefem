// Armazenamento local de lead (sem backend). Estrutura pronta para futura
// integração (CRM/e-mail/WhatsApp). LGPD: a usuária fornece os dados
// voluntariamente; ficam só no navegador dela até existir integração.
const KEY = 'pauzefem:lead'

export function saveLead(lead) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...lead, ts: Date.now() }))
  } catch {
    /* noop */
  }
}

export function getLead() {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

export function hasLead() {
  return !!getLead()
}
