import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from './SectionWrapper'

export default function InputForm({ onSubmit }) {
  const [currentJob, setCurrentJob] = useState('')
  const [dreamJob, setDreamJob] = useState('')
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')
  const [loading, setLoading] = useState(false)

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed])
      setSkillInput('')
    }
  }

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentJob || !dreamJob || skills.length === 0) return

    setLoading(true)
    try {
      await onSubmit({ currentJob, dreamJob, skills })
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unable to generate roadmap')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SectionWrapper id="input-form" className="bg-sand">
      <div className="max-w-2xl mx-auto">
        <h2 className="gsap-fade-up font-heading text-3xl md:text-4xl font-bold text-dark-purple text-center mb-3">
          Tell Us About Yourself
        </h2>
        <p className="gsap-fade-up text-light-text text-center mb-10 text-lg">
          We&apos;ll build a personalized roadmap just for you.
        </p>

        <form onSubmit={handleSubmit} className="gsap-fade-up glass-card p-8 md:p-10 space-y-6">
          {/* Current Job */}
          <div>
            <label className="block text-sm font-semibold text-dark-purple mb-2">
              Current Job Title
            </label>
            <input
              type="text"
              value={currentJob}
              onChange={(e) => setCurrentJob(e.target.value)}
              placeholder="e.g. Cashier, Barista, Warehouse Associate"
              className="w-full px-4 py-3 rounded-xl border border-sand bg-white/80 text-dark-text
                         placeholder:text-light-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40
                         focus:border-orange transition-all duration-200"
            />
          </div>

          {/* Current Skills */}
          <div>
            <label className="block text-sm font-semibold text-dark-purple mb-2">
              Current Skills
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a skill and press Enter"
                className="flex-1 px-4 py-3 rounded-xl border border-sand bg-white/80 text-dark-text
                           placeholder:text-light-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40
                           focus:border-orange transition-all duration-200"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-3 bg-orange text-white rounded-xl font-semibold hover:bg-orange/90
                           transition-colors duration-200"
              >
                Add
              </button>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              <AnimatePresence>
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="skill-tag bg-purple/15 text-purple"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-purple/60 hover:text-purple font-bold text-xs leading-none"
                    >
                      &times;
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Dream Job */}
          <div>
            <label className="block text-sm font-semibold text-dark-purple mb-2">
              Dream Job
            </label>
            <input
              type="text"
              value={dreamJob}
              onChange={(e) => setDreamJob(e.target.value)}
              placeholder="e.g. Data Analyst, UX Designer, Web Developer"
              className="w-full px-4 py-3 rounded-xl border border-sand bg-white/80 text-dark-text
                         placeholder:text-light-text/60 focus:outline-none focus:ring-2 focus:ring-orange/40
                         focus:border-orange transition-all duration-200"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading || !currentJob || !dreamJob || skills.length === 0}
            className="w-full py-4 rounded-xl font-semibold text-lg text-white
                       bg-gradient-to-r from-orange via-pink to-purple
                       hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4" fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Analyzing your skills...
              </span>
            ) : (
              'Generate My Roadmap'
            )}
          </motion.button>
        </form>
      </div>
    </SectionWrapper>
  )
}
