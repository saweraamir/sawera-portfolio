import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, type Variants } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'
import { experience  } from '../data/content'
import SectionHeading from './SectionHeading'

function TimelineKnot() {
  return (
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className="absolute top-7 left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-coral bg-navy md:left-1/2"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-mustard" />
    </motion.span>
  )
}

function TimelineCard({
  title,
  org,
  location,
  date,
  points,
  side,
}: {
  title: string
  org: string
  location: string
  date: string
  points: string[]
  side: 'left' | 'right'
}) {
  const reducedMotion = useReducedMotion()
  const slideIn: Variants = {
    hidden: { opacity: 0, x: reducedMotion ? 0 : side === 'left' ? -60 : 60 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={
        side === 'left'
          ? 'ml-12 md:col-start-1 md:ml-0 md:pr-12'
          : 'ml-12 md:col-start-2 md:ml-0 md:pl-12'
      }
    >
      <article className="rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-6 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-coral">
        <h3 className="font-heading text-lg font-semibold text-white">
          {title}
        </h3>
        <p className="mt-1 font-medium text-coral">{org}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" />
            {location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} aria-hidden="true" />
            {date}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {points.map((point) => (
            <li key={point.slice(0, 32)} className="flex gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
              />
              <span className="text-sm leading-relaxed text-slate-300">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </motion.div>
  )
}

export default function Experience() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.5'],
  })

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="scroll-mt-20 px-4 py-16 lg:py-20 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="03" title="Experience" />

        <div className="relative mt-12">
          {/* Faint base line: left on mobile, centered on desktop */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-px bg-white/10 md:left-1/2"
          />
          {/* Coral yarn thread that fills in as you scroll */}
          <motion.div
            aria-hidden="true"
            style={reducedMotion ? { scaleY: 1 } : { scaleY: scrollYProgress }}
            className="absolute top-0 bottom-0 left-4 w-0.5 origin-top bg-coral md:left-1/2"
          />

          <div className="space-y-10">
            {experience.map((entry, i) => {
              const side = i % 2 === 0 ? 'left' : 'right'
              return (
                <div
                  key={entry.title}
                  className="relative md:grid md:grid-cols-2 md:gap-8"
                >
                  <TimelineKnot />
                  <TimelineCard
                    title={entry.title}
                    org={entry.org}
                    location={entry.location}
                    date={entry.date}
                    points={entry.points}
                    side={side}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
