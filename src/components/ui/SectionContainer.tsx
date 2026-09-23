import type { ReactNode } from 'react'

interface SectionContainerProps {
  children: ReactNode
  /** Background variant */
  bg?: 'canvas' | 'surface' | 'container' | 'ink' | 'none'
  /** Width variant */
  width?: 'standard' | 'wide' | 'editorial' | 'full'
  /** Vertical spacing size */
  spacing?: 'md' | 'lg' | 'xl'
  /** HTML element to render as */
  as?: 'section' | 'div' | 'article' | 'aside'
  /** aria-labelledby for section accessibility */
  'aria-labelledby'?: string
  id?: string
  className?: string
}

const bgClasses = {
  canvas:    'bg-forge-canvas',
  surface:   'bg-forge-surface',
  container: 'bg-forge-container',
  ink:       'bg-forge-ink',
  none:      '',
}

const containerClasses = {
  standard: 'container-standard',
  wide:     'container-wide',
  editorial:'container-editorial',
  full:     'w-full',
}

const spacingClasses = {
  md: 'section-spacing',
  lg: 'section-spacing-lg',
  xl: 'py-section-xl',
}

// ─── SectionContainer ────────────────────────────────────────────────────────
// Standard section wrapper: background, vertical spacing, container width.
// Used by every page section to ensure visual consistency.
// ─────────────────────────────────────────────────────────────────────────────

export default function SectionContainer({
  children,
  bg = 'canvas',
  width = 'standard',
  spacing = 'md',
  as: Tag = 'section',
  className = '',
  ...props
}: SectionContainerProps) {
  return (
    <Tag
      className={[bgClasses[bg], 'overflow-x-safe', className].join(' ')}
      {...props}
    >
      <div className={[containerClasses[width], spacingClasses[spacing]].join(' ')}>
        {children}
      </div>
    </Tag>
  )
}
