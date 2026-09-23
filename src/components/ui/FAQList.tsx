import { useState } from 'react'
import type { FAQ } from '@/types/content'

interface FAQItemProps {
  faq: FAQ
  defaultOpen?: boolean
}

// ─── FAQItem ─────────────────────────────────────────────────────────────────
// Accessible accordion item. Uses <details>/<summary> for native behaviour,
// with controlled state for animation.
// Keyboard: Space/Enter on summary toggles open/close.
// ─────────────────────────────────────────────────────────────────────────────

export function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div
      className="border-b border-forge-border last:border-b-0"
    >
      <button
        type="button"
        className="w-full flex items-start justify-between gap-4 py-5 text-left
                   group transition-colors duration-fast
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forge-blue/40
                   focus-visible:ring-offset-2 focus-visible:rounded-sm"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        id={`faq-trigger-${faq.id}`}
        aria-controls={`faq-panel-${faq.id}`}
      >
        <span className="font-display font-semibold text-body-lg text-forge-ink
                         group-hover:text-forge-blue transition-colors duration-fast
                         text-balance leading-snug pr-2">
          {faq.question}
        </span>

        {/* +/− icon */}
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full border border-forge-border
                     flex items-center justify-center mt-0.5
                     transition-all duration-standard
                     group-hover:border-forge-blue group-hover:bg-forge-blue-soft"
          aria-hidden="true"
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className={[
              'text-forge-muted group-hover:text-forge-blue',
              'transition-transform duration-standard',
              isOpen ? 'rotate-45' : '',
            ].join(' ')}
            fill="none"
          >
            {/* Plus / X cross */}
            <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Answer panel */}
      <div
        id={`faq-panel-${faq.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${faq.id}`}
        hidden={!isOpen}
        className={[
          'overflow-hidden transition-all duration-standard ease-forge',
          isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="pb-6 pr-10">
          <p className="text-body-md text-forge-secondary leading-relaxed whitespace-pre-line">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── FAQList ─────────────────────────────────────────────────────────────────

interface FAQListProps {
  faqs: FAQ[]
  className?: string
}

export default function FAQList({ faqs, className = '' }: FAQListProps) {
  return (
    <div
      className={['divide-y divide-forge-border rounded-xl overflow-hidden', className].join(' ')}
      role="list"
      aria-label="Frequently asked questions"
    >
      {faqs.map((faq) => (
        <div role="listitem" key={faq.id}>
          <FAQItem faq={faq} />
        </div>
      ))}
    </div>
  )
}
