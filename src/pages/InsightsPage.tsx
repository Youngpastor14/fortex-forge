import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { insights } from '@/data/insights'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

// ─── InsightsPage ─────────────────────────────────────────────────────────────
// High-fidelity implementation based on Reference mockups/insight page/
// (Insight hero.png, insight 01.png, insight 02.png, insight 03.png, insight.png, insight 06.png).
// Every section integrates full-bleed environmental spatial backgrounds while
// maintaining 100% of the approved editorial data, author attribution, and categories.
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

const featured = insights.find((i) => i.isFeatured) ?? insights[0]

const TOPICS = [
  {
    title: 'Brand Strategy',
    desc: 'Position clearly. Attract the right opportunities.',
    count: '12 articles',
    icon: '🎯',
    img: '/assets/insights/what-positioning-actually-is/cover.webp',
  },
  {
    title: 'Identity',
    desc: 'Turn strategy into a visual system that builds trust.',
    count: '10 articles',
    icon: '💎',
    img: '/assets/insights/logo-is-not-a-brand/cover.webp',
  },
  {
    title: 'Digital',
    desc: 'Web, product and digital experiences that perform.',
    count: '8 articles',
    icon: '🖥',
    img: '/assets/insights/pricing-and-brand-authority/cover.webp',
  },
  {
    title: 'Business',
    desc: 'Practical insights to help you grow and operate better.',
    count: '9 articles',
    icon: '📊',
    img: '/assets/insights/the-trust-deficit/cover.webp',
  },
  {
    title: 'Founder Journey',
    desc: 'Real lessons from building in the real world.',
    count: '11 articles',
    icon: '👥',
    img: '/assets/insights/redesign-without-strategy/cover.webp',
  },
]

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [subscribedEmail, setSubscribedEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (subscribedEmail) {
      setIsSubscribed(true)
    }
  }

  const filteredArticles = insights.filter((article) => {
    const matchesTab =
      activeTab === 'All' ||
      article.categoryLabel.toLowerCase().includes(activeTab.toLowerCase()) ||
      (activeTab === 'Positioning' && article.category === 'brand-strategy') ||
      (activeTab === 'Digital' && (article.category === 'process' || article.category === 'growth')) ||
      (activeTab === 'Identity' && article.category === 'visual-identity') ||
      (activeTab === 'Business' && article.category === 'growth')

    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — Full-Bleed Studio Desk with Laptop (Insight hero.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[90vh] flex flex-col justify-between bg-white border-b border-forge-border overflow-hidden"
        aria-labelledby="insights-hero-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/insights/01-hero.webp"
            mobileSrc="/assets/insights/01-hero-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
            fetchPriority="high"
          />
          {/* Subtle directional scrim to protect text */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-24 md:pt-32 pb-12 flex-1 flex flex-col justify-center">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-bold text-forge-blue uppercase tracking-[0.25em] mb-4">
              I N S I G H T S
            </span>

            <h1
              id="insights-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-forge-ink tracking-[-0.03em] leading-[1.08] mb-6"
            >
              Ideas for a clearer,<br />
              <span className="text-forge-blue">stronger tomorrow.</span>
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary mb-8 leading-relaxed max-w-lg font-normal">
              Practical thoughts on branding, business, and digital growth for founders who want to do it right.
            </p>

            {/* Search bar */}
            <div className="w-full max-w-lg relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-forge-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics or keywords..."
                className="w-full pl-11 pr-5 py-3.5 bg-white/95 text-forge-ink placeholder:text-forge-muted rounded-full shadow-sm border border-forge-border focus:outline-none focus:border-forge-blue focus:ring-2 focus:ring-forge-blue/20 text-sm backdrop-blur-sm transition-all"
              />
            </div>

            {/* Category pill tags */}
            <div className="flex flex-wrap items-center gap-2 max-w-lg">
              {['Branding', 'Business', 'Web & Tech', 'Marketing', 'Founder Journey'].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSearchQuery(topic === 'Web & Tech' ? 'Digital' : topic)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-forge-ink border border-forge-border shadow-sm hover:border-forge-ink hover:bg-forge-ink hover:text-white transition-all backdrop-blur-sm"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. FEATURED INSIGHT — Full-Bleed Open Book Room (insight 01.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="featured-insight"
        className="relative w-full min-h-[850px] lg:min-h-[920px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="featured-insight-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/insights/02-featured-article.webp"
            mobileSrc="/assets/insights/02-featured-article-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Scrim protecting left text */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
            <Eyebrow>FEATURED INSIGHT</Eyebrow>
            <h2
              id="featured-insight-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-forge-ink tracking-[-0.03em] leading-tight"
            >
              Why most brands<br />
              fail before they<br />
              <span className="text-forge-blue">even launch.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary mb-6 leading-relaxed font-normal">
              A practical look at why clarity, not creativity, is the real competitive advantage, and how to build a brand that actually gets chosen.
            </p>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-forge-muted pt-2 pb-4">
              <div className="w-8 h-8 rounded-full bg-forge-ink text-white font-bold flex items-center justify-center text-xs">
                MK
              </div>
              <span className="font-semibold text-forge-ink">By Melo Kaji</span>
              <span>•</span>
              <time dateTime="2024-10-12">Oct 12, 2024</time>
              <span>•</span>
              <span>8 min read</span>
            </div>

            <div>
              <Link
                to={featured.href}
                className="inline-flex items-center gap-2 bg-forge-blue text-white text-sm font-semibold px-8 py-3.5 rounded-full shadow-[0_8px_24px_rgba(21,87,255,0.25)] hover:bg-forge-blue-hover transition-all"
              >
                Read the Article <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom baseline strip matching insight 01.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-forge-muted block mb-1">
                LATEST THINKING
              </span>
              <p className="font-display text-lg sm:text-xl font-bold text-forge-ink">
                Practical insights for ambitious founders.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-forge-secondary max-w-md text-left sm:text-right">
              Straightforward ideas, frameworks and perspectives to help you build a brand that creates real opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. LATEST THINKING / ARTICLES GRID (insight 02.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="latest-perspectives"
        className="py-24 bg-forge-surface border-b border-forge-border"
        aria-labelledby="latest-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div>
              <Eyebrow>LATEST THINKING</Eyebrow>
              <h2
                id="latest-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em]"
              >
                Ideas that move<br />
                businesses <span className="text-forge-blue">forward.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-forge-secondary text-sm sm:text-base max-w-md leading-relaxed">
                Strategy, design and real-world insights for founders who want to build brands that create opportunity.
              </p>
              <a
                href="#topics"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-forge-ink/30 text-forge-ink font-medium text-xs sm:text-sm hover:border-forge-ink transition-all hover:bg-white shrink-0 shadow-sm"
              >
                <span>Explore All Insights</span>
                <span className="text-xs" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Filter tabs & Search row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-forge-border">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles">
              {['All', 'Brand Strategy', 'Positioning', 'Identity', 'Digital', 'Business'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full font-medium text-xs sm:text-sm transition-all ${
                    activeTab === tab
                      ? 'bg-forge-ink text-white shadow-sm'
                      : 'bg-white text-forge-secondary hover:text-forge-ink border border-forge-border'
                  }`}
                  aria-pressed={activeTab === tab}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-forge-muted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2 bg-white text-forge-ink placeholder:text-forge-muted rounded-full border border-forge-border text-xs focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue"
              />
            </div>
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-forge-border shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 rounded-full text-xs font-semibold text-forge-ink shadow-sm backdrop-blur-sm">
                    {article.categoryLabel}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-forge-muted mb-2 font-medium">
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                      </time>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-forge-ink tracking-tight mb-3 leading-snug group-hover:text-forge-blue transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-forge-secondary line-clamp-3 leading-relaxed mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-forge-border">
                    <span className="text-xs font-semibold text-forge-muted">{article.author.name}</span>
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
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. EXPLORE TOPICS — 5 Topic Cards (insight 03.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="topics"
        className="py-24 bg-white border-b border-forge-border"
        aria-labelledby="topics-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <Eyebrow>EXPLORE TOPICS</Eyebrow>
              <h2
                id="topics-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em]"
              >
                Topics for every<br />
                stage of your <span className="text-forge-blue">journey.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <p className="text-forge-secondary text-sm sm:text-base max-w-md leading-relaxed">
                From early ideas to real execution. Browse insights by topic and find exactly what you need.
              </p>
              <a
                href="#latest-perspectives"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-forge-ink/30 text-forge-ink font-medium text-xs sm:text-sm hover:border-forge-ink transition-all hover:bg-forge-surface shrink-0 shadow-sm"
              >
                <span>View All Articles</span>
                <span className="text-xs" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* 5 Topic Cards matching insight 03.png */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {TOPICS.map((topic) => (
              <div
                key={topic.title}
                className="group bg-forge-surface rounded-2xl overflow-hidden border border-forge-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <img
                    src={topic.img}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-forge-blue/10 text-forge-blue flex items-center justify-center text-sm font-bold mb-3">
                      {topic.icon}
                    </div>
                    <h3 className="font-display text-base font-bold text-forge-ink">{topic.title}</h3>
                    <p className="text-xs text-forge-secondary mt-1 leading-normal">{topic.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-forge-border/60 text-xs font-semibold text-forge-muted">
                    <span>{topic.count}</span>
                    <span className="group-hover:text-forge-blue transition-colors">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Banner with Basalt Block background (05-newsletter-banner.webp) */}
          <div className="relative rounded-2xl overflow-hidden border border-forge-border shadow-lg min-h-[180px] p-8 sm:p-10 bg-white flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
              <ResponsiveImage
                desktopSrc="/assets/insights/05-newsletter-banner.webp"
                mobileSrc="/assets/insights/05-newsletter-banner-mobile.webp"
                alt=""
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-transparent sm:w-2/3" />
            </div>

            <div className="relative z-10 max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-forge-blue block mb-1">
                NEVER MISS A THING
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-forge-ink mb-2">
                Get new insights straight to your inbox.
              </h3>
              <p className="text-xs sm:text-sm text-forge-secondary">
                Practical ideas, frameworks and perspectives for founders who want to build brands that last.
              </p>
            </div>

            <div className="relative z-10 w-full lg:w-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={subscribedEmail}
                  onChange={(e) => setSubscribedEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="px-5 py-3 rounded-full bg-white text-forge-ink placeholder:text-forge-muted border border-forge-border text-xs sm:text-sm focus:outline-none focus:border-forge-blue w-full sm:w-72 shadow-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-7 py-3 rounded-full bg-forge-blue text-white text-xs sm:text-sm font-semibold hover:bg-forge-blue-hover transition-colors shadow-sm shrink-0"
                >
                  {isSubscribed ? 'Subscribed ✓' : 'Subscribe ↗'}
                </button>
              </form>
              <p className="text-[11px] text-forge-muted mt-2">No spam. Just valuable insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. FROM THE FOUNDER — Full-Bleed Desk Room with Melo Kaji (insight.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[920px] lg:min-h-[1020px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="founder-perspective-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/insights/06-founder-background.webp"
            mobileSrc="/assets/insights/06-founder-background-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
            <Eyebrow>FROM THE FOUNDER</Eyebrow>
            <h2
              id="founder-perspective-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-forge-ink tracking-[-0.03em] leading-tight"
            >
              A more thoughtful<br />
              internet for<br />
              <span className="text-forge-blue">serious founders.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary mb-8 leading-relaxed font-normal">
              Fortex Forge Insights is where I share what I'm learning building, designing and helping founders build brands that actually create opportunities.
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-forge-border/80">
              <div className="w-12 h-12 rounded-full bg-forge-ink text-white font-bold flex items-center justify-center font-display text-sm">
                MK
              </div>
              <div>
                <p className="font-display font-bold text-base text-forge-ink">Melo Kaji</p>
                <p className="text-xs text-forge-muted font-medium">Founder, Fortex Forge</p>
              </div>
              <div className="italic font-display text-2xl text-forge-secondary border-l border-forge-border pl-6 font-semibold select-none">
                Melo Kaji
              </div>
            </div>
          </div>
        </div>

        {/* Floating bottom pullquote container matching insight.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-3xl text-forge-blue block font-bold leading-none mb-2">“</span>
              <p className="font-display text-xl sm:text-2xl font-bold text-forge-ink leading-snug">
                Insights turn experience into leverage. That's the goal here.
              </p>
              <p className="text-xs text-forge-muted font-semibold mt-2 uppercase tracking-wider">
                — MELO KAJI
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t lg:border-t-0 lg:border-l border-forge-border pt-6 lg:pt-0 lg:pl-8">
              <p className="text-xs sm:text-sm text-forge-secondary max-w-sm">
                Whether you're just starting out or already building, you'll find practical ideas, honest perspectives and helpful frameworks to make clearer decisions.
              </p>
              <a
                href="#latest-perspectives"
                className="inline-flex items-center gap-2 bg-forge-ink text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors shadow-sm shrink-0"
              >
                Explore All Insights <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          6. FINAL STAY SHARP NEWSLETTER — Full-Bleed Desk & Tools (insight 06.png)
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[850px] lg:min-h-[920px] py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden flex flex-col justify-between"
        aria-labelledby="stay-sharp-heading"
      >
        {/* Full-bleed background */}
        <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
          <ResponsiveImage
            desktopSrc="/assets/insights/07-newsletter.webp"
            mobileSrc="/assets/insights/07-newsletter-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center lg:object-right-center"
          />
          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent sm:via-white/70 lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 mb-auto">
          <div className="max-w-xl space-y-6">
            <Eyebrow>STAY SHARP</Eyebrow>
            <h2
              id="stay-sharp-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-forge-ink tracking-[-0.03em] leading-tight"
            >
              Practical insights.<br />
              Real-world value.<br />
              <span className="text-forge-blue">Straight to your inbox.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary mb-8 leading-relaxed font-normal">
              Get the latest articles, frameworks and perspectives on branding, business and digital growth — no fluff, just useful ideas.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md pt-2">
              <input
                type="email"
                required
                value={subscribedEmail}
                onChange={(e) => setSubscribedEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white text-forge-ink placeholder:text-forge-muted border border-forge-border focus:outline-none focus:border-forge-blue focus:ring-2 focus:ring-forge-blue/20 text-sm shadow-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-forge-blue text-white text-sm font-semibold px-7 py-3.5 rounded-full shadow-[0_8px_24px_rgba(21,87,255,0.25)] hover:bg-forge-blue-hover transition-all shrink-0"
              >
                {isSubscribed ? 'Subscribed ✓' : 'Subscribe ↗'}
              </button>
            </form>
            <p className="text-xs text-forge-muted">No spam. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Bottom 4 pillars matching insight 06.png */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-forge-border shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-forge-border/40">
              {[
                { icon: '📄', title: 'Actionable Ideas', desc: 'Practical insights you can apply to your business.' },
                { icon: '📚', title: 'Wide Topics',      desc: 'Brand strategy, positioning, identity, digital and more.' },
                { icon: '👥', title: 'Built for Founders', desc: 'Written with ambitious founders in mind.' },
                { icon: '📊', title: 'Consistent Value',  desc: 'New insights, straight to your inbox.' },
              ].map((badge, idx) => (
                <div key={badge.title} className={`flex items-start gap-3.5 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
                  <span className="text-xl" aria-hidden="true">{badge.icon}</span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-forge-ink">{badge.title}</h4>
                    <p className="text-xs text-forge-secondary mt-0.5 leading-snug">{badge.desc}</p>
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
