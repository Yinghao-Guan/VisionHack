import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import WaveDivider from './components/WaveDivider'
import InputForm from './components/InputForm'
import Results from './components/Results'
import Footer from './components/Footer'
import { refreshScrollTrigger } from './hooks/useScrollTrigger'

function App() {
  const [showResults, setShowResults] = useState(false)
  const [resultsData, setResultsData] = useState(null)

  const handleFormSubmit = async ({ currentJob, dreamJob, skills }) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${apiBaseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentJob,
        skills,
        targetJob: dreamJob,
        location: 'Los Angeles, CA',
      }),
    })

    const payload = await response.json()
    if (!response.ok || !payload.success) {
      throw new Error(payload.error || 'Failed to analyze profile')
    }

    setResultsData(payload)
    setShowResults(true)
  }

  useEffect(() => {
    if (showResults) {
      refreshScrollTrigger()
    }
  }, [showResults])

  return (
    <div className="min-h-screen bg-cream">
      <Hero />
      <WaveDivider fillTop="#0f172a" fillBottom="#111827" />
      <InputForm onSubmit={handleFormSubmit} />

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

      <WaveDivider fillTop={showResults ? '#0a0a0f' : '#111827'} fillBottom="#0f172a" />
      <Footer />
    </div>
  )
}

export default App
