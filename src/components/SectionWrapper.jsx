import { useScrollTrigger } from '../hooks/useScrollTrigger'

export default function SectionWrapper({ children, className = '', id = '' }) {
  const ref = useScrollTrigger((el, gsap) => {
    gsap.from(el.querySelectorAll('.gsap-fade-up'), {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
      },
    })
  })

  return (
    <section ref={ref} id={id} className={`py-16 md:py-24 px-4 md:px-8 ${className}`}>
      {children}
    </section>
  )
}
