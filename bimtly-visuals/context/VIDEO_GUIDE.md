# BIMTLY Video Creation Guide

Great example how simple but premiumm video can look like https://www.youtube.com/watch?v=dvdWpBqOUQM


Predobar yt kanal sa mrak sa Animated Video Production
https://www.youtube.com/@zeliosagency 
https://www.youtube.com/watch?v=VYHqg4EfesE
https://www.youtube.com/watch?v=vQNHxlYEkXI OVO JE SUPER PRIMJER PREMIUM VIDEA A DA NIJE ZATRPAN HRPOM SLIKA I TRANZICIJA, VRLO LAKO MOGUCE NAPRAVITI SA REMOTION, UGLAVNOM TEKST + PAR SLIKA
https://www.klaviyo.com/ isto super intro video, ne toliko kompl a efektan

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
| `IntroClip` | 1920×1080 | Standalone intro (OpeningTitle) |
| `OutroClip` | 1920×1080 | Standalone outro (Tagline) |
| `IntroClip-4K` | 3840×2160 | Intro at 4K (for final publish) |
| `OutroClip-4K` | 3840×2160 | Outro at 4K (for final publish) |

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

# Render standalone clips
npm run render:intro       # IntroClip at 1080p
npm run render:outro       # OutroClip at 1080p
npm run render:clips       # Both clips at 1080p
npm run render:intro:4k    # IntroClip at 4K
npm run render:outro:4k    # OutroClip at 4K
npm run render:clips:4k    # Both clips at 4K

# Merge intro with main video
npm run merge:intro        # Render intro + merge at 1080p
npm run merge:intro:4k     # Render intro + merge at 4K (for final publish)
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
├── index.ts                    # Entry point
├── Root.tsx                    # Composition registry (all variants + clips)
├── IntroClip.tsx               # Standalone intro wrapper (background + OpeningTitle)
├── OutroClip.tsx               # Standalone outro wrapper (background + Tagline)
├── HeroVideo/
│   ├── index.tsx               # Main hero composition (responsive)
│   ├── OpeningTitle.tsx        # Intro animation (BimtlyLogo + subtitle)
│   ├── Tagline.tsx             # Outro animation (tagline stagger reveal)
│   └── styles.css              # Shared styles
src/design/
├── tokens.ts                   # Design tokens (spring configs, timing, colors)
├── BimtlyLogo.tsx              # Animated logo component (used in intro)
├── backgrounds.css             # Hero background styles (grid, flares, glow)
scripts/
├── merge-intro.js              # Pipeline: render clips + merge with ffmpeg
public/
├── hero-prefab.png             # Industry image 1
└── hero-window.png             # Industry image 2
```

---

## Promo Video Pipeline

### Overview

The pipeline produces polished promo videos by combining **reusable branded clips** (intro/outro) with any main content video. The clips are Remotion compositions that can be updated once and re-applied across all videos.

```
┌─────────┐    ┌──────────────┐    ┌──────────┐
│  Intro   │ +  │  Main Video  │ +  │  Outro   │  →  Final .mp4
│  (5s)    │    │  (any length)│    │  (4s)    │
└─────────┘    └──────────────┘    └──────────┘
  Remotion        Studio/screen      Remotion
  IntroClip       recording          OutroClip
```

### Intro Clip — `IntroClip` / `IntroClip-4K`

**What it shows:** BimtlyLogo (animated glow + "Show. Configure. Sell." subtitle) → "Right in your browser, on any device" tagline → staggered exit.

**Duration:** 5 seconds (150 frames @ 30fps)

**Animation timeline:**
| Frames | What happens |
|--------|-------------|
| 0–20 | Container fades in, logo springs to scale |
| 30–50 | Subtitles stagger in (BimtlyLogo internal + external) |
| 50–110 | Hold (logo glow pulses) |
| 110–124 | Subtitles fade out (opacity only) |
| 127–143 | Logo scales out + fades |

**Source files:**
- [IntroClip.tsx](src/remotion/IntroClip.tsx) — wrapper (hero background + OpeningTitle)
- [OpeningTitle.tsx](src/remotion/HeroVideo/OpeningTitle.tsx) — animation logic
- [BimtlyLogo.tsx](src/design/BimtlyLogo.tsx) — logo component (`subtitleExitOpacity` prop controls exit)

**To change the intro:**
1. Edit `OpeningTitle.tsx` for timing/layout or `BimtlyLogo.tsx` for the logo itself
2. Preview at `http://localhost:3001/IntroClip` (not HeroVideo — the intro exit won't play there due to `<Sequence>` bounds)
3. Re-render: `npm run render:intro:4k` or let `merge-intro.js` handle it

### Outro Clip — `OutroClip` / `OutroClip-4K`

**What it shows:** Staggered tagline reveal — "Products easier to sell." → "Assets easier to manage." → "bimtly.com"

**Duration:** 4 seconds (120 frames @ 30fps)

**Source files:**
- [OutroClip.tsx](src/remotion/OutroClip.tsx) — wrapper (hero background + Tagline)
- [Tagline.tsx](src/remotion/HeroVideo/Tagline.tsx) — animation logic

**To change the outro:**
1. Edit `Tagline.tsx` for text/timing
2. Preview at `http://localhost:3001/OutroClip`
3. Re-render: `npm run render:outro:4k`

### Pre-rendered Clip Files

Once rendered, clips live in `output/` and can be reused across any number of videos without re-rendering:

```
output/
├── intro-1920x1080.mp4     # 1080p intro (fast preview)
├── intro-3840x2160.mp4     # 4K intro (final publish)
├── outro-1920x1080.mp4     # 1080p outro
├── outro-3840x2160.mp4     # 4K outro
```

Clips only need re-rendering when you change the animation code. For new main videos, use `--skip-render` to reuse existing clips.

---

## Merge Script — `scripts/merge-intro.js`

Renders clips from Remotion (if needed) and concatenates `[intro] + [main] + [outro]` using ffmpeg.

### Quick start

```bash
# Full pipeline: render 4K clips + merge with intro & outro
node scripts/merge-intro.js --4k --outro --main "output/my-video.mp4" --out "output/my-video-final.mp4"

# Reuse existing clips (much faster — skips Remotion render)
node scripts/merge-intro.js --4k --outro --skip-render --main "output/my-video.mp4" --out "output/my-video-final.mp4"

# Intro only (no outro)
node scripts/merge-intro.js --4k --main "output/my-video.mp4" --out "output/my-video-final.mp4"
```

### NPM shortcuts

```bash
npm run merge:intro        # Render intro + merge at 1080p
npm run merge:intro:4k     # Render intro + merge at 4K
```

### All flags

```
--main  <path>       Main video path (required for new videos)
--out   <path>       Output path (default: output/final-with-intro.mp4)
--outro              Also append OutroClip after the main video
--4k                 Use 4K compositions (3840×2160) — use for final publish
--skip-render        Reuse existing rendered clips (much faster)
--intro <path>       Override intro clip path
--outro-path <path>  Override outro clip path
```

### How it works

1. Renders `IntroClip[-4K]` via Remotion (unless `--skip-render`)
2. Renders `OutroClip[-4K]` if `--outro` flag present (unless `--skip-render`)
3. Uses `ffmpeg -filter_complex` to normalize all clips to same fps + resolution before concat
4. Re-encodes output as `h264 crf=18 + aac 192k`

> Handles mismatched source formats automatically — studio recordings are typically `3446×1938 @ 60fps`, clips are `30fps`. The filter_complex normalizes fps and resolution before joining. Using stream copy (`-c copy`) would cause double-speed playback.

---

## Full Workflow: New Promo Video

Step-by-step for producing a finished video from a new studio recording:

### 1. Normalize audio

Studio recordings are often too quiet (~-31 LUFS). Target is **-14 LUFS** for YouTube/web.

```bash
# Analyze
ffmpeg -i "output/raw-recording.mp4" -af loudnorm=print_format=json -f null -

# Normalize (plug in measured values from step above)
ffmpeg -i "output/raw-recording.mp4" \
  -af loudnorm=I=-14:TP=-2:LRA=11:measured_I=<input_i>:measured_TP=<input_tp>:measured_LRA=<input_lra>:measured_thresh=<input_thresh>:offset=<target_offset>:linear=true \
  -c:v copy -c:a aac -b:a 192k \
  "output/raw-recording-normalized.mp4"
```

### 2. Merge with intro + outro

```bash
# First time (renders clips fresh)
node scripts/merge-intro.js --4k --outro \
  --main "output/raw-recording-normalized.mp4" \
  --out "output/raw-recording-final.mp4"

# Subsequent videos (reuse existing clips)
node scripts/merge-intro.js --4k --outro --skip-render \
  --main "output/another-video-normalized.mp4" \
  --out "output/another-video-final.mp4"
```

### 3. Verify

Play the final file and check:
- Intro plays smoothly, logo animation is clean
- Audio levels are consistent between intro (silent) and main video
- Outro appears after main content ends
- Resolution is 3840×2160 (4K)

---

## Updating Clips for All Future Videos

When you update the intro or outro animation:

1. **Edit the source** — `OpeningTitle.tsx` / `Tagline.tsx` / `BimtlyLogo.tsx`
2. **Preview in Remotion Studio** — `npm run remotion:studio` → select IntroClip or OutroClip
3. **Re-render clips** — `npm run render:clips:4k` (renders both intro + outro at 4K)
4. **Re-merge any videos** that need the updated clips using `--skip-render`

The clips are decoupled from the main content — update once, apply everywhere.

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

## Audio Post-Processing

### Fixing Quiet Audio (ffmpeg loudnorm)

If a video was recorded without a professional microphone, the audio may be too quiet. Use ffmpeg's `loudnorm` filter (EBU R128 standard) to normalize it.

**Step 1: Analyze current levels**

```bash
ffmpeg -i "input.mp4" -af loudnorm=print_format=json -f null -
```

Look at the JSON output for `input_i` (integrated loudness in LUFS). Web/YouTube standard is **-14 LUFS**.

**Step 2: Normalize with measured values**

```bash
ffmpeg -i "input.mp4" \
  -af loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=<input_i>:measured_TP=<input_tp>:measured_LRA=<input_lra>:measured_thresh=<input_thresh>:linear=true \
  -c:v copy \
  -c:a aac -b:a 192k \
  "output-normalized.mp4"
```

Replace `<input_i>`, `<input_tp>`, `<input_lra>`, `<input_thresh>` with values from Step 1.

| Flag | Purpose |
|------|---------|
| `-c:v copy` | Copies video as-is (no re-encoding, fast) |
| `linear=true` | Boosts volume while preserving dynamics |
| `I=-14` | Target loudness: -14 LUFS (YouTube/web standard) |
| `TP=-1.5` | True peak limit (prevents clipping) |
| `-b:a 192k` | Audio bitrate |

**Step 3: Verify**

```bash
ffmpeg -i "output-normalized.mp4" -af loudnorm=print_format=json -f null -
```

Confirm `input_i` is near -14 LUFS.

### Loudness Reference

| Target | LUFS | Use Case |
|--------|------|----------|
| YouTube | -14 | Standard web video |
| Spotify | -14 | Music streaming |
| Broadcast TV | -23 | EBU R128 standard |
| Apple Podcasts | -16 | Podcast audio |

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
