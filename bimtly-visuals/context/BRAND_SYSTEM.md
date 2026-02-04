# BIMTLY Brand System

**Unified Design Language for Print, Video & Digital Assets**

---

## Brand Position

BIMTLY bridges the gap between technical complexity and accessible usability. We serve the AEC industry (Architecture, Engineering, Construction) while remaining approachable to decision-makers who may not be deeply technical.

### Target Audience
- **Primary:** Product managers, sales teams, and marketing in manufacturing/AEC
- **Secondary:** Engineers, architects, facility managers
- **Mindset:** Professionals who need powerful tools but value simplicity

### Brand Personality

| Attribute | Expression |
|-----------|------------|
| **Professional** | Clean, structured, trustworthy |
| **Premium** | Refined details, elegant transitions |
| **Accessible** | Technical concepts made visual |
| **Dynamic** | Motion, energy, forward momentum |

---

## Logo Assets

| Asset | File | When to Use |
|-------|------|-------------|
| Full logo (white) | `public/branding/logo_with_name_white.svg` | Dark backgrounds |
| Full logo (black) | `public/branding/logo_with_name_black.svg` | Light backgrounds |
| Icon only (white) | `public/branding/logo_white.svg` | Compact spaces, dark backgrounds |
| Icon only (black) | `public/branding/logo_black.png` | Compact spaces, light backgrounds |

---

## Color System

### Primary Brand Color
```
Blue: #2563EB — rgba(37, 99, 235, 1)
```
Use for: Primary buttons, links, key highlights, CTAs, logo background

### Extended Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Blue 600** | `#2563EB` | `37, 99, 235` | Primary brand color |
| **Blue 500** | `#3b82f6` | `59, 130, 246` | Hover states |
| **Indigo 500** | `#6366f1` | `99, 102, 241` | Secondary accents |
| **Purple 500** | `#8b5cf6` | `139, 92, 246` | Gradient endpoints |
| **Violet 500** | `#a855f7` | `168, 85, 247` | Accent gradients |
| **Teal 500** | `#14b8a6` | `20, 184, 166` | Highlight accents |

### Semantic Colors

| Purpose | Hex | Usage |
|---------|-----|-------|
| Success | `#22c55e` | Checkmarks, positive states |
| Error | `#f87171` | Warnings, negative states |
| Warning | `#fbbf24` | Caution states |

---

## Theme Modes

### Light Theme (Default for Videos & Web)

```css
/* Backgrounds */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--bg-card: #ffffff;
--grid-line: rgba(37, 99, 235, 0.08);

/* Text */
--text-primary: #111827;
--text-secondary: #374151;
--text-muted: #6b7280;

/* Borders */
--border-default: #e5e7eb;
--border-subtle: #f3f4f6;
```

### Dark Theme (Print Promo Materials)

```css
/* Backgrounds */
--bg-gradient: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
--bg-card: rgba(255, 255, 255, 0.04);

/* Text */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: rgba(255, 255, 255, 0.5);

/* Borders */
--border-default: rgba(255, 255, 255, 0.1);
--border-accent: rgba(37, 99, 235, 0.3);
```

---

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Weights
| Weight | Name | Usage |
|--------|------|-------|
| 400 | Regular | Body text |
| 500 | Medium | Emphasized body, labels |
| 600 | Semibold | Subheadings, buttons |
| 700 | Bold | Headings |
| 800 | Extrabold | Hero titles, key numbers |

### Type Scale (Video - 1920×1080)
| Element | Size | Weight | Letter-spacing |
|---------|------|--------|----------------|
| Hero title | 42px | 800 | -1px |
| Title | 38px | 600 | -0.5px |
| Subtitle | 28px | 500 | 0 |
| Label | 26px | 600 | 0.5px |
| Body | 20px | 400 | 0 |

### Type Scale (Print - A4)
| Element | Size | Weight | Letter-spacing |
|---------|------|--------|----------------|
| Hero title | 32-36px | 800 | -0.5px |
| Section title | 18-20px | 700 | -0.25px |
| Card title | 13-14px | 700 | 0 |
| Body | 12-14px | 400 | 0 |
| Caption | 10-11px | 600 | 1.5px (uppercase) |

---

## Video Style Guide

### Visual Philosophy

BIMTLY videos occupy the sweet spot between **architectural elegance** and **engineering precision**. We're technical enough to be credible, yet polished enough to captivate non-technical decision-makers.

> **The goal:** Make complex product data management feel effortless, premium, and desirable.

### Tone & Feel

| Quality | How We Achieve It |
|---------|-------------------|
| **Professional** | Clean compositions, structured layouts, confident pacing |
| **Elegant** | Smooth spring animations, refined gradients, balanced whitespace |
| **Premium** | Subtle glow effects, glass-morphism, attention to detail |
| **Dynamic** | Continuous motion, flowing transitions, visual energy |
| **Accessible** | Clear visual hierarchy, readable text, intuitive flow |

### Animation Principles

1. **Motion is constant** — Something should always be moving (subtle pulses, floating elements, flowing gradients)
2. **Transitions are smooth** — Use spring physics, never linear. Ease-in-out for elegance
3. **Timing creates rhythm** — Stagger elements, build anticipation, land with impact
4. **Less jarring, more flowing** — Crossfades over hard cuts, scale over snap

### Key Visual Elements

| Element | Purpose | Style |
|---------|---------|-------|
| **Gradient backgrounds** | Depth, premium feel | Blue→Indigo, subtle angles |
| **Pulse waves** | Life, connectivity | Radiating circles from center |
| **Grid patterns** | Technical foundation | Subtle blue lines on white |
| **Glass cards** | Modern UI feel | Blur, transparency, soft borders |
| **Glow effects** | Focus, energy | Blue brand glow on key elements |

### Animation Timing (at 30fps)

| Action | Duration | Frames |
|--------|----------|--------|
| Fade in | 0.5-0.7s | 15-20 |
| Fade out | 0.7-0.8s | 20-25 |
| Element hold | 2-3s minimum | 60-90 |
| Transition gap | 0.5-1s | 15-30 |
| Spring settle | 0.3-0.5s | 10-15 |

### Spring Configs (Remotion)

```typescript
// Gentle, elegant motion
{ damping: 15, stiffness: 80 }

// Snappy, responsive
{ damping: 12, stiffness: 100 }

// Bouncy, playful
{ damping: 10, stiffness: 120 }
```

### What to Avoid in Videos

- Static frames (always have subtle motion)
- Hard cuts without transitions
- Overly complex animations that distract
- Corporate stock footage aesthetic
- Text that's too small or appears too briefly
- Cluttered compositions

---

## Spacing & Layout

### Print Format (Flyers)
- **Page size:** A4 (210mm × 297mm)
- **Content padding:** 32-50px
- **Section spacing:** 24-30px
- **Card padding:** 16-20px

### Video Safe Zones
- **Title safe:** 10% margin from edges
- **Action safe:** 5% margin from edges
- **Center content for multi-ratio:** Keep key elements in center 60%

### Border Radius
| Element | Radius |
|---------|--------|
| Cards | 12px |
| Buttons | 8px |
| Pills/Badges | 20-50px |
| Logo circle | 50% |

---

## Gradients

### Primary Gradients
```css
/* Brand gradient (buttons, accents) */
linear-gradient(135deg, #2563EB 0%, #6366f1 100%)

/* Vertical brand (logo circle) */
linear-gradient(180deg, #2563EB 0%, #1d4ed8 100%)

/* Accent line */
linear-gradient(90deg, #2563EB 0%, #6366f1 50%, #8b5cf6 100%)
```

### Background Gradients
```css
/* Light theme subtle */
radial-gradient(ellipse at 50% 50%, rgba(37, 99, 235, 0.03) 0%, transparent 70%)

/* Dark theme */
linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)
```

---

## Hero Background Effect

The hero section background combines multiple layers to create a technical yet approachable aesthetic matching the BIMTLY website.

### Visual Concept
- **Grid pattern** — Subtle technical/engineering indicator
- **Purple/indigo glow** — Emanates from top, adds depth
- **Warm orange flare** — Creates modern, playful feel
- **Blended together** — Purple on top (fades to transparent), orange below

### Layer Stack (bottom to top)
1. White background
2. Grid pattern (12px, 60% opacity)
3. Orange flare (fades to white, 60% opacity)
4. Purple glow (fades to transparent)
5. Content

### Using the HeroBackground Component

```tsx
import { HeroBackground } from '../design';

// Default (centered flare)
<HeroBackground>
  <YourContent />
</HeroBackground>

// Custom positioning
<HeroBackground
  flarePosition="80% 80%"  // bottom-right
  gridSize={16}
  showGrid={true}
  showTopGlow={true}
  showWarmFlare={true}
>
  <YourContent />
</HeroBackground>
```

### Using CSS Utility Classes

```html
<div class="hero-bg">
  <div class="hero-bg-grid"></div>
  <div class="hero-bg-warm-flare hero-bg-warm-flare--bottom-right"></div>
  <div class="hero-bg-top-glow"></div>
  <div class="hero-bg-content">Your content</div>
</div>
```

### Flare Position Presets (CSS)
| Class | Position |
|-------|----------|
| `hero-bg-warm-flare--center` | 50% 50% (default) |
| `hero-bg-warm-flare--bottom-right` | 80% 80% |
| `hero-bg-warm-flare--top-right` | 80% 20% |
| `hero-bg-warm-flare--bottom-left` | 20% 80% |

### Color Values
| Element | Color | Opacity |
|---------|-------|---------|
| Grid lines | `#e2e8f0` | 0.6 |
| Purple glow | `rgba(120, 119, 198, 0.6)` | 1.0 |
| Orange flare | `rgba(232, 128, 54, 0.7)` → white | 0.4 (subtle) |

---

## Shadows & Glows

```css
/* Card shadow (light theme) */
0 2px 8px rgba(37, 99, 235, 0.1)

/* Card hover */
0 4px 20px rgba(37, 99, 235, 0.25)

/* Brand glow */
0 4px 20px rgba(37, 99, 235, 0.3)

/* Intense glow (logo, CTAs) */
0 8px 40px rgba(37, 99, 235, 0.4)
```

---

## Component Patterns

### Logo Circle
```css
background: linear-gradient(180deg, #2563EB 0%, #1d4ed8 100%);
border-radius: 50%;
box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
```

### Industry Label (Light Theme)
```css
background: rgba(37, 99, 235, 0.08);
border: 1px solid #2563EB;
border-radius: 50px;
color: #2563EB;
font-weight: 600;
```

### Primary Button
```css
background: linear-gradient(135deg, #2563EB 0%, #6366f1 100%);
color: white;
padding: 14px 36px;
border-radius: 8px;
font-weight: 700;
box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
```

### Card (Light Theme)
```css
background: #ffffff;
border: 1px solid #e5e7eb;
border-radius: 12px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
```

---

## Do's and Don'ts

### Do
- Use gradients to add depth and premium feel
- Keep animations smooth and continuous
- Maintain high contrast for readability
- Use the blue (#2563EB) consistently as the primary color
- Create visual rhythm with staggered timing
- Design for multiple aspect ratios (16:9, 1:1, 9:16)

### Don't
- Use flat, static colors without motion or depth
- Add jarring cuts or abrupt transitions
- Overcomplicate with too many effects
- Use time estimates ("this takes 5 minutes")
- Add emojis to professional materials
- Sacrifice readability for style

---

## Design Tokens Reference

Import from `src/design/tokens.ts` for programmatic access to all values:

```typescript
import { COLORS, THEME, TYPOGRAPHY, VIDEO, GRADIENTS, SHADOWS, BACKGROUNDS } from '@/design';

// Or import components
import { HeroBackground } from '@/design';
```

### Key Exports
| Export | Purpose |
|--------|---------|
| `COLORS` | Brand colors, neutrals, semantic colors |
| `THEME` | Light/dark theme configurations |
| `TYPOGRAPHY` | Font family, weights, scales |
| `VIDEO` | Dimensions, fps, spring configs, timing |
| `GRADIENTS` | Pre-built gradient strings |
| `SHADOWS` | Box shadows and glows |
| `BACKGROUNDS` | Grid patterns, hero gradients, helpers |
| `HeroBackground` | React component for hero sections |

---

## Quick Reference

```
Primary Blue:     #2563EB
Font:             Inter
Theme:            Light (videos/web), Dark (print)
Animation:        Spring physics, always moving
Feel:             Professional + Premium + Dynamic
```
