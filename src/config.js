// Configuração de checkout (Kiwify).
// A URL NÃO é hardcoded: vem da variável de ambiente VITE_KIWIFY_CHECKOUT_URL.
// Defina em .env (local) e nas Environment Variables da Vercel.
export const KIWIFY_CHECKOUT_URL = import.meta.env.VITE_KIWIFY_CHECKOUT_URL || ''

export function isCheckoutConfigured() {
  return Boolean(KIWIFY_CHECKOUT_URL)
}

// Abre o checkout do Kiwify em nova aba. Se não configurado, avisa sem quebrar a UX.
export function openCheckout() {
  if (KIWIFY_CHECKOUT_URL) {
    window.open(KIWIFY_CHECKOUT_URL, '_blank', 'noopener,noreferrer')
  } else {
    alert(
      'Checkout em configuração. Defina VITE_KIWIFY_CHECKOUT_URL nas variáveis de ambiente da Vercel para ativar.',
    )
  }
}
