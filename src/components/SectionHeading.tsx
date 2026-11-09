export default function SectionHeading({ children }: { children: string }) {
  return (
    <>
      <h2 className="font-heading text-3xl font-semibold text-white sm:text-4xl">
        {children}
      </h2>
      <div
        aria-hidden="true"
        className="mt-3 h-0.5 w-24 border-t-2 border-dashed border-coral"
      />
    </>
  )
}
