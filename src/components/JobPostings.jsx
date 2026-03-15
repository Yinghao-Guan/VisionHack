import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import BlurText from './BlurText'
import GradualBlur from './GradualBlur'

function MatchBar({ percent }) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-light-text">Skill Match</span>
        <span className="text-xs font-bold text-orange">{percent}%</span>
      </div>
      <div className="match-bar-bg">
        <motion.div
          className="match-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function JobPostings({ data }) {
  return (
    <SectionWrapper className="bg-sand relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="blob w-80 h-80 bg-indigo-500/[0.06] -top-24 right-1/4" />
      <div className="blob w-72 h-72 bg-violet-500/[0.06] -bottom-20 -left-16" style={{ animationDelay: '4s' }} />

      {/* Top blur transition */}
      <GradualBlur position="top" strength={1.5} height="4rem" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Job Postings For You"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />
        <p className="gsap-fade-up text-light-text text-center mb-12 text-lg">
          Real opportunities in the LA area that match your future skill set.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {data.map((job, i) => (
            <motion.div
              key={job.id}
              className="gsap-fade-up glass-card p-6 hover:border-white/15 hover:border-indigo-500/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, scale: 1.01, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.08)' }}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-white text-lg">{job.title}</h3>
                <span className="text-xs text-light-text whitespace-nowrap ml-2">
                  {job.posted}
                </span>
              </div>
              <p className="text-indigo-400 font-medium text-sm mb-1">{job.company}</p>
              <p className="text-light-text text-sm mb-1">{job.location}</p>
              <p className="text-white/80 font-semibold text-sm mb-3">{job.salary}</p>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag bg-purple/10 text-purple text-xs border border-purple/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <MatchBar percent={job.matchPercent} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
