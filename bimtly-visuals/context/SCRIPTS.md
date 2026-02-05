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

---

## Demo Thumbnail Capture

Automates screenshot capture of BIMTLY 3D viewer demos using Puppeteer.

### Quick Start

```bash
# Capture all 22 demos at 720p (default)
npm run capture:thumbnails

# Or run directly with options
node scripts/capture-demo-thumbnails.js all 720p --fit
```

### Command Line Usage

```
node scripts/capture-demo-thumbnails.js [target] [resolution] [--fit]
```

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| `target` | Demo ID or `all` | `all` | Which demo(s) to capture |
| `resolution` | `1080p`, `720p`, `480p`, `360p` | `720p` | Screenshot dimensions (16:9) |
| `--fit` | flag | off | Click "fit to screen" before capture |

### Examples

```bash
# All demos at default 720p
node scripts/capture-demo-thumbnails.js all

# All demos at 1080p with fit-to-screen
node scripts/capture-demo-thumbnails.js all 1080p --fit

# Single demo by ID
node scripts/capture-demo-thumbnails.js 4009

# Single demo with specific resolution
node scripts/capture-demo-thumbnails.js 8194 480p

# List available demo IDs (run with invalid ID)
node scripts/capture-demo-thumbnails.js invalid
```

### Output

Screenshots are saved to `public/thumbnails/{id}.png`

### Resolution Presets

| Preset | Dimensions | Use Case |
|--------|------------|----------|
| `1080p` | 1920x1080 | High quality, large file size |
| `720p` | 1280x720 | Default, good balance |
| `480p` | 854x480 | Smaller thumbnails |
| `360p` | 640x360 | Grid/collage views |

### Available Demos (22 total)

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

**Special Demos - 2:**
- `pergola-config` - Pergola Configurator (`/demo/pergola`)
- `feal` - FEAL Embed (`/embed/204`)

### Authentication

Some demos require login. The script handles this automatically:
- Uses `test` user credentials for protected demos
- Logs in once per session, reuses session for subsequent captures

### Adding New Demos

Edit `DEMOS` array in `scripts/capture-demo-thumbnails.js`:

```javascript
{ id: 'unique-id', path: '/v/1234', name: 'demo-name', auth: null }
// or with auth:
{ id: 'unique-id', path: '/v/1234', name: 'demo-name', auth: 'test' }
```

---

## Demo Video Capture

Records videos of BIMTLY 3D demos cycling through camera views using Puppeteer.

### Quick Start

```bash
# Record single demo at default 1920x1080
node scripts/capture-demo-video.js 8520

# Record with all device sizes
node scripts/capture-demo-video.js 8520 --device all
```

### Command Line Usage

```
node scripts/capture-demo-video.js <demo-id|all> [--duration <seconds>] [--device <device>]
```

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| `demo-id` | Demo ID or `all` | required | Which demo(s) to record |
| `--duration` | seconds | `2` | Duration per camera view |
| `--device` | device name or group | none | Apple device viewport preset |

### Examples

```bash
# Single demo, default viewport (1920x1080)
node scripts/capture-demo-video.js 8520

# Single demo, 3 seconds per view
node scripts/capture-demo-video.js 8520 --duration 3

# Single demo, mobile viewport
node scripts/capture-demo-video.js 8520 --device mobile

# Single demo, all 3 device sizes (creates 3 videos)
node scripts/capture-demo-video.js 8520 --device all

# All demos, desktop viewport
node scripts/capture-demo-video.js all --device desktop

# Specific Apple device
node scripts/capture-demo-video.js 8520 --device ipad-air
```

### Output

Videos are saved to `public/videos/`:
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

### How It Works

1. Opens demo page at specified viewport size
2. Clicks "fit to screen" button
3. Counts camera views by clicking "Next view" until cycling back
4. Resets to first view
5. Records video while cycling through all views (holding each for `--duration` seconds)
6. Saves MP4 file

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
