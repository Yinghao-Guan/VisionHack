import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import BlurText from './BlurText'
import DarkVeil from './DarkVeil'

export default function InputForm({ onSubmit, loading }) {
  const [currentJob, setCurrentJob] = useState('')
  const [dreamJob, setDreamJob] = useState('')
  const [skills, setSkills] = useState([])
  const [skillInput, setSkillInput] = useState('')
  const [resumeMode, setResumeMode] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

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

  const handleFileChange = (file) => {
    if (file && file.type === 'application/pdf') {
      setResumeFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file)
  }

  const isSubmitDisabled = loading || !currentJob || !dreamJob ||
    (resumeMode ? !resumeFile : skills.length === 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitDisabled) return

    try {
      if (resumeMode) {
        await onSubmit({ currentJob, dreamJob, resumeFile })
      } else {
        await onSubmit({ currentJob, dreamJob, skills })
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unable to generate roadmap')
    }
  }

  return (
    <SectionWrapper id="input-form" className="relative overflow-hidden min-h-screen flex items-center">
      {/* DarkVeil Background */}
      <div className="absolute inset-0">
        <DarkVeil />
      </div>
      {/* Top gradient to blend seamlessly with Hero section */}
      <div className="absolute top-0 left-0 right-0 h-40 z-[1] pointer-events-none"
           style={{ background: 'linear-gradient(to bottom, #111827, transparent)' }} />

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <BlurText
          text="Tell Us About Yourself"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />
        <p className="gsap-fade-up text-light-text text-center mb-10 text-lg">
          We&apos;ll build a personalized roadmap just for you.
        </p>

        <form onSubmit={handleSubmit} className="gsap-fade-up glass-card p-8 md:p-10 space-y-6">
          {/* Current Job */}
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">
              Current Job Title
            </label>
            <input
              type="text"
              value={currentJob}
              onChange={(e) => setCurrentJob(e.target.value)}
              placeholder="e.g. Cashier, Barista, Warehouse Associate"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white
                         placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                         focus:border-indigo-500/50 transition-all duration-200"
            />
          </div>

          {/* Current Skills */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-white/80">
                Current Skills
              </label>
              {/* Toggle */}
              <div className="flex rounded-lg border border-white/15 overflow-hidden text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setResumeMode(false)}
                  className={`px-3 py-1.5 transition-all duration-200 ${
                    !resumeMode
                      ? 'bg-white/15 text-white'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  Type Manually
                </button>
                <button
                  type="button"
                  onClick={() => setResumeMode(true)}
                  className={`px-3 py-1.5 transition-all duration-200 ${
                    resumeMode
                      ? 'bg-white/15 text-white'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  Upload Resume
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!resumeMode ? (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a skill and press Enter"
                      className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white
                                 placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                                 focus:border-indigo-500/50 transition-all duration-200"
                    />
                    <motion.button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-3 bg-white/10 text-white rounded-xl font-semibold
                                 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30
                                 transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <AnimatePresence>
                      {skills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="skill-tag bg-purple/15 text-purple"
                          initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
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
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`w-full px-4 py-8 rounded-xl border-2 border-dashed cursor-pointer text-center
                               transition-all duration-200 select-none
                               ${dragOver
                                 ? 'border-indigo-400/70 bg-indigo-500/10'
                                 : resumeFile
                                   ? 'border-emerald-400/50 bg-emerald-500/5'
                                   : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/8'
                               }`}
                  >
                    {resumeFile ? (
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-emerald-300 font-medium text-sm">{resumeFile.name}</p>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = '' }}
                          className="text-white/40 hover:text-white/70 text-xs underline transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-white/50 text-sm">
                          <span className="text-white/80 font-medium">Click to upload</span> or drag & drop
                        </p>
                        <p className="text-white/30 text-xs">PDF only — Gemini will extract your skills</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dream Job */}
          <div>
            <label className="block text-sm font-semibold text-white/80 mb-2">
              Dream Job
            </label>
            <input
              type="text"
              value={dreamJob}
              onChange={(e) => setDreamJob(e.target.value)}
              placeholder="e.g. Data Analyst, UX Designer, Web Developer"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white
                         placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                         focus:border-indigo-500/50 transition-all duration-200"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full py-4 rounded-xl font-semibold text-lg text-white
                       bg-white/10 backdrop-blur-md
                       border border-white/20 hover:bg-white/20 hover:border-white/30
                       disabled:opacity-30 disabled:cursor-not-allowed
                       transition-all duration-300"
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(255, 255, 255, 0.15)' }}
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
