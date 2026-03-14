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
  "matchedJobs": [
    {
      "title": "string",
      "company": "string",
      "location": "string",
      "matchScore": number 0-100,
      "missingSkills": ["string"],
      "link": "string"
    }
  ],
  "skillGaps": ["deduplicated list of all missing skills across top jobs"],
  "roadmap": [
    {
      "week": 1,
      "focus": "string",
      "resources": ["platform name and course name"]
    }
  ]
}

## Rules
1. Return 3-5 matched jobs from the listings. Pick the most relevant.
2. matchScore: 0-100 based on how many required skills the user already has.
3. missingSkills: ONLY skills the user does NOT have. User's skills: ${profile.skills.join(', ')}.
4. skillGaps: deduplicated union of all missingSkills, sorted by frequency.
5. roadmap: 4-8 weeks, building progressively from foundations to job-ready.
6. ALL resources must be FREE and accessible in LA. Prefer: freeCodeCamp, Khan Academy, Coursera (audit), edX (audit), Google Career Certificates, YouTube, LA Public Library (lapl.org — free LinkedIn Learning with library card), Workforce Development Board of LA County, LATTC, LACCD.
7. Resources must be specific: include platform name and course/page name.
8. Do NOT include any text outside the JSON. Do NOT use markdown code fences.`
}
