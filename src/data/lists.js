// Lista Inteligente PAUZE™ — conteúdo educativo de bem-estar.

export const SMART_LIST = [
  {
    id: 'feira',
    title: 'Feira',
    icon: '🥬',
    items: ['Couve', 'Gengibre', 'Limão', 'Banana', 'Verduras', 'Legumes'],
  },
  {
    id: 'mercado',
    title: 'Mercado',
    icon: '🛒',
    items: ['Aveia', 'Chia', 'Linhaça', 'Iogurte natural', 'Castanhas', 'Ovos'],
  },
  {
    id: 'suplementos',
    title: 'Suplementos educativos',
    icon: '🌿',
    items: ['Magnésio', 'Ômega 3', 'Psyllium'],
    note: 'Conteúdo educativo. Consulte médico ou nutricionista antes de iniciar suplementação.',
  },
]

// Check-in rápido do Dashboard.
export const CHECKIN_OPTIONS = [
  { id: 'barriga', label: 'Barriga estufada', icon: '🎈' },
  { id: 'rosto', label: 'Rosto inchado', icon: '💧' },
  { id: 'pernas', label: 'Pernas pesadas', icon: '🦵' },
  { id: 'energia', label: 'Energia baixa', icon: '🔋' },
  { id: 'mente', label: 'Mente acelerada', icon: '🌀' },
  { id: 'intestino', label: 'Intestino preso', icon: '🌾' },
  { id: 'sono', label: 'Sono ruim', icon: '🌙' },
]

export const ENCOURAGEMENTS = [
  '+ pontos de cuidado',
  'Você está se cuidando hoje',
  'Consistência vale mais que perfeição',
  'Seu corpo agradece',
  'Pequenos passos contam',
]

// Termômetro corporal — como o corpo está "falando" hoje.
// score: usado para desenhar a evolução (quanto maior, melhor).
export const BODY_THERMO = [
  { id: 'pesada', label: 'Muito pesada', icon: '🔴', hex: '#FF5C6C', score: 1 },
  { id: 'inchada', label: 'Inchada', icon: '🟠', hex: '#FF9F45', score: 2 },
  { id: 'maisoumenos', label: 'Mais ou menos', icon: '🟡', hex: '#FFC857', score: 3 },
  { id: 'melhorando', label: 'Melhorando', icon: '🟢', hex: '#39FF8B', score: 4 },
]
