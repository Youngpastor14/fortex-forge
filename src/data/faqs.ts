import type { FAQ } from '@/types/content'

// ─── FAQ Data ────────────────────────────────────────────────────────────────
// Sourced from the Home page FAQ section in the approved HTML export.
// Used on Home page; a subset tagged 'services' is used on Services page.

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    context: 'home',
    question: "Why would I hire a consultancy instead of building an in-house design team?",
    answer: `An in-house team makes sense when you have consistent, high-volume design needs across many functions. For most growing companies, especially those in a critical phase of brand-building or relaunch, a specialist consultancy delivers a higher quality of strategic thinking and visual output, faster, without the overhead of recruitment, onboarding, management, and the inevitable misalignment that comes with generalist teams.

We work with founders who need to do it right, not just do it. That's a different brief.`,
  },
  {
    id: 'faq-2',
    context: 'home',
    question: "How do you ensure the brand stays relevant as our company evolves?",
    answer: `We build brand systems, not brand moments. Every engagement produces a structured identity with documented principles, token libraries, component guides, and clear usage rules — designed to flex with your business. When you evolve, you update the system rather than rebuild from scratch.

We also offer retained advisory relationships for clients who want ongoing strategic guidance as they scale.`,
  },
  {
    id: 'faq-3',
    context: 'home',
    question: "What types of businesses do you typically work with?",
    answer: `We work best with ambitious founders and leadership teams in professional services, B2B technology, finance, and high-consideration consumer categories. These are typically businesses where brand credibility directly affects commercial outcomes — clients who understand that positioning and visual authority are not decorative, but functional.

We don't work well with commodity product businesses, companies optimising purely for low cost, or those who want a logo rather than a brand.`,
  },
  {
    id: 'faq-4',
    context: 'home',
    question: "What does your process look like from start to finish?",
    answer: `Every engagement begins with Discovery — a deep diagnostic phase where we interrogate your market, competitors, audience, and business model. Strategy follows: we define your positioning, narrative architecture, and differentiation logic.

Execution is where the strategy becomes visible: identity, messaging, and web. Every decision traces back to a documented strategic rationale. Delivery includes a structured handoff with complete asset libraries and implementation guidelines.

Timeline varies by scope: a Foundation engagement (brand + identity) typically takes 6–8 weeks. A Complete engagement runs 12–16 weeks.`,
  },
  {
    id: 'faq-5',
    context: 'home',
    question: "Can you work with our existing marketing team?",
    answer: `Yes. We often work alongside in-house marketing, content, and development teams. In these cases we act as the strategic and creative lead — setting direction, producing core assets, and establishing the system — while your team handles execution and channel operations.

We've found this model works best when there's a clear brief and a single senior point of contact on your side.`,
  },
  {
    id: 'faq-6',
    context: 'services',
    question: "How long does a typical engagement take?",
    answer: `Foundation engagements (brand strategy + visual identity) run 6–8 weeks. Growth engagements (brand + identity + web) run 8–12 weeks. Complete engagements run 12–16 weeks, depending on scope complexity and client responsiveness.

We run a structured schedule with clear milestones and decision gates — no ambiguous "we're still working on it" phases.`,
  },
  {
    id: 'faq-7',
    context: 'services',
    question: "Do you offer payment plans?",
    answer: `All engagements are structured with a phased payment schedule aligned to delivery milestones — typically 50% to commence, 25% at mid-point, and 25% at final delivery. We don't offer speculative or contingent arrangements.`,
  },
  {
    id: 'faq-8',
    context: 'contact',
    question: "What happens after I submit the intake form?",
    answer: `We review your intake within 48 business hours. If your project is a good fit, we'll schedule a 30-minute diagnostic call to understand your context in more depth. There's no pitch or pressure — it's a structured conversation to confirm mutual fit before we invest time in a formal proposal.`,
  },
]
