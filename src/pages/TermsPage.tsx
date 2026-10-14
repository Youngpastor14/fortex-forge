import { Link } from 'react-router-dom'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function TermsPage() {
  return (
    <div className="py-20 lg:py-28 bg-white border-b border-forge-border">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <SectionEyebrow>TERMS &amp; CONDITIONS</SectionEyebrow>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-forge-ink tracking-tight mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-forge-secondary mb-12">
          Last updated: January 2026 · Fortex Forge Ltd
        </p>

        <div className="space-y-8 text-forge-secondary text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">1. Engagement Overview</h2>
            <p>
              Fortex Forge Ltd provides strategic branding, identity design, web development, and digital consultancy services. Specific project deliverables, milestone dates, and payment schedules are governed by dedicated project proposals and master service agreements agreed prior to project kickoff.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">2. Intellectual Property</h2>
            <p>
              Upon full settlement of all agreed project fees, clients receive full ownership and usage rights to final approved brand assets, identity packages, and custom codebases, as stipulated in individual project contracts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">3. Accuracy of Materials</h2>
            <p>
              Materials provided by clients for project execution must be owned by the client or properly licensed. Fortex Forge operates with the utmost professional standard to produce original, legally defensible brand and web systems.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">4. Inquiries &amp; Governance</h2>
            <p>
              For legal inquiries regarding terms and client engagements, contact{' '}
              <a href="mailto:fortexforge@gmail.com" className="text-forge-blue hover:underline">
                fortexforge@gmail.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-forge-border">
          <Link to="/" className="btn-primary inline-flex">
            Back to Home ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
