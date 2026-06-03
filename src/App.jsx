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

const TAB_ROUTES = ['dashboard', 'reset', 'list', 'premium']

function Shell() {
  const { scores, soundOn } = useStore()
  // Início inteligente: se já tem score salvo, vai direto ao painel; senão, landing (topo do funil).
  const [route, setRoute] = useState(scores ? 'dashboard' : 'landing')

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
