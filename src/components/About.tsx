import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { about, personal } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

function StatCard({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reducedMotion = useReducedMotion()

  // Stats can carry prefixes/suffixes (e.g. "4+") — only the number counts up.
  const match = value.match(/\d+/)
  const target = match ? parseInt(match[0], 10) : null
  const prefix = match ? value.slice(0, match.index ?? 0) : value
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : ''

  const [display, setDisplay] = useState(target ?? 0)

  useEffect(() => {
    if (!inView || target === null || reducedMotion) return
    let raf = 0
    const start = performance.now()
    const duration = 1500
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, reducedMotion])

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center"
    >
      <p className="font-heading text-3xl font-semibold text-coral">
        {target === null ? value : `${prefix}${display}${suffix}`}
      </p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  )
}

export default function About() {
  const reducedMotion = useReducedMotion()

  const photoAnim = {
    initial: { opacity: 0, x: reducedMotion ? 0 : -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: 'easeOut' as const },
  }
  const textAnim = {
    initial: { opacity: 0, x: reducedMotion ? 0 : 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, ease: 'easeOut' as const },
  }

  return (
    <section id="about" className="scroll-mt-20 px-4 py-16 lg:py-20 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Photo — top on mobile, left column on desktop */}
        <motion.div
          {...photoAnim}
          className="flex justify-center md:justify-start"
        >
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={
              reducedMotion
                ? undefined
                : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative"
          >
            {/* Soft coral glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-coral/25 blur-3xl"
            />
            <img
              src={personal.photo}
              alt="Portrait of Sawera"
              loading="lazy"
              className="relative h-[200px] w-[200px] rounded-full object-cover object-center md:h-[320px] md:w-[320px]"
            />
            {/* Dashed coral ring, slow clockwise spin */}
            <div
              aria-hidden="true"
              className="motion-safe:animate-[spin_20s_linear_infinite] absolute -inset-3 rounded-full border-2 border-dashed border-coral"
            />
            {/* Thinner mustard ring, counter-rotating */}
            <div
              aria-hidden="true"
              className="motion-safe:animate-[spin_30s_linear_infinite_reverse] absolute -inset-6 rounded-full border border-mustard"
            />
          </motion.div>
        </motion.div>

        {/* Text — below on mobile, right column on desktop */}
        <motion.div {...textAnim}>
          <SectionHeading number="01" title="About me" />
          <div className="mt-6 space-y-4 leading-relaxed text-slate-300">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={i * 0.1}>
                <p className="leading-relaxed text-slate-300">{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {about.stats.map((stat) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
