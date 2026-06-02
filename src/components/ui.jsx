// Primitivos de UI reutilizáveis.

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100'
  const variants = {
    primary:
      'bg-neon-green text-ink-900 shadow-neon-green hover:brightness-110',
    ghost:
      'bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10',
    outline:
      'bg-transparent text-neon-green ring-1 ring-neon-green/50 hover:bg-neon-green/10',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div
      className={`rounded-3xl border border-white/8 bg-ink-800/70 p-5 shadow-neon-soft backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  )
}

export function Stat({ label, value, accent = '#39FF8B', suffix }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-ink-700/50 px-4 py-3 text-center">
      <div className="text-2xl font-extrabold" style={{ color: accent }}>
        {value}
        {suffix && <span className="text-sm font-semibold text-haze">{suffix}</span>}
      </div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-haze">
        {label}
      </div>
    </div>
  )
}
