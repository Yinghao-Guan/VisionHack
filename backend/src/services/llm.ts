import { GoogleGenerativeAI } from '@google/generative-ai'

interface AnalysisResult {
  matchedJobs: any[]
  skillGaps: string[]
  roadmap: any[]
}

export async function analyzeWithGemini(prompt: string): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const result = await model.generateContent(prompt)
  const rawText = result.response.text()

  return parseGeminiResponse(rawText)
}

function parseGeminiResponse(raw: string): AnalysisResult {
  let cleaned = raw.trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()

  let parsed: any
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    // Fallback: extract the outermost { ... }
    const start = cleaned.indexOf('{')
    const end = cleaned.lastIndexOf('}')
    if (start === -1 || end === -1) {
      throw new Error(`Gemini returned non-JSON: ${cleaned.slice(0, 200)}`)
    }
    parsed = JSON.parse(cleaned.slice(start, end + 1))
  }

  if (!Array.isArray(parsed.matchedJobs)) throw new Error('Gemini response missing matchedJobs')
  if (!Array.isArray(parsed.skillGaps)) throw new Error('Gemini response missing skillGaps')
  if (!Array.isArray(parsed.roadmap)) throw new Error('Gemini response missing roadmap')

  return { matchedJobs: parsed.matchedJobs, skillGaps: parsed.skillGaps, roadmap: parsed.roadmap }
}
