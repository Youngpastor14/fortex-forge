import { useState } from 'react'
import { Link } from 'react-router-dom'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

// ─── ServicesPage ──────────────────────────────────────────────────────────────
// High-fidelity implementation based on Reference mockups/service page/
// (service hero (2).png, serv2.png - serv9.png) and the Stitch narrative flow.
// Every section integrates full-bleed environmental spatial backgrounds while
// maintaining 100% of the exact website copy, pricing, deliverables, and interactive FAQ.
// ─────────────────────────────────────────────────────────────────────────────

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

function Check({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`mt-0.5 shrink-0 text-base leading-none ${dark ? 'text-forge-blue' : 'text-forge-blue'}`}
      aria-hidden="true"
    >
      ✓
    </span>
  )
}

function Cross() {
  return (
    <span className="mt-0.5 shrink-0 text-base leading-none text-rose-500" aria-hidden="true">
      ✕
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
    deliverables: 'Positioning document, Messaging framework, Market insight report',
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
    deliverables: 'Logo suite, Visual identity system, Brand guidelines, Social media assets, Stationery (optional)',
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
    ctaLabel: 'Start a Project',
    eyebrow: 'WEBSITE DESIGN & DEVELOPMENT',
    headline: <>Bring your brand to life <span className="text-forge-blue">online.</span></>,
    body: 'We design and develop high-converting websites that showcase your brand, build credibility and turn visitors into real opportunities.',
    pillars: [
      { label: 'Strategic Design',   desc: 'Websites built with strategy, not just aesthetics.' },
      { label: 'Clean Development',  desc: 'Fast, secure and scalable websites using modern technologies.' },
      { label: 'Fully Responsive',   desc: 'Looks and works perfectly on all devices.' },
      { label: 'Built to Convert',   desc: 'Designed to attract, engage and turn visitors into clients.' },
    ],
    webMetrics: [
      { value: '3×',   label: 'More inbound enquiries' },
      { value: '68%',  label: 'Average increase in conversions' },
      { value: '4–6 Weeks', label: 'Typical delivery time' },
      { value: '98%',  label: 'Client satisfaction rate' },
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
    deliverables: 'Complete package: Strategy, identity, website and launch support',
    targetFit: 'Ideal for Serious Founders',
    targetFitSub: 'Startups, growing businesses and established brands',
    orientation: 'Built for Growth',
    orientationSub: 'Designed to attract, engage and convert',
    ctaLabel: 'Get the Complete Package',
    eyebrow: 'COMPLETE BRAND + WEB',
    headline: <>A complete system to position, design and launch <span className="text-forge-blue">your brand.</span></>,
    body: 'From strategy to visual identity to a high-converting website, we give you everything you need to launch and grow with clarity and confidence.',
    pillars: [
      { label: 'Complete Strategy',             desc: 'Clarity on your market, positioning, messaging and audience.' },
      { label: 'Full Visual Identity',          desc: 'A distinctive and cohesive brand identity across all touchpoints.' },
      { label: 'Website Design & Development',  desc: 'A high-converting, responsive website built to grow your business.' },
      { label: 'Launch Support',                desc: 'Get everything ready to go live and start attracting the right clients.' },
    ],
  },
] as const

// ── FAQ ──────────────────────────────────────────────────────────────────────
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

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<string>('faq-1')

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — Full-Bleed Studio Desk Background (service hero (2).png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden min-h-[92vh] flex flex-col justify-between border-b border-forge-border"
        aria-labelledby="services-hero-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/01-hero.webp"
            mobileSrc="/assets/services/01-hero-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle directional scrim for optimal text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent sm:via-white/50 lg:from-white/80 lg:via-white/40 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/40" />
        </div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-24 md:pt-32 pb-12 flex-1 flex flex-col justify-center items-center text-center">
          <div className="max-w-3xl flex flex-col items-center">
            <span className="inline-block text-xs font-bold text-forge-blue uppercase tracking-[0.2em] mb-4">
              OUR SERVICES
            </span>

            <h1
              id="services-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-forge-ink leading-[1.08] mb-6"
            >
              From clarity to clients.<br />
              <span className="text-forge-blue">That's the work.</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-forge-secondary max-w-xl mb-8 leading-relaxed font-normal">
              Strategy, design and technology to help you build a brand that stands out and grows.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
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

            {/* Floating translucent assurance badges */}
            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/60 shadow-[0_8px_30px_rgba(10,15,29,0.06)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-forge-border/40">
                {[
                  { icon: '⊞', label: 'Strategy-led approach' },
                  { icon: '↗', label: 'Built for real results' },
                  { icon: '🛡', label: 'Trusted by serious founders' },
                  { icon: '📈', label: 'End-to-end support' },
                ].map((badge, idx) => (
                  <div key={badge.label} className={`flex items-center justify-center gap-2.5 ${idx > 0 ? 'pt-3 sm:pt-0 sm:pl-4' : ''}`}>
                    <span className="text-forge-ink font-mono text-base font-bold shrink-0">{badge.icon}</span>
                    <span className="text-xs sm:text-sm font-semibold text-forge-ink text-left">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom baseline strip matching mockup */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-6">
          <div className="flex items-center justify-between text-forge-muted text-[11px] font-semibold tracking-widest uppercase border-t border-forge-border/50 pt-3">
            <span className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-forge-border inline-block" />
              BRANDS WEBSITES GROWTH
            </span>
            <span>FORGING ABSOLUTE CLARITY</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. THE REAL PROBLEM — Full-Bleed Nexora Workspace (serv2.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[850px] lg:min-h-[920px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="real-problem-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/02-brand-comparison.webp"
            mobileSrc="/assets/services/02-brand-comparison-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Subtle directional scrim to ensure typography stands out */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent sm:via-white/70 lg:w-[65%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left — headline */}
            <div className="lg:col-span-6 space-y-5 max-w-xl">
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

            {/* Right — floating comparison pills that overlay the scene */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 lg:justify-end lg:pt-12">
              {/* Just a logo card */}
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-forge-border shadow-sm max-w-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">JUST A LOGO</span>
                <p className="text-sm font-bold text-forge-ink mb-3">Looks nice. Says nothing.</p>
                <ul className="space-y-2 text-xs text-forge-secondary">
                  {['Looks like everyone else', "Doesn't communicate value", 'Harder to win trust'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Cross />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strategic brand card */}
              <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-forge-blue/30 shadow-md max-w-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-forge-blue block mb-1">A STRATEGIC BRAND</span>
                <p className="text-sm font-bold text-forge-ink mb-3">Communicates value. Attracts the right clients.</p>
                <ul className="space-y-2 text-xs text-forge-ink font-semibold">
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

        {/* 4-stage strip floating at bottom matching serv2.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-forge-border/40">
              {[
                { icon: '⏱', label: 'Position', desc: 'Get clear on what you do, who you serve and why it matters.' },
                { icon: '🧊', label: 'Design',   desc: 'Turn strategy into a distinctive and consistent visual identity.' },
                { icon: '🖥', label: 'Build',    desc: 'Bring your brand to life online with a high-converting website.' },
                { icon: '↗', label: 'Launch',   desc: 'Go to market with confidence and ongoing support.' },
              ].map((stage, idx) => (
                <div key={stage.label} className={`space-y-2 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                  <div className="w-10 h-10 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center font-mono font-bold text-base mb-2">
                    {stage.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-forge-ink">{stage.label}</h3>
                  <p className="text-xs sm:text-sm text-forge-secondary leading-normal">{stage.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center pt-6 mt-6 border-t border-forge-border text-forge-muted font-semibold text-[11px] tracking-widest uppercase">
              — A COMPLETE SYSTEM FOR REAL GROWTH —
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. SERVICES OVERVIEW — Desk with Stacked Blocks (serv3.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="services-overview"
        className="relative w-full py-24 lg:py-32 bg-forge-surface border-b border-forge-border overflow-hidden"
        aria-labelledby="services-overview-heading"
      >
        {/* Environmental backdrop at the top */}
        <div className="absolute top-0 inset-x-0 h-96 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/03-services-overview.webp"
            mobileSrc="/assets/services/03-services-overview-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center opacity-60 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-forge-surface/80 to-forge-surface" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
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
                className={`group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col ${
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
                    <div className="absolute top-3 right-3 bg-forge-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      FLAGSHIP
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-6">
                  <div>
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
                      <span aria-hidden="true" className="text-base font-bold">→</span>
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
          4. BRAND STRATEGY DEEP DIVE — Full-Bleed Chess Room (serv4.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="strategy-deepdive"
        className="relative w-full min-h-[920px] lg:min-h-[1020px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="strategy-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/04-strategy-and-positioning.webp"
            mobileSrc="/assets/services/04-strategy-and-positioning-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Subtle directional scrim for pristine readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
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

            {/* 3 floating pill cards */}
            <div className="space-y-3 pt-2">
              {[
                { icon: '🎯', label: 'Market Clarity',      desc: 'Understand your market, audience and real opportunities.' },
                { icon: '👥', label: 'Distinct Positioning', desc: 'Define what makes you different and why it matters.' },
                { icon: '📊', label: 'Practical Strategy',  desc: 'Get a clear plan you can actually use to grow.' },
              ].map((p) => (
                <div key={p.label} className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-forge-border shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 mt-0.5 text-base">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-forge-ink">{p.label}</h4>
                    <p className="text-xs sm:text-sm text-forge-secondary leading-normal mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating bottom container matching serv4.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Stats column */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">TIMELINE</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">1 – 2 Weeks</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">INVESTMENT</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">From ₦120,000</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">DELIVERABLES</span>
                  <p className="text-xs text-forge-secondary mt-1 leading-normal">Positioning document, Messaging framework, Market insight report</p>
                </div>
              </div>

              {/* Actions & Founder Quote */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t lg:border-t-0 lg:border-l border-forge-border pt-6 lg:pt-0 lg:pl-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forge-surface ring-2 ring-forge-blue/20 flex items-center justify-center font-display font-bold text-forge-blue shrink-0">
                    AE
                  </div>
                  <div>
                    <p className="text-xs italic text-forge-ink max-w-sm">"Positioning turns your expertise into opportunity. It's the foundation everything else builds on."</p>
                    <p className="text-[11px] text-forge-muted font-medium mt-1">Ayobami Egbewole (Melo Kaji) · CEO & Creative Director, Fortex Forge</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    Get Started <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-xs font-semibold text-forge-ink hover:text-forge-blue px-3 py-2"
                  >
                    Talk to Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. BRAND IDENTITY DEEP DIVE — Full-Bleed Stationery Studio (serv5.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="identity-deepdive"
        className="relative w-full min-h-[920px] lg:min-h-[1020px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="identity-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/05-brand-identity.webp"
            mobileSrc="/assets/services/05-brand-identity-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Directional scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
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

            {/* 3 floating pill cards */}
            <div className="space-y-3 pt-2">
              {[
                { icon: '✒️', label: 'Strategic Design',         desc: 'Every visual element is intentional and aligned with your business goals.' },
                { icon: '💎', label: 'Distinctive & Memorable',  desc: 'Stand out in a crowded market with a cohesive, recognizable identity.' },
                { icon: '⊞', label: 'Ready for Real Use',        desc: 'Get a complete identity system that works seamlessly across digital and print touchpoints.' },
              ].map((p) => (
                <div key={p.label} className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-forge-border shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 mt-0.5 text-base">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-forge-ink">{p.label}</h4>
                    <p className="text-xs sm:text-sm text-forge-secondary leading-normal mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating bottom container matching serv5.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">TIMELINE</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">2 – 4 Weeks</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">INVESTMENT</span>
                  <p className="font-display text-lg font-bold text-forge-ink mt-1">From ₦80,000</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">DELIVERABLES</span>
                  <p className="text-xs text-forge-secondary mt-1 leading-normal">Logo suite, Visual identity system, Brand guidelines, Social media assets, Stationery (optional)</p>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t lg:border-t-0 lg:border-l border-forge-border pt-6 lg:pt-0 lg:pl-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-forge-surface ring-2 ring-forge-blue/20 flex items-center justify-center font-display font-bold text-forge-blue shrink-0">
                    AE
                  </div>
                  <div>
                    <p className="text-xs italic text-forge-ink max-w-sm">"A great brand identity doesn't just make you look professional. It makes you unforgettable."</p>
                    <p className="text-[11px] text-forge-muted font-medium mt-1">Ayobami Egbewole (Melo Kaji) · CEO & Creative Director, Fortex Forge</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    Get Started <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center text-xs font-semibold text-forge-ink hover:text-forge-blue px-3 py-2"
                  >
                    Talk to Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. WEBSITE DESIGN & DEV — Full-Bleed Digital Desk (ser6.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="web-deepdive"
        className="relative w-full min-h-[920px] lg:min-h-[1020px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="web-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/06-web-design-and-development.webp"
            mobileSrc="/assets/services/06-web-design-and-development-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Directional scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
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

            {/* 4 floating pill cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { icon: '🖥', label: 'Strategic Design',  desc: 'Websites built with strategy, not just aesthetics.' },
                { icon: '</>', label: 'Clean Development', desc: 'Fast, secure and scalable websites using modern technologies.' },
                { icon: '📱', label: 'Fully Responsive',  desc: 'Looks and works perfectly on all devices.' },
                { icon: '📈', label: 'Built to Convert',  desc: 'Designed to attract, engage and turn visitors into clients.' },
              ].map((f) => (
                <div key={f.label} className="p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-forge-border shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                    {f.icon}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-forge-ink">{f.label}</h5>
                    <p className="text-[11px] text-forge-secondary mt-0.5 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating bottom container matching ser6.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6 pb-6 border-b border-forge-border">
              {[
                { value: '3×',   label: 'More inbound enquiries',    blue: true },
                { value: '68%',  label: 'Average increase in conversions',  blue: false },
                { value: '4–6w', label: 'Typical delivery time',      blue: false },
                { value: '98%',  label: 'Client satisfaction rate',     blue: true },
              ].map((m) => (
                <div key={m.label}>
                  <span className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold ${m.blue ? 'text-forge-blue' : 'text-forge-ink'}`}>
                    {m.value}
                  </span>
                  <p className="text-xs font-bold text-forge-muted mt-1 uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-xs sm:text-sm italic text-forge-ink">
                  "Fortex Forge didn't just build a website for us, they brought our brand to life. We've seen a real difference in the quality of enquiries we get."
                </p>
                <p className="text-xs text-forge-muted font-semibold mt-1">Tunde Adebayo · Founder, Veridian Homes</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  Start a Project <span aria-hidden="true">→</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-xs font-semibold text-forge-ink hover:text-forge-blue px-3 py-2"
                >
                  Talk to Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. COMPLETE BRAND + WEB — Full-Bleed Complete Workspace (ser7.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="complete-deepdive"
        className="relative w-full min-h-[920px] lg:min-h-[1020px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="complete-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/07-complete-brand-and-web.webp"
            mobileSrc="/assets/services/07-complete-brand-and-web-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Directional scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
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

            {/* 4 floating pill cards */}
            <div className="space-y-3 pt-2">
              {[
                { icon: '☰', label: 'Complete Strategy',             desc: 'Clarity on your market, positioning, messaging and audience.' },
                { icon: '✒️', label: 'Full Visual Identity',          desc: 'A distinctive and cohesive brand identity across all touchpoints.' },
                { icon: '🖥', label: 'Website Design & Development',  desc: 'A high-converting, responsive website built to grow your business.' },
                { icon: '🚀', label: 'Launch Support',                desc: 'Get everything ready to go live and start attracting the right clients.' },
              ].map((p) => (
                <div key={p.label} className="p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-forge-border shadow-sm flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 mt-0.5 text-sm">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-forge-ink">{p.label}</h4>
                    <p className="text-xs text-forge-secondary leading-normal mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating bottom container matching ser7.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full md:w-auto">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">TIMELINE</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">8 – 12 Weeks</p>
                <p className="text-xs text-forge-muted">Typical timeline</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">A COMPLETE SYSTEM</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">From ₦750,000</p>
                <p className="text-xs text-forge-muted">Strategy, identity, web & launch</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">ORIENTATION</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">Built for Growth</p>
                <p className="text-xs text-forge-muted">Attract, engage & convert</p>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block">TARGET FIT</span>
                <p className="font-display text-lg font-bold text-forge-ink mt-1">Serious Founders</p>
                <p className="text-xs text-forge-muted">Venture & scale-ups</p>
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
          8. WHY POSITIONING COMES FIRST — Full-Bleed Comparison Stand (serv8.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[920px] lg:min-h-[1020px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="positioning-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/08-positioning-comparison.webp"
            mobileSrc="/assets/services/08-positioning-comparison-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Directional scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[58%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left — philosophy */}
            <div className="lg:col-span-6 space-y-6 max-w-xl">
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
                  { icon: '🎯', label: 'Clarity',              desc: 'Know exactly who you serve, what you offer and why it matters.' },
                  { icon: '👥', label: 'Consistency',           desc: 'Every element of your brand works together with a clear direction.' },
                  { icon: '📊', label: 'Better Results',        desc: 'Attract the right audience, close more deals and grow faster.' },
                  { icon: '🛡', label: 'Fewer Costly Mistakes', desc: 'Avoid rebranding, mixed messaging and wasted spend.' },
                ].map((b) => (
                  <div key={b.label} className="p-3.5 bg-white/90 backdrop-blur-md rounded-xl border border-forge-border shadow-sm flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-forge-blue/10 text-forge-blue flex items-center justify-center shrink-0 mt-0.5 text-sm">
                      {b.icon}
                    </div>
                    <div>
                      <h5 className="font-display text-sm font-bold text-forge-ink">{b.label}</h5>
                      <p className="text-xs text-forge-secondary mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating responsive matrix mirroring the physical stand */}
            <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 lg:justify-end lg:pt-8">
              {/* Without positioning */}
              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-forge-border shadow-md max-w-xs flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block mb-2">STATUS QUO</span>
                <h4 className="font-display text-lg font-bold text-forge-ink mb-4">Without Positioning</h4>
                <ul className="space-y-3 text-xs text-forge-secondary">
                  {[
                    'Generic messaging that echoes competitors',
                    "Design that looks good but doesn't convert",
                    'Attracts the wrong audience and leads',
                    'Price-based competition and margin pressure',
                    'Constant rebranding and market confusion',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Cross />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* With positioning */}
              <div className="p-6 rounded-2xl bg-forge-ink text-white shadow-xl max-w-xs flex-1 border border-forge-ink">
                <span className="text-xs font-bold uppercase tracking-wider text-forge-blue block mb-2">FORTEX DISCIPLINE</span>
                <h4 className="font-display text-lg font-bold text-white mb-4">With Positioning</h4>
                <ul className="space-y-3 text-xs text-slate-300">
                  {[
                    'Clear and compelling message',
                    'Design that drives trust and action',
                    'Attracts the right audience clearly',
                    'Greater pricing power and premium feel',
                    'A scalable and cohesive brand identity',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check dark />
                      <span className="text-white font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Floating bottom container matching serv8.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase text-forge-blue tracking-wider block mb-1">THE BOTTOM LINE</span>
              <p className="font-display text-lg sm:text-xl font-bold text-forge-ink">
                A strong brand doesn't start with a logo.{' '}
                <span className="text-forge-blue">It starts with a clear position.</span>
              </p>
              <p className="text-xs sm:text-sm text-forge-secondary mt-1">
                When your position is clear, everything else becomes easier — and more effective.
              </p>
            </div>
            <div className="flex flex-col items-center sm:items-end shrink-0">
              <a
                href="#strategy-deepdive"
                className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-neutral-800 transition-all"
              >
                Start with Strategy <span aria-hidden="true">→</span>
              </a>
              <span className="text-[11px] text-forge-muted mt-1.5">Let's build it right.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. FAQ — Services-specific accordion
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full py-20 lg:py-28 bg-forge-surface border-b border-forge-border"
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
          10. FINAL CTA — Full-Bleed Desk & Partner Ribbon (serv9.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden min-h-[850px] lg:min-h-[920px] py-20 lg:py-28 bg-white flex flex-col justify-between"
        aria-labelledby="services-cta-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/services/09-closing.webp"
            mobileSrc="/assets/services/09-closing-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Directional scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
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

            {/* Trust chips matching serv9.png */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-forge-border">
              {[
                { icon: '⚡', label: 'Fast Response', sub: 'Within 24 hours' },
                { icon: '🛡', label: 'Clear Process', sub: 'No hidden costs' },
                { icon: '👥', label: 'Built for Growth', sub: 'More than just design' },
              ].map((chip) => (
                <div key={chip.label} className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-forge-border/60">
                  <div className="flex items-center gap-1.5 text-forge-blue mb-0.5">
                    <span className="text-sm" aria-hidden="true">{chip.icon}</span>
                    <span className="text-xs font-bold text-forge-ink">{chip.label}</span>
                  </div>
                  <p className="text-[11px] text-forge-muted">{chip.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trusted by builders bar at bottom matching serv9.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg">
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
                    <span className="w-7 h-7 rounded-md bg-forge-blue/10 text-forge-blue flex items-center justify-center font-display text-xs font-bold">
                      {client.initial}
                    </span>
                    <span>{client.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-forge-muted text-[11px] font-semibold tracking-widest uppercase border-t border-forge-border pt-4 mt-6">
              <span>FORTEX FORGE</span>
              <span>FOR BRANDS THAT MEAN MORE</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
