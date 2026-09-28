import { Link } from 'react-router-dom'

// ─── AboutPage ─────────────────────────────────────────────────────────────────
// Composition: High-fidelity implementation based on Reference mockups/About page
// Every section integrates full-bleed background artwork from the background folders
// while strictly preserving all existing website copy, navigation, and SEO structure.
// ─────────────────────────────────────────────────────────────────────────────

// ── Local sub-components ──────────────────────────────────────────────────────

/** Eyebrow label — 11px uppercase with left blue indicator */
function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 mb-6 ${className}`}>
      <span className="w-1.5 h-3.5 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-forge-ink/70">
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
          Full background artwork 01-hero.webp with technical blueprint drafting
          monument, coordinate measurements, and left copy block.
          Reference: Reference mockups/About page/about hero.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[720px] lg:min-h-[820px] bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        id="hero"
        aria-labelledby="about-hero-heading"
      >
        {/* Full-bleed blueprint artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/01-hero.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right mix-blend-multiply opacity-95 lg:opacity-100"
            fetchPriority="high"
            decoding="async"
          />
          {/* Soft gradient scrim on mobile/tablet to ensure copy legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        {/* Blueprint coordinate numbers — matching reference mockup */}
        <div
          className="absolute inset-0 pointer-events-none z-10 hidden lg:block"
          aria-hidden="true"
        >
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative h-full">
            <div className="absolute right-[31%] top-16 font-mono text-[11px] text-slate-400">120</div>
            <div className="absolute right-[11%] top-[40%] font-mono text-[11px] text-slate-400">86</div>
            <div className="absolute right-[11%] top-[58%] font-mono text-[11px] text-slate-400">34</div>
            <div className="absolute right-[32%] bottom-24 font-mono text-[11px] text-slate-400">72</div>
            <div className="absolute right-[48%] top-32 font-mono text-[9px] uppercase tracking-widest text-slate-400 space-y-1">
              <div>IDEA</div><div>STRATEGY</div><div>STRUCTURE</div><div>CLARITY</div>
            </div>
            <div className="absolute right-[8%] top-28 font-mono text-[9px] uppercase tracking-widest text-slate-400 space-y-1 text-right">
              <div>POSITION</div><div>DESIGN</div><div>BUILD</div><div>LAUNCH</div>
            </div>
          </div>
        </div>

        {/* Hero copy — left column */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 py-20 lg:py-28 relative z-20 w-full mb-auto">
          <div className="max-w-2xl">
            <Eyebrow>THE THINKING BEHIND THE FORGE.</Eyebrow>

            <h1
              id="about-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] font-bold text-forge-ink mb-6 tracking-[-0.03em]"
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
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-forge-blue text-white rounded-full font-semibold text-sm hover:bg-forge-blue-hover transition-all shadow-lg shadow-forge-blue/25 hover:-translate-y-0.5"
            >
              Our Story <span className="text-sm font-mono" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="relative z-20 flex flex-col items-center pb-8 pointer-events-none" aria-hidden="true">
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1 bg-white/60 backdrop-blur-sm">
            <div className="w-1 h-2 bg-forge-blue rounded-full animate-bounce" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-forge-muted mt-2 font-semibold">SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. WHY WE EXIST
          Clean structured narrative with Unclear Positioning -> Opportunity Revealed
          Reference: Reference mockups/About page/about hero.png (bottom half)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 bg-white border-b border-forge-border"
        id="story"
        aria-labelledby="why-exist-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16">
          <Eyebrow>WHY WE EXIST</Eyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — headline + intro */}
            <div className="lg:col-span-5">
              <h2
                id="why-exist-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink tracking-[-0.03em]"
              >
                Talent isn't the problem.{' '}
                <br className="hidden sm:inline" />
                <span className="text-forge-ink">Unclear positioning is.</span>
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

            {/* Right — transformation graphic */}
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-forge-border bg-slate-50 p-2">
                <img
                  src="/assets/about/07-process.webp"
                  alt="Unclear Positioning to Opportunity Revealed"
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex justify-between items-center px-4 py-2 font-mono text-[9px] uppercase tracking-wider text-forge-muted font-bold">
                  <span>UNCLEAR POSITIONING</span>
                  <span>OPPORTUNITY REVEALED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. OUR STORY
          Full background artwork 02-story.webp with modern architectural building
          and steps on the right, and story narrative on the left.
          Reference: Reference mockups/About page/about 2.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[780px] lg:min-h-[860px] flex flex-col justify-between"
        aria-labelledby="our-story-heading"
      >
        {/* Full-bleed background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/02-story.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle responsive scrim on mobile */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">OUR STORY</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                PEOPLE.<br />IDEAS.<br />OPPORTUNITIES.
              </div>
            </div>
          </div>

          {/* Story narrative */}
          <div className="max-w-2xl mb-14">
            <h2
              id="our-story-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-8 tracking-[-0.03em]"
            >
              Built from a simple{' '}
              <span className="text-forge-blue">but powerful belief.</span>
            </h2>

            <div className="space-y-6 text-base text-forge-secondary leading-relaxed">
              <p>
                Fortex Forge was founded to help ambitious founders and business owners build brands with clarity, strategy and purpose — not guesswork.
              </p>
              <p>
                We saw too many great businesses with real potential struggle because their brand didn't reflect the value they offered. They had the ideas, the passion and the drive, but lacked the right positioning, visual identity and digital presence to attract the right opportunities.
              </p>
              <p>
                So we built Fortex Forge — a strategy-first creative tech agency designed to bridge that gap. Today, we partner with ambitious founders and mid-level business owners to turn bold ideas into credible, high-performing brands.
              </p>
            </div>
          </div>

          {/* Stats row matching mockup */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-neutral-300/80 bg-white/70 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl lg:rounded-none">
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
                <div className="font-mono text-xs uppercase text-forge-ink font-bold tracking-wider mt-1">{stat.label}</div>
                <p className="text-xs text-forge-muted mt-1 font-medium">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom annotation footer */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                REAL BUSINESSES.<br />REAL GROWTH.
              </div>
            </div>
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                BUILT ON PURPOSE.<br />DRIVEN BY IMPACT.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. OUR PHILOSOPHY
          Full background artwork 03-philosophy.webp with exploded 3D monument
          on the right and 3 core pillars on the left.
          Reference: Reference mockups/About page/03.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[900px] flex flex-col justify-between"
        id="philosophy"
        aria-labelledby="philosophy-heading"
      >
        {/* Full-bleed background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/03-philosophy.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          <Eyebrow>OUR PHILOSOPHY</Eyebrow>

          <div className="max-w-xl lg:max-w-2xl">
            <h2
              id="philosophy-heading"
              className="text-4xl sm:text-5xl lg:text-[56px] font-display font-bold leading-[1.08] text-forge-ink mb-6 tracking-[-0.03em]"
            >
              Strategy before aesthetics.{' '}
              <br />
              <span className="text-forge-blue">Always.</span>
            </h2>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed mb-10">
              A beautiful brand without a clear position is just decoration. We start with strategy, so every visual decision has a purpose, every message is aligned, and every touchpoint moves your business forward.
            </p>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-300/80 mb-10">
              {[
                { num: '01', title: 'Clarity',          body: 'We define what makes you different.' },
                { num: '02', title: 'Coherence',        body: 'We align your story across every touchpoint.' },
                { num: '03', title: 'Commercial Impact', body: 'We design for real business results.' },
              ].map((p) => (
                <div key={p.num} className="bg-white/70 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-xl lg:rounded-none">
                  <span className="font-mono text-xs text-forge-blue font-bold block mb-1">{p.num}</span>
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider text-forge-ink mb-1">{p.title}</h4>
                  <p className="text-xs text-forge-muted leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>

            <a
              href="#principles"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:shadow-sm hover:-translate-y-0.5"
            >
              See Our Approach <span className="text-xs font-mono" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Bottom annotation footer */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              DEEPER THINKING. STRONGER BRANDS.
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              BUILT FOR WHAT COMES NEXT.
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. WHO'S BEHIND THIS (FOUNDER)
          Full background artwork 04-founder-background.webp with office setup,
          desk books, mug, and illuminated wall logo.
          Reference: Reference mockups/About page/04.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="founder"
        aria-labelledby="founder-heading"
      >
        {/* Full-bleed founder office background */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/04-founder-background.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">WHO'S BEHIND THIS</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME VISION.<br />BIGGER BUSINESSES.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Narrative left */}
            <div className="lg:col-span-6 z-10">
              <h2
                id="founder-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-6 tracking-[-0.03em]"
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
                  className="text-3xl text-forge-ink -rotate-1 mb-1 leading-tight font-serif"
                  style={{ fontStyle: 'italic' }}
                >
                  Ayobami Egbewole
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-forge-muted font-bold">
                  Founder &amp; Creative Director · Fortex Forge
                </p>
              </div>

              {/* Pull quote */}
              <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-forge-blue flex items-start gap-4 shadow-sm">
                <span className="text-3xl text-forge-blue leading-none font-serif" aria-hidden="true">"</span>
                <p className="text-sm font-semibold text-forge-ink italic leading-snug">
                  Great businesses already exist. I just help the world understand them.
                </p>
              </div>
            </div>

            {/* Impact metrics right */}
            <div className="lg:col-span-6 lg:pl-12 flex flex-col justify-center space-y-8 bg-white/70 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl">
              {[
                { value: '200+', label: 'Hours of Creative Work', note: null },
                { value: '10+',  label: 'Brands Worked On',     note: null },
                {
                  value: '1',
                  label: 'Clear Mission',
                  blue: true,
                  note: 'Help African businesses win through better positioning and design.',
                },
              ].map((m) => (
                <div key={m.label} className="border-b border-neutral-300/60 pb-6 last:border-b-0">
                  <div className={`text-4xl lg:text-5xl font-display font-bold tracking-tight ${m.blue ? 'text-forge-blue' : 'text-forge-ink'}`}>
                    {m.value}
                  </div>
                  <div className={`font-mono text-xs uppercase tracking-wider mt-1 ${m.blue ? 'text-forge-ink font-bold' : 'text-forge-muted'}`}>
                    {m.label}
                  </div>
                  {m.note && <p className="text-xs text-forge-secondary mt-2 leading-relaxed font-medium">{m.note}</p>}
                </div>
              ))}

              {/* Outside work strip */}
              <div className="pt-4 border-t border-forge-border flex items-center justify-around text-center">
                {[
                  { icon: '📖', label: 'Reading' },
                  { icon: '</>', label: 'Building' },
                  { icon: '🎧', label: 'Good Music' },
                  { icon: '✈️', label: 'Exploring' },
                ].map((item, i, arr) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div>
                      <span className="text-base font-mono" aria-hidden="true">{item.icon}</span>
                      <span className="font-mono text-[10px] text-forge-muted block mt-1 uppercase font-semibold">{item.label}</span>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-6 bg-forge-border hidden sm:block" aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. THE TEAM
          Full background artwork 05-team-background.webp with illuminated wall
          and stone monolith.
          Reference: Reference mockups/About page/05.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="team"
        aria-labelledby="team-heading"
      >
        {/* Full-bleed team background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/05-team-background.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Header strip */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              <Eyebrow>THE TEAM</Eyebrow>
              <h2
                id="team-heading"
                className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight tracking-[-0.03em]"
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
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-forge-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
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
                  <p className="font-mono text-[10px] uppercase text-forge-muted mb-4 font-bold">{member.role}</p>
                  <p className="text-sm text-forge-secondary leading-relaxed">{member.quote}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Team bottom CTA bar */}
          <div className="mt-14 p-6 bg-white/90 backdrop-blur-sm rounded-2xl border border-forge-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
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
          7. OUR VALUES
          Full background artwork values.webp with concrete monument and mountain vista.
          Reference: Reference mockups/About page/about-our value.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="values"
        aria-labelledby="values-heading"
      >
        {/* Full-bleed values background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/values.webp"
            alt=""
            className="w-full h-full object-cover object-left-bottom lg:object-center mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">OUR VALUES</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME VALUES.<br />BIGGER POSSIBILITIES.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left copy block */}
            <div className="lg:col-span-5">
              <h2
                id="values-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-6 tracking-[-0.03em]"
              >
                What we stand for{' '}
                <span className="text-forge-blue">shapes what we build.</span>
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary leading-relaxed mb-8">
                Our values guide every project, every partnership and every decision. They keep us focused on what truly matters — creating real value for the people we work with.
              </p>
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-l-[1.5px] border-forge-blue pl-2.5">
                SOLID PRINCIPLES.<br />STRONGER BRANDS.
              </div>
            </div>

            {/* Right 2x2 value cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    num: '01',
                    icon: '🎯',
                    title: 'Clarity First',
                    body: 'We remove noise, strip away jargon, and focus ruthlessly on what truly matters to your buyer.',
                  },
                  {
                    num: '02',
                    icon: '👥',
                    title: 'People Over Projects',
                    body: 'We form lasting bonds with founders, viewing your growth and challenges as our personal mission.',
                  },
                  {
                    num: '03',
                    icon: '📊',
                    title: 'Purpose-Driven Work',
                    body: 'Every identity system and message we craft is designed to accomplish a distinct commercial objective.',
                  },
                  {
                    num: '04',
                    icon: '🛡',
                    title: 'Excellence Always',
                    body: 'We uphold unapologetic standards across typography, craft, technical performance, and design integrity.',
                  },
                ].map((v) => (
                  <div key={v.num} className="p-6 bg-white/95 backdrop-blur-sm rounded-2xl border border-forge-border shadow-sm">
                    <span className="text-xl mb-3 block" aria-hidden="true">{v.icon}</span>
                    <h4 className="font-display font-bold text-lg text-forge-ink mb-2">{v.title}</h4>
                    <p className="text-sm text-forge-secondary leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom annotation footer */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-12">
          <div className="flex justify-end text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6">
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                OUR VALUES TODAY.<br />A BRIGHTER TOMORROW.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          8. HOW WE WORK
          Full background artwork 06-values.webp (featuring PLAN. DESIGN. BUILD. GROW.
          and FORTEX FORGE / FORGING ABSOLUTE CLARITY monument on the right).
          Reference: Reference mockups/About page/how we work.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="process"
        aria-labelledby="how-we-work-heading"
      >
        {/* Full-bleed how we work background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/06-values.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">HOW WE WORK</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                FROM STRATEGY<br />TO IMPACT.
              </div>
            </div>
          </div>

          <div className="max-w-2xl mb-8">
            <h2
              id="how-we-work-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-6 tracking-[-0.03em]"
            >
              A clear process{' '}
              <span className="text-forge-blue">for real results.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed mb-10">
              We follow a structured, strategy-led process that turns ideas into clear direction, and clear direction into measurable outcomes.
            </p>

            {/* Vertical timeline matching mockup */}
            <ol className="space-y-4">
              {[
                { num: '01', icon: '🔍', title: 'Discover',         body: 'We audit your existing position, interview key stakeholders, and interrogate your customer reality.' },
                { num: '02', icon: '💡', title: 'Strategize',        body: 'We define the positioning anchor, competitive moat, core narrative, and brand architecture.' },
                { num: '03', icon: '✏️', title: 'Create',            body: 'We forge the visual identity, digital platforms, design system, and key marketing collateral.' },
                { num: '04', icon: '📊', title: 'Deliver & Grow',    body: 'We launch your evolved brand into the market, provide full implementation guidelines, and scale adoption.' },
              ].map((step) => (
                <li key={step.num} className="p-5 sm:p-6 rounded-2xl border border-forge-border bg-white/95 backdrop-blur-sm flex gap-5 items-center shadow-sm">
                  <span className="font-mono text-xs font-bold text-neutral-400 block shrink-0">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-forge-surface flex items-center justify-center text-forge-ink text-base shrink-0 border border-forge-border/60">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-forge-ink mb-1">{step.title}</h4>
                    <p className="text-sm text-forge-secondary leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Bottom annotation footer */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                A BETTER PROCESS.<br />STRONGER BRANDS.
              </div>
            </div>
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                IDEAS TODAY.<br />OPPORTUNITIES TOMORROW.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          9. OUR PRINCIPLES
          Full background artwork 08-principles-background.webp with clean interior
          and rock on the right edge.
          Reference: Reference mockups/About page/06.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[860px] lg:min-h-[960px] flex flex-col justify-between"
        id="principles"
        aria-labelledby="principles-heading"
      >
        {/* Full-bleed principles background */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/08-principles-background.webp"
            alt=""
            className="w-full h-full object-cover object-center mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Header strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-end">
            <div className="lg:col-span-7">
              <Eyebrow>OUR PRINCIPLES</Eyebrow>
              <h2
                id="principles-heading"
                className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight tracking-[-0.03em]"
              >
                The beliefs that guide everything{' '}
                <span className="text-forge-blue">we do.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-forge-secondary leading-relaxed">
                These aren't just nice words. They shape how we think, how we work and what we deliver. They're the reason Fortex Forge exists, and the standard we hold ourselves to.
              </p>
              <div className="font-mono text-[11px] uppercase tracking-wider text-forge-muted mt-3 font-semibold">PRINCIPLES → PROGRESS</div>
            </div>
          </div>

          {/* 6-card 3×2 grid matching mockup */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p) => (
              <article
                key={p.num}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-forge-border hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-forge-blue">{p.num}</span>
                    <span className="font-mono text-[10px] uppercase text-forge-muted font-semibold">{p.tag}</span>
                  </div>
                  <div className="aspect-square max-h-44 mx-auto flex items-center justify-center mb-6">
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

          {/* Conviction quote bar matching mockup */}
          <div className="mt-14 py-8 border-t border-b border-neutral-300/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left bg-white/70 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none px-6 lg:px-0 rounded-2xl lg:rounded-none">
            <div className="flex items-center gap-4">
              <span className="text-3xl text-forge-blue font-serif" aria-hidden="true">"</span>
              <p className="font-display font-semibold text-lg text-forge-ink">
                Principles turn good intentions into great outcomes.
              </p>
            </div>
            <div className="font-mono text-xs text-forge-muted uppercase tracking-wider font-semibold">SAME PRINCIPLES. BIGGER IMPACT.</div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          10. PARTNER FIT (WHO THIS WORKS FOR)
          Full background artwork 09-partner-fit.webp with concrete monument wall
          on the right and 2 comparison cards on the left.
          Reference: Reference mockups/About page/07.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="audience"
        aria-labelledby="partner-fit-heading"
      >
        {/* Full-bleed partner fit background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/09-partner-fit.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">WHO THIS WORKS FOR</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME VISION.<br />BIGGER POSSIBILITIES.
              </div>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <h2
              id="partner-fit-heading"
              className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight mb-4 tracking-[-0.03em]"
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
                  YOU'RE A GOOD FIT IF
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
                  WE'RE PROBABLY WRONG FOR YOU IF
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
        </div>

        {/* Bottom action bar */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-200/80">
            <span className="font-mono text-xs uppercase text-forge-secondary font-medium">READY TO BUILD SOMETHING MEANINGFUL?</span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:-translate-y-0.5 shadow-sm"
            >
              Let's Talk <span aria-hidden="true" className="text-xs font-mono">↗</span>
            </Link>
            <span className="font-mono text-xs uppercase text-forge-muted">GOOD FOUNDERS MAKE BOLDER MOVES.</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          11. OUR JOURNEY
          Full background artwork 10-journey.webp with 3-stage marble pedestals
          and ascending blue curve on the right, and 3 journey stages on the left.
          Reference: Reference mockups/About page/08.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="journey"
        aria-labelledby="journey-heading"
      >
        {/* Full-bleed journey background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/10-journey.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">OUR JOURNEY</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME VISION.<br />BIGGER POSSIBILITIES.
              </div>
            </div>
          </div>

          <div className="max-w-2xl mb-12">
            <h2
              id="journey-heading"
              className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-tight tracking-[-0.03em] mb-6"
            >
              From an observation to{' '}
              <span className="text-forge-blue">a mission.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              Fortex Forge was born from a simple observation — too many great businesses in Africa are overlooked, not because they lack potential, but because their brands don't communicate it clearly.
            </p>
          </div>

          {/* 3-col journey narrative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mb-12">
            {journeyStages.map((s) => (
              <div key={s.num} className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border shadow-sm">
                <span className="font-mono text-xs font-bold text-forge-blue block mb-2">{s.num}</span>
                <h4 className="font-display font-bold text-lg text-forge-ink mb-2">{s.title}</h4>
                <p className="text-xs text-forge-secondary leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar matching mockup */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-neutral-200/80">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-forge-blue font-serif" aria-hidden="true">"</span>
              <div>
                <p className="font-display font-semibold text-sm text-forge-ink">
                  A clearer Africa. One brand at a time.
                </p>
                <span className="font-mono text-[10px] uppercase text-forge-muted font-bold">FORTEX FORGE</span>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-forge-ink text-white rounded-full text-sm font-semibold hover:bg-neutral-800 transition-all hover:-translate-y-0.5"
            >
              Our Full Story <span aria-hidden="true" className="text-xs font-mono">↗</span>
            </Link>
            <span className="font-mono text-xs uppercase text-forge-muted font-semibold">PEOPLE. BRANDS. OPPORTUNITIES.</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          12. TESTIMONIALS (WHAT OUR CLIENTS SAY)
          Full background artwork 11-testimonials.webp with engraved architectural facade
          and dark stone banner at the bottom.
          Reference: Reference mockups/About page/review.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="testimonials"
        aria-labelledby="testimonials-heading"
      >
        {/* Full-bleed architectural background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/11-testimonials.webp"
            alt=""
            className="w-full h-full object-cover object-top lg:object-right-top mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">WHAT OUR CLIENTS SAY</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                GREAT BUSINESSES.<br />BRIGHTER FUTURES.
              </div>
            </div>
          </div>

          <div className="max-w-2xl mb-12">
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink tracking-[-0.03em] mb-4"
            >
              Real people.{' '}
              <span className="text-forge-blue">Real progress.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              We're proud to have partnered with ambitious founders and business owners who trust us to bring their vision to life.
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {[
              {
                quote: '“Fortex Forge helped us define our brand properly. The clarity we got from their strategy session changed how we positioned our business, and it’s already making a difference.”',
                name: 'Tunde A.',
                company: 'Founder, GreenGrid Solutions',
              },
              {
                quote: '“Professional. Strategic. Reliable. Fortex Forge didn’t just design for us, they helped us think deeper about our brand. The process was smooth and the results exceeded our expectations.”',
                name: 'Ifeoma D.',
                company: 'CEO, Bravelle Foods',
              },
              {
                quote: '“Working with Fortex Forge was one of the best decisions we made. They understood our vision, brought structure to our ideas and delivered a brand that truly represents who we are.”',
                name: 'Chisom E.',
                company: 'Co-Founder, Altix Africa',
              },
            ].map((t) => (
              <figure key={t.name} className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl text-forge-blue leading-none font-serif" aria-hidden="true">“</span>
                    <span className="text-amber-400 text-sm tracking-widest" aria-label="5 stars">★★★★★</span>
                  </div>
                  <blockquote className="text-xs sm:text-sm text-forge-secondary leading-relaxed mb-6">{t.quote}</blockquote>
                </div>
                <figcaption className="pt-4 border-t border-forge-border/80">
                  <div className="font-display font-bold text-base text-forge-ink">{t.name}</div>
                  <div className="font-mono text-[11px] text-forge-muted">{t.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Client logos ribbon */}
          <div className="pt-8 border-t border-neutral-200/80 mb-12">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block text-center mb-6 font-bold">
              TRUSTED BY FORWARD-THINKING BRANDS
            </span>
            <div className="flex flex-wrap items-center justify-around gap-8 text-sm font-semibold tracking-wider text-forge-ink/80 uppercase font-mono">
              {['GreenGrid', 'Bravelle Foods', 'Altix', 'Tiziano', 'Merci Solar', 'StoneX', 'Cargill'].map((n) => (
                <span key={n} className="opacity-80 hover:opacity-100 transition-opacity">{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom textured stone banner matching mockup */}
        <div className="w-full relative overflow-hidden bg-forge-ink text-white py-8 px-6 sm:px-10 lg:px-12 xl:px-16 mt-auto">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 border-l-[1.5px] border-forge-blue pl-2.5">
              SAME PRINCIPLES.<br />BIGGER OPPORTUNITIES.
            </div>
            <div className="text-center sm:text-right flex flex-col sm:flex-row items-center gap-6">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Your success could <span className="text-forge-blue">be next.</span>
              </h3>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all shrink-0 backdrop-blur-sm"
              >
                Let's Build Together <span aria-hidden="true" className="text-xs font-mono">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          13. OUR MISSION & PROMISE
          Full background artwork 12-mission.webp with still-life office desk and
          high-rise skyline on top, plus dark stone foundation for Our Promise.
          Reference: Reference mockups/About page/our mission.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="mission"
        aria-labelledby="mission-heading"
      >
        {/* Full-bleed mission background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/12-mission.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">OUR MISSION</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                BRANDS WITH PURPOSE.<br />A BRIGHTER TOMORROW.
              </div>
            </div>
          </div>

          <div className="max-w-xl lg:max-w-2xl mb-12">
            <h2
              id="mission-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight text-forge-ink mb-6 tracking-[-0.03em]"
            >
              To build brands{' '}
              <span className="text-forge-blue">that create real opportunities.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed mb-10">
              We exist to help ambitious founders and business owners turn bold ideas into credible, high-performing brands through strategy, design and technology.
            </p>

            {/* 3 mission points */}
            <div className="space-y-4">
              {[
                { icon: '🎯', title: 'Greater Clarity',      body: 'Helping you see the bigger picture and make better decisions.' },
                { icon: '📊', title: 'More Opportunities',   body: 'Positioning your brand to attract the right people, clients and investors.' },
                { icon: '👥', title: 'Lasting Impact',       body: 'Building brands that grow, create value and stand the test of time.' },
              ].map((m) => (
                <div key={m.title} className="p-5 sm:p-6 rounded-2xl border border-forge-border bg-white/95 backdrop-blur-sm flex items-center gap-4 shadow-sm">
                  <span className="text-2xl shrink-0" aria-hidden="true">{m.icon}</span>
                  <div>
                    <h4 className="font-display font-bold text-base text-forge-ink mb-1">{m.title}</h4>
                    <p className="text-xs sm:text-sm text-forge-secondary leading-relaxed">{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Promise banner on the dark stone foundation */}
        <div className="w-full relative overflow-hidden bg-forge-ink text-white py-8 px-6 sm:px-10 lg:px-12 xl:px-16 mt-auto">
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-1.5 h-3.5 bg-forge-blue rounded-full" aria-hidden="true" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/70">
                  OUR PROMISE
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                You bring the vision.{' '}
                <span className="text-forge-blue">We'll help you forge what's next.</span>
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
                We're not just another agency. We're a long-term partner invested in your growth — committed to delivering work that creates real opportunities and a brighter tomorrow.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-forge-blue text-white rounded-full font-semibold text-sm hover:bg-forge-blue-hover transition-all shrink-0 shadow-lg shadow-forge-blue/25"
              >
                Let's Build Together <span aria-hidden="true" className="text-xs font-mono">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          14. CLOSING CTA (READY FOR WHAT'S NEXT?)
          Full background artwork 14-closing.webp with carved standing monolith on
          concrete pedestal with handwriting "A clearer future builds here."
          Reference: Reference mockups/About page/09.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-t border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        id="contact"
        aria-labelledby="about-cta-heading"
      >
        {/* Full-bleed closing monolith artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/about/14-closing.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">READY FOR WHAT'S NEXT?</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME VISION.<br />BIGGER POSSIBILITIES.
              </div>
            </div>
          </div>

          {/* Left copy block */}
          <div className="max-w-xl lg:max-w-2xl">
            <h2
              id="about-cta-heading"
              className="text-4xl sm:text-5xl lg:text-[56px] font-display font-bold text-forge-ink leading-[1.08] mb-6 tracking-[-0.03em]"
            >
              Ready to stop losing to{' '}
              <br />
              <span className="text-forge-blue">worse competitors?</span>
            </h2>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
              You have a great idea, a solid product, and real potential. Now it's time to build a brand that reflects it — one that creates trust, opens doors and drives growth.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12 sm:mb-14">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-forge-ink text-white rounded-full font-semibold text-sm hover:bg-neutral-800 transition-all shadow-md hover:-translate-y-0.5"
              >
                Let's Talk <span className="text-xs font-mono" aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-neutral-300 rounded-full font-semibold text-sm text-forge-ink bg-white/90 backdrop-blur-sm hover:bg-neutral-50 transition-all"
              >
                View Our Services
              </Link>
            </div>

            {/* Trust indicators with dividers */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-forge-blue text-lg" aria-hidden="true">📅</span>
                <div>
                  <div className="font-display font-bold text-xs text-forge-ink">30-Minute</div>
                  <div className="text-[11px] text-forge-muted">Discovery Call</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-7 bg-neutral-300" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <span className="text-forge-blue text-lg" aria-hidden="true">📄</span>
                <div>
                  <div className="font-display font-bold text-xs text-forge-ink">Clear Roadmap</div>
                  <div className="text-[11px] text-forge-muted">&amp; Proposal</div>
                </div>
              </div>

              <div className="hidden sm:block w-px h-7 bg-neutral-300" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <span className="text-forge-blue text-lg" aria-hidden="true">👥</span>
                <div>
                  <div className="font-display font-bold text-xs text-forge-ink">No Obligation</div>
                  <div className="text-[11px] text-forge-muted">Just Clarity</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom annotation footer matching mockup */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3 bg-forge-blue inline-block rounded-full" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                BETTER BRANDS. BRIGHTER BUSINESSES.
              </span>
            </div>
            <div className="flex items-start gap-2 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 leading-tight">
                SAME VISION.<br />BIGGER POSSIBILITIES.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
