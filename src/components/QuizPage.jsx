import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useQuizContext } from "../context/QuizContext"

const QuizPage = () => {
  const { questions, currentQuestionIndex, setCurrentQuestionIndex, userAnswers, setUserAnswers } = useQuizContext()
  const [timeLeft, setTimeLeft] = useState(30)
  const navigate = useNavigate()
  const { questionId } = useParams()

  useEffect(() => {
    setCurrentQuestionIndex(Number.parseInt(questionId || "0", 10))
  }, [questionId, setCurrentQuestionIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(null)
    }
  }, [timeLeft])

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestionIndex] = answer
    setUserAnswers(newAnswers)

    if (currentQuestionIndex < questions.length - 1) {
      navigate(`/quiz/${currentQuestionIndex + 1}`)
      setTimeLeft(30)
    } else {
      navigate("/results")
    }
  }

  if (!questions[currentQuestionIndex]) {
    return <div className="container">Loading...</div>
  }

  const { question } = questions[currentQuestionIndex]

  return (
    <div className="container">
      <div className="question-container">
        <h1>
          Question {currentQuestionIndex + 1} of {questions.length}
        </h1>
        <p>{question}</p>
        <div className="btn-all">
          <button className="btn btn-success" onClick={() => handleAnswer("True")}>
            True
          </button>
          <button className="btn btn-danger" onClick={() => handleAnswer("False")}>
            False
          </button>
        </div>
      </div>
      <div className="timer">Time left: {timeLeft} seconds</div>
    </div>
  )
}

export default QuizPage



