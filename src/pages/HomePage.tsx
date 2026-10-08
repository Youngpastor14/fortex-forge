import { useState } from 'react'
import { Link } from 'react-router-dom'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

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
    deliverables: ['Website design & development', 'Integration & testing', 'Launch preparation'],
  },
  {
    num: '04',
    week: 'WEEK 7',
    title: 'Launch',
    caption: 'GO TO MARKET WITH CONFIDENCE',
    body: "We help you launch, refine and position your brand for long-term growth with ongoing support when needed.",
    deliverables: ['Go-live support', 'Performance review', 'Growth recommendations'],
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
        {/* Atmospheric background — monolith bleeds from right (Desktop only) */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/home/hero-bg.webp"
            alt=""
            className="absolute right-0 top-0 w-[62%] h-full object-contain object-right-bottom mix-blend-multiply opacity-100"
            fetchPriority="high"
            decoding="async"
            width={900}
            height={760}
          />
          {/* White gradient — protects left copy */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent w-1/2 pointer-events-none" />
        </div>

        {/* Hero copy — left column */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 my-auto">
          <div className="max-w-2xl">
            <Eyebrow className="mb-6">BRANDING. STRATEGY. GROWTH.</Eyebrow>

            <h1
              id="hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-forge-ink leading-[1.08] mb-6 text-balance"
            >
              Customers decide about your business{' '}
              <span className="text-forge-blue">before you say a word.</span>
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-9">
              We shape that first impression so it works in your favor, and build the website that turns it into inquiries.
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

          {/* Mobile Hero Scene Asset — positioned below copy matching mobile mockup (01-hero-cost-proof.webp) */}
          <div className="lg:hidden mt-8 -mb-4 w-full max-w-sm mx-auto aspect-[4/5] relative flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <img
              src="/assets/home/01-hero-mobile.webp"
              alt=""
              className="w-full h-full object-contain object-bottom drop-shadow-md"
              fetchPriority="high"
            />
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
          <ResponsiveImage
            desktopSrc="/assets/home/02-hidden-cost.webp"
            mobileSrc="/assets/home/02-hidden-cost-mobile.webp"
            alt=""
            className="absolute right-[-10%] sm:right-0 bottom-0 w-full sm:w-[75%] lg:w-[58%] h-full object-contain object-right-bottom mix-blend-multiply opacity-85 sm:opacity-95 lg:opacity-100"
            loading="lazy"
            decoding="async"
          />
          {/* White gradient — protects left copy (desktop only) */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent w-1/2 pointer-events-none" />

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

            {/* Mobile Visual Asset for Hidden Cost */}
            <div className="lg:hidden mt-8 w-full max-w-xs mx-auto aspect-square relative flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <img
                src="/assets/home/02-hidden-cost-mobile.webp"
                alt=""
                className="w-full h-full object-contain drop-shadow-sm"
                loading="lazy"
              />
            </div>
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
          <ResponsiveImage
            desktopSrc="/assets/home/03-trust-and-proof.webp"
            mobileSrc="/assets/home/03-trust-and-proof-mobile.webp"
            alt=""
            className="w-full h-44 md:h-60 lg:h-80 object-cover object-bottom mix-blend-multiply opacity-85"
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
          4. OUR APPROACH (WHAT ACTUALLY WORKS)
          Full background composition: 04-our-approach.webp spans the section.
          Header centered in top sky space, 3 transformation blocks displayed
          in center, 3-discipline columns aligned beneath on reflective floor.
          Reference: Reference mockups/home page/home 3rd sec.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 lg:py-32 bg-white border-t border-forge-border overflow-hidden min-h-[900px] lg:min-h-[1050px] flex flex-col justify-between"
        id="approach"
        aria-labelledby="what-works-heading"
      >
        {/* Full-bleed background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <ResponsiveImage
            desktopSrc="/assets/home/04-our-approach.webp"
            mobileSrc="/assets/home/04-our-approach-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-auto">
          {/* Centered header in top white space */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <Eyebrow className="mb-5" center>OUR APPROACH</Eyebrow>
            <h2
              id="what-works-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] text-forge-ink mb-5 leading-[1.1]"
            >
              What Actually <span className="text-forge-blue">Works.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-2xl mx-auto">
              We don't just make things look good. We build strategic systems that help you attract, convince and retain the right clients.
            </p>
          </div>

          {/* Dedicated spacing where the 3 monoliths in the background image live */}
          <div className="relative w-full max-w-5xl mx-auto h-40 sm:h-56 lg:h-72 my-2 pointer-events-none select-none flex items-center justify-between">
            {/* Overlay numbers 01, 02, 03 on top of the monoliths matching mockup */}
            <div className="hidden lg:grid grid-cols-3 w-full text-center font-display font-bold text-3xl lg:text-4xl text-neutral-400/90 tracking-tight">
              <span className="translate-y-2">01</span>
              <span className="translate-y-2">02</span>
              <span className="translate-y-2">03</span>
            </div>
            {/* Mobile-visible 3 monolith stages image */}
            <div className="lg:hidden w-full h-full flex items-center justify-center">
              <img
                src="/assets/home/04-our-approach-mobile.webp"
                alt="Three disciplines: Positioning, Identity, Website"
                className="w-full h-full object-contain object-bottom"
                loading="lazy"
              />
            </div>
          </div>

          {/* 3-discipline breakdown on the reflective ground beneath the blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto mt-6 mb-14">
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
              <div
                key={item.num}
                className="space-y-3 pt-5 border-t border-neutral-300/80 bg-white/75 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-5 lg:p-0 rounded-2xl lg:rounded-none"
              >
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-mono block">
                  {item.num}
                </span>
                <h3 className="font-display text-2xl sm:text-[28px] font-bold text-forge-ink tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-bold tracking-widest uppercase text-neutral-500">
                  {item.subtitle}
                </p>
                <p className="text-sm text-forge-secondary leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Centered CTA */}
          <div className="text-center mb-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              Let's Build Your System <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Bottom annotations */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-3">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-forge-blue inline-block rounded-full" aria-hidden="true" />
              STRATEGY. DESIGN. TECHNOLOGY. BUILT FOR REAL GROWTH.
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-forge-blue inline-block rounded-full" aria-hidden="true" />
              FROM CLARITY TO OPPORTUNITY.
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. PROCESS (HOW WE WORK)
          Exact composition matching media_1790593974690.jpg reference mockup.
          Background 05-how-we-work.webp spans the section.
          Each column contains stage header above, rock spacing in center,
          and deliverables on reflective floor.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-t border-forge-border overflow-hidden min-h-[960px] lg:min-h-[1080px] flex flex-col justify-between"
        id="process"
        aria-labelledby="process-heading"
      >
        {/* Full-bleed background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <ResponsiveImage
            desktopSrc="/assets/home/05-how-we-work.webp"
            mobileSrc="/assets/home/05-how-we-work-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 lg:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-1 h-3.5 bg-forge-blue rounded-full" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-forge-ink/70">
                  HOW WE WORK
                </span>
              </div>
              <h2
                id="process-heading"
                className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.035em] text-forge-ink leading-[1.06]"
              >
                A clear process.{' '}
                <br />
                A <span className="text-forge-blue">stronger outcome.</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start lg:items-center justify-between lg:justify-end gap-6 lg:gap-10 pb-1">
              <p className="text-forge-secondary text-sm sm:text-base leading-relaxed max-w-sm">
                In just 6 weeks, we take you from confusion to a clear, credible brand that attracts the right clients and positions you for real growth.
              </p>
              <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                  SAME<br />PRINCIPLES.<br />REAL PROGRESS.
                </div>
              </div>
            </div>
          </div>

          {/* 4 Process Columns aligned over the 4 rocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 max-w-[1360px] mx-auto my-4 lg:my-8">
            {processSteps.map((step) => (
              <div key={step.num} className="flex flex-col justify-between">
                {/* Top: 01 Discover */}
                <div>
                  <div className="flex items-baseline gap-3.5 mb-1.5">
                    <span className="font-display text-5xl lg:text-[54px] font-extrabold text-neutral-300 leading-none select-none">
                      {step.num}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                        {step.week}
                      </span>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-forge-ink tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[9.5px] font-bold uppercase tracking-wider text-neutral-500 pl-0.5">
                    {step.caption}
                  </p>
                </div>

                {/* Middle spacing revealing the rocks & connecting blue line from background */}
                <div className="h-44 sm:h-52 lg:h-60 xl:h-64 pointer-events-none select-none" aria-hidden="true" />

                {/* Bottom: body text + bullet points on marble floor */}
                <div className="pt-2">
                  <p className="text-xs sm:text-[13px] text-forge-secondary leading-relaxed mb-4">
                    {step.body}
                  </p>
                  <ul className="space-y-1.5 text-xs text-forge-ink/90 font-medium">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2">
                        <span className="text-forge-blue text-xs font-bold shrink-0">→</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Centered CTA Button */}
          <div className="text-center my-10 sm:my-14">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200 hover:-translate-y-0.5"
            >
              Start Your Transformation <span aria-hidden="true" className="text-xs">↗</span>
            </Link>
          </div>
        </div>

        {/* Bottom annotations */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                FROM STRATEGY<br />TO IMPACT.
              </div>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
              IDEAS ARE EVERYWHERE. CLARITY IS RARE.
            </div>
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                BUILT WITH INTENTION.<br />FOR WHAT'S NEXT.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. CONSEQUENCES
          Full background composition: 06-consequence-with-lettering.webp spans the section.
          Monoliths in artwork showcase 3 Months, 6 Months, 12 Months escalation
          and the glowing 6-week glass monolith with "Let's Talk" CTA.
          Reference: Reference mockups/home page/home 5th sec.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 lg:py-32 bg-white border-t border-forge-border overflow-hidden min-h-[820px] lg:min-h-[960px] flex flex-col justify-between"
        id="consequences"
        aria-labelledby="consequences-heading"
      >
        {/* Full-bleed background artwork with escalation monoliths */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <ResponsiveImage
            desktopSrc="/assets/home/06-consequence-with-lettering.webp"
            mobileSrc="/assets/home/06-consequence-with-lettering.webp"
            alt=""
            className="w-full h-full object-cover object-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-2xl">
              <Eyebrow className="mb-6">THE CONSEQUENCE</Eyebrow>
              <h2
                id="consequences-heading"
                className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] text-forge-ink leading-[1.1] mb-6"
              >
                The longer you wait,{' '}
                <br />
                <span className="text-forge-blue">the more it costs you.</span>
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl">
                An unclear brand doesn't just slow growth — it quietly takes opportunities, revenue and market position while you focus on everything else.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 font-bold pt-2">
              <span className="w-1.5 h-3 bg-neutral-300 rounded-full" />
              <span>INACTION TODAY, HARDER TOMORROW.</span>
            </div>
          </div>

          {/* Period timeline headers positioned above the monolith columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-2 pb-36 sm:pb-52 lg:pb-72">
            {/* 3 Months */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-forge-ink font-mono block">
                3 MONTHS
              </span>
              <div className="w-12 h-0.5 bg-neutral-400" />
            </div>

            {/* 6 Months */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-forge-ink font-mono block">
                6 MONTHS
              </span>
              <div className="w-12 h-0.5 bg-neutral-400" />
            </div>

            {/* 12 Months */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-forge-ink font-mono block">
                12 MONTHS
              </span>
              <div className="w-12 h-0.5 bg-neutral-400" />
            </div>

            {/* 4th Column — Over the glowing glass monolith: CTA button */}
            <div className="flex flex-col items-start lg:items-center justify-start lg:justify-end pt-2 sm:pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/30 hover:bg-forge-blue-hover transition-all duration-200 hover:-translate-y-0.5"
              >
                Let's Talk <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* Mobile-only readable summary card so mobile users also get clear text */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            {consequencePeriods.map((item) => (
              <div
                key={item.num}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-forge-border shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-base text-forge-ink">{item.period}</h3>
                  <span className="text-xs font-mono text-neutral-400">{item.num}</span>
                </div>
                <p className="text-xs text-forge-secondary leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom annotations */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-3">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-forge-blue inline-block rounded-full" aria-hidden="true" />
              UNCLEAR BRANDS PAY A SILENT PRICE.
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-forge-blue inline-block rounded-full" aria-hidden="true" />
              CLARITY CHANGES EVERYTHING.
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. FAQ (FREQUENTLY ASKED QUESTIONS)
          Full background composition: 07-faq.webp spans the section.
          Accordion on left, typographic pull-quote & CTA on right,
          fractured stone artwork anchors the right edge.
          Reference: Reference mockups/home page/home 6th sec.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-t border-forge-border relative overflow-hidden min-h-[920px] flex flex-col justify-between"
        id="faq"
        aria-labelledby="faq-heading"
      >
        {/* Full-bleed background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <ResponsiveImage
            desktopSrc="/assets/home/07-faq.webp"
            mobileSrc="/assets/home/07-faq-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-right mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-12">
            <div>
              <Eyebrow className="mb-6">FREQUENTLY ASKED QUESTIONS</Eyebrow>
              <h2
                id="faq-heading"
                className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.03em] text-forge-ink leading-[1.1] mb-4"
              >
                You have questions.{' '}
                <br />
                <span className="text-forge-blue">We have answers.</span>
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary max-w-xl">
                Here are some of the most common questions we get from founders and business owners.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400 font-bold pt-2">
              <span className="w-1.5 h-3 bg-neutral-300 rounded-full" />
              <span>CLEAR ANSWERS. CONFIDENT DECISIONS.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column — accordion */}
            <div className="lg:col-span-7">
              <div className="space-y-3.5" role="list" aria-label="Frequently asked questions">
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
            </div>

            {/* Right column — editorial quote & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between pt-6 lg:pt-12 lg:pl-6">
              <div className="max-w-sm mb-12">
                <div className="w-1.5 h-6 bg-forge-blue mb-4 rounded-full" aria-hidden="true" />
                <blockquote className="font-display font-medium text-2xl sm:text-3xl text-forge-ink leading-snug mb-4">
                  "A clear process leads to a better experience for everyone."
                </blockquote>
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  — FORTEX FORGE
                </p>
              </div>

              <div className="pt-4 lg:pt-16">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200 hover:-translate-y-0.5"
                >
                  Still Have a Question? <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom annotations */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full mt-auto pt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-3">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-forge-blue inline-block rounded-full" aria-hidden="true" />
              GOOD QUESTIONS BUILD GREAT BRANDS.
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-forge-blue inline-block rounded-full" aria-hidden="true" />
              LET'S MAKE IT CLEAR.
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. FINAL CTA (READY TO BUILD)
          Full-bleed background artwork 08-closing.webp with rock monolith
          on the right and reflective wet marble floor matching home 7th sec.png.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-t border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="contact"
        aria-labelledby="final-cta-heading"
      >
        {/* Full-bleed background artwork matching reference mockup */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <ResponsiveImage
            desktopSrc="/assets/home/08-closing.webp"
            mobileSrc="/assets/home/08-closing-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-6 lg:mb-14">
            <div className="inline-flex items-center gap-2">
              <span className="w-1 h-3.5 bg-forge-blue rounded-full" aria-hidden="true" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-forge-ink/70">
                READY TO BUILD
              </span>
            </div>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                BETTER BRANDS.<br />BRIGHTER OPPORTUNITIES.
              </div>
            </div>
          </div>

          {/* Mobile Closing Emblem Asset — matches mobile mockup (03-faq-closing-footer.webp) */}
          <div className="lg:hidden mb-8 w-full max-w-xs mx-auto aspect-[4/5] relative flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
            <img
              src="/assets/home/08-closing-mobile.webp"
              alt=""
              className="w-full h-full object-contain object-bottom drop-shadow-md"
              loading="lazy"
            />
          </div>

          {/* Left copy block */}
          <div className="max-w-xl lg:max-w-2xl">
            <h2
              id="final-cta-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.035em] text-forge-ink leading-[1.08] mb-6"
            >
              Clarity isn't a luxury.{' '}
              <br />
              <span className="text-forge-blue">It's a growth tool.</span>
            </h2>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
              Let's build a brand that attracts the right clients, builds trust and creates real opportunities for your business.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12 sm:mb-14">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all duration-200 hover:-translate-y-0.5"
              >
                Let's Talk <span aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-white/90 backdrop-blur-sm text-forge-ink border border-neutral-300 text-sm font-semibold hover:bg-neutral-50 transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>

            {/* Trust badges with vertical dividers */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-forge-ink/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-[11px] font-bold uppercase tracking-wider text-forge-ink leading-tight">
                  STRATEGY-LED<br />APPROACH
                </div>
              </div>

              <div className="hidden sm:block w-px h-7 bg-neutral-300" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-forge-ink/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-[11px] font-bold uppercase tracking-wider text-forge-ink leading-tight">
                  PROVEN<br />RESULTS
                </div>
              </div>

              <div className="hidden sm:block w-px h-7 bg-neutral-300" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-forge-ink/80 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="text-[11px] font-bold uppercase tracking-wider text-forge-ink leading-tight">
                  A PARTNER<br />IN YOUR GROWTH
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom annotation footer matching mockup */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                STRATEGY TODAY.<br />A STRONGER TOMORROW.
              </div>
            </div>
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                LET'S FORGE<br />WHAT'S NEXT.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
