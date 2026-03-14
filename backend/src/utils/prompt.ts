interface UserProfile {
  currentJob: string
  skills: string[]
  targetJob: string
  location: string
}

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

export function buildPrompt(profile: UserProfile, jobs: RawJob[]): string {
  const jobsText = jobs
    .map((job, i) => {
      const skills = job.requiredSkills.length > 0
        ? job.requiredSkills.join(', ')
        : 'Not specified'
      return `Job ${i + 1}:
  Title: ${job.title}
  Company: ${job.company}
  Location: ${job.location}
  Posted: ${job.postedAt}
  Salary: ${job.salary}
  Required Skills: ${skills}
  Description Excerpt: ${job.description}
  Apply Link: ${job.applyLink}`
    })
    .join('\n\n')

  return `You are a career counselor helping underserved residents of Los Angeles transition into better-paying jobs.

## User Profile
- Current Job: ${profile.currentJob}
- Current Skills: ${profile.skills.join(', ')}
- Target Job: ${profile.targetJob}
- Location: ${profile.location}

## Real Job Listings Found
${jobsText}

## Your Task
Analyze the gap between the user's current skills and what the job listings require. Return a JSON object with EXACTLY this structure — no markdown, no explanation, just raw JSON:

{
  "skillGap": {
    "need": [
      {
        "name": "string",
        "priority": "High | Medium | Low",
        "description": "string"
      }
    ]
  },
  "roadmap": {
    "totalTime": "string",
    "steps": [
      {
        "id": 1,
        "title": "string",
        "duration": "string",
        "description": "string",
        "milestone": "string"
      }
    ]
  },
  "resources": [
    {
      "skill": "string",
      "items": [
        {
          "name": "string",
          "type": "Free Online Course | Online Course | Community College | Certificate Program | In-Person Workshop | Free Software | Practice Dataset",
          "availability": "string",
          "url": "string"
        }
      ]
    }
  ],
  "jobPostings": [
    {
      "id": 1,
      "title": "string",
      "company": "string",
      "location": "string",
      "salary": "string",
      "posted": "string",
      "matchPercent": number 0-100,
      "skills": ["string"]
    }
  ]
}

## Rules
1. Return 3-5 jobPostings, only from the listings above. Pick most relevant.
2. matchPercent: 0-100 based on how many required skills the user already has.
3. skillGap.need: ONLY skills the user does NOT have. User's skills: ${profile.skills.join(', ')}.
4. skillGap.need.priority: High for urgent/frequent requirements, Medium for common, Low for optional.
5. roadmap.steps: 4-8 progressive steps from foundations to job-ready.
6. resources: group by skill. Include 1-3 items per skill. ALL resources should be free or free-to-audit and accessible in LA.
7. Resource URLs should be real URLs when possible; otherwise use a best official homepage URL.
8. jobPostings.skills: include the most relevant required skills for each posting.
9. Do NOT include any text outside the JSON. Do NOT use markdown code fences.`
}
