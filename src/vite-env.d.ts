// CSS module type declarations for Vite's virtual imports
declare module '*.css' {
  const content: string
  export default content
}

// Image asset declarations
declare module '*.webp' {
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}

// ── Vite environment variables ────────────────────────────────────────────────
// Declare all VITE_* variables used in the application.
// Access via import.meta.env.VITE_* (string | undefined at runtime).
interface ImportMetaEnv {
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
