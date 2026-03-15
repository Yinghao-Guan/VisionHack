import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import BlurText from './BlurText'
import GradualBlur from './GradualBlur'

const typeBadgeColors = {
  'Free Online Course': 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  'Online Course': 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
  'Community College': 'bg-purple/15 text-purple border border-purple/20',
  'Certificate Program': 'bg-orange/15 text-orange border border-orange/20',
  'In-Person Workshop': 'bg-pink/15 text-pink border border-pink/20',
  'Free Software': 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  'Practice Dataset': 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
}

export default function Resources({ data }) {
  return (
    <SectionWrapper className="bg-cream relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="blob w-80 h-80 bg-violet-500/[0.06] -top-20 -left-24" />
      <div className="blob w-72 h-72 bg-indigo-500/[0.06] -bottom-24 right-0" style={{ animationDelay: '3s' }} />
      <div className="blob w-64 h-64 bg-indigo-400/[0.04] top-1/3 -right-16" style={{ animationDelay: '5s' }} />

      {/* Top blur transition */}
      <GradualBlur position="top" strength={1.5} height="4rem" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Free LA Resources"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />
        <p className="gsap-fade-up text-light-text text-center mb-12 text-lg">
          Local and online resources to help you learn — many are completely free.
        </p>

        <div className="space-y-10">
          {data.map((group, groupIdx) => (
            <div key={group.skill} className="gsap-fade-up">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
                {group.skill}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={item.name}
                    className="glass-card p-5 hover:border-white/15 hover:border-indigo-500/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: (groupIdx * 2 + itemIdx) * 0.05, duration: 0.5 }}
                    whileHover={{ y: -4, scale: 1.01, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.08)' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{item.name}</h4>
                    </div>
                    <span
                      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${
                        typeBadgeColors[item.type] || 'bg-white/5 text-white/70 border border-white/10'
                      }`}
                    >
                      {item.type}
                    </span>
                    <p className="text-light-text text-sm">{item.availability}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
