import { lazy, Suspense, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { projects  } from '../data/content'
import SectionHeading from './SectionHeading'
import type { Project } from '../data/content'

const CrochetCircle = lazy(() => import('../canvas/CrochetCircle'))

function CanvasSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-coral" />
    </div>
  )
}

/** Real crochet notation for round n of a flat circle. */
function roundPattern(n: number): string {
  if (n === 1) return '6 sc in magic ring — 6 sts'
  if (n === 2) return 'inc ×6 — 12 sts'
  const scPart = n - 2 === 1 ? 'sc' : `sc ×${n - 2}`
  return `(${scPart}, inc) ×6 — ${6 * n} sts`
}

function totalStitches(rounds: number): number {
  return 3 * rounds * (rounds + 1) // sum of 6n for n = 1..rounds
}

function ProjectImage({ name, src }: { name: string; src?: string }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    const initials = name
      .split(' ')
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join('')
    return (
      <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-coral/40 via-mustard/30 to-softpink/30">
        <span className="font-heading text-4xl font-bold text-white/80">
          {initials}
        </span>
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-44 w-full object-cover"
    />
  )
}

function TechPills({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-slate-300"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function ProjectCard({
  project,
  variants,
}: {
  project: Project
  variants: Variants
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    // Position is in [-0.5, 0.5]; x16 caps the tilt at ~8deg.
    ref.current.style.transform = `perspective(700px) rotateY(${(
      px * 16
    ).toFixed(2)}deg) rotateX(${(-py * 16).toFixed(2)}deg) translateY(-4px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group h-full overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/5 transition-[border-color,transform] duration-200 ease-out hover:border-coral"
      >
        <ProjectImage name={project.name} src={project.image} />
        <div className="p-5">
          <h3 className="font-heading text-lg font-semibold text-white">
            {project.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>
          <div className="mt-3">
            <TechPills tech={project.tech} />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-slate-200 transition-colors hover:border-coral hover:text-coral"
              >
                <SiGithub size={16} aria-hidden="true" />
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-sm text-slate-200 transition-colors hover:border-coral hover:text-coral"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const reducedMotion = useReducedMotion()
  const [diameter, setDiameter] = useState(10)

  // Under 768px: cap the rendered rounds to keep the canvas at 60fps.
  const isMobile = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches,
    [],
  )
  const rounds = Math.min(
    Math.round(diameter / 1.2),
    isMobile ? 12 : 17,
  )

  const featured = projects.find((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  const gridVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.1 },
    },
  }
  const cardVariants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 },
    show: { opacity: 1, y: 0 },
  }

  const patternLines: string[] = []
  for (let n = Math.max(1, rounds - 2); n <= rounds; n++) {
    patternLines.push(`Rnd ${n}: ${roundPattern(n)}`)
  }

  return (
    <section id="projects" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading>`Projects</SectionHeading>

        {/* Featured project */}
        {featured && (
          <motion.div
            initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-6 lg:p-8"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2">
              {/* Interactive demo */}
              <div>
                <div className="h-[320px] md:h-[400px]">
                  <Suspense fallback={<CanvasSpinner />}>
                    <CrochetCircle rounds={rounds} />
                  </Suspense>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="diameter"
                    className="flex items-center justify-between text-sm text-slate-300"
                  >
                    <span>Target diameter</span>
                    <span className="font-mono text-coral">{diameter} cm</span>
                  </label>
                  <input
                    id="diameter"
                    type="range"
                    min={5}
                    max={20}
                    step={1}
                    value={diameter}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                    className="mt-2 w-full accent-coral"
                  />
                  <p className="mt-2 text-sm text-slate-400">
                    Rounds: <span className="text-slate-200">{rounds}</span>
                    {' · '}Total stitches:{' '}
                    <span className="text-slate-200">
                      {totalStitches(rounds)}
                    </span>
                  </p>
                  <pre className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-navy/60 p-3 font-mono text-xs leading-relaxed text-slate-300">
                    {patternLines.join('\n')}
                  </pre>
                </div>
              </div>

              {/* Details */}
              <div>
                <span className="inline-block rounded-full bg-coral/15 px-3 py-1 text-xs font-semibold text-coral">
                  Featured · Research
                </span>
                <h3 className="mt-3 font-heading text-2xl font-bold text-white">
                  {featured.name}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-300">
                  {featured.description}
                </p>
                <div className="mt-4">
                  <TechPills tech={featured.tech} />
                </div>
                {featured.github && (
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-softpink"
                  >
                    <SiGithub size={16} aria-hidden="true" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Other projects */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {others.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
