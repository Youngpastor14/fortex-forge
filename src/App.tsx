import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PageShell from '@/components/layout/PageShell'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import WorkPage from '@/pages/WorkPage'
import WorkDetailPage from '@/pages/WorkDetailPage'
import InsightsPage from '@/pages/InsightsPage'
import InsightDetailPage from '@/pages/InsightDetailPage'
import ContactPage from '@/pages/ContactPage'

// ─── App ─────────────────────────────────────────────────────────────────────
// Root router and route table.
// All pages wrapped in PageShell (skip link + GlobalHeader + GlobalFooter).
// ─────────────────────────────────────────────────────────────────────────────

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display font-bold text-forge-ink text-h2 mb-4">
        Page not found
      </h1>
      <p className="text-body-lg text-forge-secondary mb-8">
        This page doesn't exist. Perhaps it was moved, or you followed a broken link.
      </p>
      <a href="/" className="btn-primary">
        Back to Home
      </a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PageShell>
        <Routes>
          <Route path="/"                element={<HomePage />}          />
          <Route path="/about"           element={<AboutPage />}         />
          <Route path="/services"        element={<ServicesPage />}      />
          <Route path="/work"            element={<WorkPage />}          />
          <Route path="/work/:slug"      element={<WorkDetailPage />}    />
          <Route path="/insights"        element={<InsightsPage />}      />
          <Route path="/insights/:slug"  element={<InsightDetailPage />} />
          <Route path="/contact"         element={<ContactPage />}       />
          <Route path="*"                element={<NotFound />}          />
        </Routes>
      </PageShell>
    </BrowserRouter>
  )
}
