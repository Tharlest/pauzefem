import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null) // { id, text }
  const timer = useRef(null)

  const showToast = useCallback((text) => {
    const id = Date.now()
    setToast({ id, text })
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 1800)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
        {toast && (
          <div
            key={toast.id}
            className="animate-pop rounded-full border border-neon-green/40 bg-ink-700/95 px-5 py-2.5 text-sm font-semibold text-neon-green shadow-neon-green backdrop-blur"
          >
            {toast.text}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast deve ser usado dentro de <ToastProvider>')
  return ctx
}
