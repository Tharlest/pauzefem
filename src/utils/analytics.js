// Analytics leve e centralizado. Toda a instrumentação passa por aqui.
// Envia para o Vercel Web Analytics (custom events) E registra métricas locais
// anônimas (metrics.js) para o painel de conversão do /admin.
// Em desenvolvimento o Vercel faz no-op; só envia em produção.
import { track } from '@vercel/analytics'
import { record } from './metrics.js'

// Nomes dos eventos do funil (fonte única de verdade).
export const EVENTS = {
  LANDING_VIEW: 'landing_view', // abriu a landing (com variante de headline)
  LANDING_CTA_CLICK: 'landing_cta_click', // clicou no CTA do diagnóstico
  QUIZ_STARTED: 'quiz_started', // iniciou o quiz
  QUIZ_QUESTION_REACHED: 'quiz_question_reached', // alcançou uma pergunta (heatmap)
  QUIZ_ABANDON: 'quiz_abandon', // saiu do quiz sem concluir (com pergunta)
  QUIZ_COMPLETED: 'quiz_completed', // finalizou o quiz
  LEAD_VIEW: 'lead_view', // viu a captura de lead
  LEAD_SUBMITTED: 'lead_submitted', // salvou contato
  LEAD_SKIPPED: 'lead_skipped', // continuou sem salvar
  RESULT_SAVED: 'result_saved', // clicou em "Salvar meu resultado"
  PREMIUM_VIEWED: 'premium_viewed', // abriu a tela PAUZEfem™ Completo
  CHECKOUT_CLICK: 'checkout_click', // clicou em "Quero começar agora"
  UNLOCK_ATTEMPT: 'unlock_attempt', // (futuro) gate por código
  PREMIUM_UNLOCKED: 'premium_unlocked', // (futuro) gate por código
}

// trackEvent(nome, props?) — nunca deve quebrar a UX se o analytics falhar.
export function trackEvent(eventName, props) {
  try {
    if (props) track(eventName, props)
    else track(eventName)
  } catch {
    /* falha silenciosa do Vercel */
  }
  try {
    record(eventName, props || {})
  } catch {
    /* falha silenciosa das métricas locais */
  }
}
