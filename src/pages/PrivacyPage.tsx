import { Link } from 'react-router-dom'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function PrivacyPage() {
  return (
    <div className="py-20 lg:py-28 bg-white border-b border-forge-border">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <SectionEyebrow>LEGAL &amp; PRIVACY</SectionEyebrow>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-forge-ink tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-forge-secondary mb-12">
          Last updated: January 2026 · Fortex Forge Ltd
        </p>

        <div className="space-y-8 text-forge-secondary text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">1. Information We Collect</h2>
            <p>
              When you submit an inquiry or project diagnostic on Fortex Forge, we collect your name, work email address, company name, phone number, website URL, and details related to your project requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">2. How We Use Your Information</h2>
            <p>
              Information collected is used solely to respond to your project brief, schedule discovery consultations, prepare customized proposals, and provide strategic brand consulting services. We do not sell or rent personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">3. Confidentiality &amp; Security</h2>
            <p>
              All proprietary business models, preliminary designs, and client briefs shared with Fortex Forge are treated under strict professional confidentiality. We employ modern TLS encryption and security controls to safeguard data transmissions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-forge-ink">4. Contact Us</h2>
            <p>
              If you have questions regarding this Privacy Policy, please contact our team at{' '}
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
