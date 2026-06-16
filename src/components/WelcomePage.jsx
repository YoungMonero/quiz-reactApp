import { Link } from "react-router"
import { useQuizContext } from "../context/QuizContext"
import { clearQuestionCache } from "../services/quizService"

const WelcomePage = () => {
  const { resetQuiz } = useQuizContext()

  const handleStart = () => {
    clearQuestionCache()  // fetch fresh questions each new game
    resetQuiz()
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <span className="welcome-emoji">🧠</span>
        <h1 className="welcome-title">Brain Blast Quiz!</h1>
        <p className="welcome-subtitle">How sharp is your mind? Let's find out!</p>

        <div className="stat-row">
          <div className="stat-pill"><span>❓</span> 10 Questions</div>
          <div className="stat-pill"><span>⏱️</span> 30s Each</div>
          <div className="stat-pill"><span>🏆</span> Pass at 5+</div>
        </div>

        <ul className="welcome-rules">
          <li>Each question is True or False</li>
          <li>You have 30 seconds per question</li>
          <li>Unanswered questions count as wrong</li>
          <li>Score 5 or more to pass!</li>
        </ul>

        <Link to="/quiz/0" className="btn btn-start" onClick={handleStart}>
          🚀 Start Quiz!
        </Link>
      </div>
    </div>
  )
}

export default WelcomePage
