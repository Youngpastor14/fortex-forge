import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Forge Brand Palette ───────────────────────────────────────────────
        forge: {
          blue:       '#1557FF',   // Primary accent (CRIT-06: canonical, never deviate)
          'blue-hover': '#0D3FD4', // Deep blue: hover / pressed state
          'blue-soft': '#E8EFFE',  // Soft tint: pill badges, secondary surfaces
          ink:        '#0D1117',   // Primary deep ink (display headings, nav, footer)
          secondary:  '#3D4657',   // Body text, readable dark grey
          muted:      '#5A6270',   // Subheads, captions, secondary labels (WCAG AA safe)
          subtle:     '#747E91',   // Eyebrow text, metadata (use only at ≥14px weight 600+)
          border:     '#E1E5EC',   // Canonical 1px hairline rule
          canvas:     '#FFFFFF',   // Primary white canvas
          surface:    '#F7F8FA',   // Section alt background (stone-light)
          container:  '#EEF1F6',   // High-contrast neutral container
        },
        // ─── Functional / System Colors ────────────────────────────────────────
        status: {
          success:  '#16A34A', // Form success state
          error:    '#DC2626', // Form error state
          warning:  '#D97706', // Warning state
          info:     '#1557FF', // Info state (reuses Forge Blue)
        },
      },
      fontFamily: {
        // ─── Approved Fortex Forge Typography ─────────────────────────────────
        display: ['"Instrument Sans"', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        heading: ['"Instrument Sans"', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        body:    ['"Inter"',           'system-ui', 'ui-sans-serif', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        // Headline tight tracking
        'display':  '-0.035em',
        'heading':  '-0.025em',
        'subhead':  '-0.015em',
        // Eyebrow / label wide tracking
        'eyebrow':  '0.12em',
        'label':    '0.02em',
        'widest':   '0.14em',
      },
      lineHeight: {
        'display':  '1.05',
        'heading':  '1.1',
        'subhead':  '1.2',
        'body':     '1.6',
        'relaxed':  '1.7',
        'tight':    '1.25',
      },
      fontSize: {
        // ─── Typography Scale ──────────────────────────────────────────────────
        // Display
        'display-xl': ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-lg': ['3.5rem',  { lineHeight: '1.08', letterSpacing: '-0.03em'  }],
        'display-md': ['2.75rem', { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        // Headings
        'h1':         ['3.5rem',  { lineHeight: '1.1',  letterSpacing: '-0.03em'  }],
        'h2':         ['2.5rem',  { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'h3':         ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.02em'  }],
        'h4':         ['1.25rem', { lineHeight: '1.3',  letterSpacing: '-0.01em'  }],
        // Body
        'body-xl':    ['1.25rem', { lineHeight: '1.6',  letterSpacing: '-0.01em'  }],
        'body-lg':    ['1.125rem',{ lineHeight: '1.6',  letterSpacing: '-0.005em' }],
        'body-md':    ['1rem',    { lineHeight: '1.6',  letterSpacing: '0'         }],
        'body-sm':    ['0.875rem',{ lineHeight: '1.5',  letterSpacing: '0'         }],
        // Labels & UI
        'label-md':   ['0.875rem',{ lineHeight: '1.4',  letterSpacing: '0'         }],
        'label-sm':   ['0.75rem', { lineHeight: '1.4',  letterSpacing: '0.02em'   }],
        'eyebrow':    ['0.6875rem',{ lineHeight: '1.2', letterSpacing: '0.14em'   }],
      },
      spacing: {
        // ─── Spacing Scale ─────────────────────────────────────────────────────
        '2xs':  '0.25rem',   //  4px
        'xs':   '0.5rem',    //  8px
        'sm':   '0.75rem',   // 12px
        'md':   '1rem',      // 16px
        'lg':   '1.5rem',    // 24px
        'xl':   '2rem',      // 32px
        '2xl':  '3rem',      // 48px
        '3xl':  '4.5rem',    // 72px
        '4xl':  '7.5rem',    // 120px
        '5xl':  '10rem',     // 160px
        // Section vertical rhythm
        'section-sm': '5rem',    //  80px  mobile section
        'section-md': '6rem',    //  96px  tablet section
        'section-lg': '8rem',    // 128px  desktop section
        'section-xl': '10rem',   // 160px  hero / closing sections
        // Horizontal gutters
        'gutter-sm': '1rem',     // mobile
        'gutter-md': '1.5rem',   // tablet
        'gutter-lg': '2rem',     // desktop
        'gutter-xl': '3rem',     // wide desktop
        // Container margins
        'margin-sm': '1.25rem',
        'margin-md': '2.5rem',
        'margin-lg': '4rem',
      },
      borderRadius: {
        'sm':   '0.25rem',   //  4px
        DEFAULT:'0.5rem',    //  8px  card interiors, chips
        'md':   '0.75rem',   // 12px  standard cards
        'lg':   '1rem',      // 16px  elevated cards
        'xl':   '1.5rem',    // 24px  hero cards, feature panels
        '2xl':  '2rem',      // 32px  showcase containers
        'pill': '9999px',    // Pill: all CTAs, badges, filter tabs
      },
      boxShadow: {
        // ─── Elevation System ──────────────────────────────────────────────────
        'ambient': '0 8px 30px rgba(13, 17, 23, 0.04), 0 1px 3px rgba(13, 17, 23, 0.02)',
        'card':    '0 2px 8px rgba(13, 17, 23, 0.04)',
        'card-hover': '0 16px 36px rgba(13, 17, 23, 0.06)',
        // Forge Blue CTA glow
        'cta':     '0 8px 24px rgba(21, 87, 255, 0.28)',
        'cta-hover':'0 12px 28px rgba(21, 87, 255, 0.36)',
        // Subtle nav blur shadow
        'nav':     '0 1px 0 rgba(225, 229, 236, 0.8)',
      },
      maxWidth: {
        // ─── Container System ──────────────────────────────────────────────────
        'container':    '80rem',    // 1280px – standard content
        'wide':         '90rem',    // 1440px – portfolio / visual-heavy
        'editorial':    '52rem',    //  832px – long-form copy / Insights
        'form':         '48rem',    //  768px – Contact diagnostic form
        'narrow':       '38rem',    //  608px – pull-quote / tight copy
      },
      transitionTimingFunction: {
        'forge': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        'fast':     '150ms',
        'standard': '250ms',
        'slow':     '400ms',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.3s ease both',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
  ],
}

export default config
