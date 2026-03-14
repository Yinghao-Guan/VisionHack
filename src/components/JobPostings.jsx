import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'

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
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function JobPostings({ data }) {
  return (
    <SectionWrapper className="bg-sand">
      <div className="max-w-5xl mx-auto">
        <h2 className="gsap-fade-up font-heading text-3xl md:text-4xl font-bold text-dark-purple text-center mb-3">
          Job Postings For You
        </h2>
        <p className="gsap-fade-up text-light-text text-center mb-12 text-lg">
          Real opportunities in the LA area that match your future skill set.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {data.map((job, i) => (
            <motion.div
              key={job.id}
              className="gsap-fade-up glass-card p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-dark-purple text-lg">{job.title}</h3>
                <span className="text-xs text-light-text whitespace-nowrap ml-2">
                  {job.posted}
                </span>
              </div>
              <p className="text-orange font-medium text-sm mb-1">{job.company}</p>
              <p className="text-light-text text-sm mb-1">{job.location}</p>
              <p className="text-dark-purple font-semibold text-sm mb-3">{job.salary}</p>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag bg-purple/10 text-purple text-xs"
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
