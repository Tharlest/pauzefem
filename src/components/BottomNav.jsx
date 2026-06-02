// Navegação inferior mobile-first. Aparece nas telas internas.
const TABS = [
  { id: 'dashboard', label: 'Hoje', icon: '🏠' },
  { id: 'reset', label: 'Reset', icon: '🌱' },
  { id: 'list', label: 'Lista', icon: '🛒' },
]

export default function BottomNav({ active, onNavigate }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-ink-900/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {TABS.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-3 transition-colors"
            >
              <span
                className={`text-xl transition-transform ${isActive ? 'scale-110' : 'opacity-60'}`}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[11px] font-semibold ${
                  isActive ? 'text-neon-green' : 'text-haze'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-neon-green shadow-neon-green" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
