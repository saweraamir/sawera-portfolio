import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Buttons gently pull toward the cursor on hover.
 *  Desktop pointers only; disabled under prefers-reduced-motion. */
export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  const enabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !reducedMotion

  if (!enabled) return <div>{children}</div>

  return (
    <motion.div
      className="inline-block"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        const dx = e.clientX - (rect.left + rect.width / 2)
        const dy = e.clientY - (rect.top + rect.height / 2)
        setPos({ x: dx * 0.3, y: dy * 0.3 })
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}
