# BIMTLY Design Rules & Assets

## Logo Assets

| Asset | File | When to Use |
|-------|------|-------------|
| Full logo (white) | `assets/LOGO + BIMTLY - white.svg` | Dark backgrounds |
| Icon only (white) | `assets/LOGO - white.svg` | Compact spaces, favicons |

---

## Color System

### Primary Brand Color
```
Blue: #2563EB
```
Use for: Primary buttons, links, key highlights, CTAs

### Extended Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Blue 600** | `#2563EB` | `37, 99, 235` | Primary brand color |
| **Blue 500** | `#3b82f6` | `59, 130, 246` | Hover states |
| **Indigo 500** | `#6366f1` | `99, 102, 241` | Secondary accents |
| **Purple 500** | `#8b5cf6` | `139, 92, 246` | Gradient endpoints |
| **Violet 500** | `#a855f7` | `168, 85, 247` | Accent gradients |

### Semantic Colors

| Purpose | Hex | Usage |
|---------|-----|-------|
| Success | `#22c55e` | Checkmarks, positive states, "new way" |
| Error | `#f87171` | Warnings, negative states, "old way" |
| Warning | `#fbbf24` | Caution states |

---

## Theme Modes

### Dark Theme (Default for Promo Materials)

```css
/* Backgrounds */
--bg-gradient: linear-gradient(180deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
--bg-card: rgba(255, 255, 255, 0.04);
--bg-card-hover: rgba(255, 255, 255, 0.08);

/* Text */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: rgba(255, 255, 255, 0.5);
--text-disabled: rgba(255, 255, 255, 0.3);

/* Borders */
--border-default: rgba(255, 255, 255, 0.1);
--border-subtle: rgba(255, 255, 255, 0.05);
--border-accent: rgba(37, 99, 235, 0.3);
```

### Light Theme (Web/App UI)

```css
/* Backgrounds */
--bg-primary: #ffffff;
--bg-secondary: #f9fafb;
--bg-card: #ffffff;

/* Text */
--text-primary: #111827;
--text-secondary: #4b5563;
--text-muted: #9ca3af;

/* Borders */
--border-default: #e5e7eb;
--border-subtle: #f3f4f6;
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

### Type Scale (Print/Flyer - A4)
| Element | Size | Weight | Letter-spacing |
|---------|------|--------|----------------|
| Hero title | 32-36px | 800 | -0.5px |
| Section title | 18-20px | 700 | -0.25px |
| Card title | 13-14px | 700 | 0 |
| Body | 12-14px | 400 | 0 |
| Caption/Label | 10-11px | 600 | 1-2px (uppercase) |

---

## Spacing & Layout

### Print Format (Flyers)
- **Page size:** A4 (210mm × 297mm)
- **Content padding:** 32-50px
- **Section spacing:** 24-30px
- **Card padding:** 16-20px

### Border Radius
| Element | Radius |
|---------|--------|
| Cards | 12px |
| Buttons | 8px |
| Pills/Badges | 20-50px |
| Icons | 8-10px |

---

## Component Patterns

### Buttons
```css
/* Primary */
background: linear-gradient(135deg, #2563EB 0%, #6366f1 100%);
color: white;
padding: 14px 36px;
border-radius: 8px;
font-weight: 700;
box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);

/* Secondary */
background: transparent;
color: white;
border: 1px solid rgba(255, 255, 255, 0.3);
```

### Cards (Dark Theme)
```css
background: rgba(255, 255, 255, 0.04);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 12px;
padding: 18px;
```

### Accent Line (Top of Page)
```css
height: 4px;
background: linear-gradient(90deg, #2563EB 0%, #6366f1 50%, #8b5cf6 100%);
```

### Industry Tags/Pills
```css
font-size: 10-11px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 1.5px;
padding: 6px 14px;
background: rgba(37, 99, 235, 0.15);
border: 1px solid rgba(37, 99, 235, 0.3);
border-radius: 20px;
color: #818cf8;
```

---

## Do's and Don'ts

### Do
- Use gradients for backgrounds and primary buttons
- Maintain high contrast for readability
- Use the blue (#2563EB) consistently for primary actions
- Keep text scannable with bullets and short paragraphs
- Use green for positive/success, red for negative/problems

### Don't
- Use flat colors without depth
- Add emojis to professional materials (unless requested)
- Use light theme for print promo materials
- Mix too many colors in one section
- Use time estimates or superlatives ("revolutionary", "best-in-class")
