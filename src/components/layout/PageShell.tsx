import type { ReactNode } from 'react'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'

interface PageShellProps {
  children: ReactNode
  /** Set to true for pages with a dark/image hero immediately after header (removes spacer) */
  heroPage?: boolean
}

// ─── PageShell ────────────────────────────────────────────────────────────────
// Wraps all pages with: skip-to-content link, GlobalHeader, main content, GlobalFooter.
// The header component itself manages the 72px offset spacer internally.
// ─────────────────────────────────────────────────────────────────────────────

export default function PageShell({ children }: PageShellProps) {
  return (
    <>
      {/* Skip-to-content: first focusable element, accessibility requirement */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <GlobalHeader />

      <main id="main-content" tabIndex={-1}>
        {children}
      </main>

      <GlobalFooter />
    </>
  )
}
