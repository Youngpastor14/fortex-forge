import { useState } from 'react'
import { Link } from 'react-router-dom'

// ─── HomePage ─────────────────────────────────────────────────────────────────
// Source of truth: fortex_forge_official_homepage_integrated_backgrounds/code.html
//
// Sections (approved order, do not rearrange):
//   1.  Hero          — atmospheric split composition, monolith asset right side
//   2.  HiddenCost    — left-copy / right fractured-mark asset, blueprint annotations
//   3.  TrustAndProof — rock-frame base, logo strip, 3 metric cards
//   4.  WhatActuallyWorks — transformation artwork + 3-discipline grid
//   5.  Process       — 4-stage numbered timeline + artwork backbone
//   6.  Consequences  — escalation monoliths + 3-period cards + "6 Weeks" dark card
//   7.  FAQ           — split: accordion left (7-col), editorial card right (5-col)
//   8.  FinalCTA      — brand monument asset right, dual CTA, trust badges
//
// Art direction:
//   - Mix-blend-multiply atmospheric images bleed from the right into each section
//   - Left copy is always protected by a white gradient overlay on the image
//   - Blueprint annotations appear only at lg+ breakpoints (decorative, aria-hidden)
//   - Client brand names are typographic (no real logos yet; placeholder-safe)
//
// Performance:
//   - Hero monolith: fetchpriority="high" (above fold)
//   - All other section images: loading="lazy"
//   - Images positioned absolutely; layout never depends on them loading
//   - motion: restrained CSS transitions only; full reduced-motion compliance
// ─────────────────────────────────────────────────────────────────────────────

// ── Data ──────────────────────────────────────────────────────────────────────

const processSteps = [
  {
    num: '01',
    week: 'WEEK 1 – 2',
    title: 'Discover',
    caption: 'FIND WHAT MAKES YOU DIFFERENT',
    body: 'We dig deep into your business, market, and goals to uncover your unique advantage.',
    deliverables: ['Strategy session', 'Market research', 'Brand positioning'],
  },
  {
    num: '02',
    week: 'WEEK 3 – 4',
    title: 'Design',
    caption: 'BRING YOUR BRAND TO LIFE',
    body: 'We design a strategic visual identity and content system that clearly expresses your value.',
    deliverables: ['Visual identity design', 'Brand assets', 'Content direction'],
  },
  {
    num: '03',
    week: 'WEEK 5 – 6',
    title: 'Build',
    caption: 'CREATE A HIGH-PERFORMING PRESENCE',
    body: 'We build a modern, conversion-focused website and digital touchpoints that turn attention into opportunities.',
    deliverables: ['Website design & dev', 'Integration & testing', 'Launch preparation'],
  },
  {
    num: '04',
    week: 'WEEK 7',
    title: 'Launch',
    caption: 'GO TO MARKET WITH CONFIDENCE',
    body: "We help you launch, refine and position your brand for long-term growth with ongoing support when needed.",
    deliverables: ['Go-live support', 'Performance review', 'Growth roadmap'],
  },
]

const consequencePeriods = [
  {
    num: '01',
    period: '3 Months',
    body: "Fewer inquiries. More price objections. You lose clients to competitors you know you're better than.",
  },
  {
    num: '02',
    period: '6 Months',
    body: 'Slower growth. Weaker market position. Higher customer acquisition cost eating into margins.',
  },
  {
    num: '03',
    period: '12 Months',
    body: "Lost market opportunities. Harder to raise funding or scale. You're forced to rebrand anyway.",
  },
]

const faqItems = [
  {
    id: 'faq-01',
    num: '01',
    q: 'What services does Fortex Forge offer?',
    a: 'We offer brand strategy, brand identity design, website design and development, content strategy and business registration support. Everything is designed to help you build a clear, credible and high-converting brand.',
  },
  {
    id: 'faq-02',
    num: '02',
    q: 'How long does a typical project take?',
    a: 'A full comprehensive system deployment takes exactly 6 weeks from kickoff discovery to final website launch and brand asset handoff.',
  },
  {
    id: 'faq-03',
    num: '03',
    q: 'Do you work with early-stage businesses?',
    a: 'Yes. We frequently partner with seed-stage founders and high-growth ventures that need institutional credibility before raising capital or scaling market acquisition.',
  },
  {
    id: 'faq-04',
    num: '04',
    q: 'What is the investment range?',
    a: 'Our systems are scoped based on your growth stage and project breadth. Contact us during our consultation call for a transparent, bespoke scope breakdown.',
  },
  {
    id: 'faq-05',
    num: '05',
    q: 'Can you help with business registration (CAC)?',
    a: 'Yes, for African businesses requiring seamless legal setup, we provide full business registration and regulatory documentation support.',
  },
  {
    id: 'faq-06',
    num: '06',
    q: 'How do we get started?',
    a: 'Simply schedule an introductory clarity call using the "Let\'s Talk" button. We\'ll review your brand goals, diagnose your current hurdles, and propose a roadmap.',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

/** Eyebrow label — 11px mono uppercase with left blue tick */
function Eyebrow({ children, className = '', center = false }: { children: React.ReactNode; className?: string; center?: boolean }) {
  return (
    <p
      className={[
        'eyebrow-label',
        center ? 'justify-center' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </p>
  )
}

/** Section annotation footer — uppercase micro-text pair */
function SectionAnnotation({ left, right }: { left: string; right?: string }) {
  return (
    <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-forge-border pt-6">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  )
}

/** Individual FAQ accordion item */
function FaqItem({ item, isOpen, onToggle }: {
  item: typeof faqItems[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-forge-border shadow-sm overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-blue focus-visible:ring-offset-2 rounded-xl"
        aria-expanded={isOpen}
        aria-controls={`${item.id}-body`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-4 min-w-0">
          <span
            className={[
              'font-mono text-sm font-bold flex-shrink-0 transition-colors duration-150',
              isOpen ? 'text-forge-blue' : 'text-neutral-400',
            ].join(' ')}
            aria-hidden="true"
          >
            {item.num}
          </span>
          <span className="font-display font-bold text-base sm:text-lg text-forge-ink leading-snug">
            {item.q}
          </span>
        </div>
        <span
          className={[
            'text-xl font-mono text-neutral-400 flex-shrink-0 transition-transform duration-200',
            isOpen ? 'rotate-0' : '',
          ].join(' ')}
          aria-hidden="true"
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        id={`${item.id}-body`}
        role="region"
        aria-labelledby={`${item.id}-btn`}
        className={[
          'overflow-hidden transition-all duration-200 motion-reduce:transition-none',
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <p className="px-6 pb-5 pt-0 pl-[4.25rem] text-sm text-forge-secondary leading-relaxed border-t border-neutral-100">
          <span className="block pt-3">{item.a}</span>
        </p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-01')

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => (prev === id ? null : id))
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO
          Composition: copy left (max-w-2xl), monolith image atmospheric right
          Protected by white-to-transparent gradient overlay
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[640px] lg:min-h-[760px] flex flex-col justify-between pt-16 pb-12 overflow-hidden bg-white"
        id="hero"
        aria-labelledby="hero-heading"
      >
        {/* Atmospheric background — monolith bleeds from right */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/home/heromonolith.webp"
            alt=""
            className="absolute right-[-15%] sm:right-[-5%] lg:right-0 top-0 w-[95%] sm:w-[80%] lg:w-[62%] h-full object-contain object-right-bottom mix-blend-multiply opacity-90 lg:opacity-100"
            fetchPriority="high"
            decoding="async"
            width={900}
            height={760}
          />
          {/* White gradient — protects left copy */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-full lg:w-1/2 pointer-events-none" />
        </div>

        {/* Hero copy — left column */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 my-auto">
          <div className="max-w-2xl">
            <Eyebrow className="mb-6">BRANDING. STRATEGY. GROWTH.</Eyebrow>

            <h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-forge-ink leading-[1.08] mb-6 text-balance"
            >
              Your business is{' '}
              <span className="text-forge-blue">being judged</span>{' '}
              before you get the chance to explain it.
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-9">
              We make sure that judgment works in your favor.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Fix This Now <span aria-hidden="true" className="text-xs">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Client proof ribbon — grounded at base of hero */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pt-16 mt-8 border-t border-forge-border/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-forge-secondary">
            <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
              TRUSTED BY AMBITIOUS BRANDS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-85 font-display font-bold text-lg text-neutral-800 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="flex items-center gap-1">◀ Risevest</span>
              <span className="flex items-center gap-1">◎ ahados <span className="text-[9px] font-normal uppercase ml-0.5">Capital</span></span>
              <span className="flex items-center gap-1">d dukka</span>
              <span className="flex items-center gap-1 font-mono tracking-tight font-extrabold">Blockex.</span>
              <span className="flex items-center gap-1">♣ Paylite</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. HIDDEN COST
          Composition: left copy, fractured-mark atmospheric right,
          blueprint annotations (lg+ decorative), 3 mini-column metrics,
          section annotation footer
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white relative border-t border-forge-border overflow-hidden"
        id="services"
        aria-labelledby="hidden-cost-heading"
      >
        {/* Fractured mark — atmospheric right bleed */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/home/hidden-cost.webp"
            alt=""
            className="absolute right-[-10%] sm:right-0 bottom-0 w-full sm:w-[75%] lg:w-[58%] h-full object-contain object-right-bottom mix-blend-multiply opacity-80 sm:opacity-95 lg:opacity-100"
            loading="lazy"
            decoding="async"
          />
          {/* Blueprint annotations — large screens only, purely decorative */}
          <div className="hidden lg:block absolute right-[28%] top-[14%] text-[10px] font-mono font-bold text-neutral-400 tracking-wider leading-tight">
            MISALIGNED<br />MESSAGE<br /><span className="text-forge-blue">+</span>
          </div>
          <div className="hidden lg:block absolute right-[4%] top-[16%] text-[10px] font-mono font-bold text-neutral-400 tracking-wider leading-tight">
            CONFUSED<br />POSITIONING<br /><span className="text-forge-blue">+</span>
          </div>
          <div className="hidden lg:block absolute right-[3%] top-[34%] text-[10px] font-mono font-bold text-neutral-400 tracking-wider leading-tight">
            INCONSISTENT<br />IDENTITY<br /><span className="text-forge-blue">+</span>
          </div>
          <div className="hidden lg:block absolute right-[44%] top-[48%] text-[10px] font-mono font-bold text-neutral-400 tracking-wider text-right leading-tight">
            LOST<br />OPPORTUNITIES<br /><span className="text-forge-blue">+</span>
          </div>
          <div className="hidden lg:block absolute right-[4%] bottom-[28%] text-[10px] font-mono font-bold text-neutral-400 tracking-wider leading-tight">
            UNTAPPED<br />POTENTIAL<br /><span className="text-forge-blue">+</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            <Eyebrow className="mb-6">THE HIDDEN COST</Eyebrow>

            <h2
              id="hidden-cost-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-forge-ink leading-[1.12] mb-6"
            >
              Your business is working harder{' '}
              <span className="text-forge-blue">than your brand.</span>
            </h2>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
              You have a great product, a capable team and real potential. But when your brand doesn't communicate that clearly, you lose opportunities, trust and revenue every month.
            </p>

            {/* 3 mini-column metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-forge-border mb-10">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-forge-ink">Lost Revenue</h3>
                <p className="text-xs text-forge-secondary leading-normal">Potential clients choose clearer competitors.</p>
              </div>
              <div className="space-y-1 sm:border-l sm:border-forge-border sm:pl-6">
                <h3 className="font-display font-bold text-sm text-forge-ink">Weaker Perception</h3>
                <p className="text-xs text-forge-secondary leading-normal">You look smaller than you actually are.</p>
              </div>
              <div className="space-y-1 sm:border-l sm:border-forge-border sm:pl-6">
                <h3 className="font-display font-bold text-sm text-forge-ink">Higher Acquisition Cost</h3>
                <p className="text-xs text-forge-secondary leading-normal">You spend more to convince people.</p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-forge-ink text-white text-sm font-semibold hover:bg-neutral-800 transition-all duration-200 shadow-md"
            >
              Stop Leaving Money Behind <span aria-hidden="true" className="text-xs">↗</span>
            </Link>
          </div>

          {/* Section annotation footer */}
          <div className="mt-28 pt-6 flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-100">
            <span>UNCLEAR BRANDS LOSE GROWTH.</span>
            <span>CLARITY CHANGES EVERYTHING.</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. TRUST & PROOF
          Composition: rock-frame image pinned to bottom of section,
          centered header, logo strip, 3 metric stat cards, CTA link
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-forge-surface border-t border-forge-border relative overflow-hidden"
        id="work"
        aria-labelledby="trust-heading"
      >
        {/* Rock frame — pinned to base */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none select-none z-0"
          aria-hidden="true"
        >
          <img
            src="/assets/home/trust-proof.webp"
            alt=""
            className="w-full h-40 md:h-56 lg:h-72 object-cover object-bottom mix-blend-multiply opacity-80"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Header */}
          <div className="max-w-3xl mx-auto mb-14">
            <Eyebrow className="mb-6" center>TRUST &amp; PROOF</Eyebrow>
            <h2
              id="trust-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-forge-ink leading-tight mb-6"
            >
              Clarity creates{' '}
              <span className="text-forge-blue">real business outcomes.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              We partner with ambitious businesses across Africa and beyond to build brands that attract the right clients, communicate with confidence and drive measurable growth.
            </p>
          </div>

          {/* Client logo strip */}
          <div className="max-w-4xl mx-auto pb-12 mb-16 border-b border-forge-border/80">
            <span className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 block mb-6">
              TRUSTED BY AMBITIOUS BRANDS
            </span>
            <div className="flex flex-wrap items-center justify-around gap-8 text-neutral-800 font-display font-bold text-lg sm:text-xl">
              <span>◀ Risevest</span>
              <span>◎ ahados <span className="text-[10px] font-normal uppercase">CAPITAL</span></span>
              <span>d dukka</span>
              <span className="font-mono tracking-tight font-extrabold">Blockex.</span>
              <span>♣ Paylite</span>
            </div>
          </div>

          {/* 3 metric stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 text-left">
            {[
              { value: '30+', label: 'BRANDS SUPPORTED', body: 'Across multiple industries and markets.' },
              { value: '3x',  label: 'STRONGER MARKET POSITION', body: 'Average improvement within 6 months.' },
              { value: '90%', label: 'CLIENTS CONTINUE WORKING WITH US', body: 'Because the results speak for themselves.' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/95 backdrop-blur-sm p-8 rounded-xl border border-forge-border shadow-sm"
              >
                <div className="font-display text-5xl lg:text-6xl font-bold text-forge-ink mb-3 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-forge-secondary">{stat.body}</p>
              </div>
            ))}
          </div>

          {/* Bottom proof action */}
          <div className="flex flex-col items-center justify-center pt-2">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-forge-ink pb-1 border-b-2 border-forge-ink hover:text-forge-blue hover:border-forge-blue transition-all bg-white/70 px-4 py-1 rounded"
            >
              See Our Work ↗
            </Link>
            <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-semibold mt-8">
              STRATEGY BUILDS TRUST. RESULTS KEEP IT.
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. WHAT ACTUALLY WORKS
          Composition: centered header, transformation artwork spanning
          full width (mix-blend-multiply), 3-discipline grid below,
          section annotation footer
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-t border-forge-border relative overflow-hidden"
        id="approach"
        aria-labelledby="what-works-heading"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Centered header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Eyebrow className="mb-6" center>OUR APPROACH</Eyebrow>
            <h2
              id="what-works-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-forge-ink mb-4"
            >
              What Actually <span className="text-forge-blue">Works.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              We don't just make things look good. We build strategic systems that help you attract, convince and retain the right clients.
            </p>
          </div>

          {/* Transformation artwork — full-bleed decorative */}
          <div
            className="relative w-full max-w-5xl mx-auto my-6 select-none pointer-events-none"
            aria-hidden="true"
          >
            <img
              src="/assets/home/approach.webp"
              alt=""
              className="w-full h-auto object-contain mx-auto mix-blend-multiply"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 3-discipline breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-6 mb-16">
            {[
              {
                num: '01',
                title: 'Positioning',
                subtitle: 'FIND YOUR EDGE',
                body: "We help you get clear on what you do, who you serve and what makes you different — so you stop competing on price.",
              },
              {
                num: '02',
                title: 'Identity',
                subtitle: 'EXPRESS YOUR VALUE',
                body: 'We design visual identities and content systems that communicate your value instantly and make you memorable.',
              },
              {
                num: '03',
                title: 'Website',
                subtitle: 'TURN ATTENTION INTO OPPORTUNITY',
                body: 'We build high-converting websites that turn your brand, message and offers into real business results.',
              },
            ].map((item) => (
              <div key={item.num} className="space-y-3 pt-4 border-t border-forge-border">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">{item.num}</span>
                <h3 className="font-display text-2xl font-bold text-forge-ink">{item.title}</h3>
                <p className="text-xs font-bold tracking-wider uppercase text-neutral-500">{item.subtitle}</p>
                <p className="text-sm text-forge-secondary leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mb-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200"
            >
              Let's Build Your System <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <SectionAnnotation
            left="STRATEGY. DESIGN. TECHNOLOGY. BUILT FOR REAL GROWTH."
            right="FROM CLARITY TO OPPORTUNITY."
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. PROCESS (HOW THIS WORKS)
          Composition: split header (7-col / 5-col), 4-stage number banner,
          process artwork backbone, 4-column deliverables grid, annotation
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-forge-surface border-t border-forge-border relative overflow-hidden"
        id="process"
        aria-labelledby="process-heading"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Split header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-6">HOW WE WORK</Eyebrow>
              <h2
                id="process-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-forge-ink"
              >
                A clear process.{' '}
                <br className="hidden sm:inline" />
                <span className="text-forge-blue">A stronger outcome.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-forge-secondary leading-relaxed">
                In just 6 weeks, we take you from confusion to a clear, credible brand that attracts the right clients and positions you for real growth.
              </p>
            </div>
          </div>

          {/* Stage number banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-2 pt-4">
            {processSteps.map((step) => (
              <div key={step.num}>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl lg:text-5xl font-display font-extrabold text-neutral-300">
                    {step.num}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                      {step.week}
                    </span>
                    <h3 className="font-display font-bold text-lg text-forge-ink">{step.title}</h3>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">
                  {step.caption}
                </p>
              </div>
            ))}
          </div>

          {/* Process artwork backbone */}
          <div
            className="relative w-full max-w-6xl mx-auto my-4 select-none pointer-events-none"
            aria-hidden="true"
          >
            <img
              src="/assets/home/process.webp"
              alt=""
              className="w-full h-auto object-contain mx-auto mix-blend-multiply"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 4-column deliverables grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {processSteps.map((step) => (
              <div key={step.num} className="space-y-3">
                <p className="text-xs text-forge-secondary leading-relaxed">{step.body}</p>
                <ul className="space-y-1.5">
                  {step.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                      <span className="text-forge-blue" aria-hidden="true">→</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mb-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200"
            >
              Start Your Transformation <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-forge-border pt-6 gap-3">
            <span>FROM STRATEGY TO IMPACT.</span>
            <span>IDEAS ARE EVERYWHERE. CLARITY IS RARE.</span>
            <span>BUILT WITH INTENTION. FOR WHAT'S NEXT.</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. CONSEQUENCES
          Composition: header left-aligned, escalation monolith artwork
          full-width, then 4-col grid (3 period cards + dark breakthrough card)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-t border-forge-border relative overflow-hidden"
        id="consequences"
        aria-labelledby="consequences-heading"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <Eyebrow className="mb-6">THE CONSEQUENCE</Eyebrow>
            <h2
              id="consequences-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-forge-ink mb-6"
            >
              The longer you wait,{' '}
              <br />
              <span className="text-forge-blue">the more it costs you.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              An unclear brand doesn't just slow growth — it quietly takes opportunities, revenue and market position while you focus on everything else.
            </p>
          </div>

          {/* Escalation artwork */}
          <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden pt-6 pb-8">
            <div
              className="relative w-full select-none"
              aria-hidden="true"
            >
              <img
                src="/assets/home/consequences.webp"
                alt=""
                className="w-full h-auto object-contain mix-blend-multiply"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* 4-column cards: 3 period cards + breakthrough dark card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {consequencePeriods.map((item) => (
                <div
                  key={item.num}
                  className="bg-neutral-50/90 backdrop-blur-sm p-6 rounded-xl border border-forge-border"
                >
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono">
                    {item.num}
                  </span>
                  <h3 className="font-display font-bold text-lg text-forge-ink mt-2 mb-1">
                    {item.period}
                  </h3>
                  <p className="text-xs text-forge-secondary leading-relaxed">{item.body}</p>
                </div>
              ))}

              {/* Breakthrough contrast card */}
              <div className="bg-forge-ink p-6 rounded-xl border border-forge-blue/40 text-white flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-28 h-28 bg-forge-blue/30 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />
                <div>
                  <span className="text-[10px] font-bold text-forge-blue uppercase tracking-widest block mb-2">
                    OR YOU COULD FIX THIS
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mb-2 leading-tight">
                    In 6 Weeks.
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                    Get clarity, build credibility, and start attracting the right clients — faster.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-forge-blue text-white text-xs font-semibold hover:bg-forge-blue-hover transition-all"
                >
                  Let's Talk <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>

          <SectionAnnotation
            left="UNCLEAR BRANDS PAY A SILENT PRICE."
            right="CLARITY CHANGES EVERYTHING."
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. FAQ
          Composition: 7-col accordion left + fractured-stone atmospheric
          right, with editorial quote card (lg+)
          Single-open accordion behavior (one item open at a time)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-forge-surface border-t border-forge-border relative overflow-hidden"
        id="faq"
        aria-labelledby="faq-heading"
      >
        {/* Fractured stone — atmospheric right bleed */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/home/faq.webp"
            alt=""
            className="absolute right-[-12%] sm:right-[-4%] lg:right-0 bottom-0 sm:top-0 w-[85%] sm:w-[65%] lg:w-[48%] h-full object-contain object-right-bottom mix-blend-multiply opacity-85 lg:opacity-100"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column — accordion */}
            <div className="lg:col-span-7">
              <Eyebrow className="mb-6">FREQUENTLY ASKED QUESTIONS</Eyebrow>
              <h2
                id="faq-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-forge-ink mb-4"
              >
                You have questions.{' '}
                <br />
                <span className="text-forge-blue">We have answers.</span>
              </h2>
              <p className="text-base text-forge-secondary mb-10">
                Here are some of the most common questions we get from founders and business owners.
              </p>

              <div className="space-y-4" role="list" aria-label="Frequently asked questions">
                {faqItems.map((item) => (
                  <div key={item.id} role="listitem">
                    <FaqItem
                      item={item}
                      isOpen={openFaq === item.id}
                      onToggle={() => toggleFaq(item.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold hover:bg-forge-blue-hover transition-all shadow-md shadow-forge-blue/20"
                >
                  Still Have a Question? <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>

            {/* Right column — editorial quote card */}
            <div className="lg:col-span-5 flex flex-col justify-end pt-12 lg:pt-0">
              <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl border border-forge-border shadow-lg max-w-md ml-auto">
                <div className="w-1.5 h-6 bg-forge-blue mb-4" aria-hidden="true" />
                <blockquote className="font-display font-bold text-xl sm:text-2xl text-forge-ink leading-snug mb-4">
                  "A clear process leads to a better experience for everyone."
                </blockquote>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  — FORTEX FORGE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. FINAL CTA
          Composition: left copy (max-w-2xl), brand monument atmospheric
          right, dual CTA row, trust badges, annotation footer
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-36 bg-white relative border-t border-forge-border overflow-hidden"
        id="contact"
        aria-labelledby="final-cta-heading"
      >
        {/* Brand monument — atmospheric right bleed */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/home/cta.webp"
            alt=""
            className="absolute right-[-15%] sm:right-[-5%] lg:right-0 bottom-0 w-[95%] sm:w-[75%] lg:w-[58%] h-full object-contain object-right-bottom mix-blend-multiply opacity-90 lg:opacity-100"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            <Eyebrow className="mb-6">READY TO BUILD</Eyebrow>

            <h2
              id="final-cta-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-forge-ink leading-[1.08] mb-6"
            >
              Clarity isn't a luxury.{' '}
              <br />
              <span className="text-forge-blue">It's a growth tool.</span>
            </h2>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
              Let's build a brand that attracts the right clients, builds trust and creates real opportunities for your business.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200"
              >
                Let's Talk <span aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/90 backdrop-blur-sm text-forge-ink border border-forge-border text-sm font-semibold hover:bg-neutral-50 transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-forge-border">
              {[
                { icon: '👥', label: 'Strategy-Led Approach' },
                { icon: '🛡', label: 'Proven Results' },
                { icon: '📊', label: 'A Partner In Your Growth' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-xs font-bold text-forge-ink uppercase tracking-wider">
                  <span className="text-forge-blue" aria-hidden="true">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Annotation footer */}
          <div className="mt-24 flex items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-forge-border pt-6">
            <span>STRATEGY TODAY. A STRONGER TOMORROW.</span>
            <span>LET'S FORGE WHAT'S NEXT.</span>
          </div>
        </div>
      </section>
    </>
  )
}
