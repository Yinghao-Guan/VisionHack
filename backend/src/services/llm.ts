import { GoogleGenerativeAI } from '@google/generative-ai'

interface SkillNeed {
  name: string
  priority: 'High' | 'Medium' | 'Low'
  description: string
}

interface RoadmapStep {
  id: number
  title: string
  duration: string
  description: string
  milestone: string
}

interface ResourceItem {
  name: string
  type: string
  availability: string
  url: string
}

interface ResourceGroup {
  skill: string
  items: ResourceItem[]
}

interface JobPosting {
  id: number
  title: string
  company: string
  location: string
  salary: string
  posted: string
  matchPercent: number
  skills: string[]
}

interface AnalysisResult {
  skillGap: {
    need: SkillNeed[]
  }
  roadmap: {
    totalTime: string
    steps: RoadmapStep[]
  }
  resources: ResourceGroup[]
  jobPostings: JobPosting[]
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

  if (!parsed.skillGap || !Array.isArray(parsed.skillGap.need)) {
    throw new Error('Gemini response missing skillGap.need')
  }
  if (!parsed.roadmap || !Array.isArray(parsed.roadmap.steps)) {
    throw new Error('Gemini response missing roadmap.steps')
  }
  if (!Array.isArray(parsed.resources)) {
    throw new Error('Gemini response missing resources')
  }
  if (!Array.isArray(parsed.jobPostings)) {
    throw new Error('Gemini response missing jobPostings')
  }

  return {
    skillGap: parsed.skillGap,
    roadmap: parsed.roadmap,
    resources: parsed.resources,
    jobPostings: parsed.jobPostings,
  }
}
