import { Link, useParams } from 'react-router-dom'
import { insights } from '@/data/insights'

// ─── InsightDetailPage — Article Template ────────────────────────────────────
// Route: /insights/:slug
// Data source: src/data/insights.ts
//
// CONTENT AUTHENTICITY RULE (A07 directive):
//   Every section renders ONLY when the corresponding data field is populated.
//   Do not fabricate content, related articles, reading progress, or engagement.
//
// Section rendering:
//   Article Hero     → always rendered (category, title, excerpt, meta, coverImage)
//   Article Body     → renders if article.body is present
//   Related Insights → renders if article.relatedSlugs has ≥1 valid resolution
//   Closing CTA      → always rendered
//
// Long-form body: stored as HTML string in article data.
//   Max reading width: max-w-[680px] — comfortable ~70ch line length.
//   Prose classes applied via `prose` utility (see index.css).
//
// 404: unknown slugs render a built-in not-found state with Back to Insights link.
// ──────────────────────────────────────────────────────────────────────────────

/** Format ISO date string as "14 March 2025" */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const article = insights.find((i) => i.id === slug)

  // ── Not found ────────────────────────────────────────────────────────────
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forge-surface px-6 text-center">
        <span className="font-mono text-4xl font-bold text-forge-blue mb-4">404</span>
        <h1 className="font-display text-3xl font-bold text-forge-ink mb-3 tracking-[-0.025em]">
          Article not found.
        </h1>
        <p className="text-forge-muted max-w-xs mb-8 text-sm leading-relaxed">
          This article hasn't been published yet, or the URL may be incorrect.
        </p>
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forge-ink text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          ← Back to Insights
        </Link>
      </div>
    )
  }

  // Resolve related articles (only render with real data)
  const relatedArticles =
    article.relatedArticles
      ? insights.filter(
          (i) => article.relatedArticles!.includes(i.id) && i.id !== article.id
        )
      : insights
          .filter((i) => i.id !== article.id && i.category === article.category)
          .slice(0, 2)

  const hasBody    = Boolean(article.content)
  const hasRelated = relatedArticles.length > 0

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          ARTICLE HERO — breadcrumb, category, title, meta, cover image
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-forge-surface border-b border-forge-border"
        aria-labelledby="article-title"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-forge-muted mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-forge-ink transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/insights" className="hover:text-forge-ink transition-colors">Insights</Link>
            <span aria-hidden="true">/</span>
            <span className="text-forge-ink font-medium truncate max-w-[200px]">{article.title}</span>
          </nav>

          {/* Category */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-3.5 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold tracking-widest uppercase text-forge-blue">
              {article.categoryLabel}
            </span>
          </div>

          {/* Title */}
          <h1
            id="article-title"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forge-ink tracking-[-0.025em] leading-[1.1] max-w-4xl mb-6"
          >
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-2xl mb-8">
            {article.excerpt}
          </p>

          {/* Article meta strip */}
          <div className="flex flex-wrap items-center gap-4 pb-10">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-forge-border flex items-center justify-center font-display text-xs font-bold text-forge-ink shrink-0">
                AE
              </div>
              <div>
                <div className="text-sm font-semibold text-forge-ink">{article.author.name}</div>
                <div className="text-xs text-forge-muted">{article.author.role}</div>
              </div>
            </div>

            <span className="w-px h-8 bg-forge-border hidden sm:block" aria-hidden="true" />

            {/* Date */}
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-forge-muted">Published</span>
              <time
                dateTime={article.publishedAt}
                className="text-sm font-medium text-forge-ink"
              >
                {formatDate(article.publishedAt)}
              </time>
            </div>

            {/* Reading time */}
            {article.readTime && (
              <>
                <span className="w-px h-8 bg-forge-border hidden sm:block" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-forge-muted">Reading Time</span>
                  <span className="text-sm font-medium text-forge-ink">{article.readTime}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hero cover image — full width constrained */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="rounded-2xl overflow-hidden border border-forge-border shadow-lg aspect-[21/9] bg-slate-900">
            <img
              src={article.coverImage}
              alt={`Cover image for "${article.title}"`}
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ARTICLE BODY — conditional on article.content
          Uses a controlled reading-width container: max-w-[680px].
          Prose utility classes applied for long-form typography.
          Body stored as HTML in data — rendered via dangerouslySetInnerHTML
          when trusted approved content is available.
      ════════════════════════════════════════════════════════════════════ */}
      {hasBody ? (
        <section
          className="py-16 lg:py-20 bg-white"
          aria-label="Article body"
        >
          <div className="max-w-[680px] mx-auto px-6 sm:px-8">
            <div
              className="prose-forge"
              dangerouslySetInnerHTML={{ __html: article.content! }}
            />
          </div>
        </section>
      ) : (
        /* Placeholder state — article exists in data but body not yet published */
        <section
          className="py-20 bg-white border-b border-forge-border"
          aria-label="Article coming soon"
        >
          <div className="max-w-[680px] mx-auto px-6 sm:px-8 text-center">
            <div className="w-12 h-12 rounded-full bg-forge-surface border border-forge-border flex items-center justify-center mx-auto mb-6 text-forge-blue text-xl font-bold">
              ✍
            </div>
            <h2 className="font-display text-xl font-bold text-forge-ink mb-3">Full article coming soon.</h2>
            <p className="text-forge-muted text-sm leading-relaxed max-w-sm mx-auto">
              This essay is being prepared for publication. Subscribe to The Forge Dispatch to be notified when it's ready.
            </p>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          RELATED INSIGHTS — conditional on related articles resolving
          Shows up to 2 articles from same category (or data.relatedArticles)
      ════════════════════════════════════════════════════════════════════ */}
      {hasRelated && (
        <section
          className="py-16 lg:py-20 bg-forge-surface border-t border-forge-border"
          aria-labelledby="related-heading"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-1.5 h-3.5 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
              <h2
                id="related-heading"
                className="text-xs font-bold tracking-widest uppercase text-forge-blue"
              >
                Related Insights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((related) => (
                <article
                  key={related.id}
                  className="group flex flex-col bg-white rounded-xl overflow-hidden border border-forge-border shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={related.coverImage}
                      alt={`Cover for "${related.title}"`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 rounded-full text-xs font-semibold text-forge-ink shadow-sm backdrop-blur-sm">
                      {related.categoryLabel}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-forge-muted mb-2">
                        <span>{related.readTime}</span>
                        <span aria-hidden="true">·</span>
                        <time dateTime={related.publishedAt}>
                          {new Date(related.publishedAt).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <h3 className="font-display text-lg font-bold text-forge-ink tracking-[-0.02em] leading-snug mb-3 group-hover:text-forge-blue transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-forge-secondary line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-forge-border mt-4">
                      <Link
                        to={related.href}
                        className="text-xs font-semibold text-forge-blue hover:underline"
                        aria-label={`Read "${related.title}"`}
                      >
                        Read Article ↗
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          CLOSING CTA — always rendered
          Transitions the reader from editorial to commercial conversation.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-24 bg-white border-t border-forge-border"
        aria-labelledby="article-cta-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-1.5 h-3.5 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold tracking-widest uppercase text-forge-blue">
                  Ready to go further?
                </span>
              </div>
              <h2
                id="article-cta-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-forge-ink tracking-[-0.025em] mb-4"
              >
                Good ideas deserve a{' '}
                <span className="text-forge-blue">conversation.</span>
              </h2>
              <p className="text-forge-muted text-base leading-relaxed">
                Whether you're ready to start, have a question, or want to explore how this thinking applies to your business — we're here.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-blue text-white font-medium text-sm hover:bg-forge-blue-hover transition-all shadow-[0_4px_14px_rgba(21,87,255,0.28)]"
              >
                Start a Project <span aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-forge-border text-forge-ink font-medium text-sm hover:border-forge-ink hover:bg-forge-surface transition-all"
              >
                ← More Insights
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
