import { Link } from "react-router"

const WelcomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Quiz Game!</h1>
      <p>
        Answer 10 true/false questions. You have 30 seconds for each question. Pass by answering at least 5 correctly.
      </p>
      <div className="bb"><Link to="/quiz/0" className="btn btn-primary">
        Start Quiz
      </Link>
      </div>
    </div>
  )
}

export default WelcomePage



