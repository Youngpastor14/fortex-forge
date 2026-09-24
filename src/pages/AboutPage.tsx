import { Link } from 'react-router-dom'

// ─── AboutPage ─────────────────────────────────────────────────────────────────
// Source of truth: fortex_forge_official_about_page_production_webp_integrated/code.html
//
// Approved section order (preserved exactly):
//   1.  Hero               — "Most agencies design first, think later."
//   2.  Why We Exist       — "Talent isn't the problem. Unclear positioning is."
//   3.  Our Philosophy     — "Strategy before aesthetics. Always."
//   4.  Our Values         — "What we stand for shapes what we build."
//   5.  How We Work        — "A clear process for real results."
//   6.  Testimonials       — "Real people. Real progress."
//   7.  Our Mission        — "To build brands that create real opportunities."
//   8.  Founder            — "A founder who believes in a clearer future..."
//   9.  The Team           — "Small team. Big intent."
//  10.  Principles         — "The beliefs that guide everything we do."
//  11.  Partner Fit        — "The right partners build further. Together."
//  12.  Our Journey        — "From an observation to a mission."
//  13.  Closing CTA        — "Ready to stop losing to worse competitors?"
//
// Assets:
//   /assets/about/story.webp            → Our Story (Part B of Why We Exist)
//   /assets/about/philosophy.webp       → Philosophy layered stack
//   /assets/about/values.webp           → Values brand architecture
//   /assets/about/mission.webp          → Mission office still-life
//   /assets/about/partner-fit.webp      → Partner Fit architectural wall
//   /assets/about/closing-cta.webp      → CTA right monument
//   /assets/about/principles/*.webp     → 6 principle 3D blocks
//   /assets/about/team/*.webp           → Founder + team portraits (deferred — awaiting photos)
//
// Founder: Ayobami Egbewole
// Team: Daniel Adeyemi, Eniola Adebayo
// NOTE: Team portrait images are placeholder-pending (real photos required).
//       The <img> tags are correct; broken images will show alt text until photos arrive.
// ─────────────────────────────────────────────────────────────────────────────

// ── Local sub-components ──────────────────────────────────────────────────────

/** Blue tick + uppercase mono eyebrow */
function Eyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-6">
      <span className="w-1.5 h-4 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-forge-secondary font-semibold">
        {children}
      </span>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const teamMembers = [
  {
    num: '01',
    tag: 'Ideas. Strategy.',
    name: 'Ayobami Egbewole',
    role: 'Founder & Creative Director',
    quote: '"I lead Fortex Forge with a simple belief: great ideas deserve a clearer, stronger presence in the real world."',
    img: '/assets/about/team/ayobami-egbewole.webp',
    imgFocus: 'object-top',
  },
  {
    num: '02',
    tag: 'Build. Solve.',
    name: 'Daniel Adeyemi',
    role: 'Lead Developer',
    quote: '"I turn ideas into functional digital experiences. From websites to custom tools, I make sure the tech works as beautifully as it looks."',
    img: '/assets/about/team/daniel-adeyemi.webp',
    imgFocus: 'object-center',
  },
  {
    num: '03',
    tag: 'Design. Trust.',
    name: 'Eniola Adebayo',
    role: 'Brand & Content Designer',
    quote: '"I help brands communicate with clarity through thoughtful design and content that connects authentically."',
    img: '/assets/about/team/eniola-adebayo.webp',
    imgFocus: 'object-center',
  },
]

const principles = [
  {
    num: '01',
    tag: 'FOUNDATION',
    title: 'Strategy First',
    body: 'We start with clarity. Every design, message and decision is rooted in strategy.',
    cta: 'Think Deeper',
    img: '/assets/about/principles/clarity.webp',
    alt: 'Strategy First — 3D block',
  },
  {
    num: '02',
    tag: 'POSITIONING',
    title: 'Radical Clarity',
    body: 'We simplify complexity. Clear positioning, clear visuals, clear outcomes.',
    cta: 'Remove The Noise',
    img: '/assets/about/principles/evidence.webp',
    alt: 'Radical Clarity — 3D block',
  },
  {
    num: '03',
    tag: 'STRUCTURE',
    title: 'Systems Thinking',
    body: 'We build connected solutions, not isolated deliverables. Everything works together.',
    cta: 'Build For Scale',
    img: '/assets/about/principles/system.webp',
    alt: 'Systems Thinking — 3D block',
  },
  {
    num: '04',
    tag: 'EXCELLENCE',
    title: 'Craft Standards',
    body: "We care about the details. Great work isn't luck, it's a rigorous daily standard.",
    cta: 'Raise The Bar',
    img: '/assets/about/principles/authority.webp',
    alt: 'Craft Standards — 3D block',
  },
  {
    num: '05',
    tag: 'COMMERCIAL',
    title: 'Built for Reality',
    body: 'We create practical solutions that work in the real market, not just on screens.',
    cta: 'Real Ideas. Real Impact.',
    img: '/assets/about/principles/outcomes.webp',
    alt: 'Built for Reality — 3D block',
  },
  {
    num: '06',
    tag: 'ALIGNMENT',
    title: 'Honest Partnership',
    body: 'We work with you, not just for you. Your business goals become our goals.',
    cta: 'Grow Together',
    img: '/assets/about/principles/longevity.webp',
    alt: 'Honest Partnership — 3D block',
  },
]

const goodFit = [
  {
    icon: '◉',
    title: "You're building something real",
    body: 'A product, service or company with genuine potential and commitment.',
  },
  {
    icon: '◉',
    title: 'You value strategy, not just aesthetics',
    body: 'You want more than a logo. You want clarity, direction and lasting results.',
  },
  {
    icon: '◉',
    title: "You're ready to invest in growth",
    body: 'You understand that a strong brand creates real, compounding business value.',
  },
  {
    icon: '◉',
    title: 'You want a thoughtful partner',
    body: "You're open to honest collaboration, rigorous feedback and a strategic process.",
  },
  {
    icon: '◉',
    title: 'You care about long-term impact',
    body: "You're building for decades, not just tomorrow's vanity metrics.",
  },
]

const notFit = [
  {
    title: 'You just need a quick, cheap logo',
    body: "We're not an assembly line design shop. We're a strategic branding partner.",
  },
  {
    title: "You're looking for overnight results",
    body: 'Exceptional, lasting brands take intentional craft and disciplined execution.',
  },
  {
    title: "You're not open to feedback",
    body: 'We actively challenge assumptions and ask the difficult questions that unlock traction.',
  },
  {
    title: 'You see branding as an expense',
    body: 'We collaborate exclusively with leaders who recognize positioning as an investment.',
  },
  {
    title: "You're not serious about growth",
    body: "If you aren't ready to push forward decisively, we might not be the right fit — yet.",
  },
]

const journeyStages = [
  {
    num: '01',
    title: 'We Noticed the Pattern',
    body: 'Everywhere we looked, outstanding African businesses were losing ground simply because their branding failed to match their product excellence.',
  },
  {
    num: '02',
    title: 'We Built the Solution',
    body: 'We developed a strategic discipline combining ruthless positioning with uncompromising design craft, ensuring brands punch above their weight.',
  },
  {
    num: '03',
    title: "We're Creating a Bigger Future",
    body: 'Now, we partner with industry pioneers across fintech, infrastructure, enterprise tech, and agriculture to build institutions that define tomorrow.',
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — THE BLUEPRINT
          Full-width image right, white gradient left, blueprint labels lg+
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[660px] lg:min-h-[780px] flex items-center bg-white border-b border-forge-border overflow-hidden"
        id="hero"
        aria-labelledby="about-hero-heading"
      >
        {/* Blueprint monument image — full right */}
        <div className="absolute inset-0 z-0 flex justify-end pointer-events-none" aria-hidden="true">
          <img
            src="/assets/about/hero-bg.webp"
            alt=""
            className="w-full lg:w-3/4 h-full object-cover object-right lg:object-center opacity-95 lg:opacity-100"
            fetchPriority="high"
            decoding="async"
          />
          {/* White gradient — protects left copy at all breakpoints */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 lg:via-white/20 to-transparent" />
        </div>

        {/* Blueprint coordinate labels — decorative, lg+ only */}
        <div
          className="absolute inset-0 pointer-events-none z-10 hidden lg:block"
          aria-hidden="true"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 relative h-full">
            <div className="absolute right-[28%] top-12 font-mono text-[11px] text-slate-400">120</div>
            <div className="absolute right-[12%] top-[38%] font-mono text-[11px] text-slate-400">86</div>
            <div className="absolute right-[12%] top-[56%] font-mono text-[11px] text-slate-400">34</div>
            <div className="absolute right-[29%] bottom-20 font-mono text-[11px] text-slate-400">72</div>
            <div className="absolute right-[46%] top-28 font-mono text-[9px] uppercase tracking-widest text-slate-400 space-y-1">
              <div>IDEA</div><div>STRATEGY</div><div>STRUCTURE</div><div>CLARITY</div>
            </div>
            <div className="absolute right-[9%] top-24 font-mono text-[9px] uppercase tracking-widest text-slate-400 space-y-1 text-right">
              <div>POSITION</div><div>DESIGN</div><div>BUILD</div><div>LAUNCH</div>
            </div>
          </div>
        </div>

        {/* Hero copy — left column */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-2xl">
            <Eyebrow>THE THINKING BEHIND THE FORGE.</Eyebrow>

            <h1
              id="about-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] font-bold text-forge-ink mb-6 tracking-[-0.025em]"
            >
              Most agencies design first, think later.{' '}
              <br />
              <span className="text-forge-blue">We do the opposite.</span>
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
              Strategy before aesthetics. Clarity before execution. Because a pretty brand on a confused business is just expensive confusion.
            </p>

            <a
              href="#story"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-forge-blue text-white rounded-full font-semibold text-base hover:bg-forge-blue-hover transition-all shadow-lg shadow-forge-blue/25 hover:-translate-y-0.5"
            >
              Our Story <span className="text-sm font-mono" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none" aria-hidden="true">
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1 bg-white/60 backdrop-blur-sm">
            <div className="w-1 h-2 bg-forge-blue rounded-full animate-bounce" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-forge-muted mt-1">SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. WHY WE EXIST
          Part A: asymmetric 5-col/4-col/3-col grid with positioning diagram
          Part B: 5-col copy + 7-col story image
          Stat row: 2-col on mobile, 4-col on desktop
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-28 bg-white border-b border-forge-border"
        id="story"
        aria-labelledby="why-exist-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">

          {/* Part A: Why We Exist */}
          <div className="mb-20">
            <Eyebrow>Why We Exist</Eyebrow>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left — headline + intro */}
              <div className="lg:col-span-5">
                <h2
                  id="why-exist-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink tracking-[-0.025em]"
                >
                  Talent isn't the problem.{' '}
                  <br className="hidden sm:inline" />
                  Unclear positioning is.
                </h2>
                <p className="mt-6 text-base lg:text-lg text-forge-secondary leading-relaxed">
                  We started Fortex Forge because we kept seeing the same pattern. Talented founders. Solid products. Zero traction.
                </p>
              </div>

              {/* Center — body copy */}
              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-forge-border pt-8 lg:pt-0 lg:pl-10">
                <p className="text-forge-secondary leading-relaxed text-sm lg:text-base">
                  Not because the business was weak. Because the brand looked forgettable. Investors passed. Clients ghosted. Competitors with worse products closed deals faster.{' '}
                  <strong className="text-forge-ink font-semibold">All because of one thing: unclear positioning.</strong>
                </p>
              </div>

              {/* Right — diagram */}
              <div className="lg:col-span-3">
                <div className="bg-forge-surface p-5 rounded-2xl border border-forge-border flex items-center justify-between gap-4 shadow-sm">
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 mx-auto bg-slate-900 rounded-lg shadow-inner mb-2 flex items-center justify-center border border-slate-800">
                      <div className="w-10 h-10 bg-slate-800 rotate-6 rounded-sm border border-slate-700" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-forge-muted font-semibold block">Unclear Positioning</span>
                  </div>
                  <div className="text-slate-400 font-light text-xl" aria-hidden="true">→</div>
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 mx-auto bg-white rounded-lg shadow-sm mb-2 flex items-center justify-center border border-forge-blue/20">
                      {/* FF mark SVG */}
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M6 8H26V12H11V15H22V19H11V24H6V8Z" fill="#0D1117" />
                        <path d="M15 20H26V24H15V20Z" fill="#1557FF" />
                      </svg>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-forge-blue font-semibold block">Opportunity Revealed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Part B: Our Story */}
          <div className="pt-16 border-t border-forge-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <Eyebrow>Our Story</Eyebrow>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-6 tracking-[-0.025em]">
                  Built from a simple but{' '}
                  <span className="text-forge-blue">powerful belief.</span>
                </h3>
                <p className="text-base text-forge-secondary leading-relaxed mb-6">
                  Fortex Forge was founded to help ambitious founders and business owners build brands with clarity, strategy and purpose — not guesswork. We saw too many great businesses with real potential struggle because their brand didn't reflect the value they offered.
                </p>
                <p className="text-base text-forge-secondary leading-relaxed">
                  We bridge the gap between where your business is and where it deserves to be, transforming vague messages into decisive market traction.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-forge-border bg-slate-100">
                  <img
                    src="/assets/about/story.webp"
                    alt="Fortex Forge Origin Architecture"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 mt-16 border-t border-forge-border">
              {[
                { value: '50+',          label: 'Founders Served',      note: 'And counting' },
                { value: '70+',          label: 'Brands Built',         note: 'Across different industries' },
                { value: '3+',           label: 'Years of Experience',  note: 'In brand strategy & design' },
                { value: 'Africa-first', label: 'Our Focus',            note: 'With global standards', blue: true },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className={`text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight ${stat.blue ? 'text-forge-blue' : 'text-forge-ink'}`}>
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs uppercase text-forge-ink font-semibold tracking-wider mt-1">{stat.label}</div>
                  <p className="text-xs text-forge-muted mt-1">{stat.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. OUR PHILOSOPHY — "Strategy before aesthetics. Always."
          Split 5-col copy (3 pillars + CTA) / 7-col image
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-b border-forge-border"
        id="philosophy"
        aria-labelledby="philosophy-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div className="lg:col-span-5">
              <Eyebrow>Our Philosophy</Eyebrow>
              <h2
                id="philosophy-heading"
                className="text-4xl sm:text-5xl font-display font-bold leading-[1.1] text-forge-ink mb-6 tracking-[-0.025em]"
              >
                Strategy before aesthetics.{' '}
                <br />
                <span className="text-forge-blue">Always.</span>
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary leading-relaxed mb-10">
                A beautiful brand without a clear position is just decoration. We start with strategy, so every visual decision has a purpose, every message is aligned, and every touchpoint moves your business forward.
              </p>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-forge-border mb-10">
                {[
                  { num: '01', title: 'Clarity',          body: 'We define what makes you different.' },
                  { num: '02', title: 'Coherence',        body: 'We align your story across every touchpoint.' },
                  { num: '03', title: 'Commercial Impact', body: 'We design for real business results.' },
                ].map((p) => (
                  <div key={p.num}>
                    <span className="font-mono text-xs text-forge-blue font-bold block mb-1">{p.num}</span>
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider text-forge-ink mb-1">{p.title}</h4>
                    <p className="text-xs text-forge-muted leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>

              <a
                href="#principles"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:shadow-sm hover:-translate-y-0.5"
              >
                See Our Approach <span className="text-xs font-mono" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Right — image */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-forge-border bg-white group">
                <img
                  src="/assets/about/philosophy.webp"
                  alt="Fortex Forge Exploded Architectural Philosophy Stack"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-forge-muted mt-4 px-2 uppercase tracking-wider">
                <span>Deeper thinking. Stronger brands.</span>
                <span>Built for what comes next.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. OUR VALUES — "What we stand for shapes what we build."
          6-col image left, 6-col 2×2 value cards right
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-forge-surface border-b border-forge-border"
        id="values"
        aria-labelledby="values-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-forge-border bg-white">
                <img
                  src="/assets/about/values.webp"
                  alt="Fortex Forge Brand Architecture Values"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <div className="lg:col-span-6">
              <Eyebrow>Our Values</Eyebrow>
              <h2
                id="values-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-10 tracking-[-0.025em]"
              >
                What we stand for{' '}
                <span className="text-forge-blue">shapes what we build.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { num: '01', title: 'Clarity First',       body: 'We remove noise, strip away jargon, and focus ruthlessly on what truly matters to your buyer.' },
                  { num: '02', title: 'People Over Projects', body: 'We form lasting bonds with founders, viewing your growth and challenges as our personal mission.' },
                  { num: '03', title: 'Purpose-Driven Work', body: 'Every identity system and message we craft is designed to accomplish a distinct commercial objective.' },
                  { num: '04', title: 'Excellence Always',   body: 'We uphold unapologetic standards across typography, craft, technical performance, and design integrity.' },
                ].map((v) => (
                  <div key={v.num} className="p-6 bg-white rounded-xl border border-forge-border shadow-sm">
                    <span className="font-mono text-xs font-bold text-forge-blue block mb-2">{v.num}</span>
                    <h4 className="font-display font-bold text-lg text-forge-ink mb-2">{v.title}</h4>
                    <p className="text-sm text-forge-secondary leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. HOW WE WORK — "A clear process for real results."
          6-col 4-step cards left, 6-col mission image right
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-b border-forge-border"
        id="process"
        aria-labelledby="how-we-work-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Eyebrow>How We Work</Eyebrow>
              <h2
                id="how-we-work-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-10 tracking-[-0.025em]"
              >
                A clear process{' '}
                <span className="text-forge-blue">for real results.</span>
              </h2>
              <ol className="space-y-6">
                {[
                  { num: '01', bg: 'bg-forge-ink',  title: 'Discover',         body: 'We audit your existing position, interview key stakeholders, and interrogate your customer reality.' },
                  { num: '02', bg: 'bg-forge-blue', title: 'Strategize',        body: 'We define the positioning anchor, competitive moat, core narrative, and brand architecture.' },
                  { num: '03', bg: 'bg-forge-ink',  title: 'Create',            body: 'We forge the visual identity, digital platforms, design system, and key marketing collateral.' },
                  { num: '04', bg: 'bg-forge-ink',  title: 'Deliver & Grow',    body: 'We launch your evolved brand into the market, provide full implementation guidelines, and scale adoption.' },
                ].map((step) => (
                  <li key={step.num} className="p-6 rounded-xl border border-forge-border bg-forge-surface flex gap-5 items-start">
                    <div className={`w-10 h-10 rounded-lg ${step.bg} text-white font-mono text-sm font-bold flex items-center justify-center shrink-0`}>
                      {step.num}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-forge-ink mb-1">{step.title}</h4>
                      <p className="text-sm text-forge-secondary leading-relaxed">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-forge-border bg-white">
                <img
                  src="/assets/about/mission.webp"
                  alt="Fortex Forge How We Work"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. TESTIMONIALS — "Real people. Real progress."
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-forge-surface border-b border-forge-border relative overflow-hidden"
        id="testimonials"
        aria-labelledby="testimonials-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-2xl mb-16">
            <Eyebrow>Testimonials</Eyebrow>
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink tracking-[-0.025em]"
            >
              Real people.{' '}
              <span className="text-forge-blue">Real progress.</span>
            </h2>
          </div>

          <div className="relative rounded-3xl p-8 lg:p-12 overflow-hidden border border-forge-border shadow-sm mb-16 bg-white">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: '"Fortex Forge helped us completely reposition our energy infrastructure offer. For the first time, institutional investors understood our value in the first 5 minutes."',
                  name: 'Tunde A.',
                  company: 'GreenGrid Solutions',
                },
                {
                  quote: '"The clarity Ayobami and his team brought to Bravelle Foods gave us the confidence to expand nationally. The craft standards are unmatched across West Africa."',
                  name: 'Ifeoma D.',
                  company: 'Bravelle Foods',
                },
                {
                  quote: '"Working with Fortex Forge was the single best branding decision we made. They think like growth strategists who just happen to design masterfully."',
                  name: 'Chisom E.',
                  company: 'Altix Africa',
                },
              ].map((t) => (
                <figure key={t.name} className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-forge-border flex flex-col justify-between shadow-sm">
                  <blockquote className="text-sm text-forge-secondary leading-relaxed italic mb-6">{t.quote}</blockquote>
                  <figcaption>
                    <div className="font-display font-bold text-base text-forge-ink">{t.name}</div>
                    <div className="font-mono text-[11px] text-forge-muted uppercase">{t.company}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Client names ribbon */}
          <div className="pt-8 border-t border-forge-border flex flex-wrap items-center justify-between gap-8 opacity-70 text-sm font-semibold tracking-wider text-forge-muted uppercase font-mono">
            {['GreenGrid', 'Bravelle Foods', 'Altix', 'Tiziano', 'Merci Solar', 'StoneX', 'Cargill'].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>

          {/* Banner */}
          <div className="mt-12 p-8 rounded-2xl bg-forge-ink text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-xl text-white">Your success could be next.</h3>
              <p className="text-sm text-slate-300 mt-1">Let's build a brand that reflects the true magnitude of what you offer.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-forge-blue text-white rounded-full font-semibold text-sm hover:bg-forge-blue-hover transition-all shrink-0"
            >
              Let's Build Together <span aria-hidden="true" className="text-xs font-mono">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          7. OUR MISSION — "To build brands that create real opportunities."
          6-col 3 mission cards left, 6-col image right, action banner below
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-b border-forge-border"
        id="mission"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Eyebrow>Our Mission</Eyebrow>
              <h2
                id="mission-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-10 tracking-[-0.025em]"
              >
                To build brands{' '}
                <span className="text-forge-blue">that create real opportunities.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { title: 'Greater Clarity',      body: 'Eliminating friction so prospects and partners instantly comprehend your unique value equation.' },
                  { title: 'More Opportunities',   body: 'Opening doors to premium enterprise contracts, institutional capital, and top-tier talent acquisition.' },
                  { title: 'Lasting Impact',       body: 'Creating foundational brand systems designed to endure, scale, and compound over decades.' },
                ].map((m) => (
                  <div key={m.title} className="p-6 rounded-xl border border-forge-border bg-forge-surface">
                    <h4 className="font-display font-bold text-lg text-forge-ink mb-2">{m.title}</h4>
                    <p className="text-sm text-forge-secondary leading-relaxed">{m.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-forge-border bg-slate-50">
                <img
                  src="/assets/about/mission.webp"
                  alt="Fortex Forge Office Still Life"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Mission action banner */}
          <div className="mt-16 p-8 rounded-2xl bg-forge-surface border border-forge-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="font-display font-bold text-xl text-forge-ink">You bring the vision. We'll help you forge what's next.</h3>
              <p className="text-sm text-forge-secondary mt-1">From strategy to design and execution, we build with precision.</p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all shrink-0"
            >
              Let's Build Together <span aria-hidden="true" className="text-xs font-mono">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. FOUNDER — "A founder who believes in a clearer future..."
          12-col grid: 5-col narrative / 4-col portrait / 3-col metrics
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-b border-forge-border relative overflow-hidden"
        id="founder"
        aria-labelledby="founder-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Narrative left */}
            <div className="lg:col-span-5 z-10">
              <Eyebrow>Who's Behind This</Eyebrow>
              <h2
                id="founder-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-6 tracking-[-0.025em]"
              >
                A founder who believes in a clearer future for{' '}
                <span className="text-forge-blue">African businesses.</span>
              </h2>
              <div className="space-y-4 text-base text-forge-secondary leading-relaxed mb-8">
                <p>
                  I started Fortex Forge because I kept seeing talented founders with great ideas lose opportunities simply because their brand didn't communicate the value they had built.
                </p>
                <p>
                  My goal is simple: help ambitious businesses position themselves clearly, look credible and grow with intention.
                </p>
              </div>

              {/* Signature block */}
              <div className="pt-4 border-t border-forge-border">
                <div
                  className="text-3xl text-forge-ink -rotate-1 mb-1 leading-tight"
                  style={{ fontFamily: "'Instrument Sans', cursive", fontStyle: 'italic' }}
                >
                  Ayobami Egbewole
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-forge-muted">
                  Founder &amp; Creative Director · Fortex Forge
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-8 p-6 bg-forge-surface rounded-xl border-l-4 border-forge-blue flex items-start gap-4">
                <span className="text-3xl text-forge-blue leading-none font-serif" aria-hidden="true">"</span>
                <p className="text-sm font-semibold text-forge-ink italic leading-snug">
                  Great businesses already exist. I just help the world understand them.
                </p>
              </div>
            </div>

            {/* Portrait center */}
            <div className="lg:col-span-4 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-forge-border relative bg-slate-50">
                <img
                  src="/assets/about/team/ayobami-egbewole.webp"
                  alt="Ayobami Egbewole, Founder of Fortex Forge"
                  className="w-full h-auto object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Outside work strip */}
              <div className="mt-4 p-4 rounded-xl bg-forge-surface border border-forge-border flex items-center justify-around text-center">
                {[
                  { icon: '📖', label: 'Reading' },
                  { icon: '</>', label: 'Building' },
                  { icon: '🎧', label: 'Good Music' },
                  { icon: '✈️', label: 'Exploring' },
                ].map((item, i, arr) => (
                  <>
                    <div key={item.label}>
                      <span className="text-base font-mono" aria-hidden="true">{item.icon}</span>
                      <span className="font-mono text-[10px] text-forge-muted block mt-1 uppercase">{item.label}</span>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-6 bg-forge-border" aria-hidden="true" />}
                  </>
                ))}
              </div>
            </div>

            {/* Impact metrics right */}
            <div className="lg:col-span-3 lg:pl-6 space-y-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-forge-muted block border-b border-forge-border pb-2">
                Same Vision. Bigger Businesses.
              </span>
              {[
                { value: '200+', label: 'Hours of Creative Work',                note: null },
                { value: '10+',  label: 'Brands Worked On',                      note: null },
                { value: '1',    label: 'Clear Mission', blue: true,
                  note: 'Help African businesses win through better positioning and design.' },
              ].map((m) => (
                <div key={m.label}>
                  <div className={`text-4xl lg:text-5xl font-display font-bold tracking-tight ${m.blue ? 'text-forge-blue' : 'text-forge-ink'}`}>
                    {m.value}
                  </div>
                  <div className={`font-mono text-xs uppercase tracking-wider mt-1 ${m.blue ? 'text-forge-ink font-semibold' : 'text-forge-muted'}`}>
                    {m.label}
                  </div>
                  {m.note && <p className="text-xs text-forge-secondary mt-2 leading-relaxed">{m.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. THE TEAM — "Small team. Big intent."
          Header strip, 3-col team cards, bottom CTA bar
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-forge-surface border-b border-forge-border"
        id="team"
        aria-labelledby="team-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header strip */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Eyebrow>The Team</Eyebrow>
              <h2
                id="team-heading"
                className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight tracking-[-0.025em]"
              >
                Small team.{' '}
                <span className="text-forge-blue">Big intent.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-forge-secondary leading-relaxed">
                We're a lean, focused team of designers, strategists and builders who care about one thing — helping ambitious businesses win through clarity, design and execution.
              </p>
            </div>
            <div className="max-w-xs text-left lg:text-right">
              <span className="font-mono text-[11px] uppercase tracking-wider text-forge-muted block mb-1">Different Perspectives.</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-forge-ink font-semibold block">A Sharper Outcome.</span>
              <p className="text-xs text-forge-muted mt-2">Strategy, creativity and technology working together to build brands that last.</p>
            </div>
          </div>

          {/* Team cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <article
                key={member.num}
                className="bg-white rounded-2xl p-6 border border-forge-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs font-bold text-forge-blue">{member.num}</span>
                    <span className="text-xs text-forge-muted font-mono uppercase">{member.tag}</span>
                  </div>
                  <div className="aspect-[4/3] rounded-xl bg-slate-100 overflow-hidden mb-6 border border-forge-border/60">
                    <img
                      src={member.img}
                      alt={`${member.name} — ${member.role}`}
                      className={`w-full h-full object-cover ${member.imgFocus}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display font-bold text-xl text-forge-ink">{member.name}</h3>
                    <a
                      href="https://linkedin.com"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-slate-400 hover:text-forge-blue text-sm font-semibold transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      in
                    </a>
                  </div>
                  <p className="font-mono text-[10px] uppercase text-forge-muted mb-4 font-medium">{member.role}</p>
                  <p className="text-sm text-forge-secondary leading-relaxed">{member.quote}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Team bottom CTA bar */}
          <div className="mt-14 p-6 bg-white rounded-2xl border border-forge-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2" aria-hidden="true">
                <span className="w-9 h-9 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold">FF</span>
                <span className="w-9 h-9 rounded-full border-2 border-white bg-forge-blue flex items-center justify-center text-xs text-white font-bold">✦</span>
              </div>
              <div>
                <div className="font-mono text-xs uppercase font-bold text-forge-ink">Different Skills. Same Mission.</div>
                <div className="text-xs text-forge-muted">Strategy. Design. Technology. Execution.</div>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:-translate-y-0.5"
            >
              Work With Us <span aria-hidden="true" className="text-xs font-mono">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. PRINCIPLES — "The beliefs that guide everything we do."
          Asymmetric 7-col/5-col header, 3×2 principle cards, conviction bar
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-b border-forge-border"
        id="principles"
        aria-labelledby="principles-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Asymmetric header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Our Principles</Eyebrow>
              <h2
                id="principles-heading"
                className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight tracking-[-0.025em]"
              >
                The beliefs that guide everything{' '}
                <span className="text-forge-blue">we do.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-forge-secondary leading-relaxed">
                These aren't just nice words. They shape how we think, how we work and what we deliver. They're the reason Fortex Forge exists, and the standard we hold ourselves to.
              </p>
              <div className="font-mono text-[11px] uppercase text-forge-muted mt-3">Principles → Progress</div>
            </div>
          </div>

          {/* 6-card 3×2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p) => (
              <article
                key={p.num}
                className="bg-forge-surface rounded-2xl p-6 border border-forge-border hover:shadow-md hover:bg-white transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-forge-blue">{p.num}</span>
                    <span className="font-mono text-[10px] uppercase text-forge-muted">{p.tag}</span>
                  </div>
                  <div className="aspect-square max-h-48 mx-auto flex items-center justify-center mb-6">
                    <img
                      src={p.img}
                      alt={p.alt}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="font-display font-bold text-xl text-forge-ink mb-2">{p.title}</h3>
                  <p className="text-sm text-forge-secondary leading-relaxed mb-6">{p.body}</p>
                </div>
                <Link
                  to="/contact"
                  className="font-mono text-[11px] uppercase tracking-wider text-forge-blue font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>{p.cta}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>

          {/* Conviction quote bar */}
          <div className="mt-14 py-8 border-t border-b border-forge-border flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <span className="text-3xl text-forge-blue font-serif" aria-hidden="true">"</span>
              <p className="font-display font-semibold text-lg text-forge-ink">
                Principles turn good intentions into great outcomes.
              </p>
            </div>
            <div className="font-mono text-xs text-forge-muted uppercase tracking-wider">Same Principles. Bigger Impact.</div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          11. PARTNER FIT — "The right partners build further. Together."
          Architectural BG (opacity-10), 2-col comparison cards, action bar
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-forge-surface border-b border-forge-border relative overflow-hidden"
        id="audience"
        aria-labelledby="partner-fit-heading"
      >
        {/* Architectural wall background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" aria-hidden="true">
          <img
            src="/assets/about/partner-fit.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <Eyebrow>Who This Works For</Eyebrow>
            <h2
              id="partner-fit-heading"
              className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight mb-4 tracking-[-0.025em]"
            >
              The right partners build further.{' '}
              <span className="text-forge-blue">Together.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              We work with ambitious founders and business owners who understand that a clear brand isn't a luxury — it's an essential growth advantage.
            </p>
          </div>

          {/* Two comparison columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
            {/* Good fit */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-forge-border shadow-sm">
              <div className="flex items-center gap-3 pb-6 border-b border-forge-border mb-8">
                <div className="w-7 h-7 rounded-full bg-forge-blue/10 text-forge-blue flex items-center justify-center font-bold text-sm" aria-hidden="true">
                  ✓
                </div>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-forge-ink">
                  You're a good fit if
                </h3>
              </div>
              <ul className="space-y-6">
                {goodFit.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-forge-surface flex items-center justify-center text-forge-blue shrink-0" aria-hidden="true">
                      <span className="text-base">◉</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-forge-ink">{item.title}</h4>
                      <p className="text-sm text-forge-secondary mt-1">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not right fit */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-forge-border shadow-sm">
              <div className="flex items-center gap-3 pb-6 border-b border-forge-border mb-8">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm" aria-hidden="true">
                  ✕
                </div>
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-forge-muted">
                  We're probably wrong for you if
                </h3>
              </div>
              <ul className="space-y-6">
                {notFit.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-slate-100/80 flex items-center justify-center text-slate-500 shrink-0" aria-hidden="true">
                      <span className="text-base">○</span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-base text-forge-ink">{item.title}</h4>
                      <p className="text-sm text-forge-muted mt-1">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-forge-border">
            <span className="font-mono text-xs uppercase text-forge-secondary font-medium">Ready to build something meaningful?</span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Let's Talk <span aria-hidden="true" className="text-xs font-mono">↗</span>
            </Link>
            <span className="font-mono text-xs uppercase text-forge-muted">Good founders make bolder moves.</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          12. OUR JOURNEY — "From an observation to a mission."
          3-stage transformation image + 3-col narrative cards
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white border-b border-forge-border"
        id="journey"
        aria-labelledby="journey-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-16">
            <Eyebrow>Our Journey</Eyebrow>
            <h2
              id="journey-heading"
              className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight tracking-[-0.025em]"
            >
              From an observation to{' '}
              <span className="text-forge-blue">a mission.</span>
            </h2>
          </div>

          {/* Transformation image */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-forge-border bg-slate-50 mb-16">
            <img
              src="/assets/about/story.webp"
              alt="Our Journey — Three Stage Transformation"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* 3-col journey narrative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {journeyStages.map((s) => (
              <div key={s.num} className="p-6 rounded-2xl bg-forge-surface border border-forge-border">
                <span className="font-mono text-xs font-bold text-forge-blue block mb-2">{s.num}</span>
                <h4 className="font-display font-bold text-xl text-forge-ink mb-2">{s.title}</h4>
                <p className="text-sm text-forge-secondary leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:-translate-y-0.5"
            >
              Our Full Story <span aria-hidden="true" className="text-xs font-mono">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          13. CLOSING CTA — "Ready to stop losing to worse competitors?"
          6-col copy / 6-col monument image, dual CTAs, trust indicators
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white relative overflow-hidden"
        id="contact"
        aria-labelledby="about-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* CTA copy left */}
            <div className="lg:col-span-6 z-10">
              <Eyebrow>Ready for what's next?</Eyebrow>
              <h2
                id="about-cta-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-forge-ink leading-[1.1] mb-6 tracking-[-0.025em]"
              >
                Ready to stop losing to{' '}
                <br />
                <span className="text-forge-blue">worse competitors?</span>
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
                You have a great idea, a solid product, and real potential. Now it's time to build a brand that reflects it — one that creates trust, opens doors and drives growth.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-forge-ink text-white rounded-full font-semibold text-base hover:bg-neutral-800 transition-all shadow-md hover:-translate-y-0.5"
                >
                  Let's Talk <span className="text-sm font-mono" aria-hidden="true">↗</span>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-forge-border rounded-full font-semibold text-base text-forge-ink hover:bg-forge-surface transition-all"
                >
                  View Our Services
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-forge-border">
                {[
                  { label: '30-Minute',    sub: 'Discovery Call' },
                  { label: 'Clear Roadmap', sub: '& Proposal' },
                  { label: 'No Obligation', sub: 'Just Clarity' },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-3">
                    <span className="text-forge-blue text-xl" aria-hidden="true">◈</span>
                    <div>
                      <div className="font-display font-semibold text-xs text-forge-ink">{badge.label}</div>
                      <div className="text-[11px] text-forge-muted">{badge.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monument image right */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-forge-border bg-white group">
                <img
                  src="/assets/about/closing-cta.webp"
                  alt="Fortex Forge Closing Monolith Monument"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
