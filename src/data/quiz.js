// PAUZE Quiz™ — 15 perguntas (mineração emocional).
// Respostas padrão: Nunca=0, Às vezes=1, Frequentemente=2, Quase sempre=3
// Perguntas "positivas" (positive: true) têm pontuação invertida:
// Nunca=3, Às vezes=2, Frequentemente=1, Quase sempre=0
// Em ambos os casos a pontuação máxima por pergunta é 3.

export const ANSWER_LABELS = ['Nunca', 'Às vezes', 'Frequentemente', 'Quase sempre']

export const MAX_PER_QUESTION = 3

export const QUESTIONS = [
  {
    id: 1,
    text: 'Você acorda sentindo seu corpo mais inchado do que gostaria?',
    empathy: 'Muitas mulheres relatam isso após os 40 💚',
  },
  { id: 2, text: 'Sua barriga parece maior "do nada", mesmo sem exagerar?' },
  {
    id: 3,
    text: 'Você sente que seu corpo mudou… e não te avisou?',
    empathy: 'Você não está sozinha nisso.',
  },
  { id: 4, text: 'Você sente que tenta se cuidar, mas seu corpo parece não responder?' },
  {
    id: 5,
    text: 'Você acorda cansada mesmo depois de dormir?',
    empathy: 'Isso é mais comum do que parece — e tem a ver com o ritmo do corpo.',
  },
  { id: 6, text: 'Seu sono parece não descansar como antes?' },
  { id: 7, text: 'Sua mente anda acelerada, especialmente à noite?' },
  {
    id: 8,
    text: 'Você sente mais irritação ou sensibilidade emocional?',
    empathy: 'Oscilações emocionais também são sinais do corpo 💚',
  },
  { id: 9, text: 'Você sente que perdeu parte da energia ou motivação?' },
  { id: 10, text: 'Seu intestino parece mais lento do que antes?' },
  { id: 11, text: 'Você sente retenção ou sensação de corpo pesado?' },
  {
    id: 12,
    text: 'Você sente que não se reconhece mais no espelho ou no próprio corpo?',
    empathy: 'Respira. Reconhecer isso já é um passo de cuidado.',
  },
  { id: 13, text: 'Você consegue caminhar ao menos 20 minutos?', positive: true },
  { id: 14, text: 'Você consome muitos ultraprocessados?' },
  { id: 15, text: 'Você consome fibras regularmente?', positive: true },
]

// Retorna a pontuação (0-3) de uma resposta, considerando inversão.
export function scoreAnswer(question, answerIndex) {
  if (answerIndex == null) return 0
  return question.positive ? MAX_PER_QUESTION - answerIndex : answerIndex
}
