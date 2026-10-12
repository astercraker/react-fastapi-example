---
target: landing page (App.tsx)
total_score: 25
max_score: 36
na_heuristics: 10
p0_count: 1
p1_count: 1
target_identity: "file:/workspace/frontend/src/app/App.tsx"
target_fingerprint: "sha256:24eb8eb3109259b8acef1059e854fd0437c5c8c4d471348e9118b2f34f62df47"
target_path: /workspace/frontend/src/app/App.tsx
timestamp: 2026-09-17T17-12-13Z
slug: frontend-src-app-app-tsx
---
Method: dual-agent (A: ac09e4ad6abdcca2f · B: a8a8d35dbd91da1da)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Status pill, `aria-expanded` hamburger, "Enviando…" state all present |
| 2 | Match System / Real World | 3 | Ticket/dashboard metaphor lands for devs; "servicios registrados" is dev-jargon for the non-technical half of the audience |
| 3 | User Control and Freedom | 3 | Modal has Cancel, Escape, click-outside, focus-return to trigger — solid |
| 4 | Consistency and Standards | 2 | Three separate navs render the same 4 links; two carry the identical `aria-label="Navegación principal"` at once on mobile |
| 5 | Error Prevention | 2 | Submit guarded by empty-check, but the POST is guaranteed to fail (no backend yet) |
| 6 | Recognition Rather Than Recall | 4 | Tags/chips/pills keep everything visible, no memory burden |
| 7 | Flexibility and Efficiency | 2 | Not n/a: the triple-redundant nav actively costs efficiency rather than adding it |
| 8 | Aesthetic and Minimalist Design | 3 | Clean tokens/grid, but hero runs 3 competing animations at once (status ping, tech-panel pulse/reveal, card hover) |
| 9 | Error Recovery | 3 | Clear mailto fallback on submit failure — a real save |
| 10 | Help and Documentation | n/a | No task here is complex enough to warrant it |
| **Total** | | **25/36** | **Acceptable (69%)** |

## Design Specificity Verdict

**LLM assessment**: Mostly authored for this product, not boilerplate. The copy is genuinely specific — "aceptando nuevas solicitudes," "nuevo ticket"/"abierto," "servicios registrados," a hero headline naming the .NET→Python pivot directly, and a live tech-stack panel rendering the real stack. What undercuts it: 3 of 4 project cards lean on generic stock photography, and the four nav destinations (Retos/Blog/Agenda/Herramientas) are unbuilt placeholders — a chunk of the identity is aspirational scaffolding, not delivered content.

**Deterministic scan**: `impeccable detect --json` ran clean except one advisory hit:
- `codex-grid-background` — `frontend/src/app/board.css:923` — a two-axis grid-line gradient used as decorative background. The detector calls this out as a recurring generated-UI signature, appropriate for real canvas/map/blueprint surfaces, not general decoration. No findings in App.tsx, NavMenu.tsx, ChallengeModal.tsx, or ThemeToggle.tsx.

This lands right on top of the LLM's specificity concern: even though most of the copy is bespoke, this one visual device reads as a category default rather than something earned by the product — the rare case where the detector and the unanchored read agree.

**Visual overlays**: not available — no browser-automation tool is exposed in this session, so no live/console evidence was gathered. This is CLI-detector evidence only.

## Overall Impression

The positioning and copy are sharp and specific — this doesn't feel like a template. But three things undercut it: the one flagship call-to-action is structurally guaranteed to fail on submit, the page points visitors at three redundant navigation surfaces that all lead to pages that don't exist yet, and a third of the project proof is generic stock imagery in a product whose whole pitch is "real, verifiable work."

## What's Working

- The status pill + ping animation + "sin tratamiento" thumbnail note build a believable "live system" feel that fits a dev-credibility pitch better than a static portfolio would.
- Modal focus management (auto-focus the textarea, Escape to close, click-outside, return focus to the trigger button) is more careful than most portfolio contact forms bother with.
- `prefers-reduced-motion` is honored consistently everywhere motion exists (the ping dot, hamburger bars, menu drop, tech-stack panel) — real accessibility discipline, not lip service.

## Priority Issues

**[P0] The hero's only CTA always fails on submit**
Why it matters: "Proponme un reto" is the conversion action for both recruiters and clients; failing it at the front door damages trust regardless of the mailto fallback shown on error.
Fix: gate the CTA's visibility/copy on backend readiness, or frame it honestly as "próximamente" until `/challenges` exists.
Suggested command: `/impeccable harden`

**[P1] Triple redundant navigation to dead links**
Why it matters: the desktop pill nav, the hamburger dropdown, and the bottom tab bar all render the identical 4 links, and on mobile two of them mount at once — pure cognitive overhead for links that don't resolve to anything yet.
Fix: collapse to one nav surface until real routes exist, or hide nav entirely pre-launch.
Suggested command: `/impeccable distill`

**[P2] Two identical `aria-label="Navegación principal"` landmarks live simultaneously**
Why it matters: a screen-reader user's landmark rotor surfaces two regions with the same name and the same 4 links under 1024px — confusing, not just redundant.
Fix: differentiate the labels or remove one of the two mobile nav instances.
Suggested command: `/impeccable harden`

**[P2] Project proof leans on generic stock photography**
Why it matters: 3 of 4 cards use picsum.photos placeholders, weakening the exact promise PRODUCT.md sets as the success criterion — real, verifiable work.
Fix: swap in real screenshots, even rough ones, before generic imagery.
Suggested command: `/impeccable polish`

**[P3] "servicios registrados" is jargon for half the audience**
Why it matters: PRODUCT.md explicitly splits the audience between technical recruiters and non-technical clients; this label only speaks to one half.
Fix: plainer count label that reads naturally either way.
Suggested command: `/impeccable clarify`

## Persona Red Flags

**Jordan (First-Timer)**: reads the confident pivot headline, clicks "Proponme un reto" as the obvious next step, types a real idea, hits submit — and the very first hands-on interaction with the site ends in a `role="alert"` error message.

**Sam (Accessibility-Dependent)**: the screen-reader rotor surfaces two identically-labeled "Navegación principal" landmarks with identical links (hamburger nav + bottom tab bar, both mounted under 1024px); the tech-stack panel's animated boxes carry only a hover `title` attribute, so their content is effectively invisible to assistive tech.

**Casey (Distracted Mobile User)**: before reaching the project grid — the actual visual proof this persona wants fast — they scroll past a hamburger, a status pill, an animated tech panel, and 7 stack chips. The motion-heavy hero delays exactly the payoff PRODUCT.md says matters most for non-technical mobile visitors.

## Minor Observations

- `.board-textarea:focus-visible`'s outline-offset/border-color rules are commented out in board.css, leaving a slightly abrupt focus ring.
- The footer only repeats the email already shown in the contact section — no added value.
- `board-card-note`'s "Ejemplo — " qualifier is easy to miss; it sits on the same line as the description with only a subtle color difference.

## Questions to Consider

- If the flagship CTA is known to fail every time, should it carry primary-button visual weight before the backend exists at all?
- Does the dashboard-metaphor aesthetic actually read to non-technical clients as "proof of my work," or as an interface *about* systems rather than a showcase *of* results?
- With three navigation surfaces pointing at four pages that don't exist, is the safer move to ship with no nav at all until routing lands?
