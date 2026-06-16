const CACHE_KEY = "quiz_questions_cache"
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

export const fetchQuestions = async (retries = 3, delayMs = 2000) => {
  // Return cached questions if still fresh (avoids 429 on hot reload)
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const { questions, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp < CACHE_TTL_MS) {
        return questions
      }
    }
  } catch (_) {
    // ignore bad cache
  }

  let lastError
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"
      )

      if (response.status === 429) {
        // Rate limited — wait and retry
        const wait = delayMs * attempt
        console.warn(`Rate limited (429). Retrying in ${wait}ms… (attempt ${attempt}/${retries})`)
        await sleep(wait)
        continue
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // OpenTDB sometimes returns response_code 5 (no results / rate limit)
      if (data.response_code === 5) {
        const wait = delayMs * attempt
        console.warn(`OpenTDB rate limit (code 5). Retrying in ${wait}ms…`)
        await sleep(wait)
        continue
      }

      if (!data.results?.length) {
        throw new Error("No questions returned from API")
      }

      // Cache for this session
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ questions: data.results, timestamp: Date.now() })
        )
      } catch (_) {
        // sessionStorage unavailable – no big deal
      }

      return data.results
    } catch (err) {
      lastError = err
      if (attempt < retries) {
        await sleep(delayMs * attempt)
      }
    }
  }

  throw lastError ?? new Error("Failed to fetch questions after multiple attempts")
}

export const clearQuestionCache = () => {
  try { sessionStorage.removeItem(CACHE_KEY) } catch (_) {}
}
