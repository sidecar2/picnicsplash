import { CSSProperties, forwardRef, ReactNode } from 'react'

export type BannerTheme = 'dark' | 'light' | 'teal' | 'orange' | 'custom'

export interface BannerProps {
  /** Main title text */
  title: string
  /** Subtitle/description text */
  subtitle?: string
  /** CTA button text */
  ctaText?: string
  /** Callback when CTA is clicked */
  onCtaClick?: () => void
  /** URL of the banner image (right side) */
  imageUrl?: string
  /** Optional logo/icon element or URL (left side) */
  logo?: ReactNode | string
  /** Theme preset */
  theme?: BannerTheme
  /** Custom background color (overrides theme) */
  backgroundColor?: string
  /** Custom text color (overrides theme) */
  textColor?: string
  /** Custom button background color (overrides theme) */
  buttonColor?: string
  /** Custom button text color (overrides theme) */
  buttonTextColor?: string
  /** Additional CSS class name */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
}

const themes: Record<BannerTheme, { bg: string; text: string; buttonBg: string; buttonText: string }> = {
  dark: {
    bg: '#23393B',
    text: '#EFEBE5',
    buttonBg: '#EFEBE5',
    buttonText: '#1F1812',
  },
  light: {
    bg: '#F7F7F2',
    text: '#141414',
    buttonBg: '#141414',
    buttonText: '#FFFFFF',
  },
  teal: {
    bg: '#00796B',
    text: '#FFFFFF',
    buttonBg: '#FFFFFF',
    buttonText: '#00796B',
  },
  orange: {
    bg: '#F74C25',
    text: '#FFFFFF',
    buttonBg: '#FFFFFF',
    buttonText: '#F74C25',
  },
  custom: {
    bg: '#23393B',
    text: '#EFEBE5',
    buttonBg: '#EFEBE5',
    buttonText: '#1F1812',
  },
}

const styles: Record<string, CSSProperties> = {
  banner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    overflow: 'hidden',
    position: 'relative',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    zIndex: 1,
  },
  logo: {
    width: 48,
    height: 48,
    flexShrink: 0,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  title: {
    fontFamily: "'P22 Mackinac Pro', serif",
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '24px',
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20px',
    margin: 0,
    opacity: 0.9,
    maxWidth: 400,
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '8px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    transition: 'opacity 0.15s ease',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '40%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 80,
    background: 'linear-gradient(90deg, var(--banner-bg) 0%, transparent 100%)',
  },
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      title,
      subtitle,
      ctaText,
      onCtaClick,
      imageUrl,
      logo,
      theme = 'dark',
      backgroundColor,
      textColor,
      buttonColor,
      buttonTextColor,
      className,
      style,
    },
    ref
  ) => {
    const themeColors = themes[theme]
    const bgColor = backgroundColor || themeColors.bg
    const txtColor = textColor || themeColors.text
    const btnBgColor = buttonColor || themeColors.buttonBg
    const btnTxtColor = buttonTextColor || themeColors.buttonText

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...styles.banner,
          backgroundColor: bgColor,
          // @ts-ignore - CSS custom property for gradient
          '--banner-bg': bgColor,
          ...style,
        }}
        data-component="banner"
      >
        {/* Content Section */}
        <div style={styles.contentWrapper}>
          {logo && (
            <div style={styles.logo}>
              {typeof logo === 'string' ? (
                <img src={logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                logo
              )}
            </div>
          )}
          <div style={styles.textContent}>
            <h3 style={{ ...styles.title, color: txtColor }}>{title}</h3>
            {subtitle && (
              <p style={{ ...styles.subtitle, color: txtColor }}>{subtitle}</p>
            )}
            {/* CTA Button */}
            {ctaText && (
              <button
                style={{
                  ...styles.ctaButton,
                  backgroundColor: btnBgColor,
                  color: btnTxtColor,
                }}
                onClick={onCtaClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                {ctaText}
              </button>
            )}
          </div>
        </div>

        {/* Background Image */}
        {imageUrl && (
          <div style={styles.imageContainer}>
            <div style={{ ...styles.imageOverlay, background: `linear-gradient(90deg, ${bgColor} 0%, transparent 100%)` }} />
            <img src={imageUrl} alt="" style={styles.image} />
          </div>
        )}
      </div>
    )
  }
)

Banner.displayName = 'Banner'
