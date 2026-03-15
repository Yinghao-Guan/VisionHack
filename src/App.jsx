import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import InputForm from './components/InputForm'
import DarkVeil from './components/DarkVeil'
import AnalysisProgress from './components/AnalysisProgress'
import Results from './components/Results'
import { refreshScrollTrigger } from './hooks/useScrollTrigger'

const stages = [
  { progress: 33, message: 'Preparing your profile...' },
  { progress: 66, message: 'Building your roadmap...' },
  { progress: 100, message: 'Almost ready...' },
]

function App() {
  const [showResults, setShowResults] = useState(false)
  const [resultsData, setResultsData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stageMessage, setStageMessage] = useState('')
  const progressRef = useRef(null)

  const handleFormSubmit = async ({ currentJob, dreamJob, skills, resumeFile }) => {
    setShowResults(false)
    setLoading(true)
    setProgress(stages[0].progress)
    setStageMessage(stages[0].message)

    // Auto-scroll to progress card after it renders
    setTimeout(() => {
      progressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)

    const stageTwoTimer = setTimeout(() => {
      setProgress(stages[1].progress)
      setStageMessage(stages[1].message)
    }, 800)

    const stageThreeTimer = setTimeout(() => {
      setProgress(stages[2].progress)
      setStageMessage(stages[2].message)
    }, 1600)

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

      let response
      if (resumeFile) {
        const formData = new FormData()
        formData.append('currentJob', currentJob)
        formData.append('targetJob', dreamJob)
        formData.append('location', 'Los Angeles, CA')
        formData.append('resume', resumeFile)
        response = await fetch(`${apiBaseUrl}/api/analyze`, { method: 'POST', body: formData })
      } else {
        response = await fetch(`${apiBaseUrl}/api/analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentJob, skills, targetJob: dreamJob, location: 'Los Angeles, CA' }),
        })
      }

      const payload = await response.json()
      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Failed to analyze profile')
      }

      setResultsData(payload)
      setShowResults(true)
    } finally {
      clearTimeout(stageTwoTimer)
      clearTimeout(stageThreeTimer)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showResults) {
      refreshScrollTrigger()
    }
  }, [showResults])

  return (
    <div className="min-h-screen bg-cream">
      <Hero />

      {/* Everything after Hero shares a sticky DarkVeil background */}
      <div className="relative">
        {/* Sticky DarkVeil — stays fixed on screen while scrolling through form + results */}
        <div className="sticky top-0 h-screen -mb-[100vh] z-0 pointer-events-none">
          <DarkVeil />
        </div>

        {/* Content sits on top of DarkVeil */}
        <div className="relative z-[1]">
          <InputForm onSubmit={handleFormSubmit} loading={loading} />

          <AnimatePresence>
            {loading && (
              <motion.div
                ref={progressRef}
                key="progress"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnalysisProgress progress={progress} stage={stageMessage} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <Results data={resultsData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default App
