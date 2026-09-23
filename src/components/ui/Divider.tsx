// ─── Divider ─────────────────────────────────────────────────────────────────
// Horizontal hairline rule consistent with forge-border token.
// ─────────────────────────────────────────────────────────────────────────────

interface DividerProps {
  /** Visual weight of the divider */
  weight?: 'light' | 'standard' | 'heavy'
  /** Additional classes */
  className?: string
  /** aria-hidden is true by default (decorative) */
  decorative?: boolean
}

const weightClass = {
  light:    'border-forge-border/40',
  standard: 'border-forge-border',
  heavy:    'border-forge-border/80',
}

export default function Divider({ weight = 'standard', className = '', decorative = true }: DividerProps) {
  return (
    <hr
      className={['border-0 border-t', weightClass[weight], className].join(' ')}
      aria-hidden={decorative}
    />
  )
}
