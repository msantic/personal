# BIMTLY Video Creation Guide

## Overview

This Remotion setup allows you to create one video composition and render it for multiple platforms with different aspect ratios and dimensions.

---

## Recommended Dimensions by Platform

### 16:9 Landscape (Horizontal)

| Platform | Resolution | Use Case | Notes |
|----------|------------|----------|-------|
| **Web Hero** | 1920×1080 | Website header/hero section | Loop-friendly, subtle animations |
| **YouTube** | 1920×1080 | Standard video | Can also use 2560×1440 (2K) or 3840×2160 (4K) |
| **LinkedIn** | 1920×1080 | Feed video | Professional tone |
| **Facebook** | 1920×1080 | Feed video | Also supports 1280×720 |
| **Twitter/X** | 1920×1080 | Feed video | Max 2min 20s |

### 1:1 Square

| Platform | Resolution | Use Case | Notes |
|----------|------------|----------|-------|
| **Instagram Feed** | 1080×1080 | Feed post | Best for carousel first slide |
| **Facebook Feed** | 1080×1080 | Feed post | Higher engagement than landscape |
| **LinkedIn Feed** | 1080×1080 | Feed post | Stands out in feed |
| **Pinterest** | 1080×1080 | Pin | Also supports 1000×1500 |

### 9:16 Vertical (Portrait)

| Platform | Resolution | Use Case | Notes |
|----------|------------|----------|-------|
| **Instagram Reels** | 1080×1920 | Reels/Stories | Up to 90s for Reels |
| **TikTok** | 1080×1920 | Feed video | Up to 10min |
| **YouTube Shorts** | 1080×1920 | Shorts | Up to 60s |
| **Facebook/IG Stories** | 1080×1920 | Stories | 15s segments |
| **Snapchat** | 1080×1920 | Spotlight | Up to 60s |

### 4:5 Portrait (Instagram Optimal)

| Platform | Resolution | Use Case | Notes |
|----------|------------|----------|-------|
| **Instagram Feed** | 1080×1350 | Feed post | **Highest engagement** - takes more screen space |
| **Facebook Feed** | 1080×1350 | Feed post | Good for mobile users |

### Other Formats

| Platform | Resolution | Aspect Ratio | Notes |
|----------|------------|--------------|-------|
| **Pinterest Pin** | 1000×1500 | 2:3 | Optimal for pins |
| **LinkedIn Cover** | 1584×396 | 4:1 | Company page cover |
| **YouTube Thumbnail** | 1280×720 | 16:9 | Static image, not video |

---

## Quick Reference: Aspect Ratios

```
16:9  → Landscape (YouTube, Web, LinkedIn, Facebook)
1:1   → Square (Instagram Feed, Facebook, LinkedIn)
4:5   → Portrait (Instagram Feed optimal)
9:16  → Vertical (Reels, TikTok, Shorts, Stories)
2:3   → Pinterest
```

---

## Available Compositions

In Remotion Studio, you'll see these composition variants:

| Composition ID | Dimensions | Platform |
|----------------|------------|----------|
| `HeroVideo` | 1920×1080 | Web Hero (default) |
| `HeroVideo-YouTube` | 1920×1080 | YouTube |
| `HeroVideo-LinkedIn` | 1920×1080 | LinkedIn |
| `HeroVideo-Facebook` | 1920×1080 | Facebook |
| `HeroVideo-Instagram` | 1080×1080 | Instagram Feed (square) |
| `HeroVideo-LinkedIn-Square` | 1080×1080 | LinkedIn (square) |
| `HeroVideo-Reels` | 1080×1920 | Instagram Reels |
| `HeroVideo-TikTok` | 1080×1920 | TikTok |
| `HeroVideo-Shorts` | 1080×1920 | YouTube Shorts |
| `HeroVideo-Portrait` | 1080×1350 | Instagram Portrait (4:5) |

---

## NPM Scripts

```bash
# Preview all compositions in browser
npm run remotion:studio

# Render specific platforms
npm run render:web         # 1920×1080 Web Hero
npm run render:youtube     # 1920×1080 YouTube
npm run render:instagram   # 1080×1080 Instagram Feed
npm run render:reels       # 1080×1920 Instagram Reels
npm run render:tiktok      # 1080×1920 TikTok
npm run render:linkedin    # 1920×1080 LinkedIn
npm run render:portrait    # 1080×1350 Instagram Portrait

# Render all main platforms at once
npm run render:all
```

---

## How It Works

### Single Source, Multiple Outputs

The `HeroVideo` composition uses **responsive design**:
- Content is centered and scales based on viewport
- Images use `objectFit: contain` to adapt to any aspect ratio
- Text elements reposition based on available space

### Design for Multiple Ratios

Keep important content in the **center safe zone**:
- For 16:9 → 9:16 compatibility, content should fit within center 56% width
- For 16:9 → 1:1 compatibility, content should fit within center 56% width
- Always test all ratios before final render

---

## File Structure

```
src/remotion/
├── index.ts              # Entry point
├── Root.tsx              # Composition registry (all variants)
├── HeroVideo/
│   ├── index.tsx         # Main composition (responsive)
│   └── styles.css        # Styles
public/
├── hero-prefab.png       # Industry image 1
└── hero-window.png       # Industry image 2
```

---

## Rendering Commands

```bash
# Render with quality settings
npx remotion render src/remotion/index.ts HeroVideo output/hero.mp4 \
  --codec=h264 \
  --crf=18

# Render as GIF (for previews)
npx remotion render src/remotion/index.ts HeroVideo-Instagram output/hero.gif

# Render as WebM (smaller file)
npx remotion render src/remotion/index.ts HeroVideo output/hero.webm \
  --codec=vp8
```

---

## Output Files

All rendered videos go to `/output/`:
```
output/
├── hero-web-1920x1080.mp4
├── hero-youtube-1920x1080.mp4
├── hero-instagram-1080x1080.mp4
├── hero-reels-1080x1920.mp4
├── hero-tiktok-1080x1920.mp4
├── hero-linkedin-1920x1080.mp4
└── hero-portrait-1080x1350.mp4
```

---

## Best Practices

1. **Test all ratios** in Remotion Studio before rendering
2. **Keep text readable** at all sizes (min 24px for mobile)
3. **Center important content** for cross-ratio compatibility
4. **Use high-res source images** (at least 1920px wide)
5. **Add captions** for social videos (most watched muted)
6. **Use `<Sequence>`** to unmount off-screen elements
7. **Use `spring()`** over CSS animations for smoother rendering
8. **Follow brand colors** from `COLORS` constant (#2563EB primary)

---

## Inspiration & Tools

### AI Video Tools for Ideas

| Tool | URL | Use Case |
|------|-----|----------|
| **Submagic** | https://www.submagic.co/ | Auto captions, trending templates, viral hooks |
| **Crayo AI** | https://crayo.ai/ | Short-form video generation, faceless content |

### Video Trends to Consider

- **Hook in first 3 seconds** - Capture attention immediately
- **Auto-captions** - 85% of social videos watched muted
- **Pattern interrupts** - Zoom, shake, flash effects every 2-3s
- **Text overlays** - Key points as animated text
- **Progress bars** - Show video duration for retention
- **Sound design** - Whoosh, pop, click for transitions

### Content Ideas for BIMTLY

1. **Problem → Solution** - "Tired of scattered product data?" → Show platform
2. **Before/After** - Manual process vs BIMTLY workflow
3. **Feature spotlight** - 15s video per feature (3D viewer, configurator, etc.)
4. **Industry showcase** - Same platform, different verticals (current video)
5. **Customer journey** - From upload to published web portal
6. **Stats/Numbers** - "10x faster product launches" with animated counters
