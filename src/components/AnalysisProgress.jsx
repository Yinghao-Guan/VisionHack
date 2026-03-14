import { motion } from 'framer-motion'

export default function AnalysisProgress({ progress, stage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto w-full px-4 mt-10"
    >
      <div className="glass-card p-8 md:p-10 flex flex-col items-center gap-6">
        {/* Spinner */}
        <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
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

        {/* Stage text */}
        <p className="text-white/80 text-lg font-semibold text-center">
          {stage}
        </p>

        {/* Progress bar */}
        <div className="w-full flex items-center gap-3">
          <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #6366f1, #a855f7)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <span className="text-white/60 text-sm font-medium w-10 text-right">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}
