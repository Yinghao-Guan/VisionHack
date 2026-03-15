import { motion } from 'framer-motion'
import BlurText from './BlurText'

function ProgressRing({ percent, size = 80 }) {
  const strokeWidth = 6
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  const color =
    percent >= 70 ? '#10b981' : percent >= 50 ? '#6366f1' : '#6b7280'

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="progress-ring">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Animated fill ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        />
      </svg>
      {/* Percentage text in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-white font-bold"
          style={{ fontSize: size * 0.2 }}
        >
          {percent}%
        </span>
      </div>
    </div>
  )
}

function SkillPill({ skill, hasSkill }) {
  return (
    <span
      className={`skill-tag text-xs ${
        hasSkill
          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
          : 'bg-orange/10 text-orange border border-orange/20'
      }`}
    >
      {hasSkill && (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      )}
      {skill}
    </span>
  )
}

export default function JobPostings({ data, userSkills = [] }) {
  const userSkillsLower = userSkills.map((s) => s.toLowerCase())

  // Sort by match percent, featured is highest
  const sorted = [...data].sort((a, b) => b.matchPercent - a.matchPercent)
  const featured = sorted[0]
  const rest = sorted.slice(1)

  const checkSkill = (skill) =>
    userSkillsLower.some(
      (s) =>
        skill.toLowerCase().includes(s) || s.includes(skill.toLowerCase())
    )

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Job Postings For You"
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
          className="text-light-text text-center mb-12 text-lg"
        >
          Real opportunities in the LA area that match your future skill
          set.
        </motion.p>

        {/* Featured card — best match */}
        {featured && (
          <motion.div
            className="gradient-border gradient-border-glow rounded-xl p-6 md:p-8 mb-8"
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple text-white">
                Best Match
              </span>
              <span className="text-xs text-light-text">
                {featured.posted}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <h3 className="font-semibold text-white text-xl mb-1">
                  {featured.title}
                </h3>
                <p className="text-indigo-400 font-medium text-sm mb-1">
                  {featured.company}
                </p>
                <p className="text-light-text text-sm mb-1">
                  {featured.location}
                </p>
                <p className="text-white/80 font-semibold text-sm mb-4">
                  {featured.salary}
                </p>

                {/* Color-coded skill pills */}
                <div className="flex flex-wrap gap-2">
                  {featured.skills.map((skill) => (
                    <SkillPill
                      key={skill}
                      skill={skill}
                      hasSkill={checkSkill(skill)}
                    />
                  ))}
                </div>
              </div>

              <ProgressRing percent={featured.matchPercent} size={100} />
            </div>
          </motion.div>
        )}

        {/* Remaining jobs in 2-column grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {rest.map((job, i) => (
            <motion.div
              key={job.id}
              className="gradient-border-hover rounded-xl bg-white/[0.04] p-6"
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-white text-lg">
                  {job.title}
                </h3>
                <span className="text-xs text-light-text whitespace-nowrap ml-2">
                  {job.posted}
                </span>
              </div>
              <p className="text-indigo-400 font-medium text-sm mb-1">
                {job.company}
              </p>
              <p className="text-light-text text-sm mb-1">
                {job.location}
              </p>
              <p className="text-white/80 font-semibold text-sm mb-3">
                {job.salary}
              </p>

              {/* Color-coded skill pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <SkillPill
                    key={skill}
                    skill={skill}
                    hasSkill={checkSkill(skill)}
                  />
                ))}
              </div>

              {/* Circular progress ring */}
              <div className="flex items-center gap-3">
                <ProgressRing percent={job.matchPercent} size={56} />
                <div>
                  <span className="text-xs font-semibold text-light-text">
                    Skill Match
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
