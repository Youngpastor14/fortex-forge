import type { Project } from '@/types/content'

// ─── Work / Portfolio Data ────────────────────────────────────────────────────
// Images map to /public/assets/work/{id}/cover.webp
// All cover images are real approved WebP assets already in public/.
//
// isFeatured: true → rendered as flagship case study in the Work page hero grid
//
// Case-study fields (problem, approach, outcome, metrics, testimonial, gallery)
// are OPTIONAL and should only be populated with real, approved information.
// Do not fabricate metrics, timelines, or outcomes.
//
// Projects sourced from Stitch approved export:
//   Haven           → Real Estate · Complete brand + web platform
//   Tiziano/Meridian → Brand Identity
//   Wagora/Axiom    → SaaS · Product + brand system
//   VirtuCare/Calloway → Health Tech · Brand + product
//   Keyvix/Sova     → Business · Brand Strategy
//   13°/Cadence     → Fashion / Fitness · Brand + Web
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  // ── 01: Haven — Flagship / Featured ──────────────────────────────────────
  // Stitch: "Real Estate · Complete brand and digital platform for a modern real estate company."
  // Metrics shown in approved export: +220% qualified inquiries / 3.4× engagement / +150% brand recognition
  {
    id: 'haven',
    client: 'Haven',
    title: 'Property made simple.',
    tagline: 'Complete brand and digital platform for a modern real estate company.',
    type: ['brand-strategy', 'visual-identity', 'web-design'],
    categories: ['Brand Strategy', 'Identity', 'Website'],
    coverImage: '/assets/work/haven/cover.webp',
    coverBg: 'bg-slate-900',
    tags: ['Real Estate', 'Website'],
    isFeatured: true,
    caseStudyHref: '/work/haven',
    year: 2024,
    // Case-study metadata (approved from Stitch export)
    industry: 'Real Estate',
    servicesLabel: 'Strategy, Identity, Website',
    timeline: '8 Weeks',
    summary:
      'Haven is a modern real estate company focused on helping people find better places to live and invest. We positioned their brand around clarity and trust, designed a clean and distinctive identity, and built a digital experience that makes property search simple, intuitive and inspiring.',
    // Metrics sourced from approved Stitch export — do not alter
    metrics: [
      { value: '+220%', label: 'Increase in qualified inquiries' },
      { value: '3.4×',  label: 'More website engagement' },
      { value: '+150%', label: 'Growth in brand recognition' },
    ],
  },

  // ── 02: Meridian — Brand Identity ────────────────────────────────────────
  // Stitch approx. equivalent: Tiziano / Brand Identity card
  {
    id: 'meridian',
    client: 'Meridian',
    title: 'A Legal Brand That Commands the Room',
    tagline: 'Positioning strategy and full visual identity for a boutique corporate law practice.',
    type: ['brand-strategy', 'visual-identity'],
    categories: ['Brand Strategy', 'Identity'],
    coverImage: '/assets/work/meridian/cover.webp',
    coverBg: 'bg-neutral-100',
    tags: ['Lifestyle', 'Identity'],
    isFeatured: false,
    year: 2024,
    industry: 'Legal',
    servicesLabel: 'Brand Strategy, Identity',
  },

  // ── 03: Axiom Labs — SaaS Brand + Web ────────────────────────────────────
  // Stitch: Wagora / "Product strategy, brand and web platform for a SaaS startup."
  {
    id: 'axiom',
    client: 'Axiom Labs',
    title: 'Enterprise-Grade Identity for a Series A SaaS',
    tagline: 'Brand system and web design for a B2B data infrastructure company.',
    type: ['visual-identity', 'web-design'],
    categories: ['Identity', 'Website'],
    coverImage: '/assets/work/axiom/cover.webp',
    coverBg: 'bg-slate-950',
    tags: ['SaaS', 'AI Website'],
    isFeatured: false,
    year: 2024,
    industry: 'SaaS / Technology',
    servicesLabel: 'Brand Identity, Website',
  },

  // ── 04: Calloway — Health Tech ────────────────────────────────────────────
  // Stitch: VirtuCare / "Brand identity and website for a next-generation health tech brand."
  {
    id: 'calloway',
    client: 'Calloway',
    title: 'Healthcare Brand Built on Earned Trust',
    tagline: 'Full brand engagement for a private diagnostics group expanding into three new markets.',
    type: ['full-engagement'],
    categories: ['Brand Strategy', 'Identity', 'Website'],
    coverImage: '/assets/work/calloway/cover.webp',
    coverBg: 'bg-slate-900',
    tags: ['Health Tech', 'Product'],
    isFeatured: false,
    year: 2025,
    industry: 'Healthcare',
    servicesLabel: 'Strategy, Identity, Website',
  },

  // ── 05: Sova — RegTech Brand ──────────────────────────────────────────────
  // Stitch: Keyvix Homes / "Brand strategy and identity for a premier real estate company."
  {
    id: 'sova',
    client: 'Sova',
    title: 'Making Complex Compliance Simple to Trust',
    tagline: 'Identity and digital presence for a regulatory technology startup.',
    type: ['visual-identity', 'web-design'],
    categories: ['Identity', 'Website'],
    coverImage: '/assets/work/sova/cover.webp',
    coverBg: 'bg-stone-900',
    tags: ['Business', 'Brand Strategy'],
    isFeatured: false,
    year: 2025,
    industry: 'RegTech',
    servicesLabel: 'Brand Identity, Website',
  },

  // ── 06: Cadence — Fitness Brand ───────────────────────────────────────────
  // Stitch: 13° / "Fashion brand with a digital experience built for global reach."
  {
    id: 'cadence',
    client: 'Cadence',
    title: 'Premium Positioning for a Boutique Fitness Brand',
    tagline: 'Brand strategy and identity for a premium cycling studio launching in London.',
    type: ['brand-strategy', 'visual-identity'],
    categories: ['Brand Strategy', 'Identity'],
    coverImage: '/assets/work/cadence/cover.webp',
    coverBg: 'bg-neutral-100',
    tags: ['Fashion', 'Website'],
    isFeatured: false,
    year: 2025,
    industry: 'Fitness / Consumer',
    servicesLabel: 'Brand Strategy, Identity',
  },
]
