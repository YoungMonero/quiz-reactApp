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

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions()
        setQuestions(fetchedQuestions)
        setLoading(false)
      } catch (error) {
        console.error("Failed to load questions:", error)
        setLoading(false)
      }
    }

    loadQuestions()
  }, [setQuestions])

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/quiz/:questionId" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  )
}

const App = () => {
  return (
    <Router>
      <QuizProvider>
        <AppContent />
      </QuizProvider>
    </Router>
  )
}

export default App
