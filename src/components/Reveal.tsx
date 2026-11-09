import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/** Upward mask reveal: children slide up into view when scrolled to.
 *  In-view detection happens on the OUTER wrapper (the inner element is
 *  translated out of the overflow-hidden mask, so it would never intersect). */
export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reducedMotion = useReducedMotion()

  // Block-level wrapper so multi-line paragraphs are never clipped to a line.
  if (reducedMotion) return <div className="block">{children}</div>

  return (
    <div ref={ref} className="block overflow-hidden">
      <motion.div
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: inView ? '0%' : '110%' }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
