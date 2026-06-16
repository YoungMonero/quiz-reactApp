import { createContext, useState, useContext, useCallback } from "react"
import PropTypes from "prop-types"

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0)
    setUserAnswers([])
  }, [])

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        userAnswers,
        setUserAnswers,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

QuizProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useQuizContext = () => {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuizContext must be used within a QuizProvider")
  }
  return context
}
