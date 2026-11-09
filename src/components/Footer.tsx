import { personal } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {personal.name} &middot; Built with
          React &amp; Three.js
        </p>
        <a
          href="#home"
          className="text-sm text-slate-400 transition-colors hover:text-coral"
        >
          Back to top &uarr;
        </a>
      </div>
    </footer>
  )
}
