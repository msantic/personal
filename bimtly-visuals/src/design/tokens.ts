/**
 * BIMTLY Design System Tokens
 *
 * Shared design tokens for videos, flyers, and all visual assets.
 * Import this file to maintain brand consistency across the codebase.
 */

// =============================================================================
// COLORS
// =============================================================================

export const COLORS = {
  // Primary Brand
  primary: '#2563EB',       // rgba(37, 99, 235, 1) - Main brand blue
  primaryDark: '#1d4ed8',   // Darker blue for gradients
  primaryLight: '#3b82f6',  // Lighter blue for hover states

  // Extended Palette
  indigo: '#6366f1',        // Secondary accents
  purple: '#8b5cf6',        // Gradient endpoints
  violet: '#a855f7',        // Accent gradients
  teal: '#14b8a6',          // Accent highlights

  // Semantic
  success: '#22c55e',       // Checkmarks, positive states
  error: '#f87171',         // Warnings, negative states
  warning: '#fbbf24',       // Caution states

  // Neutrals - Light Theme
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',

  // Dark Theme Backgrounds
  darkBg: '#0a0a0f',
  darkBgMid: '#1a1a2e',
  darkBgEnd: '#16213e',

  // Grid line color (hero backgrounds)
  gridLineLight: '#e2e8f0',
} as const;

// =============================================================================
// THEMES
// =============================================================================

export const THEME = {
  light: {
    background: COLORS.white,
    backgroundSecondary: COLORS.gray50,
    text: COLORS.gray900,
    textSecondary: COLORS.gray600,
    textMuted: COLORS.gray400,
    border: COLORS.gray200,
    borderSubtle: COLORS.gray100,
    gridLine: `rgba(37, 99, 235, 0.08)`,
    cardBg: COLORS.white,
    cardBorder: COLORS.gray200,
  },
  dark: {
    background: `linear-gradient(180deg, ${COLORS.darkBg} 0%, ${COLORS.darkBgMid} 50%, ${COLORS.darkBgEnd} 100%)`,
    backgroundSolid: COLORS.darkBg,
    text: COLORS.white,
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderSubtle: 'rgba(255, 255, 255, 0.05)',
    gridLine: 'rgba(37, 99, 235, 0.04)',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
  },
} as const;

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const TYPOGRAPHY = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  // Font weights
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Video scale (1920x1080 base)
  video: {
    hero: { size: 42, weight: 800, letterSpacing: -1 },
    title: { size: 38, weight: 600, letterSpacing: -0.5 },
    subtitle: { size: 28, weight: 500, letterSpacing: 0 },
    label: { size: 26, weight: 600, letterSpacing: 0.5 },
    body: { size: 20, weight: 400, letterSpacing: 0 },
    caption: { size: 14, weight: 600, letterSpacing: 2 },
  },

  // Print scale (A4)
  print: {
    hero: { size: 36, weight: 800, letterSpacing: -0.5 },
    section: { size: 20, weight: 700, letterSpacing: -0.25 },
    card: { size: 14, weight: 700, letterSpacing: 0 },
    body: { size: 13, weight: 400, letterSpacing: 0 },
    caption: { size: 11, weight: 600, letterSpacing: 1.5 },
  },
} as const;

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const SPACING = {
  // Base unit: 4px
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 50,
  circle: '50%',
} as const;

// =============================================================================
// VIDEO SPECIFIC
// =============================================================================

export const VIDEO = {
  // Standard dimensions
  dimensions: {
    web: { width: 1920, height: 1080 },
    youtube: { width: 1920, height: 1080 },
    instagram: { width: 1080, height: 1080 },
    reels: { width: 1080, height: 1920 },
    tiktok: { width: 1080, height: 1920 },
    linkedin: { width: 1920, height: 1080 },
    portrait: { width: 1080, height: 1350 },
  },

  // Frame rates
  fps: 30,

  // Animation configs (for Remotion spring)
  spring: {
    gentle: { damping: 15, stiffness: 80 },
    snappy: { damping: 12, stiffness: 100 },
    bouncy: { damping: 10, stiffness: 120 },
  },

  // Timing (in frames at 30fps)
  timing: {
    fadeIn: 20,          // ~0.67s
    fadeOut: 25,         // ~0.83s
    holdMin: 60,         // 2s minimum hold
    transitionGap: 30,   // 1s between elements
  },
} as const;

// =============================================================================
// GRADIENTS
// =============================================================================

export const GRADIENTS = {
  // Primary brand gradient
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.indigo} 100%)`,
  primaryVertical: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,

  // Extended
  purpleBlue: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.purple} 100%)`,
  accent: `linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.indigo} 50%, ${COLORS.purple} 100%)`,

  // Subtle overlays
  lightFade: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 100%)',
  darkFade: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
} as const;

// =============================================================================
// SHADOWS
// =============================================================================

export const SHADOWS = {
  // Light theme
  sm: '0 1px 3px rgba(0, 0, 0, 0.04)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 30px rgba(0, 0, 0, 0.12)',

  // Brand glow
  primaryGlow: `0 4px 20px rgba(37, 99, 235, 0.3)`,
  primaryGlowLg: `0 8px 40px rgba(37, 99, 235, 0.4)`,

  // Card
  card: '0 2px 8px rgba(37, 99, 235, 0.1)',
  cardHover: '0 4px 20px rgba(37, 99, 235, 0.25)',
} as const;

// =============================================================================
// BACKGROUNDS
// =============================================================================

/**
 * Background patterns and gradients for hero sections and page backgrounds.
 *
 * Matches the BIMTLY website hero section styling:
 * - Subtle grid pattern indicates technical/engineering background
 * - Purple/indigo glow from top adds depth and visual interest
 * - Warm orange flare creates approachable, modern feel
 *
 * @example
 * ```tsx
 * // Using the HeroBackground component (recommended)
 * import { HeroBackground } from '../design';
 * <HeroBackground flarePosition="80% 80%">
 *   <YourContent />
 * </HeroBackground>
 *
 * // Using tokens directly
 * <div style={{ background: BACKGROUNDS.hero.topGlow }} />
 * ```
 *
 * @see HeroBackground component in src/design/HeroBackground.tsx
 * @see CSS utilities in src/design/backgrounds.css
 */
// Hero background colors (single source of truth)
const HERO_COLORS = {
  indigo: 'rgba(120, 119, 198, 0.6)',
  orange: 'rgba(232, 128, 54, 0.9)',
} as const;

export const BACKGROUNDS = {
  /**
   * Grid pattern configurations for technical/engineering aesthetic.
   * Use `getGridCSS()` helper to generate the CSS properties.
   */
  grid: {
    /** Light gray grid matching website (12px, 60% opacity) */
    light: { color: COLORS.gridLineLight, size: 12, opacity: 0.6 },
    /** Blue-tinted grid for brand consistency (20px, full opacity) */
    brand: { color: 'rgba(37, 99, 235, 0.08)', size: 20, opacity: 1 },
  },

  /**
   * Hero section gradient overlays.
   * Layer order (bottom to top): grid → warmFlare → topGlow
   */
  hero: {
    /** Purple/indigo color for top glow */
    indigoColor: HERO_COLORS.indigo,
    /** Warm orange color for flare */
    orangeColor: HERO_COLORS.orange,

    /**
     * Purple/indigo radial gradient from top edge.
     * Positioned at 50% -20% to create glow effect from above.
     */
    topGlow: `radial-gradient(ellipse 80% 80% at 50% -20%, ${HERO_COLORS.indigo}, rgba(255,255,255,0))`,

    /**
     * Warm orange radial flare with configurable position.
     * @param position - CSS position value, e.g., "50% 50%" (center), "80% 80%" (bottom-right)
     */
    warmFlare: (position = '50% 50%') =>
      `radial-gradient(circle at ${position}, ${HERO_COLORS.orange} 0%, rgba(255, 255, 255, 1) 58%)`,

    /** Default opacity for the warm flare layer (subtle) */
    flareOpacity: 0.4,
  },

  /**
   * Generate CSS properties for a grid background pattern.
   * @param color - Grid line color (CSS color value)
   * @param size - Grid cell size in pixels
   * @returns Object with backgroundImage and backgroundSize properties
   *
   * @example
   * ```tsx
   * const gridStyles = BACKGROUNDS.getGridCSS('#e2e8f0', 12);
   * // { backgroundImage: '...', backgroundSize: '12px 12px' }
   * ```
   */
  getGridCSS: (color: string, size: number) => ({
    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
    backgroundSize: `${size}px ${size}px`,
  }),
} as const;

// =============================================================================
// COMPONENT STYLES
// =============================================================================

export const COMPONENTS = {
  // Logo circle (used in videos and diagrams)
  logoCircle: {
    background: GRADIENTS.primaryVertical,
    shadow: SHADOWS.primaryGlow,
  },

  // Industry label pill
  industryLabel: {
    background: 'rgba(37, 99, 235, 0.08)',
    border: `1px solid ${COLORS.primary}`,
    borderRadius: RADIUS.pill,
    color: COLORS.primary,
  },

  // Card (light theme)
  card: {
    background: COLORS.white,
    border: `1px solid ${COLORS.gray200}`,
    borderRadius: RADIUS.lg,
    shadow: SHADOWS.sm,
  },

  // Button
  button: {
    primary: {
      background: GRADIENTS.primary,
      color: COLORS.white,
      borderRadius: RADIUS.md,
      shadow: SHADOWS.primaryGlow,
    },
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get responsive scale factor based on aspect ratio
 */
export const getScaleFactor = (width: number, height: number): number => {
  const aspectRatio = width / height;
  if (aspectRatio < 1) return 0.7;      // Vertical (9:16, 4:5)
  if (aspectRatio === 1) return 0.85;   // Square (1:1)
  return 1;                              // Landscape (16:9)
};

/**
 * Check if aspect ratio is vertical
 */
export const isVertical = (width: number, height: number): boolean => {
  return width / height < 1;
};

/**
 * Check if aspect ratio is square
 */
export const isSquare = (width: number, height: number): boolean => {
  return width / height === 1;
};
