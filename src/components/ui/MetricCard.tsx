// ─── MetricCard ──────────────────────────────────────────────────────────────
// Displays a single key metric: large number/stat + label + optional footnote.
// Used in TrustAndProof, About, and Services sections.
// ─────────────────────────────────────────────────────────────────────────────

interface MetricCardProps {
  value: string      // e.g. "94%", "3×", "$2M+"
  label: string      // e.g. "Client retention rate"
  footnote?: string  // e.g. "across all 2024 engagements"
  /** Background variant */
  bg?: 'canvas' | 'surface' | 'container'
  className?: string
}

const bgClass = {
  canvas:    'bg-forge-canvas border border-forge-border',
  surface:   'bg-forge-surface border border-forge-border',
  container: 'bg-forge-container border border-transparent',
}

export default function MetricCard({
  value,
  label,
  footnote,
  bg = 'canvas',
  className = '',
}: MetricCardProps) {
  return (
    <div
      className={[
        'rounded-xl p-6 lg:p-8',
        bgClass[bg],
        className,
      ].join(' ')}
    >
      {/* Metric value — display size, Forge Blue accent */}
      <p
        className="font-display font-bold text-forge-blue leading-none tracking-tight mb-2"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        aria-label={`${value}: ${label}`}
      >
        {value}
      </p>

      {/* Label */}
      <p className="text-body-sm font-medium text-forge-ink leading-snug">
        {label}
      </p>

      {/* Optional footnote */}
      {footnote && (
        <p className="text-label-sm text-forge-subtle mt-1.5">
          {footnote}
        </p>
      )}
    </div>
  )
}
