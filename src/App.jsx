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
      <WaveDivider fillTop="#4A3560" fillBottom="#F5E6D3" />
      <InputForm onSubmit={handleFormSubmit} />

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Results data={resultsData} />
          </motion.div>
        )}
      </AnimatePresence>

      <WaveDivider fillTop={showResults ? '#F5E6D3' : '#F5E6D3'} fillBottom="#4A3560" />
      <Footer />
    </div>
  )
}

export default App
