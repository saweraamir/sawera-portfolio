import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import Magnetic from './Magnetic'
import { FileText, Menu, X } from 'lucide-react'
import { personal } from '../data/content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'contact',
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const linkClass = (href: string) => {
    const isActive = active === href.slice(1)
    return `border-b border-dashed pb-0.5 text-sm transition-colors ${
      isActive
        ? 'border-coral text-coral'
        : 'border-transparent text-slate-300 hover:text-coral'
    }`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/70 backdrop-blur-md">
      {/* Coral yarn-thread scroll progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-coral"
      />
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="font-heading text-lg font-semibold text-white">
          {personal.name}
          <span className="text-coral">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={
                active === link.href.slice(1) ? 'true' : undefined
              }
              className={linkClass(link.href)}
            >
              {link.label}
            </a>
          ))}
          <Magnetic>          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-softpink"
          >
            <FileText size={16} />
            Resume
          </a>          </Magnetic>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-navy/95 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={
                  active === link.href.slice(1) ? 'true' : undefined
                }
                className={
                  active === link.href.slice(1)
                    ? 'rounded-lg px-3 py-2 text-sm text-coral'
                    : 'rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-coral'
                }
              >
                {link.label}
              </a>
            ))}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-semibold text-navy hover:bg-softpink"
            >
              <FileText size={16} />
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
