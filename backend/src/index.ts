import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { fetchJobs } from './services/jobs.js'
import { analyzeWithGemini } from './services/llm.js'
import { buildPrompt } from './utils/prompt.js'

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => c.json({ ok: true, message: 'SkillMatch backend running' }))

app.post('/api/analyze', async (c) => {
  try {
    const { currentJob, skills, targetJob, location } = await c.req.json()

    if (!currentJob || !Array.isArray(skills) || skills.length === 0 || !targetJob) {
      return c.json({ success: false, error: 'Missing required fields: currentJob, skills, targetJob' }, 400)
    }

    const resolvedLocation = location || 'Los Angeles, CA'
    const jobs = await getJobsWithFallback(targetJob, resolvedLocation)

    const prompt = buildPrompt({ currentJob, skills, targetJob, location: resolvedLocation }, jobs)
    const analysis = await analyzeWithGemini(prompt)
    const normalizedJobPostings = (analysis.jobPostings ?? []).map((job: any, index: number) => ({
      id: Number.isFinite(job.id) ? job.id : index + 1,
      title: job.title ?? 'Unknown role',
      company: job.company ?? 'Unknown company',
      location: job.location ?? resolvedLocation,
      salary: job.salary ?? 'Salary not listed',
      posted: job.posted ?? 'Recently posted',
      matchPercent: clampPercent(job.matchPercent),
      skills: Array.isArray(job.skills) ? job.skills : [],
    }))
    const fallbackJobPostings = buildFallbackJobPostings(jobs, skills)

    return c.json({
      success: true,
      currentRole: currentJob,
      dreamRole: targetJob,
      currentSkills: skills,
      skillGap: {
        have: skills.map((skill: string) => ({
          name: skill,
          level: 'Current',
          description: `You already listed ${skill} as a current skill.`,
        })),
        need: (analysis.skillGap?.need ?? []).map((item: any) => ({
          name: item.name ?? 'Unknown skill',
          priority: normalizePriority(item.priority),
          description: item.description ?? 'Common requirement in target job listings.',
        })),
      },
      roadmap: {
        totalTime: analysis.roadmap?.totalTime ?? '6-8 weeks',
        steps: (analysis.roadmap?.steps ?? []).map((step: any, index: number) => ({
          id: Number.isFinite(step.id) ? step.id : index + 1,
          title: step.title ?? `Step ${index + 1}`,
          duration: step.duration ?? '1 week',
          description: step.description ?? 'Complete this step to move toward your target role.',
          milestone: step.milestone ?? 'Finish the key exercises for this step.',
        })),
      },
      resources: (analysis.resources ?? []).map((group: any) => ({
        skill: group.skill ?? 'General',
        items: Array.isArray(group.items)
          ? group.items.map((item: any) => ({
              name: item.name ?? 'Learning resource',
              type: item.type ?? 'Free Online Course',
              availability: item.availability ?? 'Free or free-to-audit',
              url: item.url ?? '#',
            }))
          : [],
      })),
      jobPostings: normalizedJobPostings.length > 0 ? normalizedJobPostings : fallbackJobPostings,
    })
  } catch (err) {
    console.error('[/api/analyze]', err)
    return c.json({ success: false, error: err instanceof Error ? err.message : 'Internal server error' }, 500)
  }
})

function normalizePriority(priority: unknown): 'High' | 'Medium' | 'Low' {
  const value = String(priority ?? '').toLowerCase()
  if (value === 'high') return 'High'
  if (value === 'low') return 'Low'
  return 'Medium'
}

function clampPercent(value: unknown): number {
  const num = Number(value)
  if (!Number.isFinite(num)) return 0
  return Math.min(100, Math.max(0, Math.round(num)))
}

interface JobSource {
  title: string
  company: string
  location: string
  requiredSkills: string[]
  postedAt: string
  salary: string
}

function buildFallbackJobPostings(jobs: JobSource[], userSkills: string[]) {
  const normalizedUserSkills = new Set(userSkills.map((skill) => String(skill).trim().toLowerCase()))

  return jobs.slice(0, 5).map((job, index) => {
    const jobSkills = Array.isArray(job.requiredSkills) ? job.requiredSkills.filter(Boolean).slice(0, 6) : []
    const matched = jobSkills.filter((skill) => normalizedUserSkills.has(String(skill).trim().toLowerCase())).length
    const matchPercent = jobSkills.length > 0
      ? Math.round((matched / jobSkills.length) * 100)
      : Math.max(40, 70 - index * 5)

    return {
      id: index + 1,
      title: job.title || 'Unknown role',
      company: job.company || 'Unknown company',
      location: job.location || 'Los Angeles, CA',
      salary: job.salary || 'Salary not listed',
      posted: job.postedAt || 'Recently posted',
      matchPercent: clampPercent(matchPercent),
      skills: jobSkills,
    }
  })
}

async function getJobsWithFallback(targetJob: string, location: string) {
  try {
    const jobs = await fetchJobs(targetJob, location)
    if (jobs.length > 0) return jobs
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (!isJSearchForbiddenError(message)) {
      throw err
    }
    console.warn('[jobs] JSearch returned 403, using fallback sample jobs for local testing.')
  }

  return [
    {
      title: targetJob,
      company: 'Sample LA Employer',
      location,
      description: `Sample posting for ${targetJob} in ${location}.`,
      requiredSkills: ['Communication', 'Problem Solving', 'Technical Fundamentals'],
      applyLink: 'https://example.com/job-1',
      postedAt: 'Recently posted',
      salary: 'Salary not listed',
    },
    {
      title: `Junior ${targetJob}`,
      company: 'Community Org LA',
      location,
      description: `Entry-level ${targetJob} role for local applicants.`,
      requiredSkills: ['Teamwork', 'Data Literacy', 'Tool Proficiency'],
      applyLink: 'https://example.com/job-2',
      postedAt: 'Recently posted',
      salary: 'Salary not listed',
    },
    {
      title: `${targetJob} Associate`,
      company: 'Regional Services Group',
      location,
      description: `Associate-level ${targetJob} position with growth path.`,
      requiredSkills: ['Documentation', 'Analysis', 'Stakeholder Communication'],
      applyLink: 'https://example.com/job-3',
      postedAt: 'Recently posted',
      salary: 'Salary not listed',
    },
  ]
}

function isJSearchForbiddenError(message: string): boolean {
  return /JSearch API error:\s*403\b/i.test(message)
}

serve({ fetch: app.fetch, port: 3000 }, (info: { port: number }) => {
  console.log(`Server running at http://localhost:${info.port}`)
})

export default app
