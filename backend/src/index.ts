import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.json({ ok: true, message: 'SkillMatch backend running' })
})

app.post('/api/analyze', async (c) => {
  const body = await c.req.json()

  const { currentJob, skills, targetJob, location } = body

  return c.json({
    success: true,
    inputSummary: {
      currentJob,
      skills,
      targetJob,
      location: location || 'Los Angeles',
    },
    matchedJobs: [
      {
        title: 'Junior Data Analyst',
        company: 'ABC Inc',
        location: 'Los Angeles, CA',
        matchScore: 72,
        missingSkills: ['SQL', 'Tableau'],
        link: 'https://example.com/job-1',
      },
      {
        title: 'Operations Analyst',
        company: 'Metro Support',
        location: 'Los Angeles, CA',
        matchScore: 68,
        missingSkills: ['SQL', 'Data Visualization'],
        link: 'https://example.com/job-2',
      },
    ],
    skillGaps: ['SQL', 'Tableau', 'Data Visualization'],
    roadmap: [
      {
        week: 1,
        focus: 'Learn SQL basics',
        resources: ['freeCodeCamp SQL', 'Khan Academy SQL'],
      },
      {
        week: 2,
        focus: 'Practice SQL queries and joins',
        resources: ['SQLBolt', 'Mode SQL Tutorial'],
      },
      {
        week: 3,
        focus: 'Learn Tableau basics',
        resources: ['Tableau Free Training', 'YouTube Tableau Intro'],
      },
    ],
  })
})

export default app