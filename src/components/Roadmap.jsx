import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useScrollTrigger'
import BlurText from './BlurText'

export default function Roadmap({ data }) {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const svg = svgRef.current
    const path = pathRef.current
    if (!section || !svg || !path) return

    const timeline = section.querySelector('.roadmap-timeline')
    if (!timeline) return

    let gsapCtx = null

    // Wait for layout to settle
    const raf = requestAnimationFrame(() => {
      const svgRect = svg.getBoundingClientRect()
      const timelineRect = timeline.getBoundingClientRect()
      const w = svgRect.width
      const h = timelineRect.height

      if (h <= 0) return

      svg.setAttribute('viewBox', `0 0 ${w} ${h}`)
      svg.style.height = `${h}px`

      // Get node center positions relative to SVG
      const nodes = timeline.querySelectorAll('.roadmap-node')
      const points = Array.from(nodes).map((node) => {
        const nodeRect = node.getBoundingClientRect()
        return {
          x: nodeRect.left + nodeRect.width / 2 - svgRect.left,
          y: nodeRect.top + nodeRect.height / 2 - timelineRect.top,
        }
      })

      if (points.length === 0) return

      // Generate S-curve path through all nodes
      const cx = points[0].x
      const amplitude = 6
      let d = `M ${cx},0`

      for (let i = 0; i < points.length; i++) {
        const y = points[i].y
        const prevY = i > 0 ? points[i - 1].y : 0
        const midY = (prevY + y) / 2
        const dir = i % 2 === 0 ? 1 : -1
        d += ` Q ${cx + amplitude * dir},${midY} ${cx},${y}`
      }

      // Extend to bottom
      d += ` L ${cx},${h}`

      path.setAttribute('d', d)

      const length = path.getTotalLength()

      gsapCtx = gsap.context(() => {
        // Animate path drawing
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        })

        // Node activation: gray/dim → gradient-filled
        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { filter: 'saturate(0) brightness(0.4)' },
            {
              filter: 'saturate(1) brightness(1)',
              duration: 0.5,
              scrollTrigger: {
                trigger: node,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })

        // Card entrance with clipPath reveal
        const cards = section.querySelectorAll('.roadmap-card')
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0
          gsap.fromTo(
            card,
            {
              clipPath: isLeft
                ? 'inset(0 100% 0 0)'
                : 'inset(0 0 0 100%)',
              opacity: 0,
              filter: 'blur(6px)',
            },
            {
              clipPath: 'inset(0 0 0 0)',
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }, section)
    })

    return () => {
      cancelAnimationFrame(raf)
      if (gsapCtx) gsapCtx.revert()
    }
  }, [data])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <BlurText
          text="Your Learning Roadmap"
          animateBy="words"
          delay={100}
          direction="top"
          className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-3"
        />
        <p className="text-light-text text-center mb-4 text-lg">
          A step-by-step plan to get you from{' '}
          {data.currentRole || 'here'} to {data.dreamRole || 'there'}.
        </p>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-purple/15 text-purple font-semibold rounded-full text-sm border border-purple/20">
            Estimated Total: {data.totalTime}
          </span>
        </div>

        {/* Timeline */}
        <div className="relative roadmap-timeline">
          {/* SVG scroll-draw path */}
          <svg
            ref={svgRef}
            className="absolute top-0 left-[4px] md:left-1/2 md:-translate-x-1/2 w-10 pointer-events-none z-[1]"
            fill="none"
          >
            <defs>
              <linearGradient
                id="timeline-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              stroke="url(#timeline-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

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
                  {/* Gradient-filled node */}
                  <div
                    className="roadmap-node absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center z-10 shadow-lg"
                    style={{
                      background:
                        'linear-gradient(135deg, #6366f1, #a78bfa)',
                      boxShadow:
                        '0 0 20px rgba(99, 102, 241, 0.25), 0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <span className="font-heading font-bold text-white text-sm md:text-base">
                      {step.id}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`roadmap-card ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft
                        ? 'md:pr-8 md:text-right'
                        : 'md:pl-8 md:text-left'
                    }`}
                  >
                    <div className="relative rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-hidden">
                      {/* Step number watermark */}
                      <span className="absolute -top-2 -left-1 text-[6rem] font-heading font-bold text-white/[0.04] select-none pointer-events-none leading-none">
                        {String(step.id).padStart(2, '0')}
                      </span>

                      <div className="flex">
                        {/* Gradient left border */}
                        <div className="w-[3px] shrink-0 bg-gradient-to-b from-indigo-500 to-purple" />

                        <div className="p-6 flex-1">
                          <div
                            className={`flex items-center gap-3 mb-3 ${
                              isLeft
                                ? 'md:justify-end'
                                : 'md:justify-start'
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

                          {/* Milestone callout */}
                          <div
                            className={`flex items-start gap-2 p-3 rounded-lg bg-indigo-500/[0.08] border border-indigo-500/[0.12] ${
                              isLeft ? 'md:justify-end' : ''
                            }`}
                          >
                            <span className="text-indigo-400 text-sm">
                              &#9733;
                            </span>
                            <p className="text-xs text-white/70 font-medium">
                              <span className="font-semibold text-white/90">
                                Milestone:
                              </span>{' '}
                              {step.milestone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
