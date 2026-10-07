import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '@/data/navigation'
import BrandLogo from '@/components/ui/BrandLogo'
import MobileMenu from './MobileMenu'

// ─── GlobalHeader ─────────────────────────────────────────────────────────────
// Sticky header with:
// - Official Fortex Forge icon mark + wordmark
// - Desktop nav with active-dot indicator
// - "Let's Talk ↗" CTA pill
// - Mobile hamburger → MobileMenu drawer
// - Scroll-aware background (transparent → white with hairline shadow)
// ─────────────────────────────────────────────────────────────────────────────

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open without causing layout shift
  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [mobileOpen])

  // Scroll-aware header style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileToggle = useCallback(() => {
    setMobileOpen(prev => !prev)
  }, [])

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false)
  }, [])

  return (
    <>
      <header
        role="banner"
        className={[
          'fixed top-0 inset-x-0 z-50',
          'transition-[background-color,border-color,box-shadow] duration-standard',
          scrolled
            ? 'bg-forge-canvas/95 backdrop-blur-sm border-b border-forge-border shadow-nav'
            : 'bg-forge-canvas border-b border-forge-border',
        ].join(' ')}
      >
        <div className="container-standard">
          <nav
            role="navigation"
            aria-label="Primary navigation"
            className="flex items-center justify-between h-[72px]"
          >
            {/* ── Brand Mark ────────────────────────────────────────────── */}
            <BrandLogo
              to="/"
              className="flex items-center gap-3.5 flex-shrink-0 group"
              iconClassName="w-[36px] h-[36px]"
              textClassName="font-display font-bold text-forge-ink text-[17px] tracking-[0.05em] uppercase leading-none select-none"
              variant="dark"
            />

            {/* ── Desktop Navigation ────────────────────────────────────── */}
            <ul
              className="hidden lg:flex items-center gap-8"
              role="list"
            >
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      [
                        'relative nav-link font-medium text-[13.5px] py-2',
                        isActive ? 'text-forge-ink' : 'text-forge-muted',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {/* Active indicator dot */}
                        <span
                          className={[
                            'absolute -bottom-[2px] left-1/2 -translate-x-1/2',
                            'w-[4px] h-[4px] rounded-full bg-forge-blue',
                            'transition-all duration-standard',
                            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
                          ].join(' ')}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* ── CTA + Hamburger ───────────────────────────────────────── */}
            <div className="flex items-center gap-4">
              {/* Desktop CTA */}
              <Link
                to="/contact"
                className="hidden lg:inline-flex btn-primary py-2.5 px-5 text-[13.5px]"
              >
                Let's Talk
                <span aria-hidden="true" className="ml-0.5">↗</span>
              </Link>

              {/* Mobile Hamburger */}
              <button
                type="button"
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md -mr-2
                           transition-colors duration-fast hover:bg-forge-surface
                           focus-visible:outline-2 focus-visible:outline-forge-blue focus-visible:outline-offset-2"
                onClick={handleMobileToggle}
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
              >
                {/* Animated hamburger → X icon */}
                <span
                  className={[
                    'block w-[18px] h-[1.5px] bg-forge-ink rounded-full',
                    'transition-all duration-standard origin-center',
                    mobileOpen ? 'translate-y-[6.5px] rotate-45' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'block w-[18px] h-[1.5px] bg-forge-ink rounded-full mt-[5px]',
                    'transition-all duration-standard',
                    mobileOpen ? 'opacity-0 scale-x-0' : '',
                  ].join(' ')}
                />
                <span
                  className={[
                    'block w-[18px] h-[1.5px] bg-forge-ink rounded-full mt-[5px]',
                    'transition-all duration-standard origin-center',
                    mobileOpen ? '-translate-y-[6.5px] -rotate-45' : '',
                  ].join(' ')}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ────────────────────────────────────── */}
      <MobileMenu
        id="mobile-navigation"
        isOpen={mobileOpen}
        onClose={handleMobileClose}
      />

      {/* ── Header Offset Spacer ────────────────────────────────────────── */}
      {/* Prevents content from being hidden under the fixed header */}
      <div className="h-[72px]" aria-hidden="true" />
    </>
  )
}
