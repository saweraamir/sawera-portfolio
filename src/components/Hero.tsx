import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { personal } from '../data/content'

const YarnBall = lazy(() => import('../canvas/YarnBall'))

function BallLoader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-coral" />
    </div>
  )
}

function Typewriter() {
  const reducedMotion = useReducedMotion()
  const [text, setText] = useState('')
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const current = personal.taglines[taglineIndex]

    if (!deleting && text === current) {
      const timeout = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(timeout)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setTaglineIndex((i) => (i + 1) % personal.taglines.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        )
      },
      deleting ? 30 : 70,
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, taglineIndex, reducedMotion])

  if (reducedMotion) {
    return <p className="text-lg text-slate-300">{personal.taglines[0]}</p>
  }

  return (
    <p className="min-h-12 text-lg text-slate-300">
      {text}
      <span className="animate-pulse text-coral" aria-hidden="true">
        |
      </span>
    </p>
  )
}

export default function Hero() {
  const reducedMotion = useReducedMotion()

  const fadeIn = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: 'easeOut' as const },
      }

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 md:flex-row md:gap-12 md:px-12 lg:px-20"
    >
      {/* Yarn ball: on top for mobile (smaller), right for desktop */}
      <div className="order-1 h-56 w-56 shrink-0 sm:h-72 sm:w-72 md:order-2 md:h-[26rem] md:w-[26rem] lg:h-[30rem] lg:w-[30rem]">
        <Suspense fallback={<BallLoader />}>
          <YarnBall />
        </Suspense>
      </div>

      {/* Text: below the ball on mobile, left on desktop */}
      <motion.div
        {...fadeIn}
        className="order-2 max-w-xl text-center md:order-1 md:text-left"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-coral">
          Hi, I&rsquo;m
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
          {personal.name}
        </h1>
        <p className="mt-3 text-balance text-xl text-slate-300">{personal.role}</p>
        <div className="mt-4">
          <Typewriter />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <a
            href="#projects"
            className="rounded-full bg-coral px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-softpink"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-coral px-6 py-3 text-sm font-semibold text-coral transition-colors hover:bg-coral/10"
          >
            Contact me
          </a>
        </div>
      </motion.div>
    </section>
  )
}
