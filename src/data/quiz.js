// PAUZE Quiz™ — 15 perguntas.
// Respostas padrão: Nunca=0, Às vezes=1, Frequentemente=2, Quase sempre=3
// Perguntas "positivas" (positive: true) têm pontuação invertida:
// Nunca=3, Às vezes=2, Frequentemente=1, Quase sempre=0
// Em ambos os casos a pontuação máxima por pergunta é 3.

export const ANSWER_LABELS = ['Nunca', 'Às vezes', 'Frequentemente', 'Quase sempre']

export const MAX_PER_QUESTION = 3

export const QUESTIONS = [
  { id: 1, text: 'Você acorda inchada?' },
  { id: 2, text: 'Sua barriga parece estufada?' },
  { id: 3, text: 'Sente retenção antes da menstruação?' },
  { id: 4, text: 'Suas pernas ficam pesadas?' },
  { id: 5, text: 'Anda cansada mesmo dormindo?' },
  { id: 6, text: 'Sua energia caiu após os 40?' },
  { id: 7, text: 'Se sente "travada"?' },
  { id: 8, text: 'Dorme mal?' },
  { id: 9, text: 'Acorda cansada?' },
  { id: 10, text: 'Sua mente acelera à noite?' },
  { id: 11, text: 'Intestino preso?' },
  { id: 12, text: 'Barriga estufa facilmente?' },
  { id: 13, text: 'Caminha ao menos 20 minutos?', positive: true },
  { id: 14, text: 'Consome ultraprocessados?' },
  { id: 15, text: 'Consome fibras?', positive: true },
]

// Retorna a pontuação (0-3) de uma resposta, considerando inversão.
export function scoreAnswer(question, answerIndex) {
  if (answerIndex == null) return 0
  return question.positive ? MAX_PER_QUESTION - answerIndex : answerIndex
}
