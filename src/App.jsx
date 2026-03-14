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
      <WaveDivider fillTop="#4A3560" fillBottom="#F5E6D3" />
      <InputForm onSubmit={handleFormSubmit} />

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Results data={mockResults} />
          </motion.div>
        )}
      </AnimatePresence>

      <WaveDivider fillTop={showResults ? '#F5E6D3' : '#F5E6D3'} fillBottom="#4A3560" />
      <Footer />
    </div>
  )
}

export default App
