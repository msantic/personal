# BIMTLY Sales — Operational Workspace

Prospect-specific research, outreach drafts, and activity logs. Lives outside the main repo because this is **operational** (changes daily, tied to active pipeline) rather than **product documentation** (stable, versioned with releases).

**Main-repo counterpart**: `bimtly/docs/Sales/SALES_OUTREACH_CONTEXT.md` — stable templates, placeholders, USPs, ICP, competitor map, objection handling. Read-only from this workspace's perspective.

---

## Folder Contract

```
sales/
├── README.md              ← this file
├── _TEMPLATE.md           ← copy to prospects/[NAME].md when starting a new prospect
├── prospects/             ← active research + drafted outreach, one file per company
├── sent/                  ← immutable archive of actually-sent emails (one file per send)
└── research/              ← vertical/market notes not tied to a single prospect
```

### `prospects/[COMPANY].md`
**One file per company.** Status values: `draft · sent · in-conversation · closed-won · closed-lost · paused`. The file stays active from first research until the deal closes or dies. Update the Activity Log on every touchpoint.

### `sent/[COMPANY]__YYYY-MM-DD__[variant].md`
**Immutable record of what was actually sent.** Never edit these. File name pattern lets you diff variants over time (e.g., `POLYCRETE__2026-04-25__founder-voice.md` vs `POLYCRETE__2026-05-12__followup-1.md`).

### `research/[TOPIC].md`
**Vertical or market-level notes** that inform multiple prospects — e.g., `ICF_MARKET.md`, `DACH_MANUFACTURERS.md`, `WINDOW_SYSTEMS.md`. Avoid duplicating this inside every prospect file.

---

## AI Agent Contract

When a sales-research or outreach-drafting agent is invoked, it operates under this contract:

### Read sources (authoritative, do NOT modify)
- `bimtly/docs/Sales/SALES_OUTREACH_CONTEXT.md` — USPs, ICP, templates, placeholders, objection handling. The agent's knowledge base.
- `bimtly/docs/Sales/EXECUTIVE_SUMMARY.md`, `BIMTLY_ONE_PAGER.md`, `PARTNERSHIP_MODEL.md` — deeper product/platform context.
- `bimtly-visuals/context/BIMTLY Sales Playbook *.md`, `PRICING STRATEGY.md`, `BIMTLY_Market-Positioning_Competitive-Analysis_v1.md` — strategic background.
- `bimtly/apps/website/src/routes/` and `…/components/` — what's publicly shippable to link in emails.
- `bimtly-visuals/sales/research/*.md` — shared market intel.

### Write targets (agent-managed)
- `bimtly-visuals/sales/prospects/[COMPANY].md` — create from `_TEMPLATE.md`, fill with research, draft emails, update Activity Log.
- `bimtly-visuals/sales/sent/*.md` — append-only; write once per actual send; never overwrite.
- `bimtly-visuals/sales/research/*.md` — update when vertical-level insight emerges that would otherwise be duplicated across prospects.

### Core rules the agent must follow
1. **Never critique the prospect's existing site, page, or tools in email copy.** Pitch what BIMTLY delivers; let contrast land without naming it. (See `bimtly/memory/feedback_never_critique_prospect.md` equivalent rule in the Claude memory system.)
2. **Always map corporate structure before choosing a contact.** Parent/subsidiary/licensee relationships determine deal size and the right addressee. Document the map in `prospects/[COMPANY].md` under "Corporate Structure."
3. **Use the founder-voice templates from `SALES_OUTREACH_CONTEXT.md` §7.** Fill placeholders; do not invent new template structures.
4. **No backhanded compliments.** Banned phrasings: *"X is impressive — the page itself is just Y"*, *"your current Z is …"*, *"missing from your site"*, *"we'd replace"*.
5. **One soft CTA per email. Never two.**
6. **Opener ≠ generic flattery.** Either reference a specific recent signal (product launch, fair, press) or start with the offer. Avoid *"I came across / I was impressed by / hope this finds you well."*
7. **Log every touchpoint in the Activity Log table** (date · channel · action · response · next-action). No touch goes unlogged.
8. **Never mark a prospect `closed-won` or `closed-lost` without human confirmation.** The agent drafts; the human ships and decides.

---

## Human Workflow

1. **New prospect appears** (fair, referral, inbound, idle thought):
   - Copy `_TEMPLATE.md` → `prospects/[COMPANY].md`.
   - Ask the agent to research + draft, or do it yourself referencing `SALES_OUTREACH_CONTEXT.md`.

2. **Ready to send**:
   - Review the drafted email, pick one version, personalize final line.
   - Send from personal mail client or via an AI-marketing tool.
   - Copy the exact sent text into `sent/[COMPANY]__YYYY-MM-DD__[variant].md`.
   - Append row to the prospect's Activity Log.

3. **Response received**:
   - Append to Activity Log.
   - Update Status field at the top of the prospect file.
   - If in-conversation, the agent can help draft a reply using the same context.

4. **Weekly review**:
   - Glance at every prospect file Status; anything `sent` without a response for >14 days → agent drafts a follow-up.

---

## Why Not a Separate Repo

Considered. A dedicated `bimtly-sales` repo would be cleaner and more private, but:
- One more thing to maintain.
- The content is already mixed-use with other ops-side assets in `bimtly-visuals/context/` (sales playbook, pricing strategy, market positioning).
- Keeping it here groups all operational content in one place.

Upgrade to its own repo when the pipeline volume demands it, or when any of this content needs different access permissions than the rest of `bimtly-visuals`.
