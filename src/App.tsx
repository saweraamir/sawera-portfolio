import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'

const sections = [
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-screen scroll-mt-20 items-center justify-center px-4"
          >
            <h2 className="font-heading text-4xl font-semibold text-white">
              {section.label}
              <span className="text-coral">.</span>
            </h2>
          </section>
        ))}
      </main>
    </div>
  )
}
