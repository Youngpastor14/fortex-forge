import { useState } from 'react'
import { Link } from 'react-router-dom'

// ─── ServicesPage ──────────────────────────────────────────────────────────────
// Source of truth: fortex_forge_official_services_pricing_page_refined/code.html
//
// Approved section order (preserved exactly):
//   1. Hero                  — "We fix the one thing keeping clients from trusting you."
//   2. The Real Problem      — "You think you need a logo." + 4-stage strip
//   3. Services Overview     — 4 service cards with starting prices + triage strip
//   4. Brand Strategy Deep   — "Be the obvious choice, not just another option."
//   5. Brand Identity Deep   — "Turn strategy into a distinctive brand identity."
//   6. Website Deep          — "Bring your brand to life online."
//   7. Complete Brand+Web    — "A complete system to position, design and launch."
//   8. Why Positioning First — Philosophy + status quo/Fortex discipline comparison
//   9. Final CTA             — "Ready to build a brand that moves your business?"
//
// Assets (all local):
//   /assets/services/hero-bg.webp
//   /assets/services/brand-comparison.webp
//   /assets/services/card-strategy.webp
//   /assets/services/card-identity.webp
//   /assets/services/card-web.webp
//   /assets/services/card-complete.webp
//
// Prices (exact, do not alter):
//   Brand Strategy:          Starting from ₦120,000 · 1–2 weeks
//   Brand Identity:          Starting from ₦80,000  · 2–4 weeks
//   Website Design & Dev:    Starting from ₦300,000 · 4–6 weeks
//   Complete Brand + Web:    Starting from ₦750,000 · 8–12 weeks
//
// Founder note: approved export names him "Ayobami Egbewole (Melo Kaji) · CEO & Creative Director"
// ──────────────────────────────────────────────────────────────────────────────

// ── Sub-components ────────────────────────────────────────────────────────────

function Eyebrow({ children, blue = false }: { children: string; blue?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <span className="w-[3px] h-3.5 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
      <span className={`text-xs font-semibold tracking-wider uppercase ${blue ? 'text-forge-blue' : 'text-forge-blue'}`}>
        {children}
      </span>
    </div>
  )
}

// Simple filled-circle check or X for comparison lists
function Check({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`mt-0.5 shrink-0 text-[18px] leading-none ${dark ? 'text-forge-blue' : 'text-forge-blue'}`}
      aria-hidden="true"
    >
      ✓
    </span>
  )
}
function Cross() {
  return (
    <span className="mt-0.5 shrink-0 text-[18px] leading-none text-rose-500" aria-hidden="true">
      ✗
    </span>
  )
}

// ── Service data (single source of truth) ────────────────────────────────────

const services = [
  {
    id: 'strategy',
    anchor: 'strategy-deepdive',
    name: 'Brand Strategy',
    tagline: 'Get clear on what you do, who you serve and why it matters.',
    price: '₦120,000',
    priceLabel: 'Starting from',
    img: '/assets/services/card-strategy.webp',
    imgAlt: 'Brand strategy collateral mockup',
    flagship: false,
    timeline: '1 – 2 Weeks',
    deliverables: 'Positioning doc, Messaging framework, Market report',
    founderQuote: 'Positioning turns your expertise into opportunity. It\'s the foundation everything else builds on.',
    ctaLabel: 'Get Started',
    eyebrow: 'BRAND POSITIONING',
    headline: <>Be the obvious choice, not just <span className="text-forge-blue">another option.</span></>,
    body: 'We help you get clear on what you do, who you serve, and why it matters, so your brand stands out in a crowded market and attracts the right clients.',
    pillars: [
      { label: 'Market Clarity',      desc: 'Understand your market, audience and real opportunities.' },
      { label: 'Distinct Positioning', desc: 'Define what makes you different and why it matters.' },
      { label: 'Practical Strategy',  desc: 'Get a clear plan you can actually use to grow.' },
    ],
  },
  {
    id: 'identity',
    anchor: 'identity-deepdive',
    name: 'Brand Identity',
    tagline: 'Turn strategy into a distinctive and consistent visual identity.',
    price: '₦80,000',
    priceLabel: 'Starting from',
    img: '/assets/services/card-identity.webp',
    imgAlt: 'Brand identity stationery showcasing Fortex Forge mark',
    flagship: false,
    timeline: '2 – 4 Weeks',
    deliverables: 'Logo suite, Visual identity system, Brand guidelines, Assets',
    founderQuote: 'A great brand identity doesn\'t just make you look professional. It makes you unforgettable.',
    ctaLabel: 'Get Started',
    eyebrow: 'BRAND IDENTITY',
    headline: <>Turn strategy into a distinctive <span className="text-forge-blue">brand identity.</span></>,
    body: 'We design visual identities that do more than look good. They communicate your value, build recognition and create trust from the first impression.',
    pillars: [
      { label: 'Strategic Design',         desc: 'Every visual element is intentional and aligned with your business goals.' },
      { label: 'Distinctive & Memorable',  desc: 'Stand out in a crowded market with a cohesive, recognizable identity.' },
      { label: 'Ready for Real Use',        desc: 'Get a complete identity system that works seamlessly across digital and print touchpoints.' },
    ],
  },
  {
    id: 'web',
    anchor: 'web-deepdive',
    name: 'Website Design & Dev',
    tagline: 'Bring your brand to life online with a high-converting website.',
    price: '₦300,000',
    priceLabel: 'Starting from',
    img: '/assets/services/card-web.webp',
    imgAlt: 'High performance web interface design on modern laptop',
    flagship: false,
    timeline: '4 – 6 Weeks',
    deliverables: 'Custom website, Responsive design, CMS handover, Analytics',
    founderQuote: null,
    ctaLabel: 'Start a Project',
    eyebrow: 'WEBSITE DESIGN & DEVELOPMENT',
    headline: <>Bring your brand to life <span className="text-forge-blue">online.</span></>,
    body: 'We design and develop high-converting websites that showcase your brand, build credibility and turn visitors into real opportunities.',
    pillars: [
      { label: 'Strategic Design',   desc: 'Built with strategy, not just aesthetics.' },
      { label: 'Clean Development',  desc: 'Fast, secure and scalable modern stacks.' },
      { label: 'Fully Responsive',   desc: 'Flawless on phone, tablet, and desktop.' },
      { label: 'Built to Convert',   desc: 'Engineered to turn traffic into paying clients.' },
    ],
    webMetrics: [
      { value: '3×',   label: 'Inbound Enquiries' },
      { value: '68%',  label: 'Avg Conversion Lift' },
      { value: '4–6w', label: 'Typical Delivery Time' },
      { value: '98%',  label: 'Satisfaction Rate' },
    ],
    webQuote: '"Fortex Forge didn\'t just build a website for us, they brought our brand to life. We\'ve seen a real difference in the quality of enquiries we get."',
    webQuoteAttrib: 'Tunde Adebayo · Founder, Veridian Homes',
  },
  {
    id: 'complete',
    anchor: 'complete-deepdive',
    name: 'Complete Brand + Web',
    tagline: 'A complete system to position, design and launch your brand.',
    price: '₦750,000',
    priceLabel: 'Starting from',
    img: '/assets/services/card-complete.webp',
    imgAlt: 'Full brand and digital ecosystem',
    flagship: true,
    timeline: '8 – 12 Weeks',
    deliverables: 'Complete package',
    targetFit: 'Serious Founders',
    targetFitSub: 'Venture & Scale-ups',
    orientation: 'Built for Growth',
    orientationSub: 'Maximum ROI',
    founderQuote: null,
    ctaLabel: 'Get the Complete Package',
    eyebrow: 'COMPLETE BRAND + WEB',
    headline: <>A complete system to position, design and launch <span className="text-forge-blue">your brand.</span></>,
    body: 'From strategy to visual identity to a high-converting website, we give you everything you need to launch and grow with clarity and confidence.',
    pillars: [
      { label: 'Complete Strategy',             desc: 'Clarity on your market, positioning, messaging and target audience.' },
      { label: 'Full Visual Identity',          desc: 'A distinctive and cohesive brand system unified across all channels.' },
      { label: 'Website Design & Development',  desc: 'A bespoke, responsive web experience tuned for conversion and speed.' },
      { label: 'Launch Support',                desc: 'Full deployment orchestration and initial market introduction.' },
    ],
  },
] as const

// ── FAQ (reused from homepage pattern, Services-specific questions) ───────────

const faqs = [
  {
    id: 'faq-1',
    q: 'Do I need Brand Strategy before Brand Identity?',
    a: 'Yes — and here\'s why. Strategy defines your position, audience and message. Identity then translates that into visual form. Without positioning, even the most beautiful design becomes decoration. We recommend starting with strategy so every creative decision has direction.',
  },
  {
    id: 'faq-2',
    q: 'How are your prices structured?',
    a: 'All prices shown are starting points. The final investment depends on the scope, complexity and deliverables your project requires. We\'ll walk you through exactly what\'s included and what the final figure will be before any work begins — no surprises.',
  },
  {
    id: 'faq-3',
    q: 'What currencies do you accept?',
    a: 'We currently price in Nigerian Naira (₦) and can accommodate equivalent payments in USD or GBP at the agreed exchange rate. Speak to us for international payment arrangements.',
  },
  {
    id: 'faq-4',
    q: 'How long does a typical engagement take?',
    a: 'Timelines vary by service: Brand Strategy takes 1–2 weeks, Brand Identity takes 2–4 weeks, Website projects take 4–6 weeks, and the Complete Brand + Web package takes 8–12 weeks from kickoff to delivery. These are typical durations — complex projects may take longer.',
  },
  {
    id: 'faq-5',
    q: 'Can I start with one service and add more later?',
    a: 'Absolutely. Many clients begin with Brand Strategy, then commission Brand Identity once the positioning is locked. Others add a website after their identity is complete. Each service is designed to stand alone but is built to connect seamlessly with the others.',
  },
  {
    id: 'faq-6',
    q: 'What makes the Complete Brand + Web package different?',
    a: 'The Complete package is our flagship engagement — fully integrated from strategy through to a live website. Because all four disciplines are handled together by the same team, the result is a cohesive brand and digital presence that works as a single system rather than four separate deliverables.',
  },
]

// ── FAQ item component ────────────────────────────────────────────────────────

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: typeof faqs[number]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-forge-border last:border-b-0">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer hover:text-forge-blue transition-colors group"
        aria-expanded={isOpen}
        aria-controls={`${item.id}-panel`}
        onClick={onToggle}
      >
        <span className="font-display font-semibold text-base text-forge-ink group-hover:text-forge-blue transition-colors">
          {item.q}
        </span>
        <span
          className={`shrink-0 text-forge-blue transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        id={`${item.id}-panel`}
        role="region"
        aria-labelledby={`${item.id}-btn`}
        className={`overflow-hidden transition-all duration-200 motion-reduce:transition-none ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-sm text-forge-secondary leading-relaxed pb-5 max-w-2xl">{item.a}</p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<string>('faq-1')

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — full-bg image with gradient scrim, left-aligned copy
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden min-h-[90vh] flex flex-col justify-between"
        style={{ backgroundImage: "url('/assets/services/hero-bg.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        aria-labelledby="services-hero-heading"
      >
        {/* Dual gradient scrims: left-to-right + top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" aria-hidden="true" />

        {/* Hero copy */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-20 md:pt-28 pb-16 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl">
            <Eyebrow>OUR SERVICES</Eyebrow>

            <h1
              id="services-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] text-forge-ink leading-[1.08] mb-6"
            >
              We fix the one thing<br />
              keeping clients from<br />
              trusting you.<br />
              <span className="text-forge-blue">Your brand.</span>
            </h1>

            <p className="text-lg md:text-xl text-forge-secondary max-w-lg mb-8 leading-relaxed">
              Strategy, design and technology to help you build a brand that stands out and grows.
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <a
                href="#services-overview"
                className="inline-flex items-center gap-2 bg-forge-blue text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-[0_8px_24px_rgba(21,87,255,0.25)] hover:bg-forge-blue-hover hover:shadow-[0_12px_28px_rgba(21,87,255,0.35)] transition-all hover:-translate-y-0.5"
              >
                Explore Our Services <span aria-hidden="true">→</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center text-sm font-semibold text-forge-ink hover:text-forge-blue transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-forge-ink hover:after:bg-forge-blue"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom assurance strip */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgba(10,15,29,0.06)] border border-forge-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '▦', label: 'Strategy-led',    sub: 'Rigorous approach' },
                { icon: '↑', label: 'Built for results', sub: 'Tangible business impact' },
                { icon: '◎', label: 'Trusted Founders', sub: 'For serious builders' },
                { icon: '∞', label: 'End-to-End',       sub: 'Lifecycle support' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 font-mono font-bold text-base">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forge-ink">{badge.label}</p>
                    <p className="text-xs text-forge-muted">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 text-forge-muted text-xs font-semibold tracking-wider uppercase mt-2 border-t border-forge-border">
              <span>BRANDS · WEBSITES · GROWTH</span>
              <span className="tracking-widest">FORGING ABSOLUTE CLARITY</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. THE REAL PROBLEM — comparison + 4-stage strip
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-24 lg:py-32 bg-white border-b border-forge-border"
        aria-labelledby="real-problem-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — headline */}
            <div className="lg:col-span-5 space-y-5">
              <Eyebrow>THE REAL PROBLEM</Eyebrow>
              <h2
                id="real-problem-heading"
                className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-forge-ink leading-[1.12] tracking-[-0.025em]"
              >
                You think you need a logo.<br />
                You actually need{' '}
                <span className="text-forge-blue">clients to understand, in 3 seconds,</span>{' '}
                why they should choose you.
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary pt-2 leading-relaxed">
                A good-looking brand is nice. A clear position is what wins deals. We help you move from looking professional to being perceived as the obvious choice.
              </p>
            </div>

            {/* Right — visual comparison */}
            <div className="lg:col-span-7 bg-forge-surface rounded-2xl border border-forge-border p-6 md:p-8 shadow-sm">
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-slate-100">
                <img
                  src="/assets/services/brand-comparison.webp"
                  alt="Stationery comparison: superficial logo versus strategic brand identity"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-forge-ink font-display font-bold text-sm px-3.5 py-1.5 rounded-full shadow-lg border border-forge-border">
                  VS
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Just a logo */}
                <div className="p-5 rounded-xl bg-white border border-forge-border space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted">JUST A LOGO</span>
                  <p className="text-sm font-bold text-forge-ink">Looks nice. Says nothing.</p>
                  <ul className="space-y-2 text-xs text-forge-secondary">
                    {['Looks like everyone else', "Doesn't communicate value", 'Harder to win trust'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Cross />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Strategic brand */}
                <div className="p-5 rounded-xl bg-forge-blue/5 border border-forge-blue/20 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forge-blue">A STRATEGIC BRAND</span>
                  <p className="text-sm font-bold text-forge-ink">Communicates value. Attracts the right clients.</p>
                  <ul className="space-y-2 text-xs text-forge-ink font-medium">
                    {['Clear positioning', 'Communicates value', 'Builds instant trust'].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4-stage strip */}
          <div className="mt-16 bg-forge-surface rounded-2xl p-8 border border-forge-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '◎', label: 'Position', desc: 'Get clear on what you do, who you serve and why it matters.' },
                { icon: '◈', label: 'Design',   desc: 'Turn strategy into a distinctive and consistent visual identity.' },
                { icon: '▣', label: 'Build',    desc: 'Bring your brand to life online with a high-converting website.' },
                { icon: '▲', label: 'Launch',   desc: 'Go to market with confidence and ongoing support.' },
              ].map((stage) => (
                <div key={stage.label} className="space-y-2">
                  <div className="w-11 h-11 rounded-full bg-forge-blue/10 text-forge-blue flex items-center justify-center font-mono font-bold text-lg">
                    {stage.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-forge-ink">{stage.label}</h3>
                  <p className="text-sm text-forge-secondary leading-normal">{stage.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center pt-8 mt-6 border-t border-forge-border text-forge-muted font-semibold text-xs tracking-widest uppercase">
              — A COMPLETE SYSTEM FOR REAL GROWTH —
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. SERVICES OVERVIEW — 4 cards + triage strip
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-overview"
        className="w-full py-24 lg:py-32 bg-forge-surface border-b border-forge-border"
        aria-labelledby="services-overview-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <Eyebrow>OUR SERVICES</Eyebrow>
              <h2
                id="services-overview-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em] max-w-2xl leading-tight"
              >
                A complete system for a{' '}
                <span className="text-forge-blue">stronger brand.</span>
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary max-w-2xl pt-3 leading-relaxed">
                From strategy to execution, we help you build a brand that is clear, credible and built to grow. Choose the service you need or get the complete system.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-forge-muted tracking-wider uppercase shrink-0">
              <span>STRATEGY</span><span>/</span><span>DESIGN</span><span>/</span><span>TECHNOLOGY</span><span>/</span><span>GROWTH</span>
            </div>
          </div>

          {/* 4 service cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service) => (
              <article
                key={service.id}
                className={`group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col ${
                  service.flagship
                    ? 'border-forge-blue/30 border-2 shadow-md'
                    : 'border-forge-border'
                }`}
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={service.img}
                    alt={service.imgAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  {service.flagship && (
                    <div className="absolute top-3 right-3 bg-forge-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      FLAGSHIP
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
                  <div>
                    {/* Icon swatch */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 font-mono font-bold text-sm ${service.flagship ? 'bg-forge-blue text-white' : 'bg-forge-blue/10 text-forge-blue'}`}>
                      {service.flagship ? '✦' : service.id === 'strategy' ? '◎' : service.id === 'identity' ? '◈' : '▣'}
                    </div>
                    <h3 className="font-display text-lg font-bold text-forge-ink">{service.name}</h3>
                    <p className="text-sm text-forge-secondary mt-2 leading-relaxed">{service.tagline}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <span className="text-xs text-forge-muted block">{service.priceLabel}</span>
                      <span className="font-display text-lg font-bold text-forge-ink">{service.price}</span>
                    </div>
                    <a
                      href={`#${service.anchor}`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        service.flagship
                          ? 'bg-forge-ink text-white group-hover:bg-forge-blue'
                          : 'bg-slate-100 text-forge-ink group-hover:bg-forge-blue group-hover:text-white'
                      }`}
                      aria-label={`View ${service.name} details`}
                    >
                      <span aria-hidden="true" className="text-base">→</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Triage strip */}
          <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-forge-border shadow-sm">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block mb-1">NOT SURE WHAT YOU NEED?</span>
              <h4 className="font-display text-xl md:text-2xl font-bold text-forge-ink">Let's find the right starting point.</h4>
              <p className="text-sm md:text-base text-forge-secondary mt-1 max-w-xl">
                Talk to us and we'll recommend the best solution for your goals, budget and timeline.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-forge-ink text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors shrink-0 shadow-sm"
            >
              Talk to Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. BRAND STRATEGY DEEP DIVE
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="strategy-deepdive"
        className="w-full py-24 lg:py-32 bg-white border-b border-forge-border"
        aria-labelledby="strategy-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Eyebrow>BRAND POSITIONING</Eyebrow>
                <h2 id="strategy-heading" className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-forge-ink tracking-[-0.025em] leading-tight">
                  Be the obvious choice, not just{' '}
                  <span className="text-forge-blue">another option.</span>
                </h2>
                <p className="text-base sm:text-lg text-forge-secondary mt-4 leading-relaxed">
                  We help you get clear on what you do, who you serve, and why it matters, so your brand stands out in a crowded market and attracts the right clients.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { label: 'Market Clarity',      desc: 'Understand your market, audience and real opportunities.' },
                  { label: 'Distinct Positioning', desc: 'Define what makes you different and why it matters.' },
                  { label: 'Practical Strategy',  desc: 'Get a clear plan you can actually use to grow.' },
                ].map((p) => (
                  <div key={p.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 mt-0.5 font-mono font-bold">◎</div>
                    <div>
                      <h4 className="font-display text-base font-bold text-forge-ink">{p.label}</h4>
                      <p className="text-sm text-forge-secondary leading-normal mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-forge-border">
                <img
                  src="/assets/services/card-strategy.webp"
                  alt="Strategic brand positioning — clear market differentiation"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-right border border-forge-border shadow-sm hidden sm:block">
                  <span className="text-[10px] font-bold text-forge-blue uppercase tracking-wider block">TACTICAL METAPHOR</span>
                  <span className="text-xs font-semibold text-forge-ink">Same market. Distinct position.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata panel */}
          <div className="mt-16 bg-forge-surface rounded-2xl p-6 md:p-8 border border-forge-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">TIMELINE</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">1 – 2 Weeks</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">INVESTMENT</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">From ₦120,000</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">DELIVERABLES</span>
                  <p className="text-xs text-forge-secondary mt-1 leading-normal">Positioning doc, Messaging framework, Market report</p>
                </div>
              </div>
              <div className="md:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t md:border-t-0 md:border-l border-forge-border pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-forge-surface ring-2 ring-forge-blue/20 flex items-center justify-center font-display font-bold text-forge-blue shrink-0">AE</div>
                  <div>
                    <p className="text-xs italic text-forge-ink max-w-sm">"Positioning turns your expertise into opportunity. It's the foundation everything else builds on."</p>
                    <p className="text-[11px] text-forge-muted font-medium mt-1">Ayobami Egbewole (Melo Kaji) · CEO & Creative Director</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-sm shrink-0"
                >
                  Get Started <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. BRAND IDENTITY DEEP DIVE
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="identity-deepdive"
        className="w-full py-24 lg:py-32 bg-forge-surface border-b border-forge-border"
        aria-labelledby="identity-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual left (reversed on mobile) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-forge-border">
                <img
                  src="/assets/services/card-identity.webp"
                  alt="Brand identity suite — stationery and guidelines"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Content right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div>
                <Eyebrow>BRAND IDENTITY</Eyebrow>
                <h2 id="identity-heading" className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-forge-ink tracking-[-0.025em] leading-tight">
                  Turn strategy into a distinctive{' '}
                  <span className="text-forge-blue">brand identity.</span>
                </h2>
                <p className="text-base sm:text-lg text-forge-secondary mt-4 leading-relaxed">
                  We design visual identities that do more than look good. They communicate your value, build recognition and create trust from the first impression.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { label: 'Strategic Design',        desc: 'Every visual element is intentional and aligned with your business goals.' },
                  { label: 'Distinctive & Memorable', desc: 'Stand out in a crowded market with a cohesive, recognizable identity.' },
                  { label: 'Ready for Real Use',       desc: 'Get a complete identity system that works seamlessly across digital and print touchpoints.' },
                ].map((p) => (
                  <div key={p.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 mt-0.5 font-mono font-bold">◈</div>
                    <div>
                      <h4 className="font-display text-base font-bold text-forge-ink">{p.label}</h4>
                      <p className="text-sm text-forge-secondary leading-normal mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metadata panel */}
          <div className="mt-16 bg-white rounded-2xl p-6 md:p-8 border border-forge-border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 grid grid-cols-3 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">TIMELINE</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">2 – 4 Weeks</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">INVESTMENT</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">From ₦80,000</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">DELIVERABLES</span>
                  <p className="text-xs text-forge-secondary mt-1 leading-normal">Logo suite, Visual identity system, Brand guidelines, Assets</p>
                </div>
              </div>
              <div className="md:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t md:border-t-0 md:border-l border-forge-border pt-6 md:pt-0 md:pl-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-forge-surface ring-2 ring-forge-blue/20 flex items-center justify-center font-display font-bold text-forge-blue shrink-0">AE</div>
                  <div>
                    <p className="text-xs italic text-forge-ink max-w-sm">"A great brand identity doesn't just make you look professional. It makes you unforgettable."</p>
                    <p className="text-[11px] text-forge-muted font-medium mt-1">Ayobami Egbewole · CEO & Creative Director</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-sm shrink-0"
                >
                  Get Started <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. WEBSITE DESIGN & DEV DEEP DIVE
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="web-deepdive"
        className="w-full py-24 lg:py-32 bg-white border-b border-forge-border"
        aria-labelledby="web-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Eyebrow>WEBSITE DESIGN & DEVELOPMENT</Eyebrow>
                <h2 id="web-heading" className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-forge-ink tracking-[-0.025em] leading-tight">
                  Bring your brand to life{' '}
                  <span className="text-forge-blue">online.</span>
                </h2>
                <p className="text-base sm:text-lg text-forge-secondary mt-4 leading-relaxed">
                  We design and develop high-converting websites that showcase your brand, build credibility and turn visitors into real opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  { icon: '▣', label: 'Strategic Design',  desc: 'Built with strategy, not just aesthetics.' },
                  { icon: '</>', label: 'Clean Development', desc: 'Fast, secure and scalable modern stacks.' },
                  { icon: '⊡', label: 'Fully Responsive',  desc: 'Flawless on phone, tablet, and desktop.' },
                  { icon: '↑', label: 'Built to Convert',  desc: 'Engineered to turn traffic into paying clients.' },
                ].map((f) => (
                  <div key={f.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 font-mono text-sm font-bold">{f.icon}</div>
                    <div>
                      <h5 className="text-sm font-bold text-forge-ink">{f.label}</h5>
                      <p className="text-xs text-forge-secondary mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-forge-border">
                <img
                  src="/assets/services/card-web.webp"
                  alt="High-performance digital experience displayed on modern device"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Web metrics + testimonial panel */}
          <div className="mt-16 bg-forge-surface rounded-2xl p-6 md:p-8 border border-forge-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-forge-border">
              {[
                { value: '3×',   label: 'Inbound Enquiries',    blue: true },
                { value: '68%',  label: 'Avg Conversion Lift',  blue: false },
                { value: '4–6w', label: 'Typical Delivery Time', blue: false },
                { value: '98%',  label: 'Satisfaction Rate',     blue: true },
              ].map((m) => (
                <div key={m.label}>
                  <span className={`font-display text-4xl lg:text-5xl font-bold ${m.blue ? 'text-forge-blue' : 'text-forge-ink'}`}>{m.value}</span>
                  <p className="text-xs font-bold text-forge-muted mt-1 uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-sm italic text-forge-ink">
                  "Fortex Forge didn't just build a website for us, they brought our brand to life. We've seen a real difference in the quality of enquiries we get."
                </p>
                <p className="text-xs text-forge-muted font-semibold mt-1">Tunde Adebayo · Founder, Veridian Homes</p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors shadow-sm shrink-0"
              >
                Start a Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. COMPLETE BRAND + WEB DEEP DIVE
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="complete-deepdive"
        className="w-full py-24 lg:py-32 bg-forge-surface border-b border-forge-border"
        aria-labelledby="complete-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-forge-border">
                <img
                  src="/assets/services/card-complete.webp"
                  alt="Unified brand identity and digital platform multi-screen display"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Content right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div>
                <Eyebrow>COMPLETE BRAND + WEB</Eyebrow>
                <h2 id="complete-heading" className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-forge-ink tracking-[-0.025em] leading-tight">
                  A complete system to position, design and launch{' '}
                  <span className="text-forge-blue">your brand.</span>
                </h2>
                <p className="text-base sm:text-lg text-forge-secondary mt-4 leading-relaxed">
                  From strategy to visual identity to a high-converting website, we give you everything you need to launch and grow with clarity and confidence.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { icon: '◎', label: 'Complete Strategy',            desc: 'Clarity on your market, positioning, messaging and target audience.' },
                  { icon: '◈', label: 'Full Visual Identity',         desc: 'A distinctive and cohesive brand system unified across all channels.' },
                  { icon: '▣', label: 'Website Design & Development', desc: 'A bespoke, responsive web experience tuned for conversion and speed.' },
                  { icon: '▲', label: 'Launch Support',               desc: 'Full deployment orchestration and initial market introduction.' },
                ].map((p) => (
                  <div key={p.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 mt-0.5 font-mono font-bold">{p.icon}</div>
                    <div>
                      <h4 className="font-display text-base font-bold text-forge-ink">{p.label}</h4>
                      <p className="text-sm text-forge-secondary leading-normal mt-0.5">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Package metadata */}
          <div className="mt-16 bg-white rounded-2xl p-6 md:p-8 border border-forge-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">TIMELINE</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">8 – 12 Weeks</p>
                <p className="text-xs text-forge-muted">Full delivery cycle</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">INVESTMENT</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">From ₦750,000</p>
                <p className="text-xs text-forge-muted">Complete package</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">TARGET FIT</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">Serious Founders</p>
                <p className="text-xs text-forge-muted">Venture & Scale-ups</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">ORIENTATION</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">Built for Growth</p>
                <p className="text-xs text-forge-muted">Maximum ROI</p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-center sm:items-end w-full md:w-auto">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-forge-ink text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Get the Complete Package <span aria-hidden="true">→</span>
              </Link>
              <span className="text-xs text-forge-muted mt-2">Let's build what's next. Together.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. WHY POSITIONING COMES FIRST
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-24 lg:py-32 bg-white border-b border-forge-border"
        aria-labelledby="positioning-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — philosophy */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <Eyebrow>WHY POSITIONING COMES FIRST</Eyebrow>
                <h2 id="positioning-heading" className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-forge-ink tracking-[-0.025em] leading-tight">
                  Positioning is the{' '}
                  <span className="text-forge-blue">foundation.</span>
                </h2>
                <p className="text-base sm:text-lg text-forge-secondary mt-4 leading-relaxed">
                  Before the logo. Before the website. Before the design. Positioning gives everything direction — so your brand looks right, sounds right and attracts the right people.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { label: 'Clarity',              desc: 'Know exactly who you serve, what you offer and why it matters.' },
                  { label: 'Consistency',           desc: 'Every element of your brand works together with a clear direction.' },
                  { label: 'Better Results',        desc: 'Attract the right audience, close more deals and grow faster.' },
                  { label: 'Fewer Costly Mistakes', desc: 'Avoid rebranding, mixed messaging and wasted spend.' },
                ].map((b) => (
                  <div key={b.label} className="p-4 bg-forge-surface rounded-xl border border-forge-border">
                    <h5 className="font-display text-sm font-bold text-forge-ink">{b.label}</h5>
                    <p className="text-xs text-forge-secondary mt-0.5">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — comparison matrix */}
            <div className="lg:col-span-7 rounded-2xl border border-forge-border overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {/* Without positioning */}
                <div className="p-6 md:p-8 bg-forge-surface">
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block mb-2">STATUS QUO</span>
                  <h4 className="font-display text-xl font-bold text-forge-ink mb-6">Without Positioning</h4>
                  <ul className="space-y-4 text-xs text-forge-secondary">
                    {[
                      'Generic messaging that echoes competitors',
                      "Design that looks good but doesn't convert",
                      'Attracts the wrong audience and leads',
                      'Price-based competition and margin pressure',
                      'Constant rebranding and market confusion',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Cross />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* With positioning */}
                <div className="p-6 md:p-8 bg-forge-ink text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-blue block mb-2">FORTEX DISCIPLINE</span>
                  <h4 className="font-display text-xl font-bold text-white mb-6">With Positioning</h4>
                  <ul className="space-y-4 text-xs text-slate-300">
                    {[
                      'Clear and compelling message',
                      'Design that drives trust and action',
                      'Attracts the right audience clearly',
                      'Greater pricing power and premium feel',
                      'A scalable and cohesive brand identity',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check dark />
                        <span className="text-white font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Matrix callout */}
              <div className="p-6 bg-forge-blue/5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-forge-blue/10">
                <div>
                  <span className="text-xs font-bold uppercase text-forge-blue tracking-wider block">THE BOTTOM LINE</span>
                  <p className="font-display text-sm md:text-base font-bold text-forge-ink">
                    A strong brand doesn't start with a logo.{' '}
                    <span className="text-forge-blue">It starts with a clear position.</span>
                  </p>
                </div>
                <a
                  href="#strategy-deepdive"
                  className="shrink-0 inline-flex items-center gap-2 bg-forge-blue text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:bg-forge-blue-hover transition-all"
                >
                  Start with Strategy <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ — Services-specific accordion (reuses global pattern)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-24 lg:py-32 bg-forge-surface border-b border-forge-border"
        aria-labelledby="services-faq-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left — header */}
            <div className="lg:col-span-5">
              <Eyebrow>COMMON QUESTIONS</Eyebrow>
              <h2
                id="services-faq-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-forge-ink leading-tight tracking-[-0.025em] mb-4"
              >
                Questions about our{' '}
                <span className="text-forge-blue">services.</span>
              </h2>
              <p className="text-base text-forge-secondary leading-relaxed mb-8">
                Everything you need to know before deciding on the right engagement.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-forge-ink text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Ask Us Directly <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Right — accordion */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-forge-border shadow-sm px-6 md:px-8">
                {faqs.map((faq) => (
                  <FaqItem
                    key={faq.id}
                    item={faq}
                    isOpen={openFaq === faq.id}
                    onToggle={() => setOpenFaq(openFaq === faq.id ? '' : faq.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. FINAL CTA — full-bg image, left-aligned copy, dual actions
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center py-24 lg:py-32"
        style={{ backgroundImage: "url('/assets/services/hero-bg.webp')" }}
        aria-labelledby="services-cta-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl space-y-6">
            <Eyebrow>LET'S BUILD TOGETHER</Eyebrow>
            <h2
              id="services-cta-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em] leading-tight"
            >
              Ready to build a brand that<br className="hidden sm:inline" />
              <span className="text-forge-blue"> moves your business?</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              Whether you need strategy, a standout identity, a high-converting website or the complete package, we're here to help you build with clarity and confidence.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-forge-ink text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
              >
                Start a Project <span aria-hidden="true">→</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-forge-ink text-sm font-semibold px-7 py-3.5 rounded-full border border-forge-border hover:bg-forge-surface transition-colors shadow-sm"
              >
                Talk to Us
              </Link>
            </div>

            {/* Trust chips */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-forge-border">
              {[
                { label: 'Fast Response', sub: 'Within 24 hours' },
                { label: 'Clear Process', sub: 'No hidden costs' },
                { label: 'Built for Growth', sub: 'Beyond aesthetics' },
              ].map((chip) => (
                <div key={chip.label}>
                  <div className="flex items-center gap-1.5 text-forge-blue mb-0.5">
                    <span className="text-sm" aria-hidden="true">✦</span>
                    <span className="text-xs font-bold text-forge-ink">{chip.label}</span>
                  </div>
                  <p className="text-xs text-forge-muted">{chip.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted by builders bar */}
          <div className="mt-16 bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">TRUSTED BY BUILDERS</span>
                <p className="font-display text-base md:text-lg font-bold text-forge-ink mt-1">
                  Founders, startups and growing businesses trust{' '}
                  <span className="text-forge-blue">Fortex Forge.</span>
                </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
                {[
                  { initial: 'V', name: 'VirtuCare' },
                  { initial: '⌂', name: 'Keyvix Homes' },
                  { initial: '◈', name: 'MJG Real Estate' },
                  { initial: '✦', name: 'The Forgers Clan' },
                ].map((client) => (
                  <div key={client.name} className="flex items-center gap-2 text-forge-ink font-bold text-sm">
                    <span className="w-6 h-6 rounded-md bg-forge-blue/10 text-forge-blue flex items-center justify-center font-display text-xs font-bold">{client.initial}</span>
                    <span>{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
