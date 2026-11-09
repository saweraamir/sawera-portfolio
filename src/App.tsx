import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const lenis = new Lenis({ lerp: 0.1 })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Smooth-scroll anchor links. Lenis ignores CSS scroll-margin, so pass
    // an offset matching the sticky navbar height.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      e.preventDefault()
      lenis.scrollTo(hash, { offset: -80 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div id="top" className="relative">
      {/* Soft gradient glows behind the sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-[10%] -top-[5%] h-[40rem] w-[40rem] rounded-full bg-coral/10 blur-[120px]" />
        <div className="absolute -right-[10%] top-[30%] h-[35rem] w-[35rem] rounded-full bg-mustard/10 blur-[120px]" />
        <div className="absolute left-[15%] top-[55%] h-[38rem] w-[38rem] rounded-full bg-softpink/10 blur-[120px]" />
        <div className="absolute -right-[5%] top-[85%] h-[40rem] w-[40rem] rounded-full bg-coral/10 blur-[120px]" />
      </div>
      {/* Film grain */}
      <div aria-hidden="true" className="grain" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
