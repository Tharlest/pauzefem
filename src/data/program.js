// PAUZE Reset — 7 Dias™
// Cada dia tem um tema, uma frase de acolhimento e um checklist com pontos.

export const CHECKLIST_ITEMS = [
  { id: 'agua', label: 'Tomei boa quantidade de água', points: 8, icon: '💧' },
  { id: 'cam10', label: 'Caminhei 10 minutos', points: 3, icon: '🚶‍♀️' },
  { id: 'cam20', label: 'Caminhei 20 minutos', points: 5, icon: '🚶‍♀️' },
  { id: 'cam30', label: 'Caminhei 30 minutos', points: 8, icon: '🚶‍♀️' },
  { id: 'fibras', label: 'Comi fibras hoje', points: 8, icon: '🥗' },
  { id: 'ultra', label: 'Evitei ultraprocessados', points: 5, icon: '🚫' },
  { id: 'cha', label: 'Tomei chá funcional', points: 3, icon: '🍵' },
  { id: 'sono', label: 'Cuidei do meu sono', points: 8, icon: '🌙' },
]

export const MAX_DAILY_POINTS = CHECKLIST_ITEMS.reduce((s, i) => s + i.points, 0)

export const DAYS = [
  {
    day: 1,
    title: 'Menos sobrecarga',
    subtitle: 'Tirar o peso do que sobra',
    desc: 'Hoje é sobre aliviar. Menos pressa, menos excesso, mais espaço para o corpo respirar.',
  },
  {
    day: 2,
    title: 'Organizar o corpo',
    subtitle: 'Criar um ritmo gentil',
    desc: 'Água, movimento leve e comida de verdade. Pequenas estruturas que dão direção ao seu dia.',
  },
  {
    day: 3,
    title: 'Corpo mais leve',
    subtitle: 'Reduzir a retenção',
    desc: 'Foco em hidratação e fibras. Seu corpo começa a soltar o que estava parado.',
  },
  {
    day: 4,
    title: 'Energia',
    subtitle: 'Acender de dentro',
    desc: 'Movimento e luz do dia. A energia volta quando o corpo se sente apoiado, não cobrado.',
  },
  {
    day: 5,
    title: 'Hormônios & TPM',
    subtitle: 'Acolher as oscilações',
    desc: 'Dias de mais sensibilidade pedem mais carinho. Magnésio, descanso e gentileza consigo.',
  },
  {
    day: 6,
    title: 'Sono & calma',
    subtitle: 'Desacelerar a mente',
    desc: 'Hoje a noite é prioridade. Menos telas, mais silêncio, um corpo que aprende a descansar.',
  },
  {
    day: 7,
    title: 'Retomar o eixo',
    subtitle: 'Voltar ao seu centro',
    desc: 'Você chegou até aqui. Reconheça o caminho e escolha o que quer manter daqui pra frente.',
  },
]
