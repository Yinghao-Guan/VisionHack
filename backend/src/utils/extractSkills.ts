import { GoogleGenerativeAI } from '@google/generative-ai'

export async function extractSkillsFromPdf(pdfBuffer: ArrayBuffer): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const base64 = Buffer.from(pdfBuffer).toString('base64')

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: 'application/pdf',
        data: base64,
      },
    },
    'Extract all professional and technical skills from this resume. Return ONLY a JSON array of skill strings — no markdown, no explanation. Example: ["Python", "SQL", "Customer Service", "Excel"]',
  ])

  let raw = result.response.text().trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()

  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.filter((s): s is string => typeof s === 'string')
  } catch {
    const start = raw.indexOf('[')
    const end = raw.lastIndexOf(']')
    if (start !== -1 && end !== -1) {
      const parsed = JSON.parse(raw.slice(start, end + 1))
      if (Array.isArray(parsed)) return parsed.filter((s): s is string => typeof s === 'string')
    }
  }

  throw new Error('Could not extract skills from resume')
}
