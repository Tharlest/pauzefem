// Feedback de gamificação. Preparado para áudio real no futuro.
// Hoje usa apenas vibração leve (quando disponível) — nenhum som é tocado ainda.

let enabled = false

export function setSoundEnabled(value) {
  enabled = !!value
}

// Stub de som: deixa o ponto de integração pronto para um arquivo de áudio.
// Ex.: const a = new Audio('/sounds/chime.mp3'); a.play()
export function playChime() {
  if (!enabled) return
  // TODO: integrar áudio real aqui (ex.: new Audio('/sounds/chime.mp3').play()).
}

export function tinyHaptic() {
  try {
    if (navigator?.vibrate) navigator.vibrate(10)
  } catch {
    /* noop */
  }
}
