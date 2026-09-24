import { useState } from 'react'
import { Link } from 'react-router-dom'
import { insights } from '@/data/insights'

// ─── InsightsPage — A07 Production Implementation ─────────────────────────────
// Source of truth: fortex_forge_official_insights_editorial_page_audited_refined/code.html
//
// Approved section order:
//   1. Insights Hero        — Atmospheric full-height bg, headline, topic pill strip
//   2. Featured Essay       — 7/5 split card: image left / editorial copy right
//   3. Latest Perspectives  — Filter strip + 3-col article card grid
//   4. Strategic Pull Quote — Centred founder blockquote
//   5. The Forge Dispatch   — Newsletter subscription (UI only, no backend)
//   6. Closing CTA          — 7/5 split: contact + dual CTAs / monument image + trust strip
//
// CONTENT AUTHENTICITY RULE:
//   Only the 5 approved articles from src/data/insights.ts are rendered.
//   The Stitch grid used placeholder articles — those are NOT used here.
//   No fabricated titles, authors, dates, categories, or reading times.
//
// Assets:
//   Hero bg: /assets/insights/hero.webp (confirmed present)
//   Article covers: /assets/insights/{id}/cover.webp × 5 (all confirmed present)
//   CTA monument: /assets/home/cta.webp (brand editorial asset)
//
// Filter: UI-only useState, filters the non-featured articles by categoryLabel.
//   Categories: All Insights | Brand Strategy | Visual Identity | Growth | Process
// ──────────────────────────────────────────────────────────────────────────────

// ── Local helpers ─────────────────────────────────────────────────────────────

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className={`w-1.5 h-3.5 rounded-full shrink-0 ${light ? 'bg-white/50' : 'bg-forge-blue'}`} aria-hidden="true" />
      <span className={`text-xs font-bold tracking-widest uppercase ${light ? 'text-white/60' : 'text-forge-blue'}`}>{children}</span>
    </div>
  )
}

// ── Derived data ──────────────────────────────────────────────────────────────

const featured = insights.find((i) => i.isFeatured)!
const latestArticles = insights.filter((i) => !i.isFeatured)

// Available filter categories (derived from actual data — no fabrication)
const allCategories = ['All Insights', ...Array.from(new Set(latestArticles.map((a) => a.categoryLabel)))]

// ── Main component ────────────────────────────────────────────────────────────

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('All Insights')

  const filteredArticles =
    activeCategory === 'All Insights'
      ? latestArticles
      : latestArticles.filter((a) => a.categoryLabel === activeCategory)

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. INSIGHTS HERO
          Atmospheric full-height bg image with left-anchored gradient.
          Headline: "Ideas for a clearer, stronger tomorrow."
          Topic pill filter strip (visual-only; category filter in section 3)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden min-h-[560px] lg:min-h-[640px] flex items-center bg-forge-surface border-b border-forge-border/60"
        aria-labelledby="insights-hero-heading"
      >
        {/* Background editorial image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/insights/hero-bg.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-right lg:object-center"
            fetchPriority="high"
            decoding="async"
          />
          {/* Left gradient scrim — protects text legibility */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:via-white/90 lg:via-white/80 to-transparent"
            aria-hidden="true"
          />
          {/* Bottom fade for mobile */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden"
            aria-hidden="true"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            <Eyebrow>Insights</Eyebrow>

            <h1
              id="insights-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-forge-ink tracking-[-0.025em] mb-5 leading-[1.1]"
            >
              Ideas for a clearer,
              <br />
              <span className="text-forge-blue">stronger tomorrow.</span>
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary max-w-xl mb-8 leading-relaxed">
              Practical thoughts on branding, business, and digital growth for founders who want to do it right.
            </p>

            {/* Topic pill strip — scrolls to the article grid */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Browse topics">
              {['Branding', 'Business', 'Web & Tech', 'Marketing', 'Founder Journey'].map((topic) => (
                <a
                  key={topic}
                  href="#latest-perspectives"
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-forge-ink border border-forge-border shadow-sm hover:border-forge-ink hover:bg-forge-ink hover:text-white transition-all motion-reduce:transition-none"
                >
                  {topic}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. FEATURED ESSAY
          7/5 split card: editorial image left / copy right.
          Author: Ayobami Egbewole, Creative Director.
          Approved article: the-trust-deficit.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 lg:py-24 bg-[#F7F8FA] border-b border-forge-border"
        aria-labelledby="featured-essay-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header strip */}
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-forge-border">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest uppercase text-forge-blue">Featured Essay</span>
              <span className="text-forge-muted text-xs" aria-hidden="true">/</span>
              <span className="text-xs font-medium text-forge-muted">Editor's Selection</span>
            </div>
            <span className="text-xs font-medium text-forge-muted hidden sm:block">Updated Weekly</span>
          </div>

          {/* Split card */}
          <article
            className="bg-white rounded-2xl border border-forge-border shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 group transition-shadow duration-300 hover:shadow-md"
            aria-labelledby="featured-essay-heading"
          >
            {/* Left — image */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-forge-ink">
              <img
                src={featured.coverImage}
                alt={`Cover image for "${featured.title}"`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute top-5 left-5">
                <span className="px-3.5 py-1.5 rounded-full bg-forge-ink/90 text-white text-xs font-semibold backdrop-blur-md shadow-sm">
                  Flagship Analysis
                </span>
              </div>
            </div>

            {/* Right — editorial content */}
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Meta strip */}
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-forge-muted uppercase mb-5">
                  <span className="text-forge-blue">{featured.categoryLabel}</span>
                  <span aria-hidden="true">•</span>
                  <span>{featured.readTime}</span>
                  <span aria-hidden="true">•</span>
                  <time dateTime={featured.publishedAt}>
                    {new Date(featured.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </time>
                </div>

                <h2
                  id="featured-essay-heading"
                  className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-bold text-forge-ink tracking-[-0.025em] mb-5 leading-snug group-hover:text-forge-blue transition-colors duration-300"
                >
                  {featured.title}
                </h2>

                <p className="text-sm sm:text-base text-forge-secondary leading-relaxed mb-8">
                  {featured.excerpt}
                </p>
              </div>

              {/* Author + action */}
              <div className="pt-6 flex items-center justify-between border-t border-forge-border/80">
                <div className="flex items-center gap-3">
                  {/* Initials avatar — no photo available yet */}
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-display text-sm font-bold text-forge-ink border border-forge-border shrink-0">
                    AE
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-forge-ink">{featured.author.name}</span>
                    <span className="text-xs text-forge-muted">{featured.author.role}</span>
                  </div>
                </div>
                <Link
                  to={featured.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-forge-blue hover:text-forge-blue-hover transition-colors"
                  aria-label={`Read "${featured.title}"`}
                >
                  Read Essay <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. LATEST PERSPECTIVES
          Eyebrow + h2 + filter strip + 3-col article card grid.
          Filtered by categoryLabel using useState.
          Only approved articles rendered — no fabricated content.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="latest-perspectives"
        className="w-full py-20 lg:py-24 bg-forge-surface"
        aria-labelledby="latest-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <Eyebrow>Latest Perspectives</Eyebrow>
              <h2
                id="latest-heading"
                className="font-display text-3xl lg:text-4xl font-bold text-forge-ink tracking-[-0.025em]"
              >
                Clarity in practice.{' '}
                <span className="text-forge-blue">Articles that move the needle.</span>
              </h2>
            </div>
          </div>

          {/* Filter strip */}
          <div
            className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-forge-border"
            role="group"
            aria-label="Filter articles by category"
          >
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all motion-reduce:transition-none ${
                  activeCategory === cat
                    ? 'bg-forge-ink text-white shadow-sm'
                    : 'bg-white text-forge-secondary hover:text-forge-ink border border-forge-border'
                }`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article grid — 3-col, approved content only */}
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="flex flex-col bg-white rounded-xl overflow-hidden border border-forge-border shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={article.coverImage}
                      alt={`Cover image for "${article.title}"`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 rounded-full text-xs font-semibold text-forge-ink shadow-sm backdrop-blur-sm">
                      {article.categoryLabel}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Meta */}
                      <div className="flex items-center gap-2 text-xs text-forge-muted mb-2 font-medium">
                        <span>{article.readTime}</span>
                        <span aria-hidden="true">•</span>
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                        </time>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg sm:text-xl font-bold text-forge-ink tracking-[-0.02em] mb-3 leading-snug group-hover:text-forge-blue transition-colors duration-200 motion-reduce:transition-none">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-forge-secondary line-clamp-3 leading-relaxed mb-6">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 flex items-center justify-between border-t border-forge-border">
                      <span className="text-xs text-forge-muted font-medium">{article.author.name}</span>
                      <Link
                        to={article.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-forge-ink group-hover:text-forge-blue transition-colors"
                        aria-label={`Read "${article.title}"`}
                      >
                        Read Article <span aria-hidden="true">↗</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-forge-muted text-sm">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. STRATEGIC PULL QUOTE
          Centred founder blockquote — Ayobami Egbewole (Melo Kaji).
          Approved copy from Stitch export.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 lg:py-24 bg-[#F2F4F6] border-y border-forge-border"
        aria-label="Founder perspective"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          {/* Quote icon */}
          <div
            className="w-12 h-12 rounded-full bg-forge-blue/10 text-forge-blue flex items-center justify-center mx-auto mb-8 text-2xl font-bold select-none"
            aria-hidden="true"
          >
            "
          </div>

          <blockquote>
            <p className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] text-forge-ink tracking-[-0.02em] leading-snug mb-8 font-medium">
              "You don't need more content. You need clearer ideas. In an era of infinite noise, the rarest and most valuable brand asset is absolute clarity."
            </p>
            <footer>
              <cite className="not-italic">
                <span className="font-display text-base text-forge-ink font-bold block">
                  Ayobami Egbewole (Melo Kaji)
                </span>
                <span className="text-xs text-forge-muted mt-1 block font-medium">
                  Founder &amp; Creative Director, Fortex Forge
                </span>
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. THE FORGE DISPATCH — Newsletter
          Visual UI only — no backend email integration yet.
          Copy: "Fortnightly Intelligence / The Forge Dispatch."
          Disclaimer: "Fortnightly release. No sponsored content."
          Form: preventDefault — no submission without real integration.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 lg:py-24 bg-white"
        aria-labelledby="newsletter-heading"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="p-8 sm:p-10 lg:p-12 rounded-2xl bg-[#F7F8FA] border border-forge-border shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <Eyebrow>Fortnightly Intelligence</Eyebrow>
              <h2
                id="newsletter-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-forge-ink tracking-[-0.025em] mb-3"
              >
                The Forge Dispatch.
              </h2>
              <p className="text-sm sm:text-base text-forge-secondary leading-relaxed">
                A bi-weekly letter on brand strategy, digital architecture, and the mechanics of commercial perception. Curated specifically for founders and leadership teams. Zero noise.
              </p>
            </div>

            {/* Email form — visual only */}
            <form
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Work email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your work email..."
                required
                autoComplete="email"
                className="flex-1 px-5 py-3 rounded-full bg-white text-forge-ink placeholder:text-forge-muted border border-forge-border focus:outline-none focus:border-forge-blue focus:ring-2 focus:ring-forge-blue/20 text-sm shadow-sm transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-forge-ink text-white text-sm font-semibold hover:bg-neutral-800 transition-colors shadow-sm shrink-0"
              >
                Subscribe <span aria-hidden="true">↗</span>
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-forge-muted">
              Fortnightly release. No sponsored content. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. CLOSING CTA — "Good ideas deserve a conversation."
          7/5 split: copy + contact cards + dual CTAs / monument image + trust strip.
          Approved Stitch copy preserved exactly.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 lg:py-24 bg-forge-surface border-t border-forge-border"
        aria-labelledby="insights-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-2xl border border-forge-border shadow-sm p-8 lg:p-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left — copy + contact cards + CTAs */}
              <div className="lg:col-span-7">
                <Eyebrow>Let's Talk</Eyebrow>
                <h2
                  id="insights-cta-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em] mb-5 leading-tight"
                >
                  Good ideas deserve a{' '}
                  <span className="text-forge-blue">conversation.</span>
                </h2>
                <p className="text-base text-forge-secondary max-w-xl mb-8 leading-relaxed">
                  Whether you're ready to start, have a question, or just want to explore an idea, we're here for it.
                </p>

                {/* Direct contact cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  <a
                    href="mailto:hello@fortexforge.com"
                    className="p-4 rounded-xl bg-forge-surface hover:bg-forge-blue/5 border border-forge-border/80 transition-colors flex items-start gap-3"
                  >
                    <span className="text-forge-blue text-lg shrink-0 mt-0.5" aria-hidden="true">✉</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-forge-ink">Send an email</span>
                      <span className="text-xs text-forge-muted truncate">hello@fortexforge.com</span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="p-4 rounded-xl bg-forge-surface hover:bg-forge-blue/5 border border-forge-border/80 transition-colors flex items-start gap-3"
                    aria-label="Chat on WhatsApp"
                  >
                    <span className="text-forge-blue text-lg shrink-0 mt-0.5" aria-hidden="true">💬</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-forge-ink">Chat on WhatsApp</span>
                      <span className="text-xs text-forge-muted">Quick responses</span>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="p-4 rounded-xl bg-forge-surface hover:bg-forge-blue/5 border border-forge-border/80 transition-colors flex items-start gap-3"
                    aria-label="Connect on LinkedIn"
                  >
                    <span className="text-forge-blue text-lg shrink-0 mt-0.5" aria-hidden="true">↗</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-forge-ink">Connect on LinkedIn</span>
                      <span className="text-xs text-forge-muted">Let's network</span>
                    </div>
                  </a>
                </div>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-forge-blue hover:bg-forge-blue-hover text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all shadow-[0_4px_14px_rgba(21,87,255,0.28)] hover:shadow-[0_6px_20px_rgba(21,87,255,0.36)]"
                  >
                    Start a Project <span aria-hidden="true">↗</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-forge-surface hover:bg-slate-100 text-forge-ink text-sm font-semibold px-6 py-3.5 rounded-full border border-forge-border transition-all"
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>

              {/* Right — monument image with overlay */}
              <div className="lg:col-span-5 mt-8 lg:mt-0">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-md border border-forge-border bg-forge-ink">
                  <img
                    src="/assets/home/cta.webp"
                    alt="Fortex Forge — Brand and digital execution studio"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-forge-ink/95 via-forge-ink/40 to-transparent flex flex-col justify-end p-6 text-white"
                    aria-hidden="true"
                  >
                    <span className="text-[11px] uppercase tracking-widest text-forge-blue/80 font-semibold">Founders Desk</span>
                    <p className="font-display text-lg text-white mt-1 font-bold">Same mission. Different conversations.</p>
                    <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-300 font-semibold tracking-wider">
                      <span>BRANDS</span>
                      <span aria-hidden="true">•</span>
                      <span>WEBSITES</span>
                      <span aria-hidden="true">•</span>
                      <span>STRATEGY</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust assurances strip */}
            <div className="mt-10 pt-8 border-t border-forge-border/80 grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { icon: '⚡', title: 'Fast responses',            sub: 'No long wait times. Within 24h.' },
                { icon: '🛡️', title: 'Serious about your project', sub: 'Confidential and professional.' },
                { icon: '🤝', title: 'Built for founders',         sub: 'From idea to execution.' },
              ].map((badge) => (
                <div key={badge.title} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 text-base">
                    {badge.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-forge-ink">{badge.title}</span>
                    <span className="text-xs text-forge-muted">{badge.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
