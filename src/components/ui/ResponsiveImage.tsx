import type { ImgHTMLAttributes } from 'react'

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  mobileSrc?: string
  desktopSrc: string
  breakpoint?: number
  fetchPriority?: 'high' | 'low' | 'auto'
}

/**
 * Renders an image that seamlessly swaps to a portrait/mobile-optimized asset
 * on screen widths <= breakpoint (default 1023px).
 * Uses native <picture className="contents"> so styles and positioning apply directly to <img>.
 */
export default function ResponsiveImage({
  mobileSrc,
  desktopSrc,
  breakpoint = 1023,
  alt = '',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  ...props
}: ResponsiveImageProps) {
  if (!mobileSrc) {
    return (
      <img
        src={desktopSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        {...props}
      />
    )
  }

  return (
    <picture className="contents" aria-hidden="true">
      <source media={`(max-width: ${breakpoint}px)`} srcSet={mobileSrc} />
      <img
        src={desktopSrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        {...props}
      />
    </picture>
  )
}
