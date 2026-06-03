// Analytics leve e centralizado. Toda a instrumentação passa por aqui —
// nada de tracking espalhado pelo app. Usa o Vercel Web Analytics (custom events).
// Em desenvolvimento o Vercel faz no-op automaticamente; só envia em produção.
import { track } from '@vercel/analytics'

// Nomes dos eventos do funil (fonte única de verdade).
export const EVENTS = {
  LANDING_CTA_CLICK: 'landing_cta_click', // clicou em "Fazer meu diagnóstico gratuito"
  QUIZ_STARTED: 'quiz_started', // iniciou o quiz
  QUIZ_COMPLETED: 'quiz_completed', // finalizou o quiz
  PREMIUM_VIEWED: 'premium_viewed', // abriu a tela PAUZEfem™ Completo
  CHECKOUT_CLICK: 'checkout_click', // clicou em "Quero começar agora"
  UNLOCK_ATTEMPT: 'unlock_attempt', // tentou liberar o Completo (gate por código — futuro)
  PREMIUM_UNLOCKED: 'premium_unlocked', // código válido aceito (gate por código — futuro)
}

// trackEvent(nome, props?) — nunca deve quebrar a UX se o analytics falhar.
export function trackEvent(eventName, props) {
  try {
    if (props) track(eventName, props)
    else track(eventName)
  } catch {
    /* falha silenciosa: analytics jamais interrompe o usuário */
  }
}
