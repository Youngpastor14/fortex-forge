import type { NavItem } from '@/types/content'

// ─── Primary Navigation ──────────────────────────────────────────────────────
// Desktop header nav + mobile drawer.
// Order matches the approved page hierarchy from the A01 audit.

export const primaryNav: NavItem[] = [
  { label: 'About',    href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Work',     href: '/work'     },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact',  href: '/contact'  },
]

// ─── Footer Navigation ───────────────────────────────────────────────────────

export const footerNav = {
  platform: [
    { label: 'Services',    href: '/services' },
    { label: 'Our Work',    href: '/work'     },
    { label: 'Insights',    href: '/insights' },
  ],
  company: [
    { label: 'About',       href: '/about'    },
    { label: 'Contact',     href: '/contact'  },
    { label: "Let's Talk",  href: '/contact'  },
  ],
  connect: [
    { label: 'LinkedIn',    href: 'https://www.linkedin.com/company/fortexforge/' },
    { label: 'Instagram',   href: '#' },  // TODO: update with real URL
    { label: 'X / Twitter', href: '#' },  // TODO: update with real URL
  ],
}
