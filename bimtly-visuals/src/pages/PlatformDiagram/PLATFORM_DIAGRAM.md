# BIMTLY Platform Diagram

Interactive circular diagram showcasing the BIMTLY platform's six core features arranged around a central hub.

## Overview

The diagram displays:
- **Central node**: "BIMTLY Platform - All-in-one online platform"
- **6 feature nodes** positioned on an orbit ring, each with an icon and label

## Files

All files are self-contained in this folder:

- `index.jsx` - Page wrapper (route: `/platform`)
- `PlatformDiagram.jsx` - React component
- `platform-diagram.css` - Styles and animations
- `platform-page.css` - Page layout styles
- `PLATFORM_DIAGRAM.md` - This documentation

## Features (clockwise from top)

| Position | Icon | Title | Subtitle |
|----------|------|-------|----------|
| Top (-90°) | Book | Centralized Knowledge Hub | Online Catalog & Documentation |
| Top-right (-30°) | Box | Immersive 3D | Visualization |
| Bottom-right (30°) | Wrench | Interactive 3D | configurators & auto quotation |
| Bottom (90°) | Globe | Unified | Web portal |
| Bottom-left (150°) | GraduationCap | Guided Support | & Education |
| Top-left (210°) | ShoppingCart | Seamless Sales | Channels |

## Layout System

The diagram uses trigonometry to position elements in a circle:

```
centerX, centerY = 250, 250 (center of 500x500 viewBox)
orbitRadius = 145 (where icons sit)
labelRadius = 235 (where labels appear, further out)
```

Position calculation:
```javascript
x = centerX + radius * Math.cos(angleRad)
y = centerY + radius * Math.sin(angleRad)
```

Some features have custom `labelOffset` values to fine-tune label positioning.

## Animations

### Entrance Sequence (staggered)

1. **0.0s** - Center node appears (scale + fade)
2. **0.5s** - Orbit ring draws in
3. **0.8s** - Connection lines appear (one by one, 0.1s apart)
4. **1.2s** - Connector dots pop in
5. **1.4s** - Feature icons appear
6. **1.7s** - Labels fade in

### Continuous Animations

| Element | Animation | Duration | Description |
|---------|-----------|----------|-------------|
| Center node | `centerPulse` | 8s | Gentle glow pulsing |
| Orbit ring | `orbitPulse` | 4s | Subtle opacity/width pulse |
| Connection lines | `flowDash` | 20s | Dashed lines flow outward |
| Connector dots | `dotPulse` | 3s | Subtle size pulse |
| Feature icons | `cycleHighlight` | 24s | Teal highlight cycles through each node |
| Pulse wave | `radiateOut` | 12s | Blue wave radiates from center (starts at 3s) |

### Cycling Highlight

Each feature icon gets highlighted in sequence with a teal glow effect:
- 24s total cycle
- Each node highlighted for ~15% of cycle (~3.6s)
- Smooth ease-in-out transitions
- Color: `#14b8a6` (teal)

## Customization

### Adding/Modifying Features

Edit the `features` array in `PlatformDiagram.jsx`:

```javascript
{
  icon: IconComponent,  // from lucide-react
  title: 'Main Title',
  title2: 'Second Line', // optional
  subtitle: 'Description',
  subtitle2: 'Second Line', // optional
  angle: 0,  // degrees, 0 = right, -90 = top, 90 = bottom
  labelOffset: 235,  // optional, default is labelRadius
}
```

### Colors

Primary blue: `#2563EB`
Highlight teal: `#14b8a6`

### Animation Timing

Adjust `animation-delay` values in JSX for entrance timing, or modify `@keyframes` in CSS for continuous animations.

## Accessibility

- Respects `prefers-reduced-motion` - all animations disabled
- Icons have semantic meaning via lucide-react

## Dependencies

- `lucide-react` - Icon library
