import { Link, useParams } from 'react-router-dom'
import { projects } from '@/data/projects'

// ─── WorkDetailPage — Case Study Template ─────────────────────────────────────
// Route: /work/:slug
// Data source: src/data/projects.ts
//
// CONTENT AUTHENTICITY RULE (A06 directive):
// Every section renders ONLY when the corresponding data field is populated.
// Missing fields → section omitted entirely.
// Do not fabricate copy, metrics, testimonials, or outcomes.
// A project with limited context remains honestly limited.
//
// Section rendering logic:
//   Hero               → always rendered (id, client, title, tagline, coverImage)
//   Overview/Context   → renders if summary is present
//   Industry/Services  → renders if industry or servicesLabel are present
//   Problem            → renders if problem is present
//   Approach           → renders if approach is present
//   Metrics            → renders if metrics array has ≥1 entry
//   Outcome/Result     → renders if outcome is present
//   Testimonial        → renders if testimonial is present
//   Gallery            → renders if gallery array has ≥1 entry
//   Closing CTA        → always rendered
// ──────────────────────────────────────────────────────────────────────────────

export default function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.id === slug)

  // ── Not found ────────────────────────────────────────────────────────────
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-forge-surface px-6 text-center">
        <span className="font-mono text-4xl font-bold text-forge-blue mb-4">404</span>
        <h1 className="font-display text-3xl font-bold text-forge-ink mb-3">Project not found.</h1>
        <p className="text-forge-muted max-w-xs mb-8">
          This case study hasn't been published yet, or the URL may be incorrect.
        </p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forge-ink text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          ← Back to Work
        </Link>
      </div>
    )
  }

  const hasMeta      = Boolean(project.industry || project.servicesLabel || project.timeline)
  const hasSummary   = Boolean(project.summary)
  const hasProblem   = Boolean(project.problem)
  const hasApproach  = Boolean(project.approach)
  const hasMetrics   = Array.isArray(project.metrics) && project.metrics.length > 0
  const hasOutcome   = Boolean(project.outcome)
  const hasTestimonial = Boolean(project.testimonial)
  const hasGallery   = Array.isArray(project.gallery) && project.gallery.length > 0

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO — project identity and context
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative pt-12 pb-0 overflow-hidden bg-forge-surface"
        aria-labelledby="case-study-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-forge-muted mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-forge-ink transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/work" className="hover:text-forge-ink transition-colors">Work</Link>
            <span aria-hidden="true">/</span>
            <span className="text-forge-ink font-medium">{project.client}</span>
          </nav>

          {/* Client + category eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-[3px] h-4 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-forge-ink/80">
              {project.client} · {project.tags.join(' · ')}
            </span>
          </div>

          <h1
            id="case-study-hero-heading"
            className="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] font-bold text-forge-ink mb-6 tracking-[-0.025em] max-w-4xl"
          >
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-forge-muted max-w-2xl leading-relaxed mb-12">
            {project.tagline}
          </p>

          {/* Project metadata strip */}
          {hasMeta && (
            <div className="flex flex-wrap gap-8 pt-8 border-t border-forge-border">
              {project.industry && (
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">Industry</span>
                  <span className="font-semibold text-forge-ink text-sm">{project.industry}</span>
                </div>
              )}
              {project.servicesLabel && (
                <div className="border-l border-forge-border pl-8">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">Services</span>
                  <span className="font-semibold text-forge-ink text-sm">{project.servicesLabel}</span>
                </div>
              )}
              {project.timeline && (
                <div className="border-l border-forge-border pl-8">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">Timeline</span>
                  <span className="font-semibold text-forge-ink text-sm">{project.timeline}</span>
                </div>
              )}
              {project.year && (
                <div className="border-l border-forge-border pl-8">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-forge-muted block mb-1">Year</span>
                  <span className="font-semibold text-forge-ink text-sm">{project.year}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hero image — full width, constrained max */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-0">
          <div className={`rounded-2xl overflow-hidden border border-forge-border shadow-xl aspect-[16/9] ${project.coverBg ?? 'bg-slate-900'}`}>
            <img
              src={project.coverImage}
              alt={`${project.client} — ${project.tagline}`}
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          OVERVIEW / CONTEXT — conditional on summary
      ════════════════════════════════════════════════════════════════════ */}
      {hasSummary && (
        <section className="py-20 bg-white border-b border-forge-border" aria-labelledby="cs-overview-heading">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 id="cs-overview-heading" className="font-display text-2xl font-bold text-forge-ink mb-2">Overview</h2>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">What the project was</span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">{project.summary}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          PROBLEM / CHALLENGE — conditional on problem
      ════════════════════════════════════════════════════════════════════ */}
      {hasProblem && (
        <section className="py-20 bg-forge-surface border-b border-forge-border" aria-labelledby="cs-problem-heading">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 id="cs-problem-heading" className="font-display text-2xl font-bold text-forge-ink mb-2">The Challenge</h2>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">Problem we needed to solve</span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">{project.problem}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          APPROACH / STRATEGY — conditional on approach
      ════════════════════════════════════════════════════════════════════ */}
      {hasApproach && (
        <section className="py-20 bg-white border-b border-forge-border" aria-labelledby="cs-approach-heading">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 id="cs-approach-heading" className="font-display text-2xl font-bold text-forge-ink mb-2">Our Approach</h2>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">Strategic thinking applied</span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">{project.approach}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          GALLERY — conditional on gallery array
      ════════════════════════════════════════════════════════════════════ */}
      {hasGallery && (
        <section className="py-20 bg-forge-surface border-b border-forge-border" aria-labelledby="cs-gallery-heading">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 id="cs-gallery-heading" className="font-display text-2xl font-bold text-forge-ink mb-10">The Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery!.map((item, i) => (
                <figure key={i} className="rounded-xl overflow-hidden border border-forge-border shadow-sm">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {item.caption && (
                    <figcaption className="px-4 py-3 text-xs text-forge-muted bg-white border-t border-forge-border">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          METRICS — conditional on metrics array (verified only)
      ════════════════════════════════════════════════════════════════════ */}
      {hasMetrics && (
        <section className="py-20 bg-white border-b border-forge-border" aria-labelledby="cs-metrics-heading">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-10">
              <h2 id="cs-metrics-heading" className="font-display text-3xl sm:text-4xl font-bold text-forge-ink tracking-[-0.025em] mb-2">The Results</h2>
              <p className="text-forge-muted text-sm">Verified outcomes from this engagement.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-forge-border">
              {project.metrics!.map((m, i) => (
                <div key={i} className={i > 0 ? 'sm:border-l sm:border-forge-border sm:pl-8' : ''}>
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-forge-ink tracking-[-0.025em]">{m.value}</div>
                  <div className="text-sm text-forge-muted mt-2 leading-tight">{m.label}</div>
                  {m.qualifier && (
                    <div className="text-xs text-forge-muted/70 mt-1 italic">{m.qualifier}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          OUTCOME — conditional on outcome
      ════════════════════════════════════════════════════════════════════ */}
      {hasOutcome && (
        <section className="py-20 bg-forge-surface border-b border-forge-border" aria-labelledby="cs-outcome-heading">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h2 id="cs-outcome-heading" className="font-display text-2xl font-bold text-forge-ink mb-2">The Outcome</h2>
                <span className="text-xs font-bold uppercase tracking-wider text-forge-muted">What changed</span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">{project.outcome}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TESTIMONIAL — conditional (approved client quote only)
      ════════════════════════════════════════════════════════════════════ */}
      {hasTestimonial && (
        <section className="py-20 bg-white border-b border-forge-border" aria-labelledby="cs-testimonial-heading">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 id="cs-testimonial-heading" className="sr-only">Client testimonial</h2>
            <blockquote>
              <p className="font-display text-2xl sm:text-3xl font-bold text-forge-ink leading-snug mb-8 tracking-[-0.015em]">
                "{project.testimonial!.quote}"
              </p>
              <footer>
                <div className="font-semibold text-forge-ink text-sm">{project.testimonial!.author}</div>
                <div className="text-xs text-forge-muted mt-0.5">
                  {project.testimonial!.title} · {project.testimonial!.company}
                </div>
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          CLOSING CTA — always rendered
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-forge-surface" aria-labelledby="cs-cta-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-[3px] h-4 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest text-forge-ink/80">Ready to go next?</span>
              </div>
              <h2
                id="cs-cta-heading"
                className="font-display text-3xl sm:text-4xl font-bold text-forge-ink tracking-[-0.025em] mb-4"
              >
                Your brand could{' '}
                <span className="text-forge-blue">do this too.</span>
              </h2>
              <p className="text-forge-muted text-base leading-relaxed">
                Strategy. Design. Technology. Let's build something that lasts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-forge-ink text-white font-medium text-sm hover:bg-neutral-800 transition-all shadow-md"
              >
                Start a Project <span aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-forge-ink/30 text-forge-ink font-medium text-sm hover:border-forge-ink transition-all hover:bg-white"
              >
                ← Back to Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
