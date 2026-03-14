import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import WaveDivider from './components/WaveDivider'
import InputForm from './components/InputForm'
import Results from './components/Results'
import Footer from './components/Footer'
import { mockResults } from './data/mockData'
import { refreshScrollTrigger } from './hooks/useScrollTrigger'

function App() {
  const [showResults, setShowResults] = useState(false)

  const handleFormSubmit = () => {
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
            <Results data={mockResults} />
          </motion.div>
        )}
      </AnimatePresence>

      <WaveDivider fillTop={showResults ? '#0a0a0f' : '#111827'} fillBottom="#0f172a" />
      <Footer />
    </div>
  )
}

export default App
