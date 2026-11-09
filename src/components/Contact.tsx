import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Download, Mail } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import { SiGithub } from 'react-icons/si'
import { personal, socials } from '../data/content'

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  github: SiGithub,
  linkedin: FaLinkedin,
  mail: Mail,
}

/** Decorative 2D yarn ball with a looping thread, drawn as SVG. */
function YarnBallDecor() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 -translate-x-[80%] opacity-15"
    >
      <circle
        cx="100"
        cy="100"
        r="62"
        fill="none"
        stroke="#ff7a6b"
        strokeWidth="3"
      />
      {/* Yarn wraps */}
      <path
        d="M 45 80 Q 100 40 155 82 M 42 105 Q 100 70 158 104 M 48 130 Q 100 100 152 128"
        fill="none"
        stroke="#f5b942"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Loose thread looping toward the heading */}
      <path
        d="M 158 118 Q 210 150 150 165 Q 60 185 20 150"
        fill="none"
        stroke="#ff7a6b"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — do nothing.
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 overflow-hidden px-4 py-32 sm:px-6">
      <div className="relative mx-auto max-w-3xl text-center">
        <YarnBallDecor />

        <div className="relative">
          <h2 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Let&rsquo;s work together
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-400">
            I&rsquo;m currently looking for software engineering internships.
            Have an opportunity or a project in mind? I&rsquo;d love to hear
            from you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="rounded-full bg-coral px-7 py-3 text-sm font-semibold text-navy transition-colors hover:bg-softpink"
            >
              Say hello
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-coral hover:text-coral"
            >
              {copied ? (
                <Check size={16} aria-hidden="true" />
              ) : (
                <Copy size={16} aria-hidden="true" />
              )}
              {copied ? 'Copied!' : 'Copy email'}
            </button>
            <a
              href={personal.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-coral hover:text-coral"
            >
              <Download size={16} aria-hidden="true" />
              Download resume
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-4">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon]
              const href = social.url.startsWith('mailto:')
                ? social.url
                : social.url
              return (
                <a
                  key={social.name}
                  href={href}
                  target={
                    social.url.startsWith('mailto:') ? undefined : '_blank'
                  }
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-coral hover:text-coral"
                >
                  {Icon && <Icon size={18} />}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
