interface RawJob {
  title: string
  company: string
  location: string
  description: string
  requiredSkills: string[]
  applyLink: string
  postedAt: string
  salary: string
}

export async function fetchJobs(targetJob: string, location: string): Promise<RawJob[]> {
  const apiKey = process.env.JOB_API_KEY
  if (!apiKey) throw new Error('JOB_API_KEY is not set')

  const query = encodeURIComponent(`${targetJob} in ${location}`)
  const url = `https://jsearch.p.rapidapi.com/search?query=${query}&page=1&num_pages=1`

  const response = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
  })

  if (!response.ok) throw new Error(`JSearch API error: ${response.status}`)

  const json = await response.json() as { data: any[] }
  const jobs = (json.data ?? []).slice(0, 10)

  return jobs.map((job: any): RawJob => ({
    title: job.job_title ?? 'Unknown Title',
    company: job.employer_name ?? 'Unknown Company',
    location: `${job.job_city ?? ''}, ${job.job_state ?? ''}`.trim().replace(/^,\s*/, ''),
    description: (job.job_description ?? '').slice(0, 800),
    requiredSkills: Array.isArray(job.job_required_skills) ? job.job_required_skills : [],
    applyLink: job.job_apply_link ?? '',
    postedAt: formatPostedAt(job.job_posted_at_datetime_utc ?? job.job_posted_at_timestamp),
    salary: formatSalary(job),
  }))
}

function formatPostedAt(rawPostedAt: unknown): string {
  if (!rawPostedAt) return 'Recently posted'

  const date = new Date(String(rawPostedAt))
  if (Number.isNaN(date.getTime())) return 'Recently posted'

  const diffMs = Date.now() - date.getTime()
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 30) return `${diffDays} days ago`

  return '30+ days ago'
}

function formatSalary(job: any): string {
  const min = Number(job.job_min_salary)
  const max = Number(job.job_max_salary)
  const period = typeof job.job_salary_period === 'string' ? job.job_salary_period.toLowerCase() : 'year'

  if (!Number.isFinite(min) && !Number.isFinite(max)) return 'Salary not listed'

  const format = (value: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

  if (Number.isFinite(min) && Number.isFinite(max)) {
    return `${format(min)} - ${format(max)} / ${period}`
  }

  const single = Number.isFinite(min) ? min : max
  return `${format(single)} / ${period}`
}
