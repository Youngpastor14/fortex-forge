// ─── Content Type Definitions ─────────────────────────────────────────────
// All shared data interfaces for the Fortex Forge site.
// Pages import these interfaces; data files implement them.

// ── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  /** Optionally highlight as "active" via the current route */
  exact?: boolean
}

// ── Services ────────────────────────────────────────────────────────────────

export type ServiceTier = 'foundation' | 'growth' | 'complete'

export interface ServiceFeature {
  label: string
  included: boolean
}

export interface Service {
  id: string
  name: string
  tagline: string
  description: string
  deliverables: string[]
  /** Optional pricing tier this service maps to */
  tier?: ServiceTier
}

// ── Pricing ─────────────────────────────────────────────────────────────────

export interface PricingPlan {
  id: ServiceTier
  name: string
  label: string         // Short display label, e.g. "The Foundation"
  price: string         // e.g. "£4,800"
  priceNote?: string    // e.g. "one-time project fee"
  description: string
  highlight: boolean    // Show as the recommended / featured plan
  features: ServiceFeature[]
  cta: string
}

// ── Projects / Work ──────────────────────────────────────────────────────────

export type ProjectType =
  | 'brand-strategy'
  | 'visual-identity'
  | 'web-design'
  | 'full-engagement'

/** Category label used in the filter UI strip */
export type ProjectCategory = 'Brand Strategy' | 'Identity' | 'Website' | 'Product'

/** A single verified result metric — only use with real, approved values */
export interface ProjectMetric {
  value: string
  label: string
  /** Optional clarifying context, e.g. "post-launch, 90 days" */
  qualifier?: string
}

/** A gallery image entry for case-study detail pages */
export interface ProjectGalleryItem {
  src: string
  alt: string
  caption?: string
}

export interface Project {
  id: string
  client: string
  /** Hero display title / headline */
  title: string
  /** One-line outcome summary shown on cards */
  tagline: string
  type: ProjectType[]
  /** UI filter categories */
  categories: ProjectCategory[]
  coverImage: string      // /assets/work/{id}/cover.webp
  /** Tailwind bg class for placeholder when image is loading */
  coverBg?: string
  tags: string[]
  isFeatured: boolean
  /** Optional: path to case-study route, e.g. /work/haven */
  caseStudyHref?: string
  year: number
  // ── Case-study fields (all optional — only populate with approved info) ──
  industry?: string
  servicesLabel?: string
  timeline?: string
  summary?: string
  problem?: string
  approach?: string
  outcome?: string
  /** Verified result metrics only */
  metrics?: ProjectMetric[]
  /** Approved client testimonial — omit if none exists */
  testimonial?: {
    quote: string
    author: string
    title: string
    company: string
  }
  gallery?: ProjectGalleryItem[]
  seo?: {
    title?: string
    description?: string
  }
}

// ── Insights / Articles ──────────────────────────────────────────────────────

export type InsightCategory =
  | 'brand-strategy'
  | 'visual-identity'
  | 'growth'
  | 'perspective'
  | 'process'

export interface InsightAuthor {
  name: string
  role: string
  avatarSrc?: string
}

export interface Insight {
  id: string
  title: string
  excerpt: string
  category: InsightCategory
  categoryLabel: string
  author: InsightAuthor
  publishedAt: string         // ISO 8601 date string
  readTime: string            // e.g. "8 min read"
  coverImage: string          // /assets/insights/{id}/cover.webp
  href: string                // Route: /insights/{id}
  isFeatured: boolean
  // ── Article detail fields (all optional — only populate with approved content) ──
  /** Long-form article body as trusted HTML string. Only set for published articles. */
  content?: string
  /** Explicit related article slugs. Falls back to same-category articles if omitted. */
  relatedArticles?: string[]
  /** Draft articles are included in data but hidden if status='draft' */
  status?: 'published' | 'draft'
  seo?: {
    title?: string
    description?: string
    /** Social share image — defaults to coverImage if absent */
    ogImage?: string
  }
}

// ── FAQs ──────────────────────────────────────────────────────────────────────

export interface FAQ {
  id: string
  question: string
  answer: string              // Supports plain text; render with whitespace-pre-line
  /** Optional: which page context this FAQ belongs to */
  context?: 'home' | 'services' | 'contact' | 'global'
}

// ── Team / People ────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarSrc?: string          // /assets/about/team/{id}.webp
  linkedinHref?: string
}

// ── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  quote: string
  author: string
  title: string
  company: string
  avatarSrc?: string
}

// ── Contact Form ─────────────────────────────────────────────────────────────

export type ServiceScope =
  | 'brand-strategy'
  | 'brand-identity'
  | 'web-design'
  | 'complete-engagement'
  | 'advisory'
  | 'other'

export type BudgetRange =
  | '2k-5k'
  | '5k-10k'
  | '10k-20k'
  | '20k-plus'
  | 'not-sure'

export type LaunchWindow =
  | 'asap'
  | '1-3-months'
  | '3-6-months'
  | '6-plus-months'

export interface ContactFormData {
  fullName: string
  workEmail: string
  phone?: string
  company?: string
  scopes: ServiceScope[]
  challenge: string
  challengeType: string
  budgetRange: BudgetRange | ''
  launchWindow: LaunchWindow | ''
  additionalContext?: string
}
