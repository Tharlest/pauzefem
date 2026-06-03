import { useState, useEffect } from 'react'
import { StoreProvider, useStore } from './utils/store.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { setSoundEnabled } from './utils/feedback.js'
import { trackEvent, EVENTS } from './utils/analytics.js'
import { Analytics } from '@vercel/analytics/react'
import BottomNav from './components/BottomNav.jsx'
import Footer from './components/Footer.jsx'
import Landing from './screens/Landing.jsx'
import Quiz from './screens/Quiz.jsx'
import Result from './screens/Result.jsx'
import Reset from './screens/Reset.jsx'
import Dashboard from './screens/Dashboard.jsx'
import SmartList from './screens/SmartList.jsx'
import Premium from './screens/Premium.jsx'
import Admin from './screens/Admin.jsx'

const TAB_ROUTES = ['dashboard', 'reset', 'list', 'premium']
const FUNNEL_ROUTES = ['landing', 'quiz', 'result', 'premium', 'dashboard', 'reset', 'list']

// Decide a tela inicial sem mexer no funil público:
// 1) deep-link vindo do admin (sessionStorage), 2) rota /admin, 3) funil normal.
function getInitialRoute(scores) {
  try {
    const goto = sessionStorage.getItem('pauzefem:adminGoto')
    if (goto) {
      sessionStorage.removeItem('pauzefem:adminGoto')
      if (FUNNEL_ROUTES.includes(goto)) return goto
    }
  } catch {
    /* noop */
  }
  try {
    const path = window.location.pathname.replace(/\/+$/, '')
    if (path === '/admin') return 'admin'
  } catch {
    /* noop */
  }
  return scores ? 'dashboard' : 'landing'
}

function Shell() {
  const { scores, soundOn } = useStore()
  // Início inteligente: deep-link admin, rota /admin, ou funil normal.
  const [route, setRoute] = useState(() => getInitialRoute(scores))

  useEffect(() => {
    setSoundEnabled(soundOn)
  }, [soundOn])

  // Garante scroll ao topo a cada troca de tela.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  const showNav = TAB_ROUTES.includes(route)

  return (
    <div className="min-h-screen">
      <Analytics />
      {route === 'landing' && (
        <Landing
          onStart={() => {
            trackEvent(EVENTS.LANDING_CTA_CLICK)
            setRoute('quiz')
          }}
          onContinue={() => setRoute('dashboard')}
        />
      )}

      {route === 'quiz' && (
        <Quiz
          onDone={() => {
            trackEvent(EVENTS.QUIZ_COMPLETED)
            setRoute('result')
          }}
          onBack={() => setRoute('landing')}
        />
      )}

      {route === 'result' && (
        <Result
          onStartReset={() => setRoute('reset')}
          onSeePremium={() => setRoute('premium')}
        />
      )}

      {route === 'dashboard' && (
        <Dashboard
          onOpenReset={() => setRoute('reset')}
          onRetakeQuiz={() => setRoute('quiz')}
          onSeePremium={() => setRoute('premium')}
        />
      )}

      {route === 'reset' && <Reset />}

      {route === 'list' && <SmartList />}

      {route === 'premium' && <Premium />}

      {route === 'admin' && <Admin onExit={() => setRoute('landing')} />}

      {showNav && (
        <>
          <Footer />
          <div className="h-16" />
          <BottomNav active={route} onNavigate={setRoute} />
        </>
      )}
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </StoreProvider>
  )
}
