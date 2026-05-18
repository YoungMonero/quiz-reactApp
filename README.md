# Quiz React App

A simple and interactive quiz application built with React. The app fetches True/False questions from an external API, presents them one at a time with a countdown timer, and displays a detailed results page at the end.

## 🚀 Features

- Fetches quiz questions from an external API.
- Welcome screen to start the quiz.
- One question displayed at a time.
- 30-second countdown timer for each question.
- Automatic progression when time runs out.
- Stores user answers using React Context.
- Results page with:
  - Total score
  - Pass/fail status
  - Detailed answer summary
- "Play Again" option to restart the quiz.
- Client-side routing using React Router.

---

## 🛠️ Tech Stack

- React
- React Router
- Context API
- JavaScript (ES6+)
- CSS

---

## 📂 Project Structure

```text
quiz-reactApp/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── WelcomePage.jsx
│   │   ├── QuizPage.jsx
│   │   └── ResultsPage.jsx
│   ├── context/
│   │   └── QuizContext.jsx
│   ├── services/
│   │   └── quizService.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md

## 📦 Installation

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/YoungMonero/quiz-reactApp.git

cd contact-maneger/quiz-reactApp

npm install

npm run dev

http://localhost:5173