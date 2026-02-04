/**
 * Animation Values Hook for PlatformDiagram
 *
 * Returns computed animation values based on mode:
 * - web/static: Final values (CSS handles animation or static display)
 * - video: Frame-synced values using Remotion's interpolate
 */

import {
  DIAGRAM_TIMING,
  FEATURE_COUNT,
  toFrames,
  getStaggeredDelay,
  type DiagramMode,
} from './animation-config';

// Final values for web/static modes
const FINAL_VALUES = {
  centerOpacity: 1,
  centerScale: 1,
  orbitOpacity: 0.25,
  orbitDashOffset: 0,
  pulseWaveR: 65,
  pulseWaveOpacity: 0,
};

// Per-element final values
const ELEMENT_FINAL = {
  opacity: 1,
  scale: 1,
  y: 0,
  dashOffset: 0,
  r: 4,
};

export interface AnimationValues {
  // Center node
  centerOpacity: number;
  centerScale: number;
  // Orbit
  orbitOpacity: number;
  orbitDashOffset: number;
  // Pulse wave
  pulseWaveR: number;
  pulseWaveOpacity: number;
  // Per-element getters (indexed)
  getLineOpacity: (index: number) => number;
  getLineDashOffset: (index: number) => number;
  getDotOpacity: (index: number) => number;
  getDotR: (index: number) => number;
  getIconOpacity: (index: number) => number;
  getIconScale: (index: number) => number;
  getLabelOpacity: (index: number) => number;
  getLabelY: (index: number) => number;
}

// Static/final values (no animation needed - CSS handles it or static display)
const createFinalValues = (): AnimationValues => ({
  ...FINAL_VALUES,
  getLineOpacity: () => ELEMENT_FINAL.opacity,
  getLineDashOffset: () => ELEMENT_FINAL.dashOffset,
  getDotOpacity: () => ELEMENT_FINAL.opacity,
  getDotR: () => ELEMENT_FINAL.r,
  getIconOpacity: () => ELEMENT_FINAL.opacity,
  getIconScale: () => ELEMENT_FINAL.scale,
  getLabelOpacity: () => ELEMENT_FINAL.opacity,
  getLabelY: () => ELEMENT_FINAL.y,
});

// Video mode values (frame-synced via Remotion)
const createVideoValues = (frame: number, fps: number): AnimationValues => {
  // Import interpolate dynamically to avoid issues in non-Remotion contexts
  const { interpolate } = require('remotion');

  const t = DIAGRAM_TIMING;

  // Center node animation (scale with overshoot)
  const centerStart = toFrames(t.center.delay, fps);
  const centerMid = centerStart + toFrames(t.center.duration * 0.6, fps);
  const centerEnd = centerStart + toFrames(t.center.duration, fps);

  const centerOpacity = interpolate(frame, [centerStart, centerMid], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const centerScale = interpolate(
    frame,
    [centerStart, centerMid, centerEnd],
    [0.3, 1.05, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Orbit ring animation (draw in via dash offset)
  const orbitStart = toFrames(t.orbit.delay, fps);
  const orbitEnd = orbitStart + toFrames(t.orbit.duration, fps);

  const orbitOpacity = interpolate(frame, [orbitStart, orbitStart + 10], [0, 0.25], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const orbitDashOffset = interpolate(frame, [orbitStart, orbitEnd], [1000, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulse wave (disabled in video mode - returns static)
  const pulseWaveR = 65;
  const pulseWaveOpacity = 0;

  // Line animations (staggered)
  const getLineOpacity = (index: number): number => {
    const delay = getStaggeredDelay(t.lines.delay, t.lines.stagger, index);
    const start = toFrames(delay, fps);
    const end = start + toFrames(t.lines.duration, fps);
    return interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  const getLineDashOffset = (index: number): number => {
    const delay = getStaggeredDelay(t.lines.delay, t.lines.stagger, index);
    const start = toFrames(delay, fps);
    const end = start + toFrames(t.lines.duration, fps);
    return interpolate(frame, [start, end], [100, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  // Dot animations (staggered)
  const getDotOpacity = (index: number): number => {
    const delay = getStaggeredDelay(t.dots.delay, t.dots.stagger, index);
    const start = toFrames(delay, fps);
    const end = start + toFrames(t.dots.duration, fps);
    return interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  const getDotR = (index: number): number => {
    const delay = getStaggeredDelay(t.dots.delay, t.dots.stagger, index);
    const start = toFrames(delay, fps);
    const end = start + toFrames(t.dots.duration, fps);
    return interpolate(frame, [start, end], [0, 4], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  // Icon animations (staggered, with scale overshoot)
  const getIconOpacity = (index: number): number => {
    const delay = getStaggeredDelay(t.icons.delay, t.icons.stagger, index);
    const start = toFrames(delay, fps);
    const end = start + toFrames(t.icons.duration * 0.5, fps);
    return interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  const getIconScale = (index: number): number => {
    const delay = getStaggeredDelay(t.icons.delay, t.icons.stagger, index);
    const start = toFrames(delay, fps);
    const mid = start + toFrames(t.icons.duration * 0.6, fps);
    const end = start + toFrames(t.icons.duration, fps);
    return interpolate(frame, [start, mid, end], [0.5, 1.05, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  // Label animations (staggered, with slide up)
  const getLabelOpacity = (index: number): number => {
    const delay = getStaggeredDelay(t.labels.delay, t.labels.stagger, index);
    const start = toFrames(delay, fps);
    const end = start + toFrames(t.labels.duration, fps);
    return interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  const getLabelY = (index: number): number => {
    const delay = getStaggeredDelay(t.labels.delay, t.labels.stagger, index);
    const start = toFrames(delay, fps);
    const end = start + toFrames(t.labels.duration, fps);
    return interpolate(frame, [start, end], [10, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  return {
    centerOpacity,
    centerScale,
    orbitOpacity,
    orbitDashOffset,
    pulseWaveR,
    pulseWaveOpacity,
    getLineOpacity,
    getLineDashOffset,
    getDotOpacity,
    getDotR,
    getIconOpacity,
    getIconScale,
    getLabelOpacity,
    getLabelY,
  };
};

/**
 * Hook to get animation values based on mode.
 *
 * For video mode, must be called within Remotion context.
 * For web/static modes, returns final values (CSS handles animation).
 */
export function useAnimationValues(
  mode: DiagramMode,
  frame?: number,
  fps?: number
): AnimationValues {
  if (mode === 'video') {
    if (frame === undefined || fps === undefined) {
      throw new Error(
        'useAnimationValues: frame and fps are required for video mode'
      );
    }
    return createVideoValues(frame, fps);
  }

  // Web and static modes return final values
  return createFinalValues();
}
