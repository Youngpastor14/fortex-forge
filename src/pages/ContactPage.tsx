import { useState, useRef, type FormEvent } from 'react'

// ─── ContactPage ──────────────────────────────────────────────────────────────
// High-fidelity implementation based on Reference mockups/contact page/ (01.png - 05.png)
// and the Stitch narrative flow. All sections integrate full-bleed spatial backgrounds
// while keeping all functional form submission, honeypot spam protection, and copy intact.
// ─────────────────────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error' | 'misconfigured'

interface FormState {
  fullName:       string
  workEmail:      string
  phone:          string
  companyName:    string
  website:        string
  businessType:   string
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
  website:        '',
  businessType:   '',
  scopes:         [],
  primaryBarrier: '',
  projectNotes:   '',
  budgetRange:    '10k-25k',
  launchWindow:   '1-2-months',
}

// ── Scope & Form Options ──────────────────────────────────────────────────────

const SCOPE_OPTIONS = [
  { id: 'brand-strategy',     label: 'Brand Strategy & Positioning' },
  { id: 'visual-identity',    label: 'Visual Identity & System' },
  { id: 'web-design',         label: 'Website Design & Development' },
  { id: 'complete-brand-web', label: 'Complete Brand + Web System' },
  { id: 'rebranding',         label: 'Rebranding & Evolution' },
]

const BARRIER_OPTIONS = [
  { value: 'low-conversion',      label: 'Low conversion & trust' },
  { value: 'outdated-brand',      label: 'Outdated brand identity' },
  { value: 'unclear-positioning', label: 'Unclear market positioning' },
  { value: 'scaling',             label: 'Scaling into new markets or capital raise' },
  { value: 'other',               label: 'Other complex growth challenge' },
]

const BUDGET_OPTIONS = [
  { id: '5k-10k',   label: '$5,000 – $10,000',       sub: 'Focused Identity or Web Sprint' },
  { id: '10k-25k',  label: '$10,000 – $25,000',      sub: 'Complete Brand & Digital Platform' },
  { id: '25k-plus', label: '$25,000+',                sub: 'Enterprise Strategy & Systems' },
  { id: 'discuss',  label: "Let's discuss scope first", sub: 'Open advisory consultation' },
]

const LAUNCH_OPTIONS = [
  { id: '2-4-weeks',  label: '2–4 Weeks' },
  { id: '1-2-months', label: '1–2 Months' },
  { id: '2-3-months', label: '2–3 Months' },
  { id: 'flexible',   label: 'Flexible' },
]

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Submit',
    desc: 'Fill out the project diagnostic form with a few details about your business and goals.',
  },
  {
    num: '02',
    title: 'We Review',
    desc: 'Our team carefully reviews your submission to understand your needs and objectives.',
  },
  {
    num: '03',
    title: '30-Minute Call',
    desc: 'We hop on a focused 30-minute call to discuss your goals, ask the right questions, and explore opportunities.',
  },
  {
    num: '04',
    title: 'Proposal',
    desc: "You'll receive a clear, customized proposal with the recommended scope, timeline and investment.",
  },
  {
    num: '05',
    title: 'Decide',
    desc: "You take your time, ask any final questions, and when you're ready, we get to work.",
  },
]

// ── Eyebrow Sub-component ─────────────────────────────────────────────────────

function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 mb-4 ${className}`}>
      <span className="w-1.5 h-3.5 bg-forge-blue rounded-full shrink-0" aria-hidden="true" />
      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-forge-ink/70">
        {children}
      </span>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | '_general', string>>>({})
  const [step, setStep] = useState<number>(1)

  const honeypotRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToDiagnostic = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: typeof errors = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!form.workEmail.trim()) e.workEmail = 'Work email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim())) {
      e.workEmail = 'Enter a valid email address.'
    }
    if (!form.companyName.trim()) e.companyName = 'Company name is required.'
    if (form.scopes.length === 0) e.scopes = 'Select at least one area of interest.'
    if (!form.projectNotes.trim()) e.projectNotes = 'Please tell us a bit about what you want to achieve.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const toggleScope = (id: string) => {
    setForm(prev => ({
      ...prev,
      scopes: prev.scopes.includes(id)
        ? prev.scopes.filter(s => s !== id)
        : [...prev.scopes, id],
    }))
    if (errors.scopes) setErrors(prev => ({ ...prev, scopes: undefined }))
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (honeypotRef.current?.value) {
      setStatus('success')
      return
    }

    if (!validate()) return

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined
    if (!endpoint) {
      console.warn('[ContactPage] VITE_CONTACT_FORM_ENDPOINT not set. Showing success simulation.')
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      const payload = {
        'Full Name': form.fullName.trim(),
        'Work Email': form.workEmail.trim(),
        'Phone': form.phone.trim() || '(not provided)',
        'Company': form.companyName.trim(),
        'Website': form.website.trim() || '(not provided)',
        'Business Type': form.businessType || '(not specified)',
        'Scope': form.scopes.join(', '),
        'Primary Barrier': form.primaryBarrier || '(not specified)',
        'Project Notes': form.projectNotes.trim(),
        'Budget': form.budgetRange,
        'Launch Window': form.launchWindow,
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
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          01: CONTACT HERO
          Full background artwork 01-hero.webp with executive desk, MacBook,
          notebook "Build Brand Grow", and direct channel pills.
          Reference: Reference mockups/contact page/01.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        aria-labelledby="contact-hero-heading"
      >
        {/* Full-bleed background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/contact/01-hero.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom mix-blend-multiply"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">LET'S TALK</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME MISSION.<br />DIFFERENT CONVERSATIONS.
              </div>
            </div>
          </div>

          <div className="max-w-2xl mb-12">
            <h1
              id="contact-hero-heading"
              className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold text-forge-ink tracking-[-0.035em] leading-[1.06] mb-6"
            >
              Good ideas<br />
              deserve a <span className="text-forge-blue">conversation.</span>
            </h1>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
              Whether you're ready to start, have a question, or just want to explore an idea, we're here for it.
            </p>

            {/* Direct Contact Channel Cards matching 01.png */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <a
                href="mailto:fortexforge@gmail.com"
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg" aria-hidden="true">✉️</span>
                  <span className="font-display font-bold text-xs text-forge-ink">Send an email</span>
                </div>
                <span className="text-[11px] text-forge-muted truncate font-mono">fortexforge@gmail.com</span>
              </a>

              <a
                href="https://wa.me/2348160402987"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg" aria-hidden="true">💬</span>
                  <span className="font-display font-bold text-xs text-forge-ink">Chat on WhatsApp</span>
                </div>
                <span className="text-[11px] text-forge-muted font-medium">Quick responses</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-forge-blue" aria-hidden="true">in</span>
                  <span className="font-display font-bold text-xs text-forge-ink">Connect on LinkedIn</span>
                </div>
                <span className="text-[11px] text-forge-muted font-medium">Let's network</span>
              </a>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={scrollToDiagnostic}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all hover:-translate-y-0.5"
              >
                Start a Project <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                onClick={scrollToDiagnostic}
                className="text-sm font-semibold text-forge-ink hover:text-forge-blue transition-colors underline underline-offset-4"
              >
                Ask a Question
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Assurance Strip matching mockup */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-forge-blue" aria-hidden="true">⚡</span>
              <div>
                <span className="text-forge-ink font-bold block text-[11px]">Fast responses</span>
                <span className="text-[10px] text-neutral-400 lowercase">No long wait times.</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-forge-blue" aria-hidden="true">🛡️</span>
              <div>
                <span className="text-forge-ink font-bold block text-[11px]">Serious about your project</span>
                <span className="text-[10px] text-neutral-400 lowercase">Confidential and professional.</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-forge-blue" aria-hidden="true">👥</span>
              <div>
                <span className="text-forge-ink font-bold block text-[11px]">Built for founders</span>
                <span className="text-[10px] text-neutral-400 lowercase">From idea to execution.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          02: WHAT HAPPENS NEXT
          Full background artwork 02-what-happens-next.webp with 5 transformation
          milestones connected by blue line.
          Reference: Reference mockups/contact page/02.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        aria-labelledby="what-happens-heading"
      >
        {/* Full-bleed what happens next background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/contact/02-what-happens-next.webp"
            alt=""
            className="w-full h-full object-cover object-center mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">WHAT HAPPENS NEXT</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME MISSION.<br />DIFFERENT CONVERSATIONS.
              </div>
            </div>
          </div>

          <div className="max-w-2xl mb-12">
            <h2
              id="what-happens-heading"
              className="text-4xl sm:text-5xl font-display font-bold text-forge-ink tracking-[-0.03em] leading-tight mb-4"
            >
              A clear process.{' '}
              <br />
              From conversation to <span className="text-forge-blue">progress.</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              No guesswork. No endless back and forth. Just a straightforward process designed to respect your time and get things moving.
            </p>
          </div>

          {/* 5 Process Columns aligned with background milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.num}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-forge-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-3xl font-extrabold text-neutral-300 block mb-2">{s.num}</span>
                  <h3 className="font-display font-bold text-lg text-forge-ink mb-2">{s.title}</h3>
                  <p className="text-xs text-forge-secondary leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom assurance footer */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-forge-blue/10 text-forge-blue flex items-center justify-center font-bold text-lg">
                🛡️
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forge-ink">A Better Way to Start</h4>
                <p className="text-xs text-forge-secondary">We keep the process simple, transparent and professional from the very first conversation.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-8 text-xs font-semibold text-forge-ink">
              <span className="flex items-center gap-2">
                <span className="text-forge-blue">⚡</span> Fast responses
              </span>
              <span className="flex items-center gap-2">
                <span className="text-forge-blue">🔒</span> Confidential and secure
              </span>
              <span className="flex items-center gap-2">
                <span className="text-forge-blue">👥</span> Built for founders
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          03: PROJECT DIAGNOSTIC FORM
          Full background artwork 03-project-diagnostic.webp with blue-line rock,
          blueprint drafting, pen, and notebook.
          Interactive multi-step diagnostic card on the right.
          Reference: Reference mockups/contact page/03.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={formRef}
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[860px] lg:min-h-[960px] flex flex-col justify-between"
        id="diagnostic"
        aria-labelledby="diagnostic-heading"
      >
        {/* Full-bleed diagnostic background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/contact/03-project-diagnostic.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-left-bottom mix-blend-multiply"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex items-center justify-between gap-8 mb-10 lg:mb-14">
            <Eyebrow className="mb-0">PROJECT DIAGNOSTIC</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME MISSION.<br />DIFFERENT CONVERSATIONS.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative Block */}
            <div className="lg:col-span-5">
              <h2
                id="diagnostic-heading"
                className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-[1.08] mb-6 tracking-[-0.03em]"
              >
                Tell us about <br />
                your <span className="text-forge-blue">project.</span>
              </h2>
              <p className="text-base sm:text-lg text-forge-secondary leading-relaxed mb-10">
                A few questions to help us understand your business, your goals, and how we can create the most impact together.
              </p>

              {/* 3 bullet benefits matching mockup */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/90 border border-neutral-200 flex items-center justify-center text-forge-blue shrink-0 shadow-sm">
                    ⏱️
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-forge-ink">Takes 3–5 minutes</h4>
                    <p className="text-xs text-forge-secondary">A short, focused form designed to get straight to the point.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/90 border border-neutral-200 flex items-center justify-center text-forge-blue shrink-0 shadow-sm">
                    🛡️
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-forge-ink">Confidential</h4>
                    <p className="text-xs text-forge-secondary">Your information is safe with us and will never be shared.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/90 border border-neutral-200 flex items-center justify-center text-forge-blue shrink-0 shadow-sm">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-forge-ink">Better recommendations</h4>
                    <p className="text-xs text-forge-secondary">The more context you share, the more value we can provide.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Form Container matching 03.png */}
            <div className="lg:col-span-7">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-2xl">
                {/* Honeypot field for bot spam prevention */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="sr-only"
                />

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-forge-blue/10 text-forge-blue flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                      ✓
                    </div>
                    <h3 className="font-display font-bold text-2xl text-forge-ink mb-2">Brief received.</h3>
                    <p className="text-sm text-forge-secondary max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you for submitting your project diagnostic. We review every brief within 24 hours and will reach out with recommendations.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2.5 rounded-full bg-forge-ink text-white text-xs font-semibold hover:bg-neutral-800 transition-all"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Top step progress indicator */}
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-wider font-bold text-forge-blue">
                          STEP {step} OF 3
                        </span>
                        <h3 className="font-display font-bold text-xl text-forge-ink mt-0.5">
                          {step === 1 && "Let's start with the basics."}
                          {step === 2 && "What are you looking to achieve?"}
                          {step === 3 && "Budget & timeline expectations."}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-neutral-400 block">PROJECT CLARITY</span>
                        <span className="font-display font-extrabold text-2xl text-forge-blue">
                          {step === 1 ? '33%' : step === 2 ? '66%' : '100%'}
                        </span>
                      </div>
                    </div>

                    {/* Step 1: Basics */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={form.fullName}
                              onChange={e => setForm({ ...form, fullName: e.target.value })}
                              placeholder="Your name"
                              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                            />
                            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                              Work Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={form.workEmail}
                              onChange={e => setForm({ ...form, workEmail: e.target.value })}
                              placeholder="you@company.com"
                              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                            />
                            {errors.workEmail && <p className="text-xs text-red-500 mt-1">{errors.workEmail}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                              Company Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={form.companyName}
                              onChange={e => setForm({ ...form, companyName: e.target.value })}
                              placeholder="Your company name"
                              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                            />
                            {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                              Website (if available)
                            </label>
                            <input
                              type="text"
                              value={form.website}
                              onChange={e => setForm({ ...form, website: e.target.value })}
                              placeholder="https://"
                              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                            What best describes your business?
                          </label>
                          <select
                            value={form.businessType}
                            onChange={e => setForm({ ...form, businessType: e.target.value })}
                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                          >
                            <option value="">Select an option</option>
                            <option value="early-stage">Early-Stage Startup</option>
                            <option value="scaling">Growing / Venture-Backed Scaleup</option>
                            <option value="established">Established Mid-Sized Enterprise</option>
                            <option value="rebrand">Executive Rebrand / Transformation</option>
                          </select>
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            type="button"
                            onClick={() => {
                              if (!form.fullName.trim() || !form.workEmail.trim() || !form.companyName.trim()) {
                                validate()
                                return
                              }
                              setStep(2)
                            }}
                            className="px-8 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold hover:bg-forge-blue-hover transition-all flex items-center gap-2"
                          >
                            Next Step <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Scopes & Goals */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-3">
                            Services Needed (select all that apply) *
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {SCOPE_OPTIONS.map(opt => {
                              const active = form.scopes.includes(opt.id)
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() => toggleScope(opt.id)}
                                  className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                                    active
                                      ? 'bg-forge-blue text-white border-forge-blue shadow-sm'
                                      : 'bg-white text-forge-ink border-neutral-300 hover:border-neutral-400'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              )
                            })}
                          </div>
                          {errors.scopes && <p className="text-xs text-red-500 mt-2">{errors.scopes}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                            What is your primary commercial hurdle right now?
                          </label>
                          <select
                            value={form.primaryBarrier}
                            onChange={e => setForm({ ...form, primaryBarrier: e.target.value })}
                            className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                          >
                            <option value="">Select primary bottleneck...</option>
                            {BARRIER_OPTIONS.map(b => (
                              <option key={b.value} value={b.value}>{b.label}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-2">
                            What are you looking to achieve? *
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={form.projectNotes}
                            onChange={e => setForm({ ...form, projectNotes: e.target.value })}
                            placeholder="Share a bit about your goals, challenges, or what you have in mind..."
                            className="w-full bg-white border border-neutral-300 rounded-xl p-4 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                          />
                          {errors.projectNotes && <p className="text-xs text-red-500 mt-1">{errors.projectNotes}</p>}
                        </div>

                        <div className="flex justify-between items-center pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-xs font-bold text-forge-muted hover:text-forge-ink"
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (form.scopes.length === 0 || !form.projectNotes.trim()) {
                                validate()
                                return
                              }
                              setStep(3)
                            }}
                            className="px-8 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold hover:bg-forge-blue-hover transition-all flex items-center gap-2"
                          >
                            Next Step <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Budget & Timeline */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-3">
                            Anticipated Investment Range
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {BUDGET_OPTIONS.map(b => (
                              <label
                                key={b.id}
                                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                                  form.budgetRange === b.id
                                    ? 'border-forge-blue bg-forge-blue/5 shadow-sm'
                                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-display font-bold text-sm text-forge-ink">{b.label}</span>
                                  <input
                                    type="radio"
                                    name="budget"
                                    value={b.id}
                                    checked={form.budgetRange === b.id}
                                    onChange={() => setForm({ ...form, budgetRange: b.id })}
                                    className="text-forge-blue focus:ring-forge-blue"
                                  />
                                </div>
                                <span className="text-xs text-forge-muted">{b.sub}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-forge-ink mb-3">
                            Target Launch Window
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {LAUNCH_OPTIONS.map(l => (
                              <button
                                key={l.id}
                                type="button"
                                onClick={() => setForm({ ...form, launchWindow: l.id })}
                                className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                                  form.launchWindow === l.id
                                    ? 'bg-forge-blue text-white border-forge-blue shadow-sm'
                                    : 'bg-white text-forge-ink border-neutral-200 hover:border-neutral-300'
                                }`}
                              >
                                {l.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="text-xs font-bold text-forge-muted hover:text-forge-ink"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="px-9 py-4 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all flex items-center gap-2 hover:-translate-y-0.5 disabled:opacity-50"
                          >
                            {status === 'submitting' ? 'Submitting...' : 'Submit Diagnostic Brief ↗'}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          04: OTHER WAYS TO REACH US
          Full background artwork 04-alternative-contact.webp with executive desk,
          basalt block, and window wall.
          Reference: Reference mockups/contact page/04.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-b border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        aria-labelledby="other-ways-heading"
      >
        {/* Full-bleed alternative contact background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/contact/04-alternative-contact.webp"
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
            <Eyebrow className="mb-0">OTHER WAYS TO REACH US</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                BRANDS. WEBSITES.<br />STRATEGY. REAL RESULTS.
              </div>
            </div>
          </div>

          <div className="max-w-2xl mb-12">
            <h2
              id="other-ways-heading"
              className="text-4xl sm:text-5xl font-display font-bold text-forge-ink tracking-[-0.03em] leading-tight mb-4"
            >
              Prefer a different <br />
              <span className="text-forge-blue">way to connect?</span>
            </h2>
            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed">
              We're available on multiple channels. Choose what works best for you — we'll respond as quickly as possible.
            </p>
          </div>

          {/* 3 Channel Cards matching 04.png */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mb-10">
            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block" aria-hidden="true">✉️</span>
                <h3 className="font-display font-bold text-lg text-forge-ink mb-1">Email</h3>
                <p className="text-xs text-forge-secondary leading-relaxed mb-4">
                  Send us a detailed message and we'll get back to you.
                </p>
                <span className="font-mono text-xs font-bold text-forge-blue block mb-6">fortexforge@gmail.com</span>
              </div>
              <a
                href="mailto:fortexforge@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forge-ink hover:text-forge-blue transition-colors"
              >
                Send an Email <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block" aria-hidden="true">💬</span>
                <h3 className="font-display font-bold text-lg text-forge-ink mb-1">WhatsApp</h3>
                <p className="text-xs text-forge-secondary leading-relaxed mb-4">
                  Prefer a casual chat? Message us on WhatsApp.
                </p>
                <span className="font-mono text-xs font-bold text-forge-blue block mb-6">+234 816 040 2987</span>
              </div>
              <a
                href="https://wa.me/2348160402987"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forge-ink hover:text-forge-blue transition-colors"
              >
                Chat on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-2xl mb-3 block text-forge-blue font-bold" aria-hidden="true">in</span>
                <h3 className="font-display font-bold text-lg text-forge-ink mb-1">LinkedIn</h3>
                <p className="text-xs text-forge-secondary leading-relaxed mb-4">
                  Let's connect professionally and talk about opportunities.
                </p>
                <span className="font-mono text-xs font-bold text-forge-blue block mb-6">Connect on LinkedIn</span>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forge-ink hover:text-forge-blue transition-colors"
              >
                View Profile <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Assurance card matching mockup */}
          <div className="max-w-4xl bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xl text-forge-blue" aria-hidden="true">⏱️</span>
              <div>
                <h4 className="font-display font-bold text-sm text-forge-ink">Response Time</h4>
                <p className="text-xs text-forge-secondary">We typically respond within 24 hours (Mon – Fri).</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-200" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <span className="text-xl text-forge-blue" aria-hidden="true">🔒</span>
              <div>
                <h4 className="font-display font-bold text-sm text-forge-ink">Your Information is Safe</h4>
                <p className="text-xs text-forge-secondary">We respect your privacy. Your details will only be used to discuss your project.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          05: FINAL THOUGHT (CLOSING)
          Full background artwork 05-closing.webp with laser-illuminated basalt
          cube monolith and books "Build Brand Grow".
          Reference: Reference mockups/contact page/05.png
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 lg:py-28 bg-white border-t border-forge-border overflow-hidden min-h-[820px] lg:min-h-[920px] flex flex-col justify-between"
        aria-labelledby="closing-thought-heading"
      >
        {/* Full-bleed closing background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/contact/05-closing.webp"
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
            <Eyebrow className="mb-0">FINAL THOUGHT</Eyebrow>

            <div className="hidden lg:flex items-start gap-2.5 shrink-0 text-left border-l-[1.5px] border-forge-blue pl-2.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-forge-ink/70 leading-snug">
                SAME MISSION.<br />DIFFERENT CONVERSATIONS.
              </div>
            </div>
          </div>

          <div className="max-w-xl lg:max-w-2xl mb-12">
            <h2
              id="closing-thought-heading"
              className="text-4xl sm:text-5xl lg:text-[56px] font-display font-bold text-forge-ink tracking-[-0.035em] leading-[1.08] mb-6"
            >
              If you're still reading this, you already know your brand is{' '}
              <span className="text-forge-blue">costing you deals.</span>
            </h2>

            <p className="text-base sm:text-lg text-forge-secondary leading-relaxed max-w-xl mb-10">
              The only question is how much longer you're going to let it.
            </p>

            <div className="flex flex-wrap items-center gap-5 mb-12">
              <button
                type="button"
                onClick={scrollToDiagnostic}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all hover:-translate-y-0.5"
              >
                Start Your Project <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                onClick={scrollToDiagnostic}
                className="text-sm font-semibold text-forge-ink hover:text-forge-blue transition-colors underline underline-offset-4"
              >
                Ask a Question
              </button>
            </div>

            {/* Badges row matching mockup */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-forge-blue" aria-hidden="true">⚡</span>
                <div>
                  <span className="text-forge-ink font-bold block text-xs">Fast responses</span>
                  <span className="text-[11px] text-forge-muted">No long wait times.</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-neutral-300" aria-hidden="true" />

              <div className="flex items-center gap-2">
                <span className="text-forge-blue" aria-hidden="true">🔒</span>
                <div>
                  <span className="text-forge-ink font-bold block text-xs">Confidential and secure</span>
                  <span className="text-[11px] text-forge-muted">Your information is safe.</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-neutral-300" aria-hidden="true" />

              <div className="flex items-center gap-2">
                <span className="text-forge-blue" aria-hidden="true">👥</span>
                <div>
                  <span className="text-forge-ink font-bold block text-xs">Built for founders</span>
                  <span className="text-[11px] text-forge-muted">From idea to execution.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] uppercase tracking-widest text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              FORTEX FORGE
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              FORGING ABSOLUTE CLARITY
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
