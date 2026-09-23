import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type ButtonVariant = 'primary' | 'inverse' | 'ghost' | 'text'
type ButtonSize    = 'sm' | 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  inverse: 'btn-inverse',
  ghost:   'btn-ghost',
  text:    'btn-text',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-label-sm',
  md: '',  // default from btn-* classes
  lg: 'px-9 py-4 text-body-md',
}

// ─── Button — rendered as <button> ───────────────────────────────────────────

interface ButtonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

// ─── ButtonLink — rendered as React Router <Link> ────────────────────────────

interface ButtonLinkProps extends Omit<LinkProps, 'className'> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

// ─── ButtonAnchor — rendered as <a> for external links ───────────────────────

interface ButtonAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

// ── Button (native button element) ───────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', loading = false, children, className = '', disabled, ...props },
    ref
  ) {
    const classes = [
      variantClass[variant],
      sizeClass[size],
      className,
    ].filter(Boolean).join(' ')

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin w-4 h-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

// ── ButtonLink (React Router Link styled as button) ───────────────────────────
export function ButtonLink({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonLinkProps) {
  const classes = [
    variantClass[variant],
    sizeClass[size],
    className,
  ].filter(Boolean).join(' ')

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  )
}

// ── ButtonAnchor (external <a> styled as button) ──────────────────────────────
export function ButtonAnchor({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonAnchorProps) {
  const classes = [
    variantClass[variant],
    sizeClass[size],
    className,
  ].filter(Boolean).join(' ')

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  )
}

// Default export for convenience when using <button>
export default Button
