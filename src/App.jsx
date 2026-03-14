import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import InputForm from './components/InputForm'
import AnalysisProgress from './components/AnalysisProgress'
import Results from './components/Results'
import { mockResults } from './data/mockData'
import { refreshScrollTrigger } from './hooks/useScrollTrigger'

const stages = [
  { progress: 33, message: 'Preparing your profile...' },
  { progress: 66, message: 'Building your roadmap...' },
  { progress: 100, message: 'Almost ready...' },
]

function App() {
  const [showResults, setShowResults] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stageMessage, setStageMessage] = useState('')
  const progressRef = useRef(null)

  const handleFormSubmit = () => {
    setLoading(true)
    setProgress(stages[0].progress)
    setStageMessage(stages[0].message)

    // Auto-scroll to progress card after it renders
    setTimeout(() => {
      progressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)

    setTimeout(() => {
      setProgress(stages[1].progress)
      setStageMessage(stages[1].message)
    }, 800)

    setTimeout(() => {
      setProgress(stages[2].progress)
      setStageMessage(stages[2].message)
    }, 1600)

    setTimeout(() => {
      setLoading(false)
      setShowResults(true)
    }, 2400)
  }

  useEffect(() => {
    if (showResults) {
      refreshScrollTrigger()
    }
  }, [showResults])

  return (
    <div className="min-h-screen bg-cream">
      <Hero />
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
            <Results data={mockResults} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
