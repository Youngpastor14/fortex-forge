import { useState, useRef, type FormEvent } from 'react'

// ─── ContactPage — A08 Production Implementation ──────────────────────────────
// Source: fortex_forge_official_contact_project_intake_page_refined/code.html
//
// SECTIONS (approved order):
//   1. Contact Hero — 7/5 split: headline + quick-contact cards / hero image
//   2. What Happens Next — 4-step process cards
//   3. Project Diagnostic Form — 4 fieldsets + submit
//   4. Direct Routing (Alternative Contact) — 3 channel cards
//   5. Closing Statement — dark full-bleed section
//
// SUBMISSION ARCHITECTURE:
//   Static SPA (no server routes). Submissions POST to Formspree via the
//   VITE_CONTACT_FORM_ENDPOINT environment variable.
//   Formspree is a production form-backend that handles delivery to Fortex Forge's
//   inbox (hello@fortexforge.com) with no server required.
//
//   Setup required before enquiries reach the inbox:
//     1. Create a free account at https://formspree.io
//     2. Create a new form, set the notification email to hello@fortexforge.com
//     3. Copy the endpoint URL (https://formspree.io/f/{form-id})
//     4. Add VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/{your-form-id} to .env
//
//   Without VITE_CONTACT_FORM_ENDPOINT set, the form shows a clear configuration
//   error. NO fake success is shown. (A08 directive §83: No false functionality.)
//
// SPAM PROTECTION:
//   - Honeypot field: _gotcha — Formspree natively rejects non-empty submissions
//   - Client-side: tabIndex={-1}, aria-hidden, position:absolute off-screen
//   - Rate limiting: Formspree enforces per-form submission limits
//   - Server-side payload validation occurs at Formspree's boundary
//
// SECURITY:
//   - VITE_CONTACT_FORM_ENDPOINT is a form-endpoint URL (not an API secret).
//     Formspree's security model allows this to be public-facing — it acts as
//     a form ID, not an API key. Spam is managed by Formspree's own filters.
//   - No credentials are ever exposed in client code.
//   - All raw user input is transmitted as form data (not injected into HTML).
//
// ASSET: /assets/contact/hero.webp — confirmed present.
// ──────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'misconfigured'

interface FormState {
  fullName:       string
  workEmail:      string
  phone:          string
  companyName:    string
  scopes:         string[]
  primaryBarrier: string
  projectNotes:   string
  budgetRange:    string
  launchWindow:   string
}

const INITIAL: FormState = {
  fullName:       '',
  workEmail:      '',
  phone:          '',
  companyName:    '',
  scopes:         [],
  primaryBarrier: '',
  projectNotes:   '',
  budgetRange:    '',
  launchWindow:   '',
}

// ── Approved option sets (from Stitch export, §07 no modification) ────────────

const SCOPE_OPTIONS = [
  { id: 'brand-strategy',        label: 'Brand Strategy & Positioning'  },
  { id: 'visual-identity',       label: 'Visual Identity & System'      },
  { id: 'web-design',            label: 'Website Design & Development'  },
  { id: 'complete-brand-web',    label: 'Complete Brand + Web System'   },
  { id: 'rebranding',            label: 'Rebranding & Evolution'        },
]

const BARRIER_OPTIONS = [
  { value: 'low-conversion',      label: 'Low conversion & trust'                  },
  { value: 'outdated-brand',      label: 'Outdated brand identity'                 },
  { value: 'unclear-positioning', label: 'Unclear market positioning'              },
  { value: 'scaling',             label: 'Scaling into new markets or capital raise' },
  { value: 'other',               label: 'Other complex growth challenge'           },
]

const BUDGET_OPTIONS = [
  { id: '5k-10k',   label: '$5,000 – $10,000',       sub: 'Focused Identity or Web Sprint'      },
  { id: '10k-25k',  label: '$10,000 – $25,000',      sub: 'Complete Brand & Digital Platform'   },
  { id: '25k-plus', label: '$25,000+',                sub: 'Enterprise Strategy & Systems'       },
  { id: 'discuss',  label: "Let's discuss scope first", sub: 'Open advisory consultation'        },
]

const LAUNCH_OPTIONS = [
  { id: '2-4-weeks',  label: '2–4 Weeks'  },
  { id: '1-2-months', label: '1–2 Months' },
  { id: '2-3-months', label: '2–3 Months' },
  { id: 'flexible',   label: 'Flexible'   },
]

// ── What Happens Next — approved steps ────────────────────────────────────────

const PROCESS_STEPS = [
  {
    num: '01',
    phase: 'REVIEW',
    badge: '24h',
    badgeStyle: 'bg-slate-100 text-forge-muted',
    title: 'Initial Review',
    desc: 'We review your inquiry, business model, and immediate growth goals to verify mutual tactical fit.',
    note: 'No boilerplate responses.',
    noteStyle: 'text-forge-muted',
  },
  {
    num: '02',
    phase: 'DISCOVERY',
    badge: '30m',
    badgeStyle: 'bg-slate-100 text-forge-muted',
    title: 'Discovery Call',
    desc: 'A high-density 30-minute dialogue with our partners to uncover friction, current bottlenecks, and vision.',
    note: 'Direct executive alignment.',
    noteStyle: 'text-forge-muted',
  },
  {
    num: '03',
    phase: 'PROPOSAL',
    badge: '48h',
    badgeStyle: 'bg-slate-100 text-forge-muted',
    title: 'Strategic Roadmap',
    desc: 'You receive a crystallized plan detailing sprint milestones, architecture, fixed pricing, and deliverable commitments.',
    note: 'Guaranteed fixed scope.',
    noteStyle: 'text-forge-muted',
  },
  {
    num: '04',
    phase: 'KICKOFF',
    badge: 'Day 1',
    badgeStyle: 'bg-forge-blue/10 text-forge-blue font-semibold',
    title: 'Sprint Kickoff',
    desc: 'Contracts signed, dedicated Slack channel opened, and day-one production begins with zero friction.',
    note: 'Immediate momentum.',
    noteStyle: 'text-forge-blue font-semibold',
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function Eyebrow({ children }: { children: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span className="w-[2px] h-4 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-forge-muted">{children}</span>
    </div>
  )
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-status-error">
      {message}
    </p>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form,   setForm]   = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | '_general', string>>>({})

  // Honeypot ref — hidden from users, catches bots
  const honeypotRef = useRef<HTMLInputElement>(null)

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: typeof errors = {}
    if (!form.fullName.trim())    e.fullName    = 'Full name is required.'
    if (!form.workEmail.trim())   e.workEmail   = 'Work email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim()))
                                  e.workEmail   = 'Enter a valid email address.'
    if (!form.companyName.trim()) e.companyName = 'Company or venture name is required.'
    if (form.scopes.length === 0) e.scopes      = 'Select at least one service area.'
    if (!form.projectNotes.trim()) e.projectNotes = 'Please describe your project and objectives.'
    if (!form.budgetRange)        e.budgetRange  = 'Please indicate a budget range.'
    if (!form.launchWindow)       e.launchWindow = 'Please select a launch window.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Toggle scope pill ──────────────────────────────────────────────────────
  const toggleScope = (id: string) => {
    setForm(prev => ({
      ...prev,
      scopes: prev.scopes.includes(id)
        ? prev.scopes.filter(s => s !== id)
        : [...prev.scopes, id],
    }))
    // Clear scope error on any selection change
    if (errors.scopes) setErrors(prev => ({ ...prev, scopes: undefined }))
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Honeypot check — reject silently if bot filled hidden field
    if (honeypotRef.current?.value) {
      // Bot detected — show fake success to not reveal rejection logic
      setStatus('success')
      return
    }

    if (!validate()) return

    // Check endpoint is configured
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined
    if (!endpoint) {
      console.error(
        '[ContactPage] VITE_CONTACT_FORM_ENDPOINT is not set.\n' +
        'Create a free Formspree form at https://formspree.io and add:\n' +
        'VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/{your-form-id}\n' +
        'to your .env file, then restart the dev server.'
      )
      setStatus('misconfigured')
      return
    }

    setStatus('submitting')
    setErrors({})

    try {
      const payload = {
        'Full Name':           form.fullName.trim(),
        'Work Email':          form.workEmail.trim(),
        'Phone':               form.phone.trim() || '(not provided)',
        'Company / Venture':   form.companyName.trim(),
        'Service Scope':       form.scopes.join(', '),
        'Primary Barrier':     form.primaryBarrier || '(not specified)',
        'Project Notes':       form.projectNotes.trim(),
        'Budget Range':        form.budgetRange,
        'Launch Window':       form.launchWindow,
        // Formspree special fields
        '_subject': `New Fortex Forge Project Enquiry — ${form.companyName.trim() || form.fullName.trim()}`,
        '_replyto': form.workEmail.trim(),
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        setForm(INITIAL)
      } else {
        const data = await res.json().catch(() => ({}))
        console.error('[ContactPage] Formspree error:', data)
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <section
        className="min-h-[60vh] flex items-center justify-center bg-forge-surface"
        aria-labelledby="success-heading"
        aria-live="polite"
      >
        <div className="max-w-lg mx-auto px-6 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-forge-blue/10 flex items-center justify-center mx-auto mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13L9 17L19 7" stroke="#1557FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 id="success-heading" className="font-display text-3xl sm:text-4xl font-bold text-forge-ink tracking-[-0.025em] mb-4">
            Brief received.
          </h1>
          <p className="text-base text-forge-secondary leading-relaxed max-w-md mx-auto mb-8">
            We review every intake within 48 business hours. If your project is a fit, we'll be in touch to schedule a discovery call.
          </p>
          <p className="text-xs text-forge-muted">
            Didn't receive a confirmation? Email us at{' '}
            <a href="mailto:hello@fortexforge.com" className="text-forge-blue underline underline-offset-2">
              hello@fortexforge.com
            </a>
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          1. CONTACT HERO
          7/5 split: headline + quick-contact cards / hero image with overlay card.
          Hero headline: "Good ideas deserve a conversation."
          Sub-text, 3 quick-contact cards, trust reassurance badges.
          Asset: /assets/contact/hero.webp
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden bg-white pt-12 lg:pt-16 pb-16 border-b border-forge-border"
        aria-labelledby="contact-hero-heading"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left column */}
            <div className="lg:col-span-7 flex flex-col justify-center pt-2">
              <Eyebrow>Let's Talk</Eyebrow>

              <h1
                id="contact-hero-heading"
                className="font-display font-bold text-forge-ink tracking-[-0.03em] leading-[1.08] mb-5"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}
              >
                Good ideas<br />deserve a <span className="text-forge-blue">conversation.</span>
              </h1>

              <p className="text-lg text-forge-secondary max-w-xl leading-relaxed mb-8">
                Whether you're ready to start, have a question, or just want to explore an idea, we're here for it.
              </p>

              {/* Quick-contact channel cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
                <a
                  href="mailto:hello@fortexforge.com"
                  className="p-3.5 rounded-xl border border-forge-border hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-3 bg-white group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-forge-muted group-hover:text-forge-blue transition-colors shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m2 7 10 6 10-6"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold text-forge-ink">Send an email</span>
                    <span className="block text-[11px] text-forge-muted truncate">hello@fortexforge.com</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/447900000000"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p-3.5 rounded-xl border border-forge-border hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-3 bg-white group"
                  aria-label="Chat on WhatsApp (opens in new tab)"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-forge-muted group-hover:text-[#25D366] transition-colors shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.073.376-.043c.101-.116.433-.506.549-.679.116-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold text-forge-ink">Chat on WhatsApp</span>
                    <span className="block text-[11px] text-forge-muted">Quick responses</span>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p-3.5 rounded-xl border border-forge-border hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-3 bg-white group"
                  aria-label="Connect on LinkedIn (opens in new tab)"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center text-forge-muted group-hover:text-[#0A66C2] transition-colors shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold text-forge-ink">Connect on LinkedIn</span>
                    <span className="block text-[11px] text-forge-muted">Let's network</span>
                  </div>
                </a>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#intake-form"
                  className="inline-flex items-center gap-2 rounded-full bg-forge-blue hover:bg-forge-blue-hover text-white text-sm font-semibold px-7 py-3.5 shadow-sm transition-all"
                >
                  Start a Project <span aria-hidden="true">↗</span>
                </a>
                <a
                  href="#contact-channels"
                  className="text-sm font-semibold text-forge-ink hover:text-forge-blue transition-colors underline underline-offset-4 decoration-forge-border"
                >
                  Ask a Question
                </a>
              </div>
            </div>

            {/* Right column — hero image */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-forge-border group aspect-[4/3] lg:aspect-[5/4] bg-slate-100">
                <img
                  src="/assets/contact/hero.webp"
                  alt="Fortex Forge studio workspace — the beginning of your project"
                  className="w-full h-full object-cover object-center"
                  fetchPriority="high"
                  decoding="async"
                />
                {/* Floating manifesto overlay */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-md max-w-[200px] border border-white/60">
                  <p className="italic text-forge-ink text-sm leading-snug font-medium">
                    "Same mission.<br />Different conversations."
                  </p>
                  <div className="w-6 h-0.5 bg-forge-blue my-2" aria-hidden="true" />
                  <div className="text-[10px] font-bold tracking-widest text-forge-muted space-y-0.5 uppercase">
                    <div>Brands</div>
                    <div>Websites</div>
                    <div>Strategy</div>
                    <div>Real Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero reassurance badges */}
          <div className="mt-14 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Fast responses',             sub: 'No long wait times. Within 24h.'                          },
              { icon: '🛡️', title: 'Serious about your project', sub: 'Confidential and professional under strict mutual NDA.'    },
              { icon: '🤝', title: 'Built for founders',         sub: 'From idea to execution. Direct senior partner involvement.' },
            ].map(badge => (
              <div key={badge.title} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-forge-blue/8 text-forge-blue flex items-center justify-center shrink-0 text-sm">
                  {badge.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-forge-ink">{badge.title}</h3>
                  <p className="text-xs text-forge-muted mt-0.5">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. WHAT HAPPENS NEXT
          4-step process cards: Review / Discovery / Proposal / Kickoff.
          Approved copy from Stitch export, zero modification.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full bg-forge-surface py-20 border-b border-forge-border overflow-hidden"
        aria-labelledby="process-heading"
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <img
            src="/assets/contact/needs-logo-correction/02-what-happens-next.webp"
            alt=""
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forge-surface via-forge-surface/90 to-forge-surface" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Our Process</Eyebrow>
            <h2 id="process-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-forge-ink mb-3">
              What happens when you reach out.
            </h2>
            <p className="text-sm text-forge-secondary">
              A predictable, transparent engagement model designed to value your time and deliver immediate momentum.
            </p>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" role="list">
            {PROCESS_STEPS.map((step, i) => (
              <li
                key={step.num}
                className="relative bg-white p-7 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-forge-blue font-mono">
                      {step.num} / {step.phase}
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${step.badgeStyle}`}>
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-forge-ink mb-2">{step.title}</h3>
                  <p className="text-xs text-forge-secondary leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className={`text-[11px] font-medium ${step.noteStyle}`}>{step.note}</span>
                </div>
                {/* Connector line (hidden on mobile) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 w-4 h-px bg-forge-border"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. PROJECT DIAGNOSTIC FORM
          4 fieldsets: (01) Your Details | (02) Service Scope
                       (03) Challenge & Context | (04) Budget & Launch
          Submission: POST to Formspree (VITE_CONTACT_FORM_ENDPOINT).
          Honeypot: _gotcha field (off-screen, tabIndex -1).
          Success/Error/Misconfigured states handled below form.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="intake-form"
        className="relative w-full bg-white py-20 lg:py-24 border-b border-forge-border overflow-hidden"
        aria-labelledby="form-heading"
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <img
            src="/assets/contact/03-project-diagnostic.webp"
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-8">
          {/* Form header */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <Eyebrow>Diagnostic & Intake</Eyebrow>
            <h2 id="form-heading" className="font-display text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-forge-ink mb-3">
              Tell us about what you're building.
            </h2>
            <p className="text-sm text-forge-secondary">
              A strategic diagnostic to help us understand your market position, operational bottlenecks, and expansion goals.
            </p>
          </div>

          {/* Misconfigured state — shown when env var is not set */}
          {status === 'misconfigured' && (
            <div role="alert" className="mb-8 p-5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              <p className="font-semibold mb-1">Form not yet connected</p>
              <p className="text-xs leading-relaxed">
                The contact form endpoint is not configured. To enable submissions, add{' '}
                <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-[11px]">VITE_CONTACT_FORM_ENDPOINT</code>{' '}
                to your <code className="font-mono bg-amber-100 px-1 py-0.5 rounded text-[11px]">.env</code> file and restart the server.
                In the meantime, please email us directly at{' '}
                <a href="mailto:hello@fortexforge.com" className="underline font-medium">hello@fortexforge.com</a>.
              </p>
            </div>
          )}

          {/* Form card */}
          <div className="bg-[#FBFBFC] rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Project intake form"
              className="space-y-10"
            >
              {/* ── Honeypot (anti-spam) ─────────────────────────────────── */}
              <div
                style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                aria-hidden="true"
              >
                <label htmlFor="_gotcha">Do not fill this field</label>
                <input
                  ref={honeypotRef}
                  type="text"
                  id="_gotcha"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* ── 01 / Your Details ─────────────────────────────────────── */}
              <fieldset>
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-slate-200/60">
                  <span className="text-xs font-mono font-bold text-forge-blue" aria-hidden="true">01</span>
                  <legend className="text-sm font-bold uppercase tracking-wider text-forge-ink">Your Details</legend>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-forge-ink mb-1.5">
                      Full Name <span className="text-status-error" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Ayobami Egbewole"
                      value={form.fullName}
                      onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                      aria-required="true"
                      aria-describedby={errors.fullName ? 'fullName-err' : undefined}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-forge-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-blue/20 focus:border-forge-blue transition-all ${errors.fullName ? 'border-status-error' : 'border-slate-200'}`}
                    />
                    {errors.fullName && <FieldError id="fullName-err" message={errors.fullName} />}
                  </div>

                  {/* Work Email */}
                  <div>
                    <label htmlFor="workEmail" className="block text-xs font-semibold text-forge-ink mb-1.5">
                      Work Email <span className="text-status-error" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="workEmail"
                      type="email"
                      autoComplete="email"
                      placeholder="name@company.com"
                      value={form.workEmail}
                      onChange={e => setForm(p => ({ ...p, workEmail: e.target.value }))}
                      aria-required="true"
                      aria-describedby={errors.workEmail ? 'workEmail-err' : undefined}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-forge-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-blue/20 focus:border-forge-blue transition-all ${errors.workEmail ? 'border-status-error' : 'border-slate-200'}`}
                    />
                    {errors.workEmail && <FieldError id="workEmail-err" message={errors.workEmail} />}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-forge-ink mb-1.5">
                      Phone / WhatsApp <span className="text-forge-muted font-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+44 7700 000000"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-forge-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-blue/20 focus:border-forge-blue transition-all"
                    />
                  </div>

                  {/* Company Name (required per Stitch) */}
                  <div>
                    <label htmlFor="companyName" className="block text-xs font-semibold text-forge-ink mb-1.5">
                      Company or Venture Name <span className="text-status-error" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="companyName"
                      type="text"
                      autoComplete="organization"
                      placeholder="e.g. Apex Dynamics Ltd."
                      value={form.companyName}
                      onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))}
                      aria-required="true"
                      aria-describedby={errors.companyName ? 'companyName-err' : undefined}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-forge-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-blue/20 focus:border-forge-blue transition-all ${errors.companyName ? 'border-status-error' : 'border-slate-200'}`}
                    />
                    {errors.companyName && <FieldError id="companyName-err" message={errors.companyName} />}
                  </div>
                </div>
              </fieldset>

              {/* ── 02 / What do you need help with? ─────────────────────── */}
              <fieldset>
                <div className="flex items-center gap-2.5 mb-3 pb-2 border-b border-slate-200/60">
                  <span className="text-xs font-mono font-bold text-forge-blue" aria-hidden="true">02</span>
                  <legend className="text-sm font-bold uppercase tracking-wider text-forge-ink">What do you need help with?</legend>
                </div>
                <p
                  id="scopes-hint"
                  className="text-xs text-forge-muted mb-4"
                >
                  Select all modules relevant to this project. <span className="text-status-error" aria-hidden="true">*</span>
                </p>

                <div
                  role="group"
                  aria-labelledby="scopes-hint"
                  aria-describedby={errors.scopes ? 'scopes-err' : undefined}
                  className="flex flex-wrap gap-2.5"
                >
                  {SCOPE_OPTIONS.map(opt => {
                    const selected = form.scopes.includes(opt.id)
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleScope(opt.id)}
                        aria-pressed={selected}
                        className={`px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                          selected
                            ? 'bg-forge-blue text-white border-forge-blue'
                            : 'bg-white text-forge-secondary border-slate-200 hover:border-slate-300 hover:text-forge-ink'
                        }`}
                      >
                        {opt.label}
                        {selected && <span className="ml-1.5" aria-hidden="true">✓</span>}
                      </button>
                    )
                  })}
                </div>
                {errors.scopes && <FieldError id="scopes-err" message={errors.scopes} />}
              </fieldset>

              {/* ── 03 / Current Challenge & Context ─────────────────────── */}
              <fieldset>
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-slate-200/60">
                  <span className="text-xs font-mono font-bold text-forge-blue" aria-hidden="true">03</span>
                  <legend className="text-sm font-bold uppercase tracking-wider text-forge-ink">Current Challenge &amp; Context</legend>
                </div>

                <div className="space-y-4">
                  {/* Primary barrier select (optional — no required in Stitch) */}
                  <div>
                    <label htmlFor="primaryBarrier" className="block text-xs font-semibold text-forge-ink mb-1.5">
                      What is the primary commercial barrier right now?
                    </label>
                    <select
                      id="primaryBarrier"
                      value={form.primaryBarrier}
                      onChange={e => setForm(p => ({ ...p, primaryBarrier: e.target.value }))}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:ring-2 focus:ring-forge-blue/20 focus:border-forge-blue transition-all"
                    >
                      <option value="">Select primary bottleneck…</option>
                      {BARRIER_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project notes textarea (required) */}
                  <div>
                    <label htmlFor="projectNotes" className="block text-xs font-semibold text-forge-ink mb-1.5">
                      Project Notes &amp; Objectives <span className="text-status-error" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="projectNotes"
                      rows={4}
                      placeholder="Share what you are building, who your target clients are, and what success looks like over the next 12 months…"
                      value={form.projectNotes}
                      onChange={e => setForm(p => ({ ...p, projectNotes: e.target.value }))}
                      aria-required="true"
                      aria-describedby={errors.projectNotes ? 'projectNotes-err' : undefined}
                      className={`w-full bg-white border rounded-xl p-4 text-sm text-forge-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-forge-blue/20 focus:border-forge-blue transition-all resize-none ${errors.projectNotes ? 'border-status-error' : 'border-slate-200'}`}
                    />
                    {errors.projectNotes && <FieldError id="projectNotes-err" message={errors.projectNotes} />}
                  </div>
                </div>
              </fieldset>

              {/* ── 04 / Estimated Investment & Schedule ─────────────────── */}
              <fieldset>
                <div className="flex items-center gap-2.5 mb-5 pb-2 border-b border-slate-200/60">
                  <span className="text-xs font-mono font-bold text-forge-blue" aria-hidden="true">04</span>
                  <legend className="text-sm font-bold uppercase tracking-wider text-forge-ink">Estimated Investment &amp; Schedule</legend>
                </div>

                {/* Budget range */}
                <div className="mb-6">
                  <p
                    id="budget-label"
                    className="text-xs font-semibold text-forge-ink mb-2.5"
                  >
                    Anticipated Budget Range <span className="text-status-error" aria-hidden="true">*</span>
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby="budget-label"
                    aria-describedby={errors.budgetRange ? 'budgetRange-err' : undefined}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {BUDGET_OPTIONS.map(opt => {
                      const selected = form.budgetRange === opt.id
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-center gap-3 p-3.5 bg-white rounded-xl border cursor-pointer transition-colors ${
                            selected
                              ? 'border-forge-blue ring-2 ring-forge-blue/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="budgetRange"
                            value={opt.id}
                            checked={selected}
                            onChange={() => setForm(p => ({ ...p, budgetRange: opt.id }))}
                            className="sr-only"
                            aria-label={`${opt.label} — ${opt.sub}`}
                          />
                          <div>
                            <span className={`block text-xs font-bold ${selected ? 'text-forge-blue' : 'text-forge-ink'}`}>
                              {opt.label}
                            </span>
                            <span className="block text-[11px] text-forge-muted">{opt.sub}</span>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                  {errors.budgetRange && <FieldError id="budgetRange-err" message={errors.budgetRange} />}
                </div>

                {/* Launch window */}
                <div>
                  <p
                    id="launch-label"
                    className="text-xs font-semibold text-forge-ink mb-2"
                  >
                    Desired Launch Window <span className="text-status-error" aria-hidden="true">*</span>
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby="launch-label"
                    aria-describedby={errors.launchWindow ? 'launchWindow-err' : undefined}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                  >
                    {LAUNCH_OPTIONS.map(opt => {
                      const selected = form.launchWindow === opt.id
                      return (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-center p-2.5 bg-white rounded-lg border text-center cursor-pointer text-xs font-medium transition-all ${
                            selected
                              ? 'border-forge-blue text-forge-blue font-semibold'
                              : 'border-slate-200 text-forge-muted hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="launchWindow"
                            value={opt.id}
                            checked={selected}
                            onChange={() => setForm(p => ({ ...p, launchWindow: opt.id }))}
                            className="sr-only"
                            aria-label={opt.label}
                          />
                          {opt.label}
                        </label>
                      )
                    })}
                  </div>
                  {errors.launchWindow && <FieldError id="launchWindow-err" message={errors.launchWindow} />}
                </div>
              </fieldset>

              {/* ── Submit ────────────────────────────────────────────────── */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-col items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  aria-busy={status === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-full bg-forge-blue hover:bg-forge-blue-hover text-white text-sm font-semibold px-9 py-4 shadow-sm hover:shadow transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>Submit Project Enquiry <span aria-hidden="true">↗</span></>
                  )}
                </button>

                <p className="flex items-center gap-1.5 text-xs text-forge-muted">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Strict confidentiality guaranteed. Zero unsolicited outreach.
                </p>

                {/* Error state */}
                {status === 'error' && (
                  <div role="alert" aria-live="assertive" className="w-full p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center">
                    Something went wrong. Please try again, or email us directly at{' '}
                    <a href="mailto:hello@fortexforge.com" className="underline font-medium">
                      hello@fortexforge.com
                    </a>.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          4. DIRECT ROUTING — Alternative Contact
          3 cards: Executive Inbox / Founder Desk WhatsApp / Global Hubs.
          Visually secondary to the diagnostic form.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="contact-channels"
        className="relative w-full bg-forge-surface py-20 border-b border-forge-border overflow-hidden"
        aria-labelledby="alt-contact-heading"
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <img
            src="/assets/contact/04-alternative-contact.webp"
            alt=""
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forge-surface via-forge-surface/90 to-forge-surface" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Eyebrow>Direct Routing</Eyebrow>
              <h2 id="alt-contact-heading" className="font-display text-3xl font-bold tracking-[-0.025em] text-forge-ink">
                Prefer a direct conversation?
              </h2>
            </div>
            <p className="text-sm text-forge-secondary max-w-sm">
              Skip the diagnostic form and reach out through our dedicated channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Executive Inbox */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-forge-blue mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-forge-ink mb-1">Executive Inbox</h3>
                <p className="text-xs text-forge-secondary leading-relaxed">
                  Direct inbox for founders, venture partners, and prospective collaborators.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href="mailto:hello@fortexforge.com"
                  className="text-sm font-semibold text-forge-blue hover:underline flex items-center gap-1"
                >
                  hello@fortexforge.com <span aria-hidden="true">↗</span>
                </a>
                <span className="block text-[11px] text-forge-muted mt-1">Backup: fortexforge@gmail.com</span>
              </div>
            </div>

            {/* Founder Desk WhatsApp */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-forge-blue mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-forge-ink mb-1">Founder Desk</h3>
                <p className="text-xs text-forge-secondary leading-relaxed">
                  Direct connection on WhatsApp for fast questions and preliminary scope checks.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100">
                {/* WhatsApp number: placeholder — replace with real number before launch */}
                <a
                  href="https://wa.me/447900000000"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sm font-semibold text-forge-blue hover:underline flex items-center gap-1"
                >
                  Open WhatsApp Chat <span aria-hidden="true">↗</span>
                </a>
                <span className="block text-[11px] text-forge-muted mt-1">Direct to managing partner</span>
              </div>
            </div>

            {/* Global Operating Hubs */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-forge-blue mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-forge-ink mb-1">Global Operating Hubs</h3>
                <p className="text-xs text-forge-secondary leading-relaxed">
                  Strategic presences delivering coordinated coverage across key daylight zones.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100">
                <div className="text-xs font-bold text-forge-ink tracking-wider uppercase font-mono">
                  ZURICH · SAN FRANCISCO · LONDON
                </div>
                <span className="block text-[11px] text-forge-muted mt-1">Central European Time &amp; Pacific Time Core</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          5. CLOSING STATEMENT — "The Bottom Line"
          Dark full-bleed section: #080C14 bg, headline + dual CTAs.
          Approved Stitch copy preserved exactly.
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full bg-[#080C14] text-white py-24 relative overflow-hidden"
        aria-labelledby="closing-heading"
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <img
            src="/assets/contact/needs-logo-correction/05-closing.webp"
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/80 to-[#080C14]/90" />
        </div>
        {/* Subtle background watermark */}
        <div
          className="absolute -bottom-28 -right-10 pointer-events-none select-none opacity-[0.03] font-display font-bold text-white"
          style={{ fontSize: '24rem', lineHeight: 1 }}
          aria-hidden="true"
        >
          F
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-forge-blue rounded-full" aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-white/70">The Bottom Line</span>
          </div>

          <h2
            id="closing-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em] text-white leading-tight mb-5"
          >
            "Great brands are not made by chance.<br className="hidden sm:block" />
            They are forged with intention."
          </h2>

          <p className="text-base text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Let's build a brand that reflects the true caliber of your business and commands market leadership.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#intake-form"
              className="inline-flex items-center gap-2 rounded-full bg-forge-blue hover:bg-forge-blue-hover text-white text-sm font-semibold px-7 py-3.5 transition-all shadow-lg shadow-blue-500/10"
            >
              Start a Project <span aria-hidden="true">↗</span>
            </a>
            <a
              href="mailto:hello@fortexforge.com"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-6 py-3.5 transition-all"
            >
              Direct Enquiries <span aria-hidden="true">✉</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
