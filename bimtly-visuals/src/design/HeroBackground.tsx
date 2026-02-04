/**
 * HeroBackground - Reusable hero section background effect
 *
 * Combines subtle grid pattern with gradient overlays for a modern,
 * technical yet approachable aesthetic.
 */
import React from 'react';
import { BACKGROUNDS, COLORS } from './tokens';

export interface HeroBackgroundProps {
  /** Show the subtle grid pattern */
  showGrid?: boolean;
  /** Show the purple/indigo glow from top */
  showTopGlow?: boolean;
  /** Show the warm orange flare */
  showWarmFlare?: boolean;
  /** Grid line spacing in pixels */
  gridSize?: number;
  /** Grid opacity (0-1) */
  gridOpacity?: number;
  /** Flare position as CSS value, e.g., "50% 50%", "80% 80%" */
  flarePosition?: string;
  /** Flare layer opacity (0-1) */
  flareOpacity?: number;
  /** Additional CSS class for the container */
  className?: string;
  /** Additional inline styles for the container */
  style?: React.CSSProperties;
  /** Content to render above the background */
  children?: React.ReactNode;
}

/**
 * Shared layer styles for absolute positioning
 */
const layerBase: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
};

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  showGrid = true,
  showTopGlow = true,
  showWarmFlare = true,
  gridSize = BACKGROUNDS.grid.light.size,
  gridOpacity = BACKGROUNDS.grid.light.opacity,
  flarePosition = '50% 50%',
  flareOpacity = BACKGROUNDS.hero.flareOpacity,
  className = '',
  style,
  children,
}) => {
  const gridCSS = BACKGROUNDS.getGridCSS(BACKGROUNDS.grid.light.color, gridSize);

  // Inject CSS variables from TypeScript tokens (single source of truth)
  const cssVars = {
    '--hero-grid-color': BACKGROUNDS.grid.light.color,
    '--hero-indigo': BACKGROUNDS.hero.indigoColor,
    '--hero-orange': BACKGROUNDS.hero.orangeColor,
    '--hero-flare-opacity': String(flareOpacity),
  } as React.CSSProperties;

  return (
    <div
      className={`hero-background ${className}`.trim()}
      style={{
        position: 'relative',
        backgroundColor: COLORS.white,
        overflow: 'hidden',
        ...cssVars,
        ...style,
      }}
    >
      {/* Layer 1: Grid pattern */}
      {showGrid && (
        <div
          className="hero-background__grid"
          style={{
            ...layerBase,
            ...gridCSS,
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            opacity: gridOpacity,
            zIndex: 1,
          }}
        />
      )}

      {/* Layer 2: Warm orange flare (below purple so they blend) */}
      {showWarmFlare && (
        <div
          className="hero-background__warm-flare"
          style={{
            ...layerBase,
            background: BACKGROUNDS.hero.warmFlare(flarePosition),
            opacity: flareOpacity,
            zIndex: 2,
          }}
        />
      )}

      {/* Layer 3: Top purple/indigo glow (on top, fades to transparent) */}
      {showTopGlow && (
        <div
          className="hero-background__top-glow"
          style={{
            ...layerBase,
            background: BACKGROUNDS.hero.topGlow,
            zIndex: 3,
          }}
        />
      )}

      {/* Content layer */}
      {children && (
        <div
          className="hero-background__content"
          style={{
            position: 'relative',
            zIndex: 10,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default HeroBackground;
