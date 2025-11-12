import { Link } from "react-router"
import { useQuizContext } from "../context/QuizContext"

const ResultsPage = () => {
  const { questions, userAnswers } = useQuizContext()

  const correctAnswers = questions.filter((q, index) => q.correct_answer === userAnswers[index]).length
  const passed = correctAnswers >= 5

  return (
    <div className="container">
      <h1>Quiz Results</h1>
      <div className="result-summary">
        <p>
          You got {correctAnswers} out of {questions.length} correct.
        </p>
        <p className={passed ? "correct" : "incorrect"}>
          {passed ? "Congratulations! You passed!" : "Sorry, you did not pass."}
        </p>
      </div>
      <h2>Question Summary:</h2>
      {questions.map((q, index) => (
        <div key={index} className="question-summary">
          <p>
            Question {index + 1}: {q.question}
          </p>
          <p className={userAnswers[index] === q.correct_answer ? "correct" : "incorrect"}>
            Your answer: {userAnswers[index] || "Not answered"}
          </p>
          <p className="correct">Correct answer: {q.correct_answer}</p>
        </div>
      ))}
      <Link to="/" className="btn btn-primary">
        Play Again
      </Link>
    </div>
  )
}

export default ResultsPage



