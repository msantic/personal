/**
 * BIMTLY Design System
 *
 * Central export for all design tokens and utilities.
 */

export * from './tokens';
export { HeroBackground } from './HeroBackground';
export type { HeroBackgroundProps } from './HeroBackground';

// Import CSS utilities (side effect)
import './backgrounds.css';
