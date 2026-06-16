import { useEffect, useState, useCallback } from "react"
import { useNavigate, useParams } from "react-router"
import { useQuizContext } from "../context/QuizContext"

const TIMER_MAX = 30

function decodeHtml(html) {
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}

const QuizPage = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, userAnswers, setUserAnswers } = useQuizContext()
  const [timeLeft, setTimeLeft] = useState(TIMER_MAX)
  const navigate = useNavigate()
  const { questionId } = useParams()

  const idx = Number.parseInt(questionId || "0", 10)

  useEffect(() => {
    setCurrentQuestionIndex(idx)
    setTimeLeft(TIMER_MAX)
  }, [idx, setCurrentQuestionIndex])

  const handleAnswer = useCallback((answer) => {
    const newAnswers = [...userAnswers]
    newAnswers[idx] = answer
    setUserAnswers(newAnswers)

    if (idx < questions.length - 1) {
      navigate(`/quiz/${idx + 1}`)
    } else {
      navigate("/results")
    }
  }, [idx, questions.length, navigate, userAnswers, setUserAnswers])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [idx]) // reset timer when question changes

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(null)
    }
  }, [timeLeft, handleAnswer])

  if (!questions[idx]) {
    return (
      <div className="page-wrapper">
        <div className="loading-wrap">
          <div className="loading-spinner" />
          Loading question…
        </div>
      </div>
    )
  }

  const { question, category } = questions[idx]
  const progress = ((idx) / questions.length) * 100
  const timerClass = timeLeft <= 5 ? "danger" : timeLeft <= 10 ? "warning" : "normal"
  const timerBarColor = timeLeft <= 5
    ? "#EF4444"
    : timeLeft <= 10
    ? "#F97316"
    : "#7C3AED"
  const timerBarWidth = (timeLeft / TIMER_MAX) * 100

  return (
    <div className="page-wrapper">
      <div className="card">
        {/* Header */}
        <div className="quiz-header">
          <span className="question-badge">Q {idx + 1} / {questions.length}</span>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Timer */}
        <div className="timer-arc">
          <div
            className="timer-arc-fill"
            style={{ width: `${timerBarWidth}%`, background: timerBarColor }}
          />
        </div>

        <div className="timer-row">
          <span className="timer-icon">⏱️</span>
          <span className="timer-label">Time left</span>
          <span className={`timer-value ${timerClass}`}>{timeLeft}</span>
          <span className="timer-label">sec</span>
        </div>

        {/* Question */}
        <div className="question-card">
          {category && (
            <div className="question-category">📚 {decodeHtml(category)}</div>
          )}
          <p className="question-text">{decodeHtml(question)}</p>
        </div>

        {/* Answers */}
        <div className="answer-row">
          <button className="btn btn-true" onClick={() => handleAnswer("True")}>
            ✅ True
          </button>
          <button className="btn btn-false" onClick={() => handleAnswer("False")}>
            ❌ False
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
