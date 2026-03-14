import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../hooks/useScrollTrigger'

export default function Roadmap({ data }) {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return

    const ctx = gsap.context(() => {
      // Animate the timeline line drawing down as user scrolls
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

      // Animate each step card
      const cards = sectionRef.current.querySelectorAll('.roadmap-card')
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          x: i % 2 === 0 ? -50 : 50,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Animate step nodes
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
    <section ref={sectionRef} className="py-16 md:py-24 px-4 md:px-8 bg-sand">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark-purple text-center mb-3">
          Your Learning Roadmap
        </h2>
        <p className="text-light-text text-center mb-4 text-lg">
          A step-by-step plan to get you from {data.currentRole || 'here'} to {data.dreamRole || 'there'}.
        </p>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-purple/15 text-purple font-semibold rounded-full text-sm">
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
                background: 'linear-gradient(to bottom, #E8734A, #D45A8E, #7B5EA7)',
              }}
            />
          </div>
          {/* Mobile line */}
          <div className="absolute left-6 top-0 bottom-0 w-[3px] md:hidden">
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, #E8734A, #D45A8E, #7B5EA7)',
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
                  <div className="roadmap-node absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg flex items-center justify-center z-10 border-[3px] border-orange">
                    <span className="font-heading font-bold text-orange text-sm md:text-base">
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
                      className="glass-card p-6 hover:shadow-lg transition-shadow duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isLeft ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <h3 className="font-semibold text-dark-purple text-lg">
                          {step.title}
                        </h3>
                      </div>
                      <span className="inline-block px-3 py-1 bg-pink/15 text-pink text-xs font-semibold rounded-full mb-3">
                        {step.duration}
                      </span>
                      <p className="text-light-text text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <div
                        className={`flex items-start gap-2 p-3 rounded-lg bg-cream/80 ${
                          isLeft ? 'md:justify-end' : ''
                        }`}
                      >
                        <span className="text-orange text-sm">&#9733;</span>
                        <p className="text-xs text-dark-purple font-medium">
                          <span className="font-semibold">Milestone:</span> {step.milestone}
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
