# Hero Video Script & Best Practices

## Quick Reference

| Aspect | Recommendation |
|--------|----------------|
| Duration | 15-30s (autoplay) / 60-90s (explainer) |
| Resolution | 1080p min, 4K preferred |
| Aspect Ratios | 16:9 (desktop), 1:1 (social), 9:16 (mobile) |
| File Size | <10MB for web |
| Audio | Works muted - no audio dependency |

---

## Industry Best Practices

### The 3-Act Formula

**Act 1: Hook (0-5s)**
- Capture attention immediately
- Start with pain point OR "wow" moment
- No logos, no text walls
- Motion from frame 1

**Act 2: Show Value (5-25s)**
- Product in action, not features list
- Real use cases, not abstract concepts
- Before/after or transformation
- Speed and fluidity

**Act 3: CTA (last 3-5s)**
- Single clear action
- Logo resolve
- Tagline optional

---

## Top Industry Patterns

### 1. Product-in-Context
Show product being used naturally in real workflow.
- **Example:** Figma showing designers collaborating
- **Best for:** SaaS, tools, platforms

### 2. Problem → Solution
Quick pain montage → smooth resolution with product.
- **Example:** Monday.com chaos → organized boards
- **Best for:** Productivity, management tools

### 3. Transformation/Before-After
Static old way → Dynamic new way.
- **Example:** PDF catalog → Interactive 3D configurator
- **Best for:** BIMTLY use case

### 4. Speed Demo
Hyperlapse of complex task done in seconds.
- **Example:** Webflow building site in 60s
- **Best for:** No-code, builders

### 5. Social Proof Montage
Quick cuts of real customers/brands using product.
- **Example:** Logos, screenshots, testimonials
- **Best for:** Established products

### 6. Cinematic Product Shots
Apple-style close-ups with depth of field, UI floating in 3D space.
- **Best for:** Premium positioning

---

## What to Avoid

- ❌ Starting with logo (boring, skip-worthy)
- ❌ Feature lists as text overlays
- ❌ Stock footage that doesn't match product
- ❌ Voiceover explaining obvious UI actions
- ❌ More than 2 fonts
- ❌ Slow fade-ins (attention lost in 2s)
- ❌ Music-dependent storytelling (muted autoplay)

---

## BIMTLY Hero Video Script

### Version A: 30-Second Homepage Loop

**Recommended Pattern:** Transformation + Product-in-Context

```
SCENE 1 — THE PAIN (0-5s)
────────────────────────────────────────
Visual: Split screen, rapid cuts
- Left: Static PDF catalog, pages flipping uselessly
- Right: Spreadsheet with endless rows, mouse scrolling
- Center: Sales rep on phone, frustrated, flipping through papers

Audio: None (muted autoplay)
Text: None yet

Mood: Frustration, inefficiency, chaos
Transition: Hard cut to black (0.2s)


SCENE 2 — THE MAGIC (5-22s)
────────────────────────────────────────
Visual: Browser frame with BIMTLY interface

5-8s: 3D Product Configurator
- Window/door product spinning smoothly
- Customer clicks color option → instant change
- Clicks size → model updates in real-time
- Price counter updating live: €2,450 → €2,780

8-12s: Data Flow Animation
- Abstract visualization: data points connecting
- ERP icon ↔ BIMTLY ↔ Website icon
- "Sync" ripple effect

12-17s: Customer Self-Service
- Mobile device showing configurator
- Thumb tapping options
- "Add to Quote" button pressed
- Confirmation checkmark animation

17-22s: Results Dashboard
- Analytics dashboard fading in
- Numbers counting up: "47 quotes this week"
- Conversion graph trending upward
- Notification: "New order: €12,400"

Mood: Smooth, fast, satisfying
Transitions: Smooth morphs, no hard cuts


SCENE 3 — THE RESOLVE (22-30s)
────────────────────────────────────────
Visual: Clean branded background

22-25s: Value Statement
- Text animates in: "Products. Easier to sell."
- Brief pause

25-28s: Logo Reveal
- BIMTLY logo assembles/fades in
- Tagline: "The Unified Platform for Physical Products"

28-30s: CTA
- Button animates: "Start Free Trial"
- URL: bimtly.com

Mood: Confident, clean, professional
Transition: Seamless loop back to Scene 1
```

---

### Version B: 60-Second Explainer (with Audio)

```
SCENE 1 — HOOK (0-5s)
────────────────────────────────────────
Visual: Montage of frustrated scenarios
- Sales rep: "Let me find that spec sheet..."
- Customer waiting on phone
- Competitor website with sleek 3D configurator

VO: "Your competitors are closing deals online. Are you?"


SCENE 2 — PROBLEM (5-15s)
────────────────────────────────────────
Visual: Pain point illustrations

5-8s: Scattered Systems
- Icons floating disconnected: PDF, Excel, ERP, Website
- Red "X" connections between them

8-12s: Slow Sales Cycle
- Calendar pages flipping: "Day 1... Day 3... Day 7..."
- Customer email: "Still waiting for quote..."

12-15s: Lost Opportunities
- Phone ringing → going to voicemail
- Competitor notification: "Order confirmed!"

VO: "Disconnected systems. Manual quotes. Customers who won't wait."


SCENE 3 — SOLUTION (15-40s)
────────────────────────────────────────
Visual: BIMTLY in action

15-20s: Unified Platform
- Dashboard overview
- All tools in one interface
- Smooth navigation between modules

VO: "BIMTLY connects everything in one platform."

20-28s: 3D Configurator Demo
- Product spinning
- Options being selected
- Price updating
- "Generate Quote" → instant PDF

VO: "Customers configure products themselves. Real-time pricing. Instant quotes."

28-35s: Connected Data
- Change in BIMTLY → updates on website
- ERP sync animation
- "Single source of truth"

VO: "Change once, update everywhere. Your ERP, your website, your sales tools—all connected."

35-40s: Results
- Happy customer on laptop
- Sales notification on phone
- Team celebrating metric

VO: "Close deals faster. Delight customers. Grow revenue."


SCENE 4 — CTA (40-60s)
────────────────────────────────────────
Visual: Logo and call-to-action

40-45s: Social Proof
- Logo strip: customer brands
- "Trusted by 200+ manufacturers"

45-52s: Offer
- "14-day free trial"
- "No credit card required"
- "Setup in minutes"

52-60s: Final CTA
- BIMTLY logo
- "bimtly.com/start"
- "Make your products easier to sell."

VO: "Start your free trial at bimtly.com"
```

---

## Remotion Implementation Notes

### Recommended Composition Structure

```
src/remotion/HeroVideo/
├── index.tsx              # Main composition
├── scenes/
│   ├── PainScene.tsx      # Scene 1: The problem
│   ├── MagicScene.tsx     # Scene 2: Product in action
│   └── ResolveScene.tsx   # Scene 3: Logo + CTA
├── components/
│   ├── BrowserMockup.tsx  # Use existing BrowserFrame
│   ├── PriceCounter.tsx   # Animated number
│   ├── DataFlow.tsx       # Connected dots animation
│   └── LogoReveal.tsx     # Brand animation
└── assets/
    ├── screenshots/       # Product screenshots
    └── icons/             # UI icons
```

### Key Animations to Build

1. **Price Counter** - Numbers counting up smoothly
2. **Data Flow** - Dots connecting between system icons
3. **Checkmark Confirm** - Satisfying success animation
4. **Graph Trend** - Line drawing upward
5. **Logo Assemble** - Letters/icon coming together

### Existing Components to Reuse

- `BrowserFrame` - macOS browser mockup
- `MonitorFrame` - Apple monitor mockup
- `HeroBackground` - Gradient background
- `RapidShowcase` - Screenshot slideshow
- `FloatingCards` - 3D card animations

---

## Export Specifications

### Web (Homepage Autoplay)
- Format: MP4 (H.264) + WebM fallback
- Resolution: 1920x1080
- FPS: 30
- Bitrate: 5-8 Mbps
- File size: <10MB
- Loop: Seamless

### Social Media Cuts
| Platform | Aspect | Duration | Notes |
|----------|--------|----------|-------|
| LinkedIn | 16:9 | 30s | Add captions |
| Instagram Feed | 1:1 | 30s | Crop to center |
| Instagram Reels | 9:16 | 30s | Vertical reframe |
| Twitter/X | 16:9 | 30s | Add captions |
| YouTube | 16:9 | 60s | Full version |

### Thumbnail/Poster
- Export frame 1 as PNG
- Use as `poster` attribute for video element
- Ensure it's compelling standalone

---

## Production Checklist

- [ ] Gather real product screenshots (not mockups)
- [ ] Record actual BIMTLY UI interactions
- [ ] Create smooth 3D product spin (60fps source)
- [ ] Design data flow animation
- [ ] Compose background music track (optional)
- [ ] Write captions/subtitles
- [ ] Test muted autoplay on mobile
- [ ] Optimize file size for web
- [ ] Create all aspect ratio variants
- [ ] A/B test thumbnail options
