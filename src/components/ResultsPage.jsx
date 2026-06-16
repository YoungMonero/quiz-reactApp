import { Link } from "react-router"
import { useQuizContext } from "../context/QuizContext"

function decodeHtml(html) {
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}

const ResultsPage = () => {
  const { questions, userAnswers, resetQuiz } = useQuizContext()

  const correctCount = questions.filter((q, i) => q.correct_answer === userAnswers[i]).length
  const total = questions.length
  const passed = correctCount >= 5
  const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0

  const trophy = passed
    ? correctCount >= 9 ? "🏆" : "🥇"
    : correctCount >= 3 ? "💪" : "😅"

  const headline = passed
    ? correctCount >= 9 ? "Genius level!" : "You passed!"
    : correctCount >= 3 ? "So close!" : "Better luck next time!"

  return (
    <div className="page-wrapper">
      <div className="card">
        {/* Hero */}
        <div className="results-hero">
          <span className="results-trophy">{trophy}</span>
          <h1 className={`results-title ${passed ? "pass" : "fail"}`}>{headline}</h1>

          <div className="score-display">
            <span className="score-number">{correctCount}</span>
            <span className="score-denom">/ {total}</span>
          </div>

          <div className="score-bar-wrap">
            <div className="score-bar-fill" style={{ width: `${pct}%` }} />
          </div>

          <span className={`pass-badge ${passed ? "pass" : "fail"}`}>
            {passed ? "✅ PASSED" : "❌ FAILED"} · {pct}% correct
          </span>
        </div>

        {/* Breakdown */}
        <h2 className="breakdown-title">📋 Question Breakdown</h2>

        {questions.map((q, i) => {
          const userAns = userAnswers[i]
          const isCorrect = userAns === q.correct_answer
          return (
            <div key={i} className={`qa-item ${isCorrect ? "correct-item" : "incorrect-item"}`}>
              <div className="qa-number">Question {i + 1}</div>
              <p className="qa-question">{decodeHtml(q.question)}</p>
              <div className="qa-answers">
                <span className={`qa-chip ${isCorrect ? "your-correct" : "your-wrong"}`}>
                  {isCorrect ? "✅" : "❌"} You: {userAns ?? "No answer"}
                </span>
                {!isCorrect && (
                  <span className="qa-chip correct-ans">
                    💡 Correct: {q.correct_answer}
                  </span>
                )}
              </div>
            </div>
          )
        })}

        {/* Actions */}
        <div className="results-actions">
          <Link to="/quiz/0" className="btn btn-replay" onClick={resetQuiz}>
            🔄 Play Again
          </Link>
          <Link to="/" className="btn btn-home" onClick={resetQuiz}>
            🏠 Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
