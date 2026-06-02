import { SMART_LIST } from '../data/lists.js'
import { usePersistentState } from '../utils/storage.js'
import { Card } from '../components/ui.jsx'

export default function SmartList() {
  // Itens marcados ficam salvos no localStorage.
  const [checked, setChecked] = usePersistentState('smartList', {})

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-green/80">
          Lista Inteligente PAUZE™
        </p>
        <h2 className="mt-1 text-2xl font-bold">O que vale ter por perto</h2>
        <p className="mt-1 text-sm text-haze">
          Marque o que já tem. Conteúdo educativo de bem-estar.
        </p>
      </header>

      <div className="mt-6 space-y-4">
        {SMART_LIST.map((group) => (
          <Card key={group.id}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{group.icon}</span>
              <h3 className="text-lg font-bold">{group.title}</h3>
            </div>

            <div className="mt-3 space-y-2">
              {group.items.map((item) => {
                const key = `${group.id}:${item}`
                const isChecked = !!checked[key]
                return (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors active:bg-white/5"
                  >
                    <span
                      className={`flex h-6 w-6 flex-none items-center justify-center rounded-md border-2 text-xs font-bold transition-all ${
                        isChecked
                          ? 'border-neon-green bg-neon-green text-ink-900'
                          : 'border-white/20 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span
                      className={`text-base ${
                        isChecked ? 'text-haze line-through' : 'text-white'
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                )
              })}
            </div>

            {group.note && (
              <p className="mt-4 rounded-xl border border-neon-amber/30 bg-neon-amber/5 px-3 py-2.5 text-xs leading-relaxed text-neon-amber">
                ⚠️ {group.note}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
