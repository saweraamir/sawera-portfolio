import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import { awards, education } from '../data/content'

export default function Education() {
  const reducedMotion = useReducedMotion()

  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reducedMotion ? 0 : 0.12 },
    },
  }
  const cardVariants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="education" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
          Education
        </h2>
        <div
          aria-hidden="true"
          className="mt-3 h-0.5 w-24 border-t-2 border-dashed border-coral"
        />

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 space-y-6"
        >
          {education.map((item) => (
            <motion.article
              key={item.school}
              variants={cardVariants}
              className="rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {item.school}
              </h3>
              <p className="mt-1 text-slate-300">{item.degree}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} aria-hidden="true" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} aria-hidden="true" />
                  {item.location}
                </span>
              </div>
              {item.note && (
                <span className="mt-4 inline-block rounded-full bg-coral/15 px-3 py-1 text-xs text-coral">
                  {item.note}
                </span>
              )}
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h3 className="mt-14 font-heading text-xl font-semibold text-white">
            Awards
          </h3>
          <ul className="mt-4 space-y-3">
            {awards.map((award) => (
              <motion.li
                key={award}
                variants={cardVariants}
                className="flex items-start gap-2.5"
              >
                <Trophy
                  size={16}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-mustard"
                />
                <span className="text-sm leading-relaxed text-slate-300">
                  {award}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
