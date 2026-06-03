import { MAX_PER_QUESTION, scoreAnswer } from '../data/quiz.js'
import { getActiveQuestions } from './questionStorage.js'

// Mantido por compatibilidade; o cálculo real usa a quantidade ativa de perguntas.
export const MAX_RAW = getActiveQuestions().length * MAX_PER_QUESTION

// answers: objeto { [questionId]: answerIndex } ou array indexado.
// Usa as perguntas ATIVAS (editadas no admin via localStorage, ou o padrão).
export function computeScores(answers) {
  const questions = getActiveQuestions()
  const maxRaw = questions.length * MAX_PER_QUESTION
  let raw = 0
  questions.forEach((q, idx) => {
    const a = Array.isArray(answers) ? answers[idx] : answers?.[q.id]
    raw += scoreAnswer(q, a)
  })
  const scoreRisco = maxRaw > 0 ? Math.round((raw / maxRaw) * 100) : 0
  const scoreBemEstar = 100 - scoreRisco
  return { raw, scoreRisco, scoreBemEstar }
}

// Faixas do PAUZE Score™ (baseadas no scoreBemEstar).
export function getBand(scoreBemEstar) {
  if (scoreBemEstar <= 25) {
    return {
      key: 'fora',
      label: 'Corpo fora do eixo',
      color: 'red',
      hex: '#FF5C6C',
      message:
        'Seu corpo vem pedindo atenção há um tempo. Não é cobrança — é um convite para recomeçar com gentileza.',
    }
  }
  if (scoreBemEstar <= 50) {
    return {
      key: 'sobrecarregado',
      label: 'Corpo sobrecarregado',
      color: 'orange',
      hex: '#FF9F45',
      message:
        'Há sinais de excesso e cansaço acumulado. Pequenos ajustes diários podem aliviar bastante.',
    }
  }
  if (scoreBemEstar <= 75) {
    return {
      key: 'ajustes',
      label: 'Corpo pedindo pequenos ajustes',
      color: 'amber',
      hex: '#FFC857',
      message:
        'Você está num bom caminho. Alguns cuidados simples vão te deixar ainda mais em sintonia.',
    }
  }
  return {
    key: 'equilibrio',
    label: 'Corpo em equilíbrio',
    color: 'green',
    hex: '#39FF8B',
    message:
      'Seu corpo está respondendo bem ao cuidado. Vamos manter esse ritmo com leveza.',
  }
}

// Cor da barra neon conforme valor 0-100.
export function neonColorFor(value) {
  if (value <= 25) return '#FF5C6C' // vermelho
  if (value <= 50) return '#FF9F45' // laranja
  if (value <= 75) return '#FFC857' // amarelo
  return '#39FF8B' // verde neon
}
