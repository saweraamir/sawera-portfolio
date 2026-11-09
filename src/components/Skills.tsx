import { useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { IconType } from 'react-icons'
import { DiJava } from 'react-icons/di'
import { VscVscode } from 'react-icons/vsc'
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiElementor,
  SiGithub,
  SiGradle,
  SiHtml5,
  SiIntellijidea,
  SiPhp,
  SiPython,
  SiWordpress,
} from 'react-icons/si'
import { skills } from '../data/content'

/** Brand logo + color per skill. Colors follow each brand's official palette;
 *  GitHub and Gradle are lightened because their official colors are
 *  near-invisible on the navy background. */
const iconMap: Record<string, { icon: IconType; color: string }> = {
  Java: { icon: DiJava, color: '#f89820' },
  'C++': { icon: SiCplusplus, color: '#00599C' },
  C: { icon: SiC, color: '#A8B9CC' },
  Python: { icon: SiPython, color: '#3776AB' },
  PHP: { icon: SiPhp, color: '#777BB4' },
  HTML: { icon: SiHtml5, color: '#E34F26' },
  CSS: { icon: SiCss, color: '#1572B6' },
  'Git / GitHub': { icon: SiGithub, color: '#ffffff' },
  'VS Code': { icon: VscVscode, color: '#007ACC' },
  'IntelliJ IDEA': { icon: SiIntellijidea, color: '#FE315D' },
  Gradle: { icon: SiGradle, color: '#98BBDC' },
  WordPress: { icon: SiWordpress, color: '#21759B' },
  Elementor: { icon: SiElementor, color: '#92003B' },
}

type TileData = {
  name: string
  icon?: IconType
  color?: string
}



function SkillTile({
  name,
  icon: Icon,
  color,
  variants,
}: TileData & { variants: Variants }) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    // Position is in [-0.5, 0.5]; x24 caps the tilt at ~12deg.
    ref.current.style.transform = `perspective(600px) rotateY(${(
      px * 24
    ).toFixed(2)}deg) rotateX(${(-py * 24).toFixed(2)}deg) translateY(-4px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-white/15 bg-white/5 px-3 py-5 text-center transition-[border-color,transform] duration-200 ease-out hover:border-coral"
    >
      {/* Soft glow in the logo's color, revealed on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ backgroundColor: color ?? '#ff7a6b' }}
      />
      {Icon ? (
        <Icon size={40} style={{ color }} aria-hidden="true" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/20 font-heading text-lg font-semibold text-coral"
        >
          {name.charAt(0)}
        </span>
      )}
      <span className="font-heading text-sm text-slate-200">{name}</span>
    </motion.div>
  )
}

function SkillGroup({
  title,
  items,
  gridVariants,
  tileVariants,
}: {
  title: string
  items: TileData[]
  gridVariants: Variants
  tileVariants: Variants
}) {
  return (
    <div>
      <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
      >
        {items.map((item) => (
          <SkillTile key={item.name} {...item} variants={tileVariants} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Skills() {
  const reducedMotion = useReducedMotion()

  const gridVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.08 },
    },
  }
  const tileVariants: Variants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      scale: reducedMotion ? 1 : 0.8,
    },
    show: { opacity: 1, scale: 1 },
  }
  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
    },
  }
  const pillVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 12 },
    show: { opacity: 1, y: 0 },
  }

  const withIcons = (names: { name: string }[]): TileData[] =>
    names.map(({ name }) => ({ name, ...iconMap[name] }))

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Skills
        </h2>
        <div
          aria-hidden="true"
          className="mt-3 h-0.5 w-24 border-t-2 border-dashed border-coral"
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          {/* Programming + Tools — top on mobile, left on desktop */}
          <div className="space-y-10">
            <SkillGroup
              title="Programming"
              items={withIcons(skills.programming)}
              gridVariants={gridVariants}
              tileVariants={tileVariants}
            />
            <SkillGroup
              title="Tools"
              items={withIcons(skills.tools)}
              gridVariants={gridVariants}
              tileVariants={tileVariants}
            />
          </div>

          {/* Languages — below on mobile, right on desktop */}
          <div>
            <h3 className="font-heading text-xl font-semibold text-white">
              Languages I speak
            </h3>
            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {skills.languages.map((lang) => (
                <motion.span
                  key={lang.name}
                  variants={pillVariants}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
                >
                  {lang.name} <span className="text-slate-500">&middot;</span>{' '}
                  {lang.level}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
