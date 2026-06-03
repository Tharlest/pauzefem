// Configuração de checkout (Kiwify).
// A URL NÃO é hardcoded: vem da variável de ambiente VITE_KIWIFY_CHECKOUT_URL.
// Defina em .env (local) e nas Environment Variables da Vercel.
export const KIWIFY_CHECKOUT_URL = import.meta.env.VITE_KIWIFY_CHECKOUT_URL || ''

export const CHECKOUT_UNAVAILABLE_MSG =
  'Checkout temporariamente indisponível. Tente novamente em instantes 💚'

export function isCheckoutConfigured() {
  return Boolean(KIWIFY_CHECKOUT_URL)
}

// Abre o checkout do Kiwify em nova aba.
// Se a variável não existir, dispara o fallback amigável (toast) sem quebrar a UX.
// Retorna true se abriu o checkout, false caso contrário.
export function openCheckout(onUnavailable) {
  if (KIWIFY_CHECKOUT_URL) {
    window.open(KIWIFY_CHECKOUT_URL, '_blank', 'noopener,noreferrer')
    return true
  }
  if (typeof onUnavailable === 'function') onUnavailable(CHECKOUT_UNAVAILABLE_MSG)
  else alert(CHECKOUT_UNAVAILABLE_MSG)
  return false
}
