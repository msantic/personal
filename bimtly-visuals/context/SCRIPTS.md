# BIMTLY Visuals - Scripts Guide

Automation scripts for generating promotional assets.

---

## Available Scripts

| Script | npm Command | Description |
|--------|-------------|-------------|
| `generate-pdf.js` | `npm run build:pdf` | Generate PDF flyers/decks |
| `generate-png.js` | `npm run build:png` | Generate PNG diagrams |
| `capture-demo-thumbnails.js` | `npm run capture:thumbnails` | Capture demo screenshots |
| `capture-demo-video.js` | - | Record demo videos cycling through views |
| `optimize-videos.js` | - | Optimize videos for web delivery |

---

## Demo Thumbnail Capture

Automates screenshot capture of BIMTLY 3D viewer demos using Puppeteer.

### Quick Start

```bash
# Capture all demos at 720p (default)
npm run capture:thumbnails

# Or run directly with options
node scripts/capture-demo-thumbnails.js all --device all --fit
```

### Command Line Usage

```
node scripts/capture-demo-thumbnails.js [target] [resolution] [--fit] [--device <device>]
```

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| `target` | Demo ID or `all` | `all` | Which demo(s) to capture |
| `resolution` | `1080p`, `720p`, `480p`, `360p` | `720p` | Screenshot dimensions (legacy mode) |
| `--fit` | flag | off | Click "fit to screen" before capture |
| `--device` | device name or group | none | Apple device viewport preset |

### Examples

```bash
# Resolution mode (legacy)
node scripts/capture-demo-thumbnails.js all              # All demos at 720p
node scripts/capture-demo-thumbnails.js all 1080p --fit  # All demos at 1080p with fit

# Device mode (Apple presets)
node scripts/capture-demo-thumbnails.js all --device desktop   # MacBook Pro 16"
node scripts/capture-demo-thumbnails.js all --device tablet    # iPad Pro 12.9"
node scripts/capture-demo-thumbnails.js all --device mobile    # iPhone 15 Pro
node scripts/capture-demo-thumbnails.js all --device all       # All 3 devices

# Single demo
node scripts/capture-demo-thumbnails.js 4009 --device all --fit
```

### Output

Screenshots are saved to `public/thumbnails/`:
- Resolution mode: `{id}.png`
- Device mode: `{id}-{device}.png`

### Device Presets

| Shortcut | Device | Dimensions |
|----------|--------|------------|
| `desktop` | MacBook Pro 16" | 1728×1117 |
| `tablet` | iPad Pro 12.9" | 1024×1366 |
| `mobile` | iPhone 15 Pro | 393×852 |
| `all` | All 3 above | - |

**All available devices:**
- Desktop: `macbook-pro-16`, `macbook-pro-14`, `imac-24`
- Tablet: `ipad-pro-12`, `ipad-pro-11`, `ipad-air`, `ipad-mini`
- Mobile: `iphone-15-pro-max`, `iphone-15-pro`, `iphone-15`, `iphone-se`

### Resolution Presets (Legacy)

| Preset | Dimensions | Use Case |
|--------|------------|----------|
| `1080p` | 1920×1080 | High quality |
| `720p` | 1280×720 | Default, good balance |
| `480p` | 854×480 | Smaller thumbnails |
| `360p` | 640×360 | Grid/collage views |

---

## Demo Video Capture

Records videos of BIMTLY 3D demos cycling through camera views using Puppeteer.

### Features

- Auto-detects number of views and cycles through all of them
- **Seamless loop**: ends on view 1 (same as start) for smooth looping
- **Device sync**: settle time ensures all device videos have identical timing
- **Multi-device capture**: record desktop, tablet, mobile in one command

### Quick Start

```bash
# Record single demo at default 1920x1080
node scripts/capture-demo-video.js 8520

# Record with all device sizes (synced)
node scripts/capture-demo-video.js 8520 --device all
```

### Command Line Usage

```
node scripts/capture-demo-video.js <demo-id|all> [options]
```

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| `demo-id` | Demo ID or `all` | required | Which demo(s) to record |
| `--duration` | seconds | `2` | Seconds to hold each camera view |
| `--device` | device name or group | none | Apple device viewport preset |
| `--settle` | milliseconds | `1500` | Wait time after view change (for sync) |

### Examples

```bash
# Single demo, default viewport (1920x1080)
node scripts/capture-demo-video.js 8520

# Single demo, 3 seconds per view
node scripts/capture-demo-video.js 8520 --duration 3

# Single demo, mobile viewport
node scripts/capture-demo-video.js 8520 --device mobile

# Single demo, all 3 device sizes (creates 3 synced videos)
node scripts/capture-demo-video.js 8520 --device all

# All demos, desktop viewport
node scripts/capture-demo-video.js all --device desktop

# Specific Apple device with longer settle time
node scripts/capture-demo-video.js 8520 --device ipad-air --settle 2000
```

### Output

Raw videos are saved to `output/videos/`:
- Default: `{id}.mp4`
- With device: `{id}-{device}.mp4`

### Device Presets

| Shortcut | Device | Dimensions |
|----------|--------|------------|
| `desktop` | MacBook Pro 16" | 1728×1117 |
| `tablet` | iPad Pro 12.9" | 1024×1366 |
| `mobile` | iPhone 15 Pro | 393×852 |
| `all` | All 3 above | - |

**All available devices:**
- Desktop: `macbook-pro-16`, `macbook-pro-14`, `imac-24`
- Tablet: `ipad-pro-12`, `ipad-pro-11`, `ipad-air`, `ipad-mini`
- Mobile: `iphone-15-pro-max`, `iphone-15-pro`, `iphone-15`, `iphone-se`

### Video Sync Behavior

When using `--device all`, videos are synced by:
1. Same settle time before/after each view change
2. Identical view duration across all devices
3. All videos end on view 1 for seamless loop

The `--settle` flag absorbs variable 3D loading times, ensuring all device videos have identical duration even if one device renders slower.

### How It Works

1. Opens demo page at specified viewport size
2. Clicks "fit to screen" button
3. Counts camera views by clicking "Next view" until cycling back
4. Resets to first view
5. Waits for settle time before recording
6. Records video while cycling through all views
7. After last view, clicks "Next" to return to view 1 (seamless loop)
8. Saves MP4 file to `output/videos/`

---

## Video Optimization

Optimizes MP4 videos for web delivery using FFmpeg. Adds faststart, optimizes bitrate, and ensures browser compatibility.

### Requirements

FFmpeg must be installed:
```bash
# macOS
brew install ffmpeg

# Ubuntu
apt install ffmpeg
```

### Quick Start

```bash
# Optimize all raw videos to web-ready
node scripts/optimize-videos.js output/videos --output public/videos

# Single file
node scripts/optimize-videos.js output/videos/8520.mp4
```

### Command Line Usage

```
node scripts/optimize-videos.js <input> [options]
```

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| `input` | file or directory | required | Video(s) to optimize |
| `--output` | directory | `public/videos` | Output directory |
| `--crf` | 0-51 | `23` | Quality (lower=better) |
| `--preset` | see below | `medium` | Encoding speed |
| `--overwrite` | flag | off | Replace existing files |

### Examples

```bash
# Batch optimize all videos
node scripts/optimize-videos.js output/videos

# Single file with higher quality
node scripts/optimize-videos.js output/videos/8520.mp4 --crf 20

# Smaller files (slower encoding)
node scripts/optimize-videos.js output/videos --preset slow

# Overwrite existing
node scripts/optimize-videos.js output/videos --overwrite
```

### Output

Optimized videos are saved to `public/videos/` with same filename.

### Quality Settings

| CRF | Quality | Use Case |
|-----|---------|----------|
| 18 | High | Master/archive |
| 23 | Good | Default, web delivery |
| 28 | Medium | Bandwidth constrained |

### Preset Options

| Preset | Speed | File Size |
|--------|-------|-----------|
| `ultrafast` | Fastest | Largest |
| `fast` | Fast | Larger |
| `medium` | Balanced | Balanced |
| `slow` | Slow | Smaller |
| `veryslow` | Slowest | Smallest |

### What It Does

- H.264 high profile encoding
- FastStart (metadata at beginning for instant playback)
- YUV420P pixel format for compatibility
- Removes audio track (our videos are silent)
- Typically achieves ~50-60% size reduction

---

## Typical Video Workflow

```bash
# 1. Record raw videos for all devices
node scripts/capture-demo-video.js 8520 --device all

# 2. Optimize for web
node scripts/optimize-videos.js output/videos --output public/videos --overwrite

# Result:
# - output/videos/8520-*.mp4 (raw, large)
# - public/videos/8520-*.mp4 (optimized, web-ready)
```

---

## PDF Generation

Generate PDF flyers and pitch decks from React pages.

```bash
# All PDFs
npm run build:pdf

# Specific targets
npm run build:flyer    # Flyer only
npm run build:deck     # Pitch deck only
```

Output: `output/*.pdf`

---

## PNG Diagram Generation

Generate PNG/WebP images of diagrams.

```bash
# All PNGs
npm run build:png

# Specific targets
npm run build:connectivity    # Digital connectivity diagram
npm run build:platform-png    # Platform diagram
```

Output: `output/*.png` and `output/*.webp`

---

## Available Demos

**3D Viewer (`/v/`) - 20 demos:**
- `3576` - Fire Equipment
- `4009` - Engine (requires auth)
- `4657` - CNC Demo (requires auth)
- `1016` - Tiny House Homepage
- `467` - Tiny House AR/VR
- `585` - Tiny House #2 (requires auth)
- `998` - Knapp Connector
- `978` - Knapp + Timber
- `950` - Pergola
- `8434` - Bedroom
- `8194` - Construction Prop
- `8190` - Warehouse Construction
- `8190` - Container Site
- `8201` - Garage Under Construction
- `8232` - Scaffold Stairs
- `8236` - Warehouse Building
- `8267` - Wooden Frame House
- `8315` - Modular Building
- `8305` - Tent Canopy
- `8373` - Metal Fence
- `8520` - Featured Demo

**Special Demos - 2:**
- `pergola-config` - Pergola Configurator (`/demo/pergola`)
- `feal` - FEAL Embed (`/embed/204`)

### Authentication

Some demos require login. The scripts handle this automatically:
- Uses `test` user credentials for protected demos
- Logs in once per session, reuses session for subsequent captures

### Adding New Demos

Edit `DEMOS` array in `scripts/constants.js`:

```javascript
{ id: 'unique-id', path: '/v/1234', name: 'demo-name', auth: null }
// or with auth:
{ id: 'unique-id', path: '/v/1234', name: 'demo-name', auth: 'test' }
```
