// Autenticação leve do painel admin. Gate client-side simples (NÃO é segurança real):
// como não há backend, isto apenas evita acesso casual. A senha vem da env
// VITE_ADMIN_PASSWORD (definida na Vercel). Sem env definida, o admin fica bloqueado.
const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || ''
const SESSION_KEY = 'pauzefem:adminUnlocked'

export function isConfigured() {
  return PASSWORD.length > 0
}

export function checkPassword(input) {
  return PASSWORD.length > 0 && input === PASSWORD
}

export function isUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function unlock() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* noop */
  }
}

export function lock() {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* noop */
  }
}
