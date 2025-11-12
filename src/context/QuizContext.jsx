import { createContext, useState, useContext } from "react"
import PropTypes from "prop-types"

const QuizContext = createContext()

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        userAnswers,
        setUserAnswers,
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

