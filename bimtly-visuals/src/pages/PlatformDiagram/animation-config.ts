/**
 * PlatformDiagram Animation Configuration
 *
 * SINGLE SOURCE OF TRUTH for all animation timing.
 * Used by both CSS animations (web mode) and Remotion interpolations (video mode).
 */

export const DIAGRAM_TIMING = {
  // Entry animations - staggered appearance sequence
  center: { delay: 0, duration: 0.8 },
  orbit: { delay: 0.5, duration: 1 },
  lines: { delay: 0.8, duration: 0.6, stagger: 0.1 },
  dots: { delay: 1.2, duration: 0.4, stagger: 0.1 },
  icons: { delay: 1.4, duration: 0.6, stagger: 0.15 },
  labels: { delay: 1.7, duration: 0.5, stagger: 0.15 },

  // Continuous animations (looping) - disabled in video mode
  continuous: {
    centerPulse: { duration: 8 },
    orbitPulse: { duration: 4 },
    dotPulse: { duration: 3 },
    cycleHighlight: { duration: 24 },
    radiateOut: { duration: 12, delay: 3 },
    flowDash: { duration: 20 },
  },
} as const;

// Number of feature nodes (for stagger calculations)
export const FEATURE_COUNT = 6;

// Convert seconds to frames
export const toFrames = (seconds: number, fps = 30): number =>
  Math.round(seconds * fps);

// Get total entry animation duration (when all elements are visible)
export const getTotalEntryDuration = (): number => {
  const lastLabel = DIAGRAM_TIMING.labels;
  return lastLabel.delay + (FEATURE_COUNT - 1) * lastLabel.stagger + lastLabel.duration;
};

// Get staggered delay for indexed elements
export const getStaggeredDelay = (
  baseDelay: number,
  stagger: number,
  index: number
): number => baseDelay + index * stagger;

export type DiagramMode = 'web' | 'video' | 'static';
