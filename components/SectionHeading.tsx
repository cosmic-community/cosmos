interface SectionHeadingProps {
  label: string
  title: string
  description?: string
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <span className="museum-label">{label}</span>
      <h2 className="mt-2 font-serif text-3xl md:text-4xl font-600 text-ink tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-ink/60 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      <div className="exhibit-rule mt-6" />
    </div>
  )
}