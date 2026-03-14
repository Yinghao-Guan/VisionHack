import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function BlurText({
  text = '',
  delay = 100,
  animateBy = 'words',
  direction = 'top',
  className = '',
}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const elements =
    animateBy === 'words' ? text.split(' ') : text.split('')

  const directionOffset =
    direction === 'top' ? -20 : direction === 'bottom' ? 20 : 0

  return (
    <p ref={ref} className={className}>
      {elements.map((el, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          initial={{ opacity: 0, y: directionOffset, filter: 'blur(10px)' }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: directionOffset, filter: 'blur(10px)' }
          }
          transition={{
            duration: 0.5,
            delay: i * (delay / 1000),
            ease: 'easeOut',
          }}
        >
          {el}
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </p>
  )
}
