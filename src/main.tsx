import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// ─── Entry Point ─────────────────────────────────────────────────────────────
// StrictMode: intentionally kept in production entry for double-render detection.
// Remove only if third-party libraries cause issues with StrictMode double-invocation.
// ─────────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
