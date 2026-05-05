# Prefab / Modular Houses — Vertical Notes

**Vertical**: Prefabricated / modular / panelized residential housing
**Compiled**: 2026-05-05
**Purpose**: (1) shared context for any prospect file in this vertical;
(2) reusable outreach template; (3) prospect-mining target list

---

## What the Vertical Actually Sells

Prefab manufacturers sell **a finished home, configured**. The product
is not a single SKU — it's a system with high-impact configuration
axes, sold mostly to private end-customers (B2C) but produced like a
B2B engineered product.

**Universal configuration axes** (vary by manufacturer, but the
shape is the same):

| Axis | Typical options |
|---|---|
| **House type** | single-story · two-story · with attic · multi-family |
| **Construction system** | timber frame · SIP panels · CLT · ICF · steel frame · hybrid |
| **Energy tier** | standard · low-energy · passive · near-zero · plus-energy |
| **Footprint / layout** | 60–300 m², predefined templates + custom adjustments |
| **Finishes** | facade · roof · windows · interior package |
| **Add-ons** | garage · terrace · pergola · photovoltaics · heat pump |

A typical purchase price is **€100k–€500k+**, which makes the
purchase decision long, anxious, and visually-driven. Customers want
to *see* the result before signing.

---

## The Central Pain (used as outreach hook)

> *"If a customer can't see their future home, they won't buy it."*

Every prefab manufacturer feels this. Today's resolution path:

1. Customer browses PDF catalog or photo gallery → sends inquiry.
2. Sales rep manually assembles a quote in Excel/Word over 1–5 days.
3. 3D rendering (if any) is outsourced or done by an internal designer
   on demand — not real-time.
4. By the time the offer arrives, the customer has already been
   contacted by a competitor with a faster experience.

**Quantified pain**: every day of quote turnaround = measurable drop in
conversion on a €100k+ purchase. Even small lifts in conversion are
material.

---

## Digital Maturity Across the Vertical

Most prefab manufacturers operate at **~2015 digital maturity**.
Typical web stack:

- PDF catalog / brochure download
- Photo gallery of completed projects
- "Request a quote" contact form
- Sometimes a basic price calculator (sliders for m², no 3D)
- Almost never a live 3D configurator
- A handful embed Sketchfab / similar for one-off 3D models — not
  connected to pricing or configuration

### What's almost entirely absent

- Live 3D house configurator on the product page
- Real-time pricing tied to configuration
- Branded automatic quotation PDFs
- Connected handoff: configurator → quote → order → production
- Dealer / regional partner portals with shared product data
- Multilingual self-service across markets

### Notable exceptions (still incomplete)

| Company | Region | What they have | Gap |
|---|---|---|---|
| **Bien-Zenker** | DE | Configurator with pricing | Limited 3D; not parametric |
| **WeberHaus** | DE | Interactive house planner | Rough UX; no live quote |
| **Schwörer / Hanse Haus** | DE | Strong galleries, BIM downloads | No live configurator |
| **OKAL / Streif / Rensch-Haus** | DE | PDF + form | No 3D, no calculator |
| **Honkarakenne / Kontio** | FI | Strong product pages | No config-to-quote |
| **Vario-Haus** | AT | Type catalog + price ranges | Static |

**No prefab manufacturer in EU ships a fully integrated browser-based
3D configurator with live pricing and connected quote output.** Open
territory.

---

## Why BIMTLY Fits Cleanly

- High product complexity → BIMTLY's parametric product engine.
- Visual purchase decision → 3D Studio with real-time material binding.
- Long quote cycle → one-click branded PDF quote from the configurator.
- Distributor / regional partner networks → multi-tenant, branded portals.
- B2C front + B2B-style production handoff → unified data layer fits
  both sides.

ICP fit score (per `SALES_OUTREACH_CONTEXT.md` §3): **high primary**.

---

## Outreach Template — Follow-Up After Calls (English)

**When to use**: prospect already had 1+ phone conversations. Email
serves as a written summary + concrete next step. Replace `[COMPANY]`,
`[FIRST_NAME]`, `[CONSTRUCTION_SYSTEMS]`, `[SHOWCASE_LINK]`.

```
Subject: BIMTLY for [COMPANY] — short summary after our calls

Dear [FIRST_NAME],

Thank you for the conversations — as agreed, here is a short summary
of how BIMTLY would look concretely for [COMPANY].

The idea is simple: a customer on your website configures the house
themselves — picks the type (single-story, two-story, with attic),
the construction system ([CONSTRUCTION_SYSTEMS]), adjusts the
floorplan — and immediately gets a 3D preview and an indicative
price. The same configuration then becomes the quote, the order, and
the customer in your CRM, with no manual re-entry between systems.

This shortens the path from inquiry to offer, and gives your team a
single view across every stage — from first inquiry to delivery.

I'd suggest a short, 30-minute demo where I walk through this on a
[COMPANY] scenario and answer any questions. Feel free to propose a
time that suits you next week.

Best regards,
[SENDER_NAME]

P.S. For a sense of the final experience — BIMTLY showcase gallery
with a Pergola Configurator example: [SHOWCASE_LINK]
```

**~150 words. One CTA. No pitch-deck bullets. No tech jargon. No
unverified statistics.**

### Why this version works

- **Opens on prior calls**, not on a slogan or flattery.
- **Customer's own vocabulary** (house type, construction system,
  floorplan) — proves you've read their catalog.
- **Outcome in their language** ("inquiry to offer", "first inquiry
  to delivery") — not ours ("CPQ", "data binding").
- **No claims about their current stack.** Doesn't say what they do
  or don't have.
- **No competitor benchmarks** ("companies see 40% growth") — we
  don't have proprietary data to back that up.
- **One soft CTA**, P.S. is a passive resource, not a second ask.

### Variant — First Touch (no prior calls)

Use the Official Short or Personal Short template from
`SALES_OUTREACH_CONTEXT.md` §7, with `[CONFIG_PARAMS]` filled as e.g.
*"house type, construction system, floorplan, energy tier"*.

---

## Prospect Spinoffs From This Vertical

Companies that warrant their own `prospects/[NAME].md`:

### DACH (highest digital pressure, biggest deal sizes)
- [ ] WeberHaus (DE)
- [ ] Bien-Zenker (DE)
- [ ] Schwörer Haus (DE)
- [ ] Hanse Haus (DE)
- [ ] OKAL Haus (DE)
- [ ] Streif (DE)
- [ ] Rensch-Haus (DE)
- [ ] Vario-Haus (AT)
- [ ] HARTL HAUS (AT)
- [ ] Renggli (CH)

### Nordics (high CLT / timber-frame share)
- [ ] Honkarakenne (FI)
- [ ] Kontio (FI)
- [ ] Polar Life Haus (FI)
- [ ] Lindbäcks (SE)

### CEE / Adriatic (closer geography, easier first wins)
- [ ] Multiple HR / SI / RS prefab manufacturers — pull from regional
      directories before adding individual entries

### Notes for prospect-mining
- Prioritize manufacturers with **5+ predefined house types** AND
  **multiple construction systems** — these have the most painful
  configuration matrix.
- Deprioritize pure log-cabin / single-system shops — too narrow for
  configurator ROI.
- A weak website (PDF + contact form only) is a positive signal, not
  a negative — bigger gap to close.

---

## Maintenance

Update this file when:
- A new prefab manufacturer ships a real configurator → adjust the
  "exceptions" table.
- A new construction system enters mainstream (e.g., 3D-printed
  concrete houses scale up) → extend config-axes table.
- An outreach variant proves measurably better → replace template;
  archive prior version in this file's git history.
- A prospect from this vertical reaches `closed-won` → add a one-line
  "Reference" pointer at the top so future drafts can name them
  (with their permission).
