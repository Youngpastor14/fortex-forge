import { Link } from 'react-router-dom'
import { footerNav } from '@/data/navigation'

// ─── GlobalFooter ─────────────────────────────────────────────────────────────
// Dark Forge Ink background, 3-column layout:
//   Col 1: Brand mark + tagline + newsletter micro-CTA
//   Col 2: Navigation (Platform / Company)
//   Col 3: Connect (Social links)
// Footer row: Copyright, legal links
// Copyright: "© 2026 Fortex Forge Ltd" (corrected from Stitch exports)
// ─────────────────────────────────────────────────────────────────────────────

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="bg-forge-ink text-forge-canvas"
    >
      {/* ── Main Footer Body ──────────────────────────────────────────────── */}
      <div className="container-standard py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── Col 1: Brand ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Brand mark */}
            <Link
              to="/"
              className="inline-flex items-center gap-3.5 group mb-6"
              aria-label="Fortex Forge — Home"
            >
              {/* Icon mark — white version via CSS invert on dark bg */}
              <div className="w-[38px] h-[38px] flex-shrink-0">
                <img
                  src="/assets/brand/black_icon.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-contain invert"
                />
              </div>
              <span className="font-display font-bold text-white text-[16px] tracking-[0.06em] uppercase leading-none select-none">
                Fortex Forge
              </span>
            </Link>

            {/* Brand tagline */}
            <p className="text-body-sm text-white/60 leading-relaxed max-w-[340px] mb-8">
              Strategic design consultancy building brands that earn trust, command authority, and generate growth — for ambitious founders who refuse to be ignored.
            </p>

            {/* Contact CTA */}
            <Link
              to="/contact"
              className="btn-primary inline-flex"
            >
              Start a Project
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* ── Col 2: Platform + Company ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-1">
            {/* Platform */}
            <div>
              <h3 className="text-label-sm font-semibold text-white/40 uppercase tracking-widest mb-5">
                Platform
              </h3>
              <ul role="list" className="space-y-3.5">
                {footerNav.platform.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-body-sm text-white/70 hover:text-white transition-colors duration-fast"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-label-sm font-semibold text-white/40 uppercase tracking-widest mb-5">
                Company
              </h3>
              <ul role="list" className="space-y-3.5">
                {footerNav.company.map((item) => (
                  <li key={`company-${item.label}`}>
                    <Link
                      to={item.href}
                      className="text-body-sm text-white/70 hover:text-white transition-colors duration-fast"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Col 3: Connect ────────────────────────────────────────────── */}
          <div className="lg:col-span-1">
            <h3 className="text-label-sm font-semibold text-white/40 uppercase tracking-widest mb-5">
              Connect
            </h3>
            <ul role="list" className="space-y-3.5">
              {footerNav.connect.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-body-sm text-white/70 hover:text-white transition-colors duration-fast inline-flex items-center gap-1.5"
                    target={item.href !== '#' ? '_blank' : undefined}
                    rel={item.href !== '#' ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                    {item.href !== '#' && (
                      <span aria-hidden="true" className="text-xs text-white/30">↗</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-8 space-y-2">
              <a
                href="mailto:fortexforge@gmail.com"
                className="text-body-sm text-white/60 hover:text-white transition-colors duration-fast block"
              >
                fortexforge@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-standard py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Copyright — CRIT: corrected from "Technologies Inc." to "Ltd", 2026 */}
          <p className="text-label-sm text-white/40">
            © {currentYear} Fortex Forge Ltd. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-label-sm text-white/40 hover:text-white/70 transition-colors duration-fast"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-label-sm text-white/40 hover:text-white/70 transition-colors duration-fast"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
