import { useState, useEffect, useRef, type FormEvent } from 'react'
import { useFormspree } from '@/hooks/useFormspree'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

// ─── ContactPage ──────────────────────────────────────────────────────────────
// High-fidelity implementation based on Reference mockups/contact page/ (01.png - 05.png)
// and the Stitch narrative flow. All sections integrate full-bleed spatial backgrounds
// while keeping all functional form submission, honeypot spam protection, and copy intact.
// ─────────────────────────────────────────────────────────────────────────────



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
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | '_general', string>>>({})
  const [step, setStep] = useState<number>(1)

  // ── Formspree Integration ─────────────────────────────────────────────────
  // Form ID: myekkzkz — configured to forward to fortexforge@gmail.com
  // To upgrade to the official package: npm install @formspree/react, then
  // change the import above to: import { useForm as useFormspree } from '@formspree/react'
  const [formspreeState, submitToFormspree] = useFormspree('myekkzkz')

  const honeypotRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // Reset form fields when submission succeeds
  useEffect(() => {
    if (formspreeState.succeeded) {
      setForm(INITIAL)
      setStep(1)
      setErrors({})
    }
  }, [formspreeState.succeeded])

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

    // Honeypot spam guard — silently succeed without submitting
    if (honeypotRef.current?.value) return

    if (!validate()) return

    await submitToFormspree({
      _replyto:  form.workEmail.trim(),
      _subject:  `New Project Inquiry from ${form.fullName.trim()} — ${form.companyName.trim()}`,
      'Full Name':        form.fullName.trim(),
      'Work Email':       form.workEmail.trim(),
      'Phone':            form.phone.trim()        || '(not provided)',
      'Company':          form.companyName.trim(),
      'Website':          form.website.trim()       || '(not provided)',
      'Business Type':    form.businessType         || '(not specified)',
      'Scope':            form.scopes.join(', '),
      'Primary Barrier':  form.primaryBarrier        || '(not specified)',
      'Project Notes':    form.projectNotes.trim(),
      'Budget':           form.budgetRange,
      'Launch Window':    form.launchWindow,
    })
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
        {/* Full-bleed background artwork (Desktop) */}
        <div
          className="hidden lg:block absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src="/assets/contact/01-hero.webp"
            alt=""
            className="w-full h-full object-cover object-right-bottom"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top eyebrow row */}
          <div className="mb-6 lg:mb-14">
            <Eyebrow className="mb-0">LET'S TALK</Eyebrow>
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
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-forge-blue flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <span className="font-display font-bold text-xs text-forge-ink">Send an Email</span>
                </div>
                <span className="text-[11px] text-forge-muted font-medium">We respond within 24 hours.</span>
              </a>

              <a
                href="https://wa.me/2347068811791"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-forge-blue flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <span className="font-display font-bold text-xs text-forge-ink">Chat on WhatsApp</span>
                </div>
                <span className="text-[11px] text-forge-muted font-medium">Quick responses</span>
              </a>

              <a
                href="https://www.linkedin.com/company/fortexforge/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-forge-blue flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
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

            {/* Mobile Hero Executive Desk Asset — matches mobile mockup (01-hero-next.webp) */}
            <div className="lg:hidden mt-10 -mb-4 w-full max-w-md mx-auto aspect-[16/10] relative rounded-2xl overflow-hidden shadow-sm flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <img
                src="/assets/contact/01-hero-mobile.webp"
                alt=""
                className="w-full h-full object-cover object-bottom"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        {/* Bottom Assurance Strip matching mockup 01.png */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 font-semibold border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="text-forge-blue shrink-0">
                <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div>
                <span className="text-forge-ink font-bold block text-[11px]">Fast responses</span>
                <span className="text-[10px] text-neutral-400 font-normal">No long wait times.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-forge-blue shrink-0">
                <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <span className="text-forge-ink font-bold block text-[11px]">Serious about your project</span>
                <span className="text-[10px] text-neutral-400 font-normal">Confidential and professional.</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-forge-blue shrink-0">
                <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <span className="text-forge-ink font-bold block text-[11px]">Built for founders</span>
                <span className="text-[10px] text-neutral-400 font-normal">From idea to execution.</span>
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
        className="relative py-16 lg:py-20 bg-white border-b border-forge-border overflow-hidden min-h-[960px] lg:min-h-[1080px] flex flex-col justify-between"
        aria-labelledby="what-happens-heading"
      >
        {/* Full-bleed what happens next background artwork */}
        <div
          className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          <ResponsiveImage
            desktopSrc="/assets/contact/02-what-happens-next.webp"
            mobileSrc="/assets/contact/02-what-happens-next-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-white/80 lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6 lg:mb-0">
            <div className="max-w-xl">
              <Eyebrow className="mb-3">WHAT HAPPENS NEXT</Eyebrow>
              <h2
                id="what-happens-heading"
                className="text-4xl sm:text-5xl font-display font-bold text-forge-ink tracking-[-0.03em] leading-[1.12] mb-4"
              >
                A clear process.{' '}
                <br />
                From conversation to <span className="text-forge-blue">progress.</span>
              </h2>
              <p className="text-sm sm:text-base text-forge-secondary leading-relaxed">
                No guesswork. No endless back and forth. Just a straightforward process designed to respect your time and get things moving.
              </p>
            </div>

            {/* Handwritten / serif italic script in top right */}
            <div className="hidden lg:flex flex-col items-end pt-2 select-none">
              <div className="font-serif italic text-2xl xl:text-3xl text-neutral-500/90 leading-tight text-right">
                Same<br />mission.<br />Different<br />conversations.
              </div>
              <div className="w-8 h-[2px] bg-forge-blue -rotate-12 mt-3 mr-4 rounded-full" aria-hidden="true" />
            </div>
          </div>

          {/* Dedicated vertical spacer so the 3D artifacts and marble pedestals are completely visible */}
          <div className="hidden lg:block h-48 xl:h-60 2xl:h-68" aria-hidden="true" />

          {/* 5 Process Columns — pure transparent typography directly under each marble pedestal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 pt-6 lg:pt-0 mb-10 lg:mb-12">
            {PROCESS_STEPS.map((s) => (
              <div key={s.num} className="space-y-1.5">
                <span className="font-display text-4xl lg:text-[42px] font-extrabold text-neutral-400/80 block leading-none mb-2">
                  {s.num}
                </span>
                <h3 className="font-display font-bold text-lg lg:text-xl text-forge-ink">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-forge-secondary leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom assurance footer card */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto">
          <div className="bg-white rounded-2xl p-5 sm:p-6 lg:px-8 lg:py-6 border border-neutral-200/90 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-forge-blue flex items-center justify-center shrink-0 border border-blue-100/80">
                <svg className="w-6 h-6 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-forge-ink leading-snug">A Better Way to Start</h4>
                <p className="text-xs text-forge-secondary">We keep the process simple, transparent and professional from the very first conversation.</p>
              </div>
            </div>

            <div className="hidden lg:block w-px h-10 bg-neutral-200/80 shrink-0" aria-hidden="true" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10 w-full lg:w-auto">
              {/* Fast responses */}
              <div className="flex items-start gap-3">
                <div className="text-forge-blue shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-forge-ink block leading-snug">Fast responses</span>
                  <span className="text-[11px] text-forge-muted block">No long wait times.</span>
                </div>
              </div>

              {/* Confidential and secure */}
              <div className="flex items-start gap-3">
                <div className="text-forge-blue shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-forge-ink block leading-snug">Confidential and secure</span>
                  <span className="text-[11px] text-forge-muted block">Your information is safe with us.</span>
                </div>
              </div>

              {/* Built for founders */}
              <div className="flex items-start gap-3">
                <div className="text-forge-blue shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-forge-ink block leading-snug">Built for founders</span>
                  <span className="text-[11px] text-forge-muted block">From idea to execution.</span>
                </div>
              </div>
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
          <ResponsiveImage
            desktopSrc="/assets/contact/03-project-diagnostic.webp"
            mobileSrc="/assets/contact/03-project-diagnostic-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-white/80 lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="mb-8 lg:mb-12">
            <Eyebrow className="mb-0">PROJECT DIAGNOSTIC</Eyebrow>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-8">
            {/* Left Narrative Block — strictly constrained to stay clear of the central basalt rock */}
            <div className="w-full lg:max-w-[360px] xl:max-w-[400px] shrink-0">
              <h2
                id="diagnostic-heading"
                className="text-4xl sm:text-5xl font-display font-bold text-forge-ink leading-[1.08] mb-6 tracking-[-0.03em]"
              >
                Tell us about <br />
                your <span className="text-forge-blue">project.</span>
              </h2>
              <p className="text-sm sm:text-base text-forge-secondary leading-relaxed mb-8">
                A few questions to help us understand your business, your goals, and how we can create the most impact together.
              </p>

              {/* 3 bullet benefits matching mockup 03.png */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/90 border border-neutral-200/90 flex items-center justify-center text-forge-ink shrink-0 shadow-xs">
                    <svg className="w-5 h-5 text-forge-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-forge-ink">Takes 3–5 minutes</h4>
                    <p className="text-xs text-forge-secondary">A short, focused form designed to get straight to the point.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/90 border border-neutral-200/90 flex items-center justify-center text-forge-ink shrink-0 shadow-xs">
                    <svg className="w-5 h-5 text-forge-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-forge-ink">Confidential</h4>
                    <p className="text-xs text-forge-secondary">Your information is safe with us and will never be shared.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/90 border border-neutral-200/90 flex items-center justify-center text-forge-ink shrink-0 shadow-xs">
                    <svg className="w-5 h-5 text-forge-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="22" x2="18" y1="12" y2="12" />
                      <line x1="6" x2="2" y1="12" y2="12" />
                      <line x1="12" x2="12" y1="6" y2="2" />
                      <line x1="12" x2="12" y1="22" y2="18" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-forge-ink">Better recommendations</h4>
                    <p className="text-xs text-forge-secondary">The more context you share, the more value we can provide.</p>
                  </div>
                </div>
              </div>

              {/* Handwritten / serif italic script on blueprint paper at bottom left matching 03.png */}
              <div className="pt-8 lg:pt-10 select-none hidden lg:block">
                <div className="font-serif italic text-2xl xl:text-3xl text-neutral-600/90 leading-tight">
                  Same<br />mission.<br />Different<br />conversations.
                </div>
                <div className="w-8 h-[2px] bg-forge-blue -rotate-12 mt-3 rounded-full" aria-hidden="true" />
              </div>
            </div>

            {/* Right Interactive Form Container matching 03.png */}
            <div className="w-full lg:max-w-[580px] xl:max-w-[640px] shrink-0 lg:ml-auto">
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-7 sm:p-10 shadow-xl">
                {/* Honeypot field for bot spam prevention */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="sr-only"
                />

                {formspreeState.succeeded ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-forge-blue/10 text-forge-blue flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                      ✓
                    </div>
                    <h3 className="font-display font-bold text-2xl text-forge-ink mb-2">Brief received.</h3>
                    <p className="text-sm text-forge-secondary max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you for submitting your project diagnostic. We review every brief within 24 hours and will reach out with recommendations.
                    </p>
                    <a
                      href="/contact"
                      className="px-6 py-2.5 rounded-full bg-forge-ink text-white text-xs font-semibold hover:bg-neutral-800 transition-all inline-block"
                    >
                      Submit Another Brief
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Top step progress indicator matching 03.png */}
                    <div className="pb-6 border-b border-neutral-200/80">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs uppercase tracking-wider font-bold text-forge-blue">
                            STEP {step} OF 3
                          </span>
                          <div className="flex items-center gap-1.5" aria-hidden="true">
                            {[1, 2, 3].map((s) => (
                              <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  s <= step ? 'w-8 bg-forge-blue' : 'w-8 bg-neutral-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold tracking-wider text-neutral-400">PROJECT CLARITY</span>
                          <span className="font-display font-extrabold text-xl text-forge-blue">
                            {step === 1 ? '33%' : step === 2 ? '66%' : '100%'}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-2xl text-forge-ink tracking-tight">
                        {step === 1 && "Let's start with the basics."}
                        {step === 2 && "What are you looking to achieve?"}
                        {step === 3 && "Budget & timeline expectations."}
                      </h3>
                      <p className="text-xs text-forge-secondary mt-1">
                        {step === 1 && "Help us get to know you and your business."}
                        {step === 2 && "Select the services and challenges that match your goals."}
                        {step === 3 && "Help us calibrate our scope recommendations to your reality."}
                      </p>
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
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                              placeholder="e.g. 07068811791"
                              className="w-full bg-white border border-neutral-300 rounded-xl px-4 py-3 text-sm text-forge-ink focus:outline-none focus:border-forge-blue focus:ring-1 focus:ring-forge-blue transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        </div>


                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                          <span className="text-xs text-forge-secondary font-medium">Step 2: Your Current Situation</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (!form.fullName.trim() || !form.workEmail.trim() || !form.companyName.trim()) {
                                validate()
                                return
                              }
                              setStep(2)
                            }}
                            className="px-8 py-3.5 rounded-full bg-forge-blue text-white text-sm font-semibold hover:bg-forge-blue-hover transition-all flex items-center gap-2 shadow-md shadow-forge-blue/20"
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

                        <div className="flex justify-between items-center pt-4 flex-wrap gap-4">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="text-xs font-bold text-forge-muted hover:text-forge-ink"
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={formspreeState.submitting}
                            className="px-9 py-4 rounded-full bg-forge-blue text-white text-sm font-semibold shadow-lg shadow-forge-blue/25 hover:bg-forge-blue-hover transition-all flex items-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {formspreeState.submitting ? (
                              <>
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                                </svg>
                                Sending…
                              </>
                            ) : 'Submit Diagnostic Brief ↗'}
                          </button>
                        </div>

                        {/* Formspree server-side error display */}
                        {formspreeState.errors.length > 0 && (
                          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700" role="alert">
                            {formspreeState.errors.map((err, i) => (
                              <p key={i}>{err.message}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar matching mockup 03.png */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-forge-secondary border-t border-neutral-200/80 pt-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-wider text-forge-ink uppercase">FORTEX FORGE</span>
            </div>
            <div className="text-neutral-400">
              Strategy-led. Results-driven. <span className="mx-2">—</span>
            </div>
            <div className="text-forge-secondary">
              Your brand's next chapter starts here.
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
          <ResponsiveImage
            desktopSrc="/assets/contact/04-alternative-contact.webp"
            mobileSrc="/assets/contact/04-alternative-contact-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:hidden" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="mb-10 lg:mb-14">
            <Eyebrow className="mb-0">OTHER WAYS TO REACH US</Eyebrow>
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
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-forge-blue flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
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
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-forge-blue flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg text-forge-ink mb-1">WhatsApp</h3>
                <p className="text-xs text-forge-secondary leading-relaxed mb-4">
                  Prefer a casual chat? Message us on WhatsApp.
                </p>
                <span className="font-mono text-xs font-bold text-forge-blue block mb-6">Quick responses</span>
              </div>
              <a
                href="https://wa.me/2347068811791"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forge-ink hover:text-forge-blue transition-colors"
              >
                Chat on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-forge-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-forge-blue flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-lg text-forge-ink mb-1">LinkedIn</h3>
                <p className="text-xs text-forge-secondary leading-relaxed mb-4">
                  Let's connect professionally and talk about opportunities.
                </p>
                <span className="font-mono text-xs font-bold text-forge-blue block mb-6">fortexforge</span>
              </div>
              <a
                href="https://www.linkedin.com/company/fortexforge/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forge-ink hover:text-forge-blue transition-colors"
              >
                View Company Page <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Assurance card matching mockup 04.png */}
          <div className="max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-forge-blue flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forge-ink">Response Time</h4>
                <p className="text-xs text-forge-secondary">We typically respond within 24 hours (Mon – Fri).</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-200" aria-hidden="true" />
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-forge-blue flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forge-ink">Your Information is Safe</h4>
                <p className="text-xs text-forge-secondary">We respect your privacy. Your details will only be used to discuss your project.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar matching mockup 04.png */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto pt-10">
          <div className="flex items-center justify-between text-xs text-forge-secondary border-t border-neutral-200/80 pt-6">
            <span className="font-display font-bold tracking-wider text-forge-ink uppercase">FORTEX FORGE</span>
            <span className="text-neutral-400">Forging Absolute Clarity</span>
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
          <ResponsiveImage
            desktopSrc="/assets/contact/05-closing.webp"
            mobileSrc="/assets/contact/05-closing-mobile.webp"
            alt=""
            className="w-full h-full object-cover object-bottom lg:object-right-bottom"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mb-auto">
          {/* Top header row */}
          <div className="mb-10 lg:mb-14">
            <Eyebrow className="mb-0">FINAL THOUGHT</Eyebrow>
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

            {/* Badges row matching mockup 05.png */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="text-forge-blue shrink-0">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <span className="text-forge-ink font-bold block text-xs">Fast responses</span>
                  <span className="text-[11px] text-forge-muted block">No long wait times.</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-neutral-200" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <div className="text-forge-blue shrink-0">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <div>
                  <span className="text-forge-ink font-bold block text-xs">Confidential and secure</span>
                  <span className="text-[11px] text-forge-muted block">Your information is safe with us.</span>
                </div>
              </div>

              <div className="hidden sm:block w-px h-6 bg-neutral-200" aria-hidden="true" />

              <div className="flex items-center gap-3">
                <div className="text-forge-blue shrink-0">
                  <svg className="w-5 h-5 text-forge-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <span className="text-forge-ink font-bold block text-xs">Built for founders</span>
                  <span className="text-[11px] text-forge-muted block">From idea to execution.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar matching mockup 05.png */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 relative z-10 w-full mt-auto pt-10">
          <div className="flex items-center justify-between text-xs text-forge-secondary border-t border-neutral-200/80 pt-6">
            <span className="font-display font-bold tracking-wider text-forge-ink uppercase">FORTEX FORGE</span>
            <span className="text-neutral-400">Forging Absolute Clarity</span>
          </div>
        </div>
      </section>
    </>
  )
}
