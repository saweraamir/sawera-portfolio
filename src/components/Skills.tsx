import type { ComponentType } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Code2, Languages, Wrench } from 'lucide-react'
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
import SectionHeading from './SectionHeading'
import { skills } from '../data/content'

/** Brand logo + color per skill. Colors follow each brand's official palette;
 *  GitHub, Gradle and Elementor are lightened because their official colors
 *  are near-invisible on the navy background. */
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
  Elementor: { icon: SiElementor, color: '#E8618C' },
}

type TileData = { name: string; icon?: IconType; color?: string }

function Panel({
  title,
  icon: Icon,
  glow,
  children,
}: {
  title: string
  icon: ComponentType<{ size?: number; className?: string }>
  glow: string
  children: React.ReactNode
}) {
  return (
    <div className="relative h-full overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-5">
      {/* Subtle corner glow */}
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl"
        style={{ backgroundColor: glow }}
      />
      <div className="relative flex items-center gap-2">
        <Icon size={18} className="text-slate-300" />
        <h3 className="font-heading text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="relative mt-4">{children}</div>
    </div>
  )
}

function SkillTile({ name, icon: Icon, color }: TileData) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-white/15 bg-white/5 px-2 py-3 text-center transition-colors hover:border-coral">
      {/* Normalized 44px logo box so every icon reads the same size */}
      <span className="flex h-11 w-11 items-center justify-center">
        {Icon ? (
          <Icon size={28} style={{ color }} aria-hidden="true" />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-coral/20 font-heading text-sm font-semibold text-coral"
          >
            {name.charAt(0)}
          </span>
        )}
      </span>
      <span className="font-heading text-xs text-slate-200">{name}</span>
    </div>
  )
}

function SkillGroup({
  title,
  icon,
  glow,
  items,
}: {
  title: string
  icon: ComponentType<{ size?: number; className?: string }>
  glow: string
  items: TileData[]
}) {
  return (
    <Panel title={title} icon={icon} glow={glow}>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <SkillTile key={item.name} {...item} />
        ))}
      </div>
    </Panel>
  )
}

function levelPercent(level: string): number {
  if (level === 'Native' || level === 'Fluent') return 100
  if (level === 'Basic') return 30
  return 80
}

const LEVEL_COLORS = ['#ff7a6b', '#f5b942', '#f7a8c4']

function LanguageRow({
  name,
  level,
  index,
}: {
  name: string
  level: string
  index: number
}) {
  const reducedMotion = useReducedMotion()
  const color = LEVEL_COLORS[index % LEVEL_COLORS.length]

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-heading text-sm font-medium text-white">{name}</span>
        <span className="text-xs text-slate-400">{level}</span>
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: color, width: `${levelPercent(level)}%` }}
          initial={reducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const reducedMotion = useReducedMotion()

  const panelVariants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 },
    show: { opacity: 1, y: 0 },
  }

  const withIcons = (names: { name: string }[]): TileData[] =>
    names.map(({ name }) => ({ name, ...iconMap[name] }))

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" title="Skills" />

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid items-stretch gap-6 lg:grid-cols-3"
        >
          <motion.div variants={panelVariants} className="h-full">
            <SkillGroup
              title="Programming"
              icon={Code2}
              glow="#ff7a6b"
              items={withIcons(skills.programming)}
            />
          </motion.div>

          <motion.div variants={panelVariants} className="h-full">
            <SkillGroup
              title="Tools"
              icon={Wrench}
              glow="#f5b942"
              items={withIcons(skills.tools)}
            />
          </motion.div>

          <motion.div variants={panelVariants} className="h-full">
            <Panel title="Languages" icon={Languages} glow="#f7a8c4">
              <div className="space-y-5">
                {skills.languages.map((lang, i) => (
                  <LanguageRow
                    key={lang.name}
                    name={lang.name}
                    level={lang.level}
                    index={i}
                  />
                ))}
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
