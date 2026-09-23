import { useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { primaryNav } from '@/data/navigation'

interface MobileMenuProps {
  id: string
  isOpen: boolean
  onClose: () => void
}

// ─── MobileMenu ──────────────────────────────────────────────────────────────
// Full-screen slide-in drawer for mobile navigation.
// Accessibility:
// - Proper aria-modal, role="dialog"
// - Escape key closes drawer
// - Focus trap: first/last focusable element cycling
// - Focus returns to trigger on close (managed by GlobalHeader)
// ─────────────────────────────────────────────────────────────────────────────

export default function MobileMenu({ id, isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const lastFocusableRef = useRef<HTMLAnchorElement>(null)

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus first element when opened
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus()
    }
  }, [isOpen])

  // Focus trap tab cycling
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return

    const focusableElements = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]'
    )
    if (!focusableElements || focusableElements.length === 0) return

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  return (
    <>
      {/* ── Backdrop Overlay ─────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className={[
          'fixed inset-0 z-40 bg-forge-ink/20 backdrop-blur-[2px]',
          'transition-opacity duration-standard',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer Panel ─────────────────────────────────────────────────── */}
      <div
        ref={drawerRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onKeyDown={handleKeyDown}
        className={[
          'fixed top-0 right-0 z-50 h-full w-[min(320px,88vw)]',
          'bg-forge-canvas flex flex-col',
          'shadow-xl',
          'transition-transform duration-standard ease-forge',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-forge-border flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={onClose}
            aria-label="Fortex Forge — Home"
          >
            <div className="w-[28px] h-[28px] overflow-hidden">
              <img
                src="/assets/brand/black_icon.svg"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display font-bold text-forge-ink text-[13px] tracking-[0.08em] uppercase leading-none">
              Fortex Forge
            </span>
          </Link>

          <button
            ref={firstFocusableRef}
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-md
                       text-forge-muted transition-colors hover:bg-forge-surface hover:text-forge-ink
                       focus-visible:outline-2 focus-visible:outline-forge-blue focus-visible:outline-offset-2"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-6 py-8">
          <ul role="list" className="space-y-1">
            {primaryNav.map((item, index) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center justify-between',
                      'px-4 py-4 rounded-lg',
                      'font-display font-semibold text-[1rem]',
                      'transition-all duration-fast',
                      isActive
                        ? 'text-forge-blue bg-forge-blue-soft'
                        : 'text-forge-ink hover:bg-forge-surface hover:text-forge-blue',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-[6px] h-[6px] rounded-full bg-forge-blue" aria-hidden="true" />
                      )}
                    </>
                  )}
                </NavLink>
                {/* Divider between all items except last */}
                {index < primaryNav.length - 1 && (
                  <div className="mx-4 border-b border-forge-border/60 mt-1" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA footer */}
        <div className="px-6 pb-8 pt-4 border-t border-forge-border flex-shrink-0">
          <Link
            ref={lastFocusableRef}
            to="/contact"
            onClick={onClose}
            className="btn-primary w-full justify-center"
          >
            Let's Talk
            <span aria-hidden="true">↗</span>
          </Link>
          <p className="text-center text-label-sm text-forge-subtle mt-4">
            © 2026 Fortex Forge Ltd
          </p>
        </div>
      </div>
    </>
  )
}
