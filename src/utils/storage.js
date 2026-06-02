import { useState, useEffect, useCallback } from 'react'

const PREFIX = 'pauzefem:'

export function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveState(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* localStorage indisponível — falha silenciosa */
  }
}

// Hook de estado persistente em localStorage.
export function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => loadState(key, fallback))

  useEffect(() => {
    saveState(key, value)
  }, [key, value])

  return [value, setValue]
}

// ---- Datas / streak ----

// Retorna a data local no formato YYYY-MM-DD.
export function todayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function yesterdayKey() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return todayKey(d)
}

// Limpa todos os dados do app (reset completo).
export function clearAll() {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k))
  } catch {
    /* noop */
  }
}

export { PREFIX }
