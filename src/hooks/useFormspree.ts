import { useState } from 'react'

// ─── useFormspree ────────────────────────────────────────────────────────────
// Local implementation of @formspree/react's useForm hook.
//
// To swap to the official package later:
//   1. Run: npm install @formspree/react
//   2. In ContactPage.tsx change:
//        import { useFormspree } from '@/hooks/useFormspree'
//      to:
//        import { useForm as useFormspree } from '@formspree/react'
//   3. Delete this file.
//
// The interface is identical so no other code changes are needed.
// ─────────────────────────────────────────────────────────────────────────────

export interface FormspreeError {
  field?: string
  message: string
  code?: string
}

export interface FormspreeState {
  submitting: boolean
  succeeded: boolean
  errors: FormspreeError[]
}

type Payload = Record<string, string | string[] | number | boolean | undefined>

const FORMSPREE_BASE = 'https://formspree.io/f'

/**
 * Drop-in replacement for @formspree/react's useForm hook.
 *
 * @param formId - The Formspree form ID (e.g. 'myekkzkz')
 * @returns [state, submit] tuple identical to @formspree/react
 *
 * Usage:
 *   const [state, submit] = useFormspree('myekkzkz')
 *   await submit({ email: '...', message: '...' })
 *   if (state.succeeded) { ... }
 */
export function useFormspree(formId: string): [FormspreeState, (data: Payload) => Promise<void>] {
  const [state, setState] = useState<FormspreeState>({
    submitting: false,
    succeeded: false,
    errors: [],
  })

  const submit = async (data: Payload): Promise<void> => {
    setState({ submitting: true, succeeded: false, errors: [] })

    try {
      const res = await fetch(`${FORMSPREE_BASE}/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const body = await res.json().catch(() => ({}))

      if (res.ok) {
        setState({ submitting: false, succeeded: true, errors: [] })
      } else {
        // Formspree returns { errors: [{field, message, code}] } on 4xx
        const apiErrors: FormspreeError[] = Array.isArray(body?.errors)
          ? body.errors
          : [{ message: body?.error ?? 'Submission failed. Please try again.' }]
        setState({ submitting: false, succeeded: false, errors: apiErrors })
      }
    } catch {
      setState({
        submitting: false,
        succeeded: false,
        errors: [{ message: 'Network error. Please check your connection and try again.' }],
      })
    }
  }

  return [state, submit]
}
