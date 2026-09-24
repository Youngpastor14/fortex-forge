import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import type { ProjectCategory } from '@/types/content'

// ─── WorkPage ──────────────────────────────────────────────────────────────────
// Source of truth: fortex_forge_official_work_portfolio_page_refined/code.html
//
// Approved section order (preserved exactly):
//   1.  Work Hero              — 5-col headline + 7-col hero image; 3-stat trust ribbon
//   2.  Selected Work Overview — Header + filter pills + flagship hero grid + results banner
//   3.  Haven Case Study       — Featured deep-dive: 5/7 split + metrics panel + process nav
//   4.  More Projects Grid     — 3-col 6-card project grid with filter pills
//   5.  Our Approach           — "Vanity Work" vs "Real Results" split + 4 strategic pillars
//   6.  Closing CTA            — 6/6 split: "Your brand could do this too." + monument image
//
// Projects data: /src/data/projects.ts (single source of truth)
// Assets: /assets/work/{id}/cover.webp — all 6 confirmed present
//
// Haven metrics (from approved Stitch export — do not alter):
//   +220% Increase in qualified inquiries
//   3.4×  More website engagement
//   +150% Growth in brand recognition
//
// Category filters: All | Brand Strategy | Identity | Website | Product
// Filter is UI-only (useState) — no URL routing needed at this stage.
// ──────────────────────────────────────────────────────────────────────────────

// ── Derived data ─────────────────────────────────────────────────────────────

const featured = projects.find((p) => p.isFeatured)!
const supportingProjects = projects.filter((p) => !p.isFeatured)

// The top hero grid uses the featured project + first 3 supporting
const heroGridRight = supportingProjects.slice(0, 3)

// The full 6-project grid uses all projects
const allProjects = projects

// ── Sub-components ────────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <span className="w-[3px] h-4 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-widest text-forge-ink/80">{children}</span>
    </div>
  )
}

// ── Category filter pills ─────────────────────────────────────────────────────

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'Brand Strategy', 'Identity', 'Website', 'Product']

// ── Main component ────────────────────────────────────────────────────────────

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All')

  const filteredProjects =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.categories.includes(activeFilter as ProjectCategory))

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. WORK HERO — Full bleed panoramic workspace background
          Reference: Reference mockups/Portfolio/work.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[660px] lg:min-h-[760px] flex items-center bg-white border-b border-forge-border overflow-hidden"
        aria-labelledby="work-hero-heading"
      >
        {/* Full-bleed workspace background */}
        <div className="absolute inset-0 z-0 flex justify-end pointer-events-none" aria-hidden="true">
          <img
            src="/assets/work/hero-bg.webp"
            alt=""
            className="w-full lg:w-3/4 h-full object-cover object-right lg:object-center opacity-95 lg:opacity-100"
            fetchPriority="high"
            decoding="async"
          />
          {/* White gradient — protects left copy */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 lg:via-white/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 w-full">
          <div className="max-w-xl">
            <Eyebrow>OUR WORK</Eyebrow>

            <h1
              id="work-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-bold text-forge-ink mb-6 tracking-[-0.025em]"
            >
              Ideas, brands and websites{' '}
              <br className="hidden sm:inline" />
              <span className="text-forge-blue">brought to life.</span>
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary mb-8 leading-relaxed max-w-lg">
              A look at the brands, websites and products we've helped build, from early ideas to real results.
            </p>

            <a
              href="#selected-work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forge-blue text-white font-semibold text-sm shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all hover:-translate-y-0.5 mb-12 group"
            >
              <span>View Our Work</span>
              <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs" aria-hidden="true">↗</span>
            </a>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-forge-border max-w-lg" aria-label="Portfolio statistics">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-forge-ink">20+</div>
                <div className="text-xs text-forge-muted mt-1 leading-snug">Projects delivered</div>
              </div>
              <div className="border-l border-forge-border pl-6 sm:pl-8">
                <div className="font-display text-2xl sm:text-3xl font-bold text-forge-ink">10+</div>
                <div className="text-xs text-forge-muted mt-1 leading-snug">Brands built</div>
              </div>
              <div className="border-l border-forge-border pl-6 sm:pl-8">
                <div className="font-display text-2xl sm:text-3xl font-bold text-forge-ink">100%</div>
                <div className="text-xs text-forge-muted mt-1 leading-snug">Client-focused</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. SELECTED WORK OVERVIEW
          Asymmetric header, filter pills, flagship hero grid (6/6 split)
          + right staggered column (3 cards), results banner bottom
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="selected-work"
        className="py-20 lg:py-24 bg-white border-t border-forge-border"
        aria-labelledby="selected-work-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div className="max-w-xl">
              <Eyebrow>Selected Work</Eyebrow>
              <h2
                id="selected-work-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em]"
              >
                Real businesses.{' '}
                <span className="text-forge-blue">Measurable impact.</span>
              </h2>
            </div>
            <p className="text-forge-muted text-sm sm:text-base max-w-md leading-relaxed">
              From emerging ideas to established brands, we've helped businesses clarify their position, craft identities that resonate and build digital experiences that perform.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-forge-border mb-10">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all ${
                    activeFilter === cat
                      ? 'bg-forge-ink text-white shadow-sm'
                      : 'bg-forge-surface text-forge-secondary hover:text-forge-ink hover:bg-slate-100 border border-forge-border'
                  }`}
                  aria-pressed={activeFilter === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
            <a
              href="#all-projects"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full border border-forge-ink/30 text-forge-ink font-medium text-xs sm:text-sm hover:border-forge-ink transition-all hover:bg-forge-surface"
            >
              <span>View All Work</span>
              <span className="text-xs" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Flagship hero grid — preserved exactly from approved export */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Flagship left — Haven */}
            <article className="lg:col-span-6 relative group rounded-2xl overflow-hidden min-h-[460px] lg:min-h-[580px] bg-slate-900 flex flex-col justify-end p-8 sm:p-10 border border-forge-border/40 transition-shadow hover:shadow-[0_20px_35px_-10px_rgba(13,17,23,0.12)]">
              <img
                src={featured.coverImage}
                alt={`${featured.client} — ${featured.tagline}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" aria-hidden="true" />
              <div className="relative z-10">
                <span className="text-[11px] font-bold tracking-widest text-white/80 uppercase mb-3 block">Real Estate</span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">{featured.title}</h3>
                <p className="text-sm text-gray-300 max-w-sm mb-6 leading-relaxed">{featured.tagline}</p>
                <a
                  href="#featured-case-study"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white border-b border-white/40 pb-1 hover:border-white transition-all group-hover:gap-2.5"
                >
                  <span>View Case Study</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>

            {/* Right staggered column */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Top right — Health Tech (Calloway) */}
              <article className="relative group rounded-2xl overflow-hidden min-h-[260px] lg:min-h-[275px] bg-slate-950 flex flex-col justify-end p-8 border border-forge-border/40 transition-shadow hover:shadow-[0_20px_35px_-10px_rgba(13,17,23,0.12)]">
                <img
                  src={heroGridRight[2]?.coverImage}
                  alt={`${heroGridRight[2]?.client} — ${heroGridRight[2]?.tagline}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" aria-hidden="true" />
                <div className="relative z-10 max-w-sm">
                  <span className="text-[11px] font-bold tracking-widest text-forge-blue uppercase mb-2 block">Health Tech</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">A healthier tomorrow.</h3>
                  <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed">{heroGridRight[2]?.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 hover:text-white transition-colors cursor-pointer">
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </article>

              {/* Bottom sub-grid: SaaS + Brand Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* SaaS / Axiom */}
                <article className="relative group rounded-2xl overflow-hidden min-h-[260px] bg-slate-900 flex flex-col justify-end p-6 border border-forge-border/40 transition-shadow hover:shadow-[0_20px_35px_-10px_rgba(13,17,23,0.12)]">
                  <img
                    src={heroGridRight[1]?.coverImage}
                    alt={`${heroGridRight[1]?.client} — ${heroGridRight[1]?.tagline}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" aria-hidden="true" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-1 block">SaaS</span>
                    <h4 className="font-display text-lg font-bold text-white mb-1">Built for what's next.</h4>
                    <p className="text-xs text-gray-300 mb-4 line-clamp-2">{heroGridRight[1]?.tagline}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-white hover:text-forge-blue transition-colors cursor-pointer">
                      View Case Study <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </article>

                {/* Brand Identity / Meridian */}
                <article className="relative group rounded-2xl overflow-hidden min-h-[260px] bg-neutral-100 flex flex-col justify-end p-6 border border-forge-border transition-shadow hover:shadow-[0_20px_35px_-10px_rgba(13,17,23,0.08)]">
                  <img
                    src={heroGridRight[0]?.coverImage}
                    alt={`${heroGridRight[0]?.client} — ${heroGridRight[0]?.tagline}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent" aria-hidden="true" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold tracking-widest text-forge-muted uppercase mb-1 block">Brand Identity</span>
                    <h4 className="font-display text-lg font-bold text-forge-ink mb-1">{heroGridRight[0]?.client}™</h4>
                    <p className="text-xs text-forge-secondary mb-4 line-clamp-2">{heroGridRight[0]?.tagline}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-forge-ink underline hover:text-forge-blue transition-colors cursor-pointer">
                      View Case Study <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* Results banner */}
          <div className="mt-12 rounded-2xl bg-forge-surface border border-forge-border overflow-hidden shadow-sm flex flex-col lg:flex-row items-stretch justify-between">
            <div className="p-8 sm:p-10 flex flex-col justify-center flex-1">
              <span className="text-[11px] font-bold tracking-widest text-forge-muted uppercase mb-2">Featured Results</span>
              <div className="font-display text-xl sm:text-2xl font-bold text-forge-ink">
                Strategy. Design. Technology.{' '}
                <br className="hidden sm:inline" />
                <span className="text-forge-blue">Real business outcomes.</span>
              </div>
            </div>
            <div className="flex items-center gap-8 sm:gap-12 px-8 py-6 border-t lg:border-t-0 lg:border-l border-forge-border bg-white/70">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-forge-ink">20+</div>
                <div className="text-xs text-forge-muted mt-0.5">Projects delivered</div>
              </div>
              <div className="border-l border-forge-border pl-8 sm:pl-12">
                <div className="font-display text-2xl sm:text-3xl font-bold text-forge-ink">10+</div>
                <div className="text-xs text-forge-muted mt-0.5">Brands built</div>
              </div>
              <div className="border-l border-forge-border pl-8 sm:pl-12">
                <div className="font-display text-2xl sm:text-3xl font-bold text-forge-ink">100%</div>
                <div className="text-xs text-forge-muted mt-0.5">Client-focused</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. HAVEN FEATURED CASE STUDY DEEP DIVE
          5/7 split: narrative + specs / presentation image
          Metrics panel: +220% / 3.4× / +150%
          Process stepper navigation (static — no JS state needed)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="featured-case-study"
        className="py-24 bg-forge-surface border-t border-b border-forge-border"
        aria-labelledby="case-study-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left — narrative */}
            <div className="lg:col-span-5">
              <Eyebrow>Featured Case Study</Eyebrow>
              <h2
                id="case-study-heading"
                className="font-display text-4xl sm:text-5xl font-bold text-forge-ink mb-6 tracking-[-0.025em]"
              >
                Property{' '}
                <br />
                <span className="text-forge-blue">made simple.</span>
              </h2>
              <p className="text-forge-muted text-base sm:text-lg mb-8 leading-relaxed">
                How we helped a real estate company transform a complex offering into a clear, credible brand and digital experience.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-forge-ink text-white text-sm font-medium hover:bg-neutral-800 transition-all mb-10 shadow-sm"
              >
                <span>View Full Case Study</span>
                <span className="text-xs" aria-hidden="true">↗</span>
              </a>

              {/* Case study meta */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-forge-border text-xs sm:text-sm">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-forge-muted mb-1">Industry</span>
                  <span className="font-semibold text-forge-ink">Real Estate</span>
                </div>
                <div className="border-l border-forge-border pl-6">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-forge-muted mb-1">Services</span>
                  <span className="font-semibold text-forge-ink">Strategy, Identity, Website</span>
                </div>
                <div className="border-l border-forge-border pl-6">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-forge-muted mb-1">Timeline</span>
                  <span className="font-semibold text-forge-ink">8 Weeks</span>
                </div>
              </div>
            </div>

            {/* Right — presentation image */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-forge-border shadow-xl bg-white aspect-[16/10]">
                <img
                  src={featured.coverImage}
                  alt="Haven — brand identity and website platform"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Metrics + transformation panel */}
          <div className="rounded-2xl bg-white border border-forge-border p-8 sm:p-12 mb-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Metrics — from approved Stitch export, do not alter */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-4 sm:gap-6 border-b lg:border-b-0 lg:border-r border-forge-border pb-8 lg:pb-0 lg:pr-8">
                {featured.metrics?.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forge-ink tracking-[-0.025em]">
                      {m.value}
                    </div>
                    <div className="text-xs text-forge-muted mt-2 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>
              {/* Transformation narrative */}
              <div className="lg:col-span-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted mb-2 block">The Transformation</span>
                <p className="text-sm sm:text-base text-forge-secondary leading-relaxed">{featured.summary}</p>
              </div>
            </div>
          </div>

          {/* Process stepper — static, accessible */}
          <div className="flex items-center justify-between pt-6 border-t border-forge-border" role="navigation" aria-label="Case study phases">
            <div className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium overflow-x-auto py-2">
              {[
                { num: '01', label: 'The Challenge', active: true },
                { num: '02', label: 'Our Approach', active: false },
                { num: '03', label: 'The Solution', active: false },
                { num: '04', label: 'The Results', active: false },
              ].map((step) => (
                <div
                  key={step.num}
                  className={`flex items-center gap-2 pb-2 whitespace-nowrap relative ${step.active ? 'text-forge-ink font-semibold' : 'text-forge-muted'}`}
                >
                  <span className={`font-mono ${step.active ? 'text-forge-blue' : ''}`}>{step.num}</span>
                  <span>{step.label}</span>
                  {step.active && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-forge-blue rounded-full" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <button
                type="button"
                aria-label="Previous phase"
                className="w-10 h-10 rounded-full border border-forge-border flex items-center justify-center text-forge-ink bg-white hover:bg-slate-50 transition-colors shadow-sm"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next phase"
                className="w-10 h-10 rounded-full bg-forge-ink text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-sm"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. MORE PROJECTS GRID — 3-col, 6 cards, with active filter
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="all-projects"
        className="py-24 bg-white"
        aria-labelledby="all-projects-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <Eyebrow>Selected Work</Eyebrow>
              <h2
                id="all-projects-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em]"
              >
                More projects.{' '}
                <span className="text-forge-blue">Same approach.</span>
              </h2>
            </div>
            <p className="text-forge-muted text-sm sm:text-base max-w-md leading-relaxed">
              Each project starts with a clear strategic foundation and ends with a brand and digital presence that works.
            </p>
          </div>

          {/* Filter pills (synced with hero filter state) */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-forge-border" role="group" aria-label="Filter projects">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all ${
                  activeFilter === cat
                    ? 'bg-forge-ink text-white shadow-sm'
                    : 'bg-forge-surface text-forge-secondary hover:text-forge-ink border border-forge-border'
                }`}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 6-project grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col bg-forge-surface rounded-2xl overflow-hidden border border-forge-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_35px_-10px_rgba(13,17,23,0.08)] hover:border-slate-300"
                >
                  {/* Image */}
                  <div className={`relative aspect-[16/11] overflow-hidden ${project.coverBg ?? 'bg-slate-900'}`}>
                    <img
                      src={project.coverImage}
                      alt={`${project.client} — ${project.tagline}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Category badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/65 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-white rounded-full">
                      {project.tags.join(' · ')}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-xl font-bold text-forge-ink">{project.client}.</h3>
                        <span className="text-sm text-forge-muted group-hover:text-forge-blue transition-colors" aria-hidden="true">↗</span>
                      </div>
                      <p className="text-xs sm:text-sm text-forge-muted leading-relaxed mb-4">{project.tagline}</p>
                    </div>
                    <div className="pt-4 border-t border-forge-border">
                      {project.caseStudyHref ? (
                        <Link
                          to={project.caseStudyHref}
                          className="text-xs font-semibold text-forge-blue hover:underline"
                          aria-label={`View case study for ${project.client}`}
                        >
                          View Case Study
                        </Link>
                      ) : (
                        <span className="text-xs font-semibold text-forge-blue">
                          View Case Study
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-forge-muted text-sm">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. OUR APPROACH — Vanity Work vs Real Results + 4 strategic pillars
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 bg-forge-surface border-t border-b border-forge-border"
        aria-labelledby="approach-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Our Approach</Eyebrow>
            <h2
              id="approach-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em] mb-4"
            >
              We measure success differently.{' '}
              <br />
              <span className="text-forge-blue">Because it matters.</span>
            </h2>
            <p className="text-forge-muted text-base sm:text-lg leading-relaxed">
              A great-looking brand means nothing if it doesn't help you win. We focus on outcomes, not just aesthetics — because your brand should work harder than it looks good.
            </p>
          </div>

          {/* Side-by-side contrast cards */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20">
            {/* Vanity Work */}
            <div className="rounded-2xl border border-forge-border bg-white p-8 sm:p-10 flex flex-col shadow-sm">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">Vanity Work</span>
                <h3 className="font-display text-2xl font-bold text-forge-ink">Looks good. Little impact.</h3>
              </div>
              <div className="rounded-xl overflow-hidden mb-8 border border-forge-border bg-forge-surface aspect-[16/10]">
                <img
                  src="/assets/home/approach.webp"
                  alt="Generic brand work without strategic foundation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <ul className="space-y-3.5 text-sm text-forge-muted">
                {['No clear positioning', 'Looks similar to competitors', "Doesn't communicate value", "Hard to convert attention", 'Little to no business impact'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full border border-forge-border text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Central arrow — desktop only */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-forge-border shadow-md items-center justify-center text-forge-ink font-bold" aria-hidden="true">
              →
            </div>

            {/* Real Results */}
            <div className="rounded-2xl border-2 border-forge-blue/30 bg-forge-blue/[0.03] p-8 sm:p-10 flex flex-col relative shadow-sm">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-blue block mb-1">Real Results</span>
                <h3 className="font-display text-2xl font-bold text-forge-ink">Looks good. <span className="text-forge-blue">Performs better.</span></h3>
              </div>
              <div className="rounded-xl overflow-hidden mb-8 border border-forge-blue/10 bg-white aspect-[16/10]">
                <img
                  src={featured.coverImage}
                  alt="Haven — responsive brand and digital platform working across devices"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <ul className="space-y-3.5 text-sm text-forge-ink">
                {['Clear positioning and messaging', 'Distinctive and memorable identity', 'Built for the right audience', 'Designed to convert and scale', 'Measurable business impact'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-forge-blue text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Founder quote + 4 strategic pillars */}
          <div className="pt-12 border-t border-forge-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Founder quote */}
              <div className="lg:col-span-4 pr-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-2">The Bottom Line</span>
                <blockquote className="font-display text-xl sm:text-2xl font-bold text-forge-ink mb-4 leading-snug">
                  "Beautiful work is easy. Meaningful work takes strategy."
                </blockquote>
                <footer className="text-xs text-forge-muted">
                  <cite className="not-italic">
                    <span className="font-semibold text-forge-ink">Melo Kaji</span> — Founder, Fortex Forge
                  </cite>
                </footer>
              </div>

              {/* 4 pillars */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { icon: '🎯', title: 'Business First',       desc: 'We start with your actual business goals, not just design trends.' },
                  { icon: '📊', title: 'Clarity Over Noise',   desc: 'We simplify, focus and eliminate what doesn\'t move the needle.' },
                  { icon: '👥', title: 'Built for Real People', desc: 'We design for the people you need to reach, not just the people who "like design."' },
                  { icon: '↗',  title: 'Results That Last',    desc: 'We create systems that grow with your business, not one-time visuals that get forgotten.' },
                ].map((pillar) => (
                  <div key={pillar.title}>
                    <div className="w-9 h-9 rounded-lg bg-white border border-forge-border flex items-center justify-center text-forge-blue text-base font-bold mb-3 shadow-sm">
                      {pillar.icon}
                    </div>
                    <h4 className="font-display text-base font-bold text-forge-ink mb-1">{pillar.title}</h4>
                    <p className="text-xs sm:text-sm text-forge-muted leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. CLOSING CTA — "Your brand could do this too."
          6/6 split: copy + dual CTAs + trust assurances / monument image
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 bg-white relative overflow-hidden"
        aria-labelledby="work-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Conversion column */}
            <div className="lg:col-span-6">
              <Eyebrow>Let's Build Yours</Eyebrow>
              <h2
                id="work-cta-heading"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-forge-ink tracking-[-0.025em] mb-6"
              >
                Your brand could{' '}
                <br />
                <span className="text-forge-blue">do this too.</span>
              </h2>
              <p className="text-forge-muted text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
                Strategy. Design. Technology. Real results. Let's turn your ideas into a brand people trust, and a digital experience that drives growth.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-ink text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-md active:scale-95"
                >
                  <span>Let's Talk</span>
                  <span className="text-xs" aria-hidden="true">↗</span>
                </Link>
                <a
                  href="#selected-work"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-forge-ink/30 text-forge-ink font-medium text-sm hover:border-forge-ink transition-all hover:bg-forge-surface"
                >
                  View Our Work
                </a>
              </div>
              <p className="text-xs text-forge-muted mb-12">— No pressure. Just a conversation about what's next.</p>

              {/* Trust assurances */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-forge-border">
                {[
                  { icon: '👥', title: 'Strategic partner',    sub: 'Not just a design team' },
                  { icon: '📊', title: 'Built for growth',     sub: 'Designs that perform' },
                  { icon: '🛡️', title: 'Real business impact', sub: 'More than just aesthetics' },
                ].map((badge, i) => (
                  <div
                    key={badge.title}
                    className={`flex items-start gap-3 ${i > 0 ? 'sm:border-l sm:border-forge-border sm:pl-6' : ''}`}
                  >
                    <span className="text-lg" aria-hidden="true">{badge.icon}</span>
                    <div>
                      <div className="text-forge-ink font-semibold text-sm">{badge.title}</div>
                      <div className="text-xs text-forge-muted mt-0.5">{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monument visual */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-forge-border bg-white aspect-[16/10]">
                <img
                  src="/assets/home/cta.webp"
                  alt="Fortex Forge — brand and digital execution"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex justify-between items-center mt-4 px-2 text-[11px] tracking-widest text-forge-muted uppercase">
                <span>Fortex Forge Execution Studio</span>
                <span className="font-semibold text-forge-ink">Forging Absolute Clarity.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
