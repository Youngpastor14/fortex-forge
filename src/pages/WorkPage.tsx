import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'
import type { ProjectCategory } from '@/types/content'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

// ─── WorkPage ──────────────────────────────────────────────────────────────────
// High-fidelity implementation based on Reference mockups/Portfolio/
// (work.png, work1.png, insi.png, insig.png, insigg.png, 06.png) and the Stitch narrative flow.
// Every section integrates full-bleed environmental spatial backgrounds while
// maintaining 100% of website copy, projects data, case-study metrics, and filters.
// ─────────────────────────────────────────────────────────────────────────────

const featured = projects.find((p) => p.isFeatured)!
const supportingProjects = projects.filter((p) => !p.isFeatured)
const heroGridRight = supportingProjects.slice(0, 3)
const allProjects = projects

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <span className="w-1.5 h-3.5 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
      <span className="text-xs font-semibold tracking-wider uppercase text-forge-blue">
        {children}
      </span>
    </div>
  )
}

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'Brand Strategy', 'Identity', 'Website', 'Product']

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All')
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { num: '01', label: 'The Challenge' },
    { num: '02', label: 'Our Approach' },
    { num: '03', label: 'The Solution' },
    { num: '04', label: 'The Results' },
  ]

  const filteredProjects =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.categories.includes(activeFilter as ProjectCategory))

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. WORK HERO — Full-Bleed Studio Desk with Laptop (work.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[90vh] flex flex-col justify-between bg-white border-b border-forge-border overflow-hidden"
        aria-labelledby="work-hero-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/work/01-portfolio-hero.webp"
            mobileSrc="/assets/work/01-portfolio-hero-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
            fetchPriority="high"
          />
          {/* Directional scrim to ensure typography has pristine contrast (Desktop) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:w-[60%]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-20 md:pt-32 pb-12 flex-1 flex flex-col justify-center">
          <div className="max-w-xl">
            <Eyebrow>OUR WORK</Eyebrow>

            <h1
              id="work-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-forge-ink tracking-[-0.03em] leading-[1.08] mb-6"
            >
              Ideas, brands<br />
              and websites<br />
              <span className="text-forge-blue">brought to life.</span>
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary mb-8 leading-relaxed max-w-lg font-normal">
              A look at the brands, websites and products we've helped build, from early ideas to real results.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 bg-forge-blue text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(21,87,255,0.25)] hover:bg-forge-blue-hover hover:shadow-[0_12px_28px_rgba(21,87,255,0.35)] transition-all hover:-translate-y-0.5 group"
              >
                <span>View Our Work</span>
                <span className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-xs" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Mobile Hero Studio Desk Asset — matches mobile mockup (01-hero-selected-work.webp) */}
            <div className="lg:hidden mb-8 w-full max-w-md mx-auto aspect-[16/10] relative rounded-2xl overflow-hidden shadow-sm flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <img
                src="/assets/work/01-portfolio-hero-mobile.webp"
                alt=""
                className="w-full h-full object-cover object-center"
                fetchPriority="high"
              />
            </div>

            {/* Stats row matching work.png */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-forge-border/80 max-w-lg">
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
          2. SELECTED WORK OVERVIEW — Flagship 4-Card Hero Grid (work1.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="selected-work"
        className="py-20 lg:py-28 bg-white border-b border-forge-border"
        aria-labelledby="selected-work-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div className="max-w-xl">
              <Eyebrow>SELECTED WORK</Eyebrow>
              <h2
                id="selected-work-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em]"
              >
                Real businesses.{' '}
                <span className="text-forge-blue">Measurable impact.</span>
              </h2>
            </div>
            <p className="text-forge-secondary text-sm sm:text-base max-w-md leading-relaxed">
              From emerging ideas to established brands, we've helped businesses clarify their position, craft identities that resonate and build digital experiences that perform.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-forge-border mb-10">
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

          {/* Flagship hero grid — matching work1.png */}
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
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            {/* Right staggered column */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Top right — Health Tech */}
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
                  <a
                    href="#all-projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/95 hover:text-white transition-colors"
                  >
                    <span>View Case Study</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>

              {/* Bottom sub-grid: SaaS + Brand Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* SaaS */}
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
                    <a
                      href="#all-projects"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-white hover:text-forge-blue transition-colors"
                    >
                      View Case Study <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>

                {/* Brand Identity / Tiziano */}
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
                    <a
                      href="#all-projects"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-forge-ink underline hover:text-forge-blue transition-colors"
                    >
                      View Case Study <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* Results banner matching work1.png with mountain backdrop */}
          <div className="mt-12 rounded-2xl border border-forge-border overflow-hidden shadow-lg relative bg-white flex flex-col lg:flex-row items-stretch justify-between min-h-[140px]">
            <div className="p-8 sm:p-10 flex flex-col justify-center relative z-10">
              <span className="text-[11px] font-bold tracking-widest text-forge-muted uppercase mb-2">FEATURED RESULTS</span>
              <div className="font-display text-xl sm:text-2xl font-bold text-forge-ink">
                Strategy. Design. Technology.{' '}
                <br className="hidden sm:inline" />
                <span className="text-forge-blue">Real business outcomes.</span>
              </div>
            </div>

            <div className="flex items-center gap-8 sm:gap-12 px-8 py-6 relative z-10 bg-white/90 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-forge-border">
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

            {/* Rocky mountain right image */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none z-0">
              <ResponsiveImage
                desktopSrc="/assets/work/03-results.webp"
                mobileSrc="/assets/work/03-results-mobile.webp"
                alt=""
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. HAVEN FEATURED CASE STUDY DEEP DIVE — Full-Bleed Desk Background (insi.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="featured-case-study"
        className="relative w-full min-h-[920px] lg:min-h-[1020px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="case-study-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/work/02-featured-case-study.webp"
            mobileSrc="/assets/work/02-featured-case-study-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Directional scrim to protect left copy */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
            <Eyebrow>FEATURED CASE STUDY</Eyebrow>
            <h2
              id="case-study-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-forge-ink mb-4 tracking-[-0.03em] leading-tight"
            >
              Property<br />
              <span className="text-forge-blue">made simple.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary mb-8 leading-relaxed font-normal">
              How we helped a real estate company transform a complex offering into a clear, credible brand and digital experience.
            </p>

            <div className="flex items-center gap-4">
              <Link
                to="/work/haven"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-ink text-white text-sm font-semibold hover:bg-neutral-800 transition-all shadow-md active:scale-95"
              >
                <span>View Full Case Study</span>
                <span className="text-xs" aria-hidden="true">↗</span>
              </Link>
            </div>

            {/* Case study metadata */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-forge-border/80 text-xs sm:text-sm max-w-md">
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
        </div>

        {/* Floating bottom container matching insi.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-6 border-b border-forge-border">
              {/* Metrics */}
              <div className="lg:col-span-5 grid grid-cols-3 gap-4 sm:gap-6 border-b lg:border-b-0 lg:border-r border-forge-border pb-6 lg:pb-0 lg:pr-6">
                <div>
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-forge-ink tracking-tight">+220%</div>
                  <div className="text-xs text-forge-muted mt-1 leading-snug">Increase in qualified inquiries</div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-forge-ink tracking-tight">3.4x</div>
                  <div className="text-xs text-forge-muted mt-1 leading-snug">More website engagement</div>
                </div>
                <div>
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-forge-ink tracking-tight">+150%</div>
                  <div className="text-xs text-forge-muted mt-1 leading-snug">Growth in brand recognition</div>
                </div>
              </div>

              {/* Transformation story */}
              <div className="lg:col-span-7">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted mb-2 block">THE TRANSFORMATION</span>
                <p className="text-xs sm:text-sm text-forge-secondary leading-relaxed">
                  Haven is a modern real estate company focused on helping people find better places to live and invest. We positioned their brand around clarity and trust, designed a clean and distinctive identity, and built a digital experience that makes property search simple, intuitive and inspiring.
                </p>
              </div>
            </div>

            {/* Stepper navigation matching insi.png */}
            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium overflow-x-auto py-1">
                {steps.map((step, idx) => (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-center gap-2 pb-1 whitespace-nowrap relative transition-colors ${
                      activeStep === idx ? 'text-forge-ink font-semibold' : 'text-forge-muted hover:text-forge-ink'
                    }`}
                  >
                    <span className={`font-mono ${activeStep === idx ? 'text-forge-blue font-bold' : ''}`}>{step.num}</span>
                    <span>{step.label}</span>
                    {activeStep === idx && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-forge-blue rounded-full" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                  aria-label="Previous step"
                  className="w-9 h-9 rounded-full border border-forge-border flex items-center justify-center text-forge-ink bg-white hover:bg-slate-50 transition-colors shadow-sm"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                  aria-label="Next step"
                  className="w-9 h-9 rounded-full bg-forge-ink text-white flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. MORE PROJECTS GRID — 3-Col Responsive Project Grid (insigg.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="all-projects"
        className="py-24 bg-white border-b border-forge-border"
        aria-labelledby="all-projects-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <Eyebrow>SELECTED WORK</Eyebrow>
              <h2
                id="all-projects-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em]"
              >
                More projects.{' '}
                <span className="text-forge-blue">Same approach.</span>
              </h2>
            </div>
            <p className="text-forge-secondary text-sm sm:text-base max-w-md leading-relaxed">
              Each project starts with a clear strategic foundation and ends with a brand and digital presence that works.
            </p>
          </div>

          {/* Filter pills */}
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

          {/* 6-project grid matching insigg.png */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-forge-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_35px_-10px_rgba(13,17,23,0.08)] hover:border-slate-300"
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
                      <p className="text-xs sm:text-sm text-forge-secondary leading-relaxed mb-4">{project.tagline}</p>
                    </div>
                    <div className="pt-4 border-t border-forge-border">
                      {project.caseStudyHref ? (
                        <Link
                          to={project.caseStudyHref}
                          className="text-xs font-semibold text-forge-blue hover:underline inline-flex items-center gap-1"
                          aria-label={`View case study for ${project.client}`}
                        >
                          View Case Study <span aria-hidden="true">↗</span>
                        </Link>
                      ) : (
                        <span className="text-xs font-semibold text-forge-blue inline-flex items-center gap-1">
                          View Case Study <span aria-hidden="true">↗</span>
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

          {/* Bottom callout ribbon matching insigg.png */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-forge-surface border border-forge-border shadow-sm">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-forge-blue block mb-1">
                LET'S BUILD SOMETHING GREAT
              </span>
              <p className="font-display text-xl sm:text-2xl font-bold text-forge-ink">
                Your brand could do this too.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-forge-blue text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-[0_8px_24px_rgba(21,87,255,0.25)] hover:bg-forge-blue-hover transition-all shrink-0"
            >
              Start a Project <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. OUR APPROACH — Vanity Work vs Real Results (insig.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 bg-forge-surface border-b border-forge-border"
        aria-labelledby="approach-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-16">
            <Eyebrow>OUR APPROACH</Eyebrow>
            <h2
              id="approach-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em] mb-4"
            >
              We measure success differently.{' '}
              <br />
              <span className="text-forge-blue">Because it matters.</span>
            </h2>
            <p className="text-forge-secondary text-base sm:text-lg leading-relaxed">
              A great-looking brand means nothing if it doesn't help you win. We focus on outcomes, not just aesthetics — because your brand should work harder than it looks good.
            </p>
          </div>

          {/* Side-by-side contrast cards */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            {/* Vanity Work */}
            <div className="rounded-2xl border border-forge-border bg-white p-8 sm:p-10 flex flex-col shadow-sm">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">VANITY WORK</span>
                <h3 className="font-display text-2xl font-bold text-forge-ink">Looks good. Little impact.</h3>
              </div>
              <div className="rounded-xl overflow-hidden mb-8 border border-forge-border bg-forge-surface aspect-[16/10]">
                <ResponsiveImage
                  desktopSrc="/assets/home/approach.webp"
                  mobileSrc="/assets/work/05-process-mobile.webp"
                  alt="Generic brand work without strategic foundation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <ul className="space-y-3.5 text-sm text-forge-secondary">
                {['No clear positioning', 'Looks similar to competitors', "Doesn't communicate value", 'Hard to convert attention', 'Little to no business impact'].map((item) => (
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
            <div className="rounded-2xl border-2 border-forge-blue/30 bg-white p-8 sm:p-10 flex flex-col relative shadow-md">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-blue block mb-1">REAL RESULTS</span>
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
              <ul className="space-y-3.5 text-sm text-forge-ink font-medium">
                {['Clear positioning and messaging', 'Distinctive and memorable identity', 'Built for the right audience', 'Designed to convert and scale', 'Measurable business impact'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-forge-blue text-white flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Founder quote + 4 strategic pillars */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-forge-border shadow-sm mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Founder quote */}
              <div className="lg:col-span-4 pr-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-2">THE BOTTOM LINE</span>
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
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: '🎯', title: 'Business First',       desc: 'We start with your actual business goals, not just design trends.' },
                  { icon: '📊', title: 'Clarity Over Noise',   desc: 'We simplify, focus and eliminate what doesn\'t move the needle.' },
                  { icon: '👥', title: 'Built for Real People', desc: 'We design for the people you need to reach, not just the people who "like design."' },
                  { icon: '↗',  title: 'Results That Last',    desc: 'We create systems that grow with your business, not one-time visuals that get forgotten.' },
                ].map((pillar) => (
                  <div key={pillar.title} className="p-4 rounded-xl bg-forge-surface border border-forge-border flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-forge-blue/10 text-forge-blue flex items-center justify-center text-base font-bold shrink-0">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-forge-ink mb-0.5">{pillar.title}</h4>
                      <p className="text-xs text-forge-secondary leading-relaxed">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA banner with concrete F-cube background (06-cta-banner.webp) */}
          <div className="relative rounded-2xl overflow-hidden border border-forge-border shadow-lg min-h-[160px] flex items-center justify-between p-8 sm:p-10 bg-white">
            <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
              <ResponsiveImage
                desktopSrc="/assets/work/06-cta-banner.webp"
                mobileSrc="/assets/work/06-cta-banner-mobile.webp"
                alt=""
                className="w-full h-full object-cover object-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent sm:via-white/80 lg:w-3/5" />
            </div>
            <div className="relative z-10 max-w-lg">
              <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">
                READY FOR RESULTS?
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-forge-ink mb-1">
                Your brand can do more.
              </h3>
              <p className="text-xs sm:text-sm text-forge-secondary">Let's build what's next.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-forge-blue text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(21,87,255,0.25)] hover:bg-forge-blue-hover transition-all"
              >
                Let's Talk <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. CLOSING CTA — Full-Bleed Carved Granite Monument (06.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[850px] lg:min-h-[920px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="work-cta-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/work/07-closing-scene.webp"
            mobileSrc="/assets/work/07-closing-scene-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
            loading="lazy"
            decoding="async"
          />
          {/* Directional scrim to protect left copy (Desktop) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent lg:w-[60%]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
            <Eyebrow>LET'S BUILD YOURS</Eyebrow>
            <h2
              id="work-cta-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-forge-ink tracking-[-0.03em] leading-tight"
            >
              Your brand could<br />
              <span className="text-forge-blue">do this too.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary mb-8 leading-relaxed font-normal">
              Strategy. Design. Technology. Real results. Let's turn your ideas into a brand people trust, and a digital experience that drives growth.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-ink text-white font-semibold text-sm hover:bg-neutral-800 transition-all shadow-md active:scale-95"
              >
                <span>Let's Talk</span>
                <span className="text-xs" aria-hidden="true">↗</span>
              </Link>
              <a
                href="#selected-work"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-forge-border text-forge-ink font-semibold text-sm hover:bg-forge-surface transition-all bg-white/80 backdrop-blur-sm"
              >
                View Our Work
              </a>
            </div>
            <p className="text-xs text-forge-muted pt-2">— No pressure. Just a conversation about what's next.</p>
          </div>
        </div>

        {/* Bottom floating assurances matching 06.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full md:w-auto">
              {[
                { icon: '👥', title: 'Strategic partner',    sub: 'Not just a design team' },
                { icon: '📊', title: 'Built for growth',     sub: 'Designs that perform' },
                { icon: '🛡️', title: 'Real business impact', sub: 'More than just aesthetics' },
              ].map((badge, i) => (
                <div
                  key={badge.title}
                  className={`flex items-start gap-3.5 ${i > 0 ? 'sm:border-l sm:border-forge-border sm:pl-6' : ''}`}
                >
                  <span className="text-lg" aria-hidden="true">{badge.icon}</span>
                  <div>
                    <div className="text-forge-ink font-semibold text-sm">{badge.title}</div>
                    <div className="text-xs text-forge-muted mt-0.5">{badge.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="shrink-0 text-[11px] font-semibold tracking-widest text-forge-muted uppercase">
              FORGING ABSOLUTE CLARITY.
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
