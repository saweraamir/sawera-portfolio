import Reveal from './Reveal'

export default function SectionHeading({
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="text-outline font-heading text-5xl font-bold sm:text-6xl"
        >
          {number}
        </span>
        <Reveal>
          <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
        </Reveal>
      </div>
      <div
        aria-hidden="true"
        className="mt-3 h-0.5 w-24 border-t-2 border-dashed border-coral"
      />
    </>
  )
}
