# BIMTLY Visuals - Scripts Guide

Automation scripts for generating promotional assets.

---

## Available Scripts

| Script | npm Command | Description |
|--------|-------------|-------------|
| `generate-pdf.js` | `npm run build:pdf` | Generate PDF flyers/decks |
| `generate-png.js` | `npm run build:png` | Generate PNG diagrams |
| `capture-demo-thumbnails.js` | `npm run capture:thumbnails` | Capture demo screenshots |

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
