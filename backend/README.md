# SkillMatch LA — Backend

AI-powered career roadmap API for underserved LA residents. Users submit their current job, skills (typed or extracted from a résumé), and target role. The backend fetches real LA job listings, runs them through Gemini 2.5 Flash to identify skill gaps, and returns matched jobs plus a weekly learning roadmap using free LA resources.

## Stack

| Layer | Technology |
|---|---|
| Framework | [Hono](https://hono.dev/) — lightweight, edge-first web framework |
| Runtime | Node.js + TypeScript (`tsx`) |
| AI | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| Jobs API | JSearch via RapidAPI |
| Deployment | Vercel serverless functions |

## Local Development

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Set up environment variables

Create a `backend/.env` file:

```
GEMINI_API_KEY=your_gemini_api_key
JOB_API_KEY=your_rapidapi_key
```

- **GEMINI_API_KEY** — [Google AI Studio](https://aistudio.google.com/)
- **JOB_API_KEY** — RapidAPI key with [JSearch](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch) subscription (free tier: 200 req/month)

### 3. Start the dev server

```bash
npm run dev
# → Server running at http://localhost:3000
```

## API

### `GET /`

Health check.

```json
{ "ok": true, "message": "SkillMatch backend running" }
```

### `POST /api/analyze`

Core endpoint. Accepts either JSON (manual skills) or `multipart/form-data` (résumé PDF upload).

**Option A — JSON body (manual skills)**

```json
{
  "currentJob": "Cashier",
  "skills": ["Excel", "Customer Service"],
  "targetJob": "Data Analyst",
  "location": "Los Angeles, CA"
}
```

**Option B — FormData (résumé upload)**

| Field | Type | Description |
|---|---|---|
| `currentJob` | string | User's current job title |
| `targetJob` | string | Target role |
| `location` | string | Location (defaults to `Los Angeles, CA`) |
| `resume` | File (PDF) | Résumé — Gemini extracts the top 10 skills most relevant to `targetJob` |

**Response**

```json
{
  "success": true,
  "currentRole": "Cashier",
  "dreamRole": "Data Analyst",
  "currentSkills": ["Excel", "Customer Service"],
  "skillGap": {
    "have": [{ "name": "Excel", "level": "Current", "description": "..." }],
    "need": [{ "name": "SQL", "priority": "High", "description": "..." }]
  },
  "roadmap": {
    "totalTime": "8 weeks",
    "steps": [{ "id": 1, "title": "...", "duration": "2 weeks", "description": "...", "milestone": "..." }]
  },
  "resources": [
    {
      "skill": "SQL",
      "items": [{ "name": "...", "type": "Free Online Course", "availability": "...", "url": "..." }]
    }
  ],
  "jobPostings": [
    { "id": 1, "title": "...", "company": "...", "location": "...", "salary": "...", "posted": "...", "matchPercent": 72, "skills": ["SQL", "Excel"] }
  ]
}
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Hono app + route handlers
│   ├── services/
│   │   ├── jobs.ts           # JSearch API fetch + salary/date formatting
│   │   └── llm.ts            # Gemini analysis + JSON parsing
│   └── utils/
│       ├── prompt.ts         # Prompt builder
│       └── extractSkills.ts  # PDF résumé → top 10 skills via Gemini
├── .env                      # Local env vars (gitignored)
├── package.json
└── tsconfig.json
```

## Deployment

Add `GEMINI_API_KEY` and `JOB_API_KEY` to your Vercel project's environment variables, then:

```bash
vc deploy
```
