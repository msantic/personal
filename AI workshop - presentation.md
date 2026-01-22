# AI Workshop for Developers

---

## Agenda

1. Disclaimer & Team Input
2. The Paradigm Shift
3. What Are AI Agents?
4. Copilot vs Claude Code
5. Setup & Configuration
6. The Feedback Loop (Most Important!)
7. Best Practices
8. Live Demo
9. Showcase: Complex AI-Built Features
10. Security & Pitfalls
11. Resources & Q&A

---

# Part 1: Introduction

---

## Disclaimer

- I'm not an expert — just using it 10h a day
- These are my best practices, not universal truths

> As a non-deterministic system, there is no single best way — you need to adapt it to your process

---

## Team Input

**Let's discuss:**
- What AI models are you currently using?
- Which IDEs and plugins? (Copilot, Claude Code, Cursor, etc.)
- What's working? What's frustrating?

---

# Part 2: The Paradigm Shift

---

## We're Becoming Supervisors

- Focus on **high-level architecture**, not boilerplate
- Significantly **reduces mental fatigue**
- AI handles implementation details
- We guide, review, and make key decisions

---

## The Reality Check

> There are still skeptics, but AI has already won — we need to take the best from both worlds and adapt

- We can't compete with AI's speed and accumulated knowledge
- But we bring: vision, context, judgment, creativity

---

## Stay Open to Better Architecture

AI often suggests improvements we hadn't considered:
- Various design patterns
- Better naming conventions
- Consistency with the rest of the codebase
- And much more

---

## The Double-Edged Sword

**Good & bad:** The field moves incredibly fast

- If you don't follow for just 1-2 months, you're already behind
- New models, tools, and techniques constantly emerging
- Continuous learning is now mandatory

---

# Part 3: AI Agents

---

## What Are AI Agents?

> AI that takes actions, not just generates text

**Chat-based AI:**
- You ask, it responds
- Copy-paste workflow

**AI Agents:**
- Reads and writes files
- Runs terminal commands
- Executes multi-step tasks autonomously
- Can run in parallel

---

# Part 4: Copilot vs Claude Code

---

## Main Differences

| Aspect | Copilot | Claude Code |
|--------|---------|-------------|
| Model | Any model | Claude Opus 4.5 (superior) |
| Planning | No native planning | Native planning mode ✓ |
| Interface | VS Code integrated | CLI + VS Code extension |
| Change Review | Accept vs Revert (great UX) ✓ | Weaker IDE integration |
| Images | Drag & drop ✓ | Needs workarounds |
| Voice-to-text | Native ✓ | Use OS-level |
| CLI | Basic | Powerful with system notifications ✓ |
| Reasoning | Good | Superior ✓ |

---

## Pricing Considerations

- **Subscription tiers** — know what you're paying for
- **Token usage and API costs** — can add up quickly
- **Cost vs productivity trade-off** — usually worth it

---

## Copilot

**Pros:**
- Accept vs Revert changes (great UX)
- Drag & drop images
- Better VS Code integration
- Native voice-to-text

**Cons:**
- No planning / no native Claude planning

---

## Claude Code

**Pros:**
- Native planning mode !!!
- Far superior coding model (Opus 4.5) !!!
- Powerful CLI with system notifications

**Cons:**
- Weaker IDE integration
- No drag & drop images (needs workarounds)
- No native voice-to-text (use OS-level)

---

# Part 5: Setup & Configuration

---

## Essential Files

- **CLAUDE.md** — Project context and instructions
- **Permissions** — `.claude/settings.local.json`
- **Custom PROMPTS.md** — Reusable prompt templates

---

## Skills (Custom Commands)

Set up shortcuts for repetitive tasks:
- `debugLogs` — Add structured logging
- `inline docs` — Generate documentation
- `debug db` — Database debugging helpers
- And more...

---

## Documentation is Key

**Importance of ./docs folder:**

Keep things documented with:
- Architectural details
- Technical specs
- Design decisions

> AI works better with good documentation!

---

# Part 6: The Feedback Loop

## (Most Important!)

---

## Speed Up Your Iteration Cycle

The key to productive AI development:

1. **Put test procedures in CLAUDE.md**
   - AI can run tests autonomously

2. **Test filtering support**
   - Run only one file when debugging

3. **Dedicated debug logs system**
   - Platform level, client and server side
   - Easy copy-paste into prompts

---

## The Goal

> Speed up fetching logs and re-feeding them into prompts

The faster you can:
- Get error output
- Copy it to AI
- Get a fix
- Verify it works

...the more productive you'll be.

---

# Part 7: Best Practices

---

## Model Choice

> I always use the latest and most powerful

- May seem slow/overkill for simple tasks
- But overall you save time:
  - Fewer errors
  - Less back-and-forth
  - Better understanding of context

---

## Parallel Agents

- Run **2-3 agents in parallel** to speed up development
- Don't go over that — mental overload
- **We are the bottleneck** (code review, testing), not AI

---

## Task Management

- **Divide big features into smaller tasks**
- Use Notion/Trello for planning and writing tasks
- Group tasks logically
- Copy-paste-ready, context-aware planning

**SHOW: My Notion organization**

---

## Writing Effective Prompts

- Give context and precise instructions
- It's fine to use broken English and shortcuts

**Pro tip:** Dictating is 3-4x faster than typing, especially for longer prompts

---

## Frustrating Behaviors (Expect Them)

AI doesn't always perform as expected:
- Git commit/checkout/resetting working drafts
- Ignoring skill commands (using console.logs instead of debugLogs)
- Overengineering simple solutions

---

## Give AI Everything

You can literally give everything to AI:
- Its own instructions and config
- Prompts for the next prompt
- CLI debugging
- DevOps infrastructure planning

> The key is to automate the process pipeline as much as possible

---

## Code Review Strategy

- **Read most generated code** — especially key decisions and file organization
- **But not black-box algorithms** — for those, create Vitest and e2e API tests
- Define **Git commit message rules**

---

# Part 8: Live Demo

---

## Example: How I Assign a Task

**LIVE DEMONSTRATION**

---

# Part 9: Showcase

## Complex Things AI Has Built

---

## NoCode DataBuilder

- Multiple layouts, views, and filters
- Entire feature built with AI assistance

**DEMO:** https://app.bimtly.com/editor/data/3576

---

## 3D Studio Features

- **Explode** — Component separation
- **X-Ray** — See-through visualization
- **Auto labels** — Real-time collision detection

**DEMO:** https://app.bimtly.com/editor/3d/4657/epoxy-granite-vmc

---

## More AI-Built Features

- **Refactoring** — Large-scale code improvements
- **DevOps** — Infrastructure and deployment
- **Sun Simulator** — https://app.bimtly.com/editor/3d/4766/pergolagazebob3-6mx3m-quad

---

## Tests & Documentation

- **Cypress** — E2E testing (SHOW)
- **Vitest** — ~2000 unit tests
- **e2e API tests**

---

# Part 10: Security & Pitfalls

---

## Security & Privacy

- **Never share** API keys, secrets, or credentials
- **Be cautious** with sensitive customer data
- AI can introduce security vulnerabilities — **always review security-critical code**
- **Establish a company policy** on AI usage

---

## When NOT to Use AI

- **Very small/obvious changes** — faster to do yourself
- **When you need deep understanding** — learning a new framework
- **When context overhead is high** — explaining would take longer than doing it

---

## Common Mistakes / Anti-patterns

- Blindly accepting code without understanding
- Not verifying output compiles/runs before moving on
- Giving too little context
- Giving too much conflicting context

---

## Code Review with AI

**Use AI to:**
- Review PRs and catch issues
- Explain legacy or unfamiliar code
- Identify potential bugs and improvements

---

# Part 11: Resources & Q&A

---

## Worth Following

**Boris Cherny**
- Author of Claude Code
- Recommendations on how to use it effectively

https://x.com/bcherny/status/2007179832300581177

---

## Q&A / Discussion

**Questions?**

Let's discuss your specific use cases and challenges.

---

## Thank You!

Now go build something amazing with AI.
