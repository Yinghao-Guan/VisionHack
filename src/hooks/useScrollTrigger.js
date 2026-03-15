import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollTrigger(animationFn, deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      animationFn(ref.current, gsap, ScrollTrigger)
    }, ref)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

export function refreshScrollTrigger() {
  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 300)
}

export { gsap, ScrollTrigger }
