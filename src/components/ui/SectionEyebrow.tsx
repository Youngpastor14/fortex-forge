// ─── SectionEyebrow ──────────────────────────────────────────────────────────
// Consistent section label/eyebrow above headings.
// Features: vertical blue bar left-accent, uppercase tracking, forge-muted text.
// ─────────────────────────────────────────────────────────────────────────────

interface SectionEyebrowProps {
  children: string
  className?: string
  /** Element to render as (default: span, optionally p for block layout) */
  as?: 'span' | 'p'
}

export default function SectionEyebrow({
  children,
  className = '',
  as: Tag = 'span',
}: SectionEyebrowProps) {
  return (
    <Tag className={['eyebrow', className].join(' ')}>
      {children}
    </Tag>
  )
}
