import { motion } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import BlurText from './BlurText'
import GradualBlur from './GradualBlur'

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

function SkillCard({ skill, index, type }) {
  const isHave = type === 'have'
  return (
    <motion.div
      className="glass-card p-5 hover:border-white/15 hover:border-indigo-500/20 transition-all duration-300"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.08)' }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-white text-lg">{skill.name}</h4>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isHave
              ? 'bg-emerald-500/15 text-emerald-400'
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
    <SectionWrapper className="bg-cream relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="blob w-80 h-80 bg-indigo-500/[0.06] -top-24 -right-24" />
      <div className="blob w-72 h-72 bg-violet-500/[0.06] -bottom-20 -left-20" style={{ animationDelay: '4s' }} />

      {/* Top blur transition */}
      <GradualBlur position="top" strength={1.5} height="4rem" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Skill Gap Analysis"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />
        <p className="gsap-fade-up text-light-text text-center mb-12 text-lg">
          Here&apos;s where you stand and what you need to learn.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills You Have */}
          <div className="gsap-fade-up">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-emerald-400 mb-4">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
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
              <span className="w-3 h-3 rounded-full bg-orange shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
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
