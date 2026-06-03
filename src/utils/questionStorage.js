// Camada de perguntas do quiz com persistência segura em localStorage.
// O app público usa as perguntas editadas (se existirem e forem válidas);
// caso contrário, cai no padrão definido em ../data/quiz.js.
// NENHUM dado é enviado para fora do navegador.
import {
  QUESTIONS as DEFAULT_QUESTIONS,
  ANSWER_LABELS as DEFAULT_LABELS,
  MAX_PER_QUESTION,
} from '../data/quiz.js'

const KEY = 'pauzefem:adminQuiz'

function cloneQuestion(q) {
  const out = { id: q.id, text: q.text, positive: !!q.positive }
  if (q.empathy) out.empathy = q.empathy
  return out
}

// Blob padrão (fonte da verdade = quiz.js).
export function getDefaultConfig() {
  return {
    version: 1,
    answerLabels: [...DEFAULT_LABELS],
    questions: DEFAULT_QUESTIONS.map(cloneQuestion),
  }
}

function readRaw() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

// Config ativa, sempre normalizada e segura (fallback ao padrão se algo der errado).
export function getQuizConfig() {
  const saved = readRaw()
  if (!saved) return getDefaultConfig()
  const labels =
    Array.isArray(saved.answerLabels) && saved.answerLabels.length === DEFAULT_LABELS.length
      ? saved.answerLabels.map((l) => String(l))
      : [...DEFAULT_LABELS]
  const questions = saved.questions
    .filter((q) => q && q.id != null && typeof q.text === 'string')
    .map((q) => cloneQuestion({ ...q, positive: !!q.positive }))
  if (questions.length === 0) return getDefaultConfig()
  return { version: saved.version || 1, answerLabels: labels, questions }
}

export function getActiveQuestions() {
  return getQuizConfig().questions
}
export function getActiveAnswerLabels() {
  return getQuizConfig().answerLabels
}
export { MAX_PER_QUESTION }

export function hasCustomConfig() {
  return readRaw() !== null
}

export function saveQuizConfig(blob) {
  if (!blob || !Array.isArray(blob.questions) || blob.questions.length === 0) {
    throw new Error('Configuração inválida: precisa de pelo menos 1 pergunta.')
  }
  localStorage.setItem(KEY, JSON.stringify(blob))
}

export function resetQuizConfig() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}

export function exportJSON() {
  return JSON.stringify(getQuizConfig(), null, 2)
}

// Importa e valida um JSON de perguntas. Lança erro se inválido (fallback preservado).
export function importJSON(str) {
  const parsed = JSON.parse(str)
  if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('JSON precisa conter "questions" com pelo menos 1 item.')
  }
  const blob = {
    version: parsed.version || 1,
    answerLabels:
      Array.isArray(parsed.answerLabels) && parsed.answerLabels.length
        ? parsed.answerLabels.map((l) => String(l))
        : [...DEFAULT_LABELS],
    questions: parsed.questions
      .filter((q) => q && q.id != null)
      .map((q) => cloneQuestion({ id: q.id, text: String(q.text || ''), positive: !!q.positive, empathy: q.empathy })),
  }
  saveQuizConfig(blob)
  return blob
}
