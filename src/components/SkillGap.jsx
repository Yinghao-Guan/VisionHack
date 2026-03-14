import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

function SkillCard({ skill, index, type }) {
  const isHave = type === 'have'
  return (
    <motion.div
      className="glass-card p-5 hover:shadow-lg transition-shadow duration-300"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={cardVariants}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-dark-purple text-lg">{skill.name}</h4>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isHave
              ? 'bg-green-100 text-green-700'
              : skill.priority === 'High'
                ? 'bg-orange/15 text-orange'
                : 'bg-purple/15 text-purple'
          }`}
        >
          {isHave ? skill.level : `${skill.priority} Priority`}
        </span>
      </div>
      <p className="text-light-text text-sm leading-relaxed">{skill.description}</p>
    </motion.div>
  )
}

export default function SkillGap({ data }) {
  return (
    <SectionWrapper className="bg-cream">
      <div className="max-w-5xl mx-auto">
        <h2 className="gsap-fade-up font-heading text-3xl md:text-4xl font-bold text-dark-purple text-center mb-3">
          Skill Gap Analysis
        </h2>
        <p className="gsap-fade-up text-light-text text-center mb-12 text-lg">
          Here&apos;s where you stand and what you need to learn.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills You Have */}
          <div className="gsap-fade-up">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-green-700 mb-4">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Skills You Have
            </h3>
            <div className="space-y-4">
              {data.have.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} type="have" />
              ))}
            </div>
          </div>

          {/* Skills You Need */}
          <div className="gsap-fade-up">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-orange mb-4">
              <span className="w-3 h-3 rounded-full bg-orange" />
              Skills You Need
            </h3>
            <div className="space-y-4">
              {data.need.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} type="need" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
