import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../hooks/useScrollTrigger'
import BlurText from './BlurText'

const levelToPercent = {
  Beginner: 30,
  Intermediate: 60,
  Strong: 85,
  Advanced: 90,
  Expert: 100,
}

export default function SkillGap({ data }) {
  const sectionRef = useRef(null)
  const counterRef = useRef(null)
  const totalSkills = data.have.length + data.need.length

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Counter animation
      if (counterRef.current) {
        const counter = { val: 0 }
        gsap.to(counter, {
          val: data.have.length,
          duration: 1.5,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: {
            trigger: counterRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counter.val)
            }
          },
        })
      }

      // Skill bars animation
      const bars = sectionRef.current.querySelectorAll('.skill-bar-fill')
      bars.forEach((bar) => {
        const target = bar.dataset.level
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${target}%`,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Need cards staggered blur-in from right
      const needCards = sectionRef.current.querySelectorAll('.need-card')
      needCards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: 50,
          filter: 'blur(6px)',
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Skill Gap Analysis"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />

        {/* Summary header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-text text-lg mb-4"
          >
            Here&apos;s where you stand and what you need to learn.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10"
          >
            <span className="text-white font-semibold text-lg">You have</span>
            <span
              ref={counterRef}
              className="text-emerald-400 font-bold text-2xl"
            >
              0
            </span>
            <span className="text-white font-semibold text-lg">
              of {totalSkills} skills needed
            </span>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills You Have */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xl font-semibold text-emerald-400 mb-6"
            >
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              Skills You Have
            </motion.h3>
            <div className="space-y-4">
              {data.have.map((skill) => {
                const percent = levelToPercent[skill.level] || 50
                return (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{skill.name}</h4>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-light-text text-sm mb-3">
                      {skill.description}
                    </p>
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        data-level={percent}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Skills You Need */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-xl font-semibold text-orange mb-6"
            >
              <span className="w-3 h-3 rounded-full bg-orange shadow-[0_0_8px_rgba(99,102,241,0.4)]" />
              Skills You Need
            </motion.h3>
            <div className="space-y-4">
              {data.need.map((skill) => {
                const isHigh = skill.priority === 'High'
                return (
                  <div
                    key={skill.name}
                    className={`need-card overflow-hidden ${
                      isHigh
                        ? 'rounded-xl gradient-border p-5'
                        : 'rounded-xl bg-white/[0.04] border border-white/[0.08] p-4'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4
                        className={`font-semibold text-white ${isHigh ? 'text-lg' : ''}`}
                      >
                        {skill.name}
                      </h4>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          isHigh
                            ? 'bg-orange/15 text-orange'
                            : 'bg-purple/15 text-purple'
                        }`}
                      >
                        {skill.priority} Priority
                      </span>
                    </div>
                    <p className="text-light-text text-sm leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
