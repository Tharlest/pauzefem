import { createContext, useContext, useMemo, useCallback } from 'react'
import { usePersistentState, todayKey, clearAll } from './storage.js'
import { computeScores } from './score.js'
import { CHECKLIST_ITEMS, DAYS } from '../data/program.js'

const StoreContext = createContext(null)

// Conta a sequência de dias ativos consecutivos terminando hoje (ou ontem).
function computeStreak(activeDays) {
  if (!activeDays || activeDays.length === 0) return 0
  const set = new Set(activeDays)
  const d = new Date()
  // Se hoje não está ativo mas ontem está, a streak ainda "vale" até ontem.
  if (!set.has(todayKey(d))) {
    d.setDate(d.getDate() - 1)
    if (!set.has(todayKey(d))) return 0
  }
  let count = 0
  while (set.has(todayKey(d))) {
    count += 1
    d.setDate(d.getDate() - 1)
  }
  return count
}

export function StoreProvider({ children }) {
  const [quizAnswers, setQuizAnswers] = usePersistentState('quizAnswers', {})
  const [scores, setScores] = usePersistentState('scores', null)
  const [progress, setProgress] = usePersistentState('progress', {}) // { [day]: { [itemId]: true } }
  const [currentDay, setCurrentDay] = usePersistentState('currentDay', 1)
  const [activeDays, setActiveDays] = usePersistentState('activeDays', [])
  const [checkin, setCheckin] = usePersistentState('checkin', null) // { date, selected: [] }
  const [soundOn, setSoundOn] = usePersistentState('soundOn', false)

  const setAnswer = useCallback(
    (questionId, answerIndex) => {
      setQuizAnswers((prev) => ({ ...prev, [questionId]: answerIndex }))
    },
    [setQuizAnswers],
  )

  const finishQuiz = useCallback(() => {
    const result = computeScores(quizAnswers)
    setScores(result)
    return result
  }, [quizAnswers, setScores])

  const markActiveToday = useCallback(() => {
    const t = todayKey()
    setActiveDays((prev) => (prev.includes(t) ? prev : [...prev, t]))
  }, [setActiveDays])

  const toggleChecklistItem = useCallback(
    (day, itemId) => {
      setProgress((prev) => {
        const dayState = { ...(prev[day] || {}) }
        if (dayState[itemId]) delete dayState[itemId]
        else dayState[itemId] = true
        return { ...prev, [day]: dayState }
      })
      markActiveToday()
    },
    [setProgress, markActiveToday],
  )

  const dayPoints = useCallback(
    (day) => {
      const dayState = progress[day] || {}
      return CHECKLIST_ITEMS.reduce(
        (sum, item) => sum + (dayState[item.id] ? item.points : 0),
        0,
      )
    },
    [progress],
  )

  const isDayComplete = useCallback(
    (day) => {
      const dayState = progress[day] || {}
      return CHECKLIST_ITEMS.every((item) => dayState[item.id])
    },
    [progress],
  )

  const submitCheckin = useCallback(
    (selectedIds) => {
      setCheckin({ date: todayKey(), selected: selectedIds })
      markActiveToday()
    },
    [setCheckin, markActiveToday],
  )

  const resetAll = useCallback(() => {
    clearAll()
    setQuizAnswers({})
    setScores(null)
    setProgress({})
    setCurrentDay(1)
    setActiveDays([])
    setCheckin(null)
  }, [setQuizAnswers, setScores, setProgress, setCurrentDay, setActiveDays, setCheckin])

  const streak = useMemo(() => computeStreak(activeDays), [activeDays])

  const totalPoints = useMemo(
    () => DAYS.reduce((sum, d) => sum + dayPoints(d.day), 0),
    [dayPoints],
  )

  const todayPoints = useMemo(() => dayPoints(currentDay), [dayPoints, currentDay])

  const value = {
    quizAnswers,
    setAnswer,
    finishQuiz,
    scores,
    progress,
    toggleChecklistItem,
    dayPoints,
    isDayComplete,
    currentDay,
    setCurrentDay,
    streak,
    totalPoints,
    todayPoints,
    checkin,
    submitCheckin,
    soundOn,
    setSoundOn,
    resetAll,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore deve ser usado dentro de <StoreProvider>')
  return ctx
}
