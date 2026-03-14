import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../hooks/useScrollTrigger'
import BlurText from './BlurText'
import GradualBlur from './GradualBlur'

export default function Roadmap({ data }) {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      )

      const cards = sectionRef.current.querySelectorAll('.roadmap-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          filter: 'blur(6px)',
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      const nodes = sectionRef.current.querySelectorAll('.roadmap-node')
      nodes.forEach((node) => {
        gsap.from(node, {
          scale: 0,
          duration: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-8 bg-sand overflow-hidden">
      {/* Background glow orbs */}
      <div className="blob w-96 h-96 bg-indigo-500/[0.06] -top-32 left-1/4" />
      <div className="blob w-72 h-72 bg-violet-500/[0.06] bottom-0 -right-20" style={{ animationDelay: '2s' }} />
      <div className="blob w-64 h-64 bg-indigo-400/[0.04] top-1/3 -left-16" style={{ animationDelay: '6s' }} />

      {/* Top blur transition */}
      <GradualBlur position="top" strength={1.5} height="4rem" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Your Learning Roadmap"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />
        <p className="text-light-text text-center mb-4 text-lg">
          A step-by-step plan to get you from {data.currentRole || 'here'} to {data.dreamRole || 'there'}.
        </p>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-purple/15 text-purple font-semibold rounded-full text-sm border border-purple/20">
            Estimated Total: {data.totalTime}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] hidden md:block">
            <div
              ref={lineRef}
              className="w-full h-full origin-top"
              style={{
                background: 'linear-gradient(to bottom, #6366f1, #818cf8, #a78bfa)',
              }}
            />
          </div>
          {/* Mobile line */}
          <div className="absolute left-6 top-0 bottom-0 w-[3px] md:hidden">
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, #6366f1, #818cf8, #a78bfa)',
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {data.steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={step.id}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Node */}
                  <div className="roadmap-node absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-sand shadow-lg flex items-center justify-center z-10 border-[3px] border-indigo-500 glow-indigo">
                    <span className="font-heading font-bold text-indigo-400 text-sm md:text-base">
                      {step.id}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`roadmap-card ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                    }`}
                  >
                    <motion.div
                      className="glass-card p-6 hover:border-white/15 hover:border-indigo-500/20 transition-all duration-300"
                      whileHover={{ y: -4, scale: 1.01, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.08)' }}
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <h3 className="font-semibold text-white text-lg">
                          {step.title}
                        </h3>
                      </div>
                      <span className="inline-block px-3 py-1 bg-pink/15 text-pink text-xs font-semibold rounded-full mb-3 border border-pink/20">
                        {step.duration}
                      </span>
                      <p className="text-light-text text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div
                        className={`flex items-start gap-2 p-3 rounded-lg bg-white/5 ${
                          isLeft ? 'md:justify-end' : ''
                        }`}
                      >
                        <span className="text-indigo-400 text-sm">&#9733;</span>
                        <p className="text-xs text-white/70 font-medium">
                          <span className="font-semibold text-white/90">Milestone:</span> {step.milestone}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
