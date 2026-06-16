import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QuizProvider, useQuizContext } from "./context/QuizContext"
import { fetchQuestions } from "./services/quizService"
import WelcomePage from "./components/WelcomePage"
import QuizPage from "./components/QuizPage"
import ResultsPage from "./components/ResultsPage"

const AppContent = () => {
  const { setQuestions } = useQuizContext()
  const [loading, setLoading] = useState(true)
  const [loadingMsg, setLoadingMsg] = useState("Loading your questions…")
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const loadQuestions = async () => {
      setLoading(true)
      setError(null)

      // After 2s still loading, update the message so users know it's retrying
      const msgTimer = setTimeout(() => {
        if (!cancelled) setLoadingMsg("Hang tight — retrying the trivia server…")
      }, 2000)

      try {
        const fetched = await fetchQuestions()
        if (!cancelled) {
          setQuestions(fetched)
          setLoading(false)
        }
      } catch (err) {
        console.error("Failed to load questions:", err)
        if (!cancelled) {
          setError("Couldn't load questions. The trivia server may be busy — please refresh and try again.")
          setLoading(false)
        }
      } finally {
        clearTimeout(msgTimer)
      }
    }

    loadQuestions()
    return () => { cancelled = true }
  }, [setQuestions])

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="loading-wrap">
          <div className="loading-spinner" />
          {loadingMsg}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-wrapper">
        <div className="card" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😬</div>
          <p style={{ fontWeight: 700, color: "#EF4444", marginBottom: "1.5rem" }}>{error}</p>
          <button
            className="btn btn-replay"
            onClick={() => window.location.reload()}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/quiz/:questionId" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  )
}

const App = () => (
  <Router>
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  </Router>
)

export default App
