export const fetchQuestions = async () => {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching questions:", error)
    throw error
  }
}


