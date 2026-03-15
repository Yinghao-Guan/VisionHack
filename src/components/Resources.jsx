import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlurText from './BlurText'

const typeBadgeColors = {
  'Free Online Course': 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  'Online Course': 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  'Community College': 'bg-purple/15 text-purple border border-purple/20',
  'Certificate Program': 'bg-orange/15 text-orange border border-orange/20',
  'In-Person Workshop': 'bg-pink/15 text-pink border border-pink/20',
  'Free Software': 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  'Practice Dataset': 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
}

const typeAccentColors = {
  'Free Online Course': 'bg-emerald-500',
  'Online Course': 'bg-blue-500',
  'Community College': 'bg-purple',
  'Certificate Program': 'bg-orange',
  'In-Person Workshop': 'bg-pink',
  'Free Software': 'bg-emerald-500',
  'Practice Dataset': 'bg-blue-500',
}

export default function Resources({ data }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Free LA Resources"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-light-text text-center mb-10 text-lg"
        >
          Local and online resources to help you learn — many are completely
          free.
        </motion.p>

        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {data.map((group, i) => (
            <button
              key={group.skill}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === i
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              {group.skill}
              {activeTab === i && (
                <motion.div
                  layoutId="resource-tab-indicator"
                  className="absolute bottom-0 left-2 right-2 tab-underline"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {data[activeTab].items.map((item, i) => {
                const isFree = item.type.includes('Free')
                const accentColor =
                  typeAccentColors[item.type] || 'bg-white/20'

                return (
                  <motion.div
                    key={item.name}
                    className="flex overflow-hidden rounded-lg bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] transition-colors"
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    {/* Left accent border colored by type */}
                    <div className={`w-1 shrink-0 ${accentColor}`} />

                    <div className="p-4 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-white text-sm truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 shrink-0">
                          {isFree && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase tracking-wide">
                              Free
                            </span>
                          )}
                          {/* External link icon */}
                          <svg
                            className="w-3.5 h-3.5 text-white/30"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </div>
                      </div>
                      <span
                        className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 ${
                          typeBadgeColors[item.type] ||
                          'bg-white/5 text-white/70 border border-white/10'
                        }`}
                      >
                        {item.type}
                      </span>
                      <p className="text-light-text text-xs">
                        {item.availability}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
