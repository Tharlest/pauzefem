import { useState } from 'react'
import { QUESTIONS, ANSWER_LABELS } from '../data/quiz.js'
import { useStore } from '../utils/store.jsx'
import NeonBar from '../components/NeonBar.jsx'
import { Button } from '../components/ui.jsx'
import { tinyHaptic } from '../utils/feedback.js'

export default function Quiz({ onDone, onBack }) {
  const { quizAnswers, setAnswer, finishQuiz } = useStore()
  const [index, setIndex] = useState(0)

  const question = QUESTIONS[index]
  const selected = quizAnswers[question.id]
  const progress = ((index + (selected != null ? 1 : 0)) / QUESTIONS.length) * 100
  const isLast = index === QUESTIONS.length - 1

  function choose(answerIndex) {
    tinyHaptic()
    setAnswer(question.id, answerIndex)
    // Avança automaticamente após um breve respiro.
    setTimeout(() => {
      if (isLast) {
        finishQuiz()
        onDone()
      } else {
        setIndex((i) => i + 1)
      }
    }, 240)
  }

  function goBack() {
    if (index === 0) onBack()
    else setIndex((i) => i - 1)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-6">
      <header className="flex items-center gap-3">
        <button
          onClick={goBack}
          className="rounded-full bg-white/5 px-3 py-2 text-sm text-haze ring-1 ring-white/10"
          aria-label="Voltar"
        >
          ←
        </button>
        <div className="flex-1">
          <NeonBar value={progress} color="#39FF8B" height={8} />
        </div>
        <span className="text-xs font-semibold text-haze">
          {index + 1}/{QUESTIONS.length}
        </span>
      </header>

      <main className="flex flex-1 flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          Pergunta {index + 1} de {QUESTIONS.length}
        </p>
        <h2
          key={question.id}
          className="mt-4 text-2xl font-bold leading-snug animate-fade-up"
        >
          {question.text}
        </h2>

        {question.empathy && (
          <p
            key={`emp-${question.id}`}
            className="mt-3 flex items-start gap-2 rounded-2xl border border-neon-green/20 bg-neon-green/5 px-4 py-3 text-sm text-neon-green/90 animate-fade-up"
          >
            {question.empathy}
          </p>
        )}

        <div className="mt-7 space-y-3">
          {ANSWER_LABELS.map((label, i) => {
            const active = selected === i
            return (
              <button
                key={label}
                onClick={() => choose(i)}
                className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-base font-medium transition-all duration-200 active:scale-[0.99] ${
                  active
                    ? 'border-neon-green bg-neon-green/10 text-white shadow-neon-green'
                    : 'border-white/10 bg-ink-800/60 text-haze hover:border-white/20'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs ${
                    active
                      ? 'border-neon-green bg-neon-green text-ink-900'
                      : 'border-white/20'
                  }`}
                >
                  {active ? '✓' : ''}
                </span>
              </button>
            )
          })}
        </div>
      </main>

      {selected != null && (
        <Button onClick={() => choose(selected)} className="w-full animate-fade-up">
          {isLast ? 'Ver meu PAUZE Score™' : 'Continuar'}
        </Button>
      )}
    </div>
  )
}
