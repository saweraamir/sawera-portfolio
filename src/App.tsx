import Navbar from './components/Navbar'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <main>
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
