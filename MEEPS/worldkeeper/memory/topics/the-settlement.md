---
meep-id: worldkeeper
type: topic-shelf
name: the-settlement
created: 2026-07-28
last-updated: 2026-07-28
---

# The Settlement — the crossing's operating truth

> **Why this shelf exists:** the crossing is a ceremony with receipts at every step; this is the
> compressed operating knowledge, scaffolded from ruling 8 before first lived run. Correct it
> from lived crossings; the ruling stays the law, this stays the craft.

## The chain (each step names its receipt)

1. **Pull** world + town mains (ff-only). *Receipt: clean pulls, tips noted.*
2. **Verify green:** `mark-lint` + the fold on world main. Amber/red → this crossing settles
   nothing it can't stand behind; quarantine or hold, never force. *Receipt: lint count, fold exit.*
3. **Derive:** town-side `node tools/world-stake.mjs --escrow --json > stakes.json` (k and law
   dials read from `ECONOMY-DIALS.json`; fallback k=5) → world-side fold `--stakes stakes.json`.
   *Receipt: the stakes.json row count + the settled state artifact, committed to the world repo.*
4. **Hold / quarantine** per the lists (both empty at birth — an empty pass is stated, not skipped).
   *Receipt: the holds ledger line, even when it reads "nothing held."*
5. **Bless:** commit the settled state; tag `settlement/S<N>` (annotated, N monotonic). The blessed
   sha is canon. *Receipt: the tag.*
6. **Bump the pin:** in `postmark-site`, `package.json` → `postmark-world#<sha>` where the sha
   comes from `git rev-parse` — **never typed by hand** (the hand-typed-sha near-miss of 07-27 is
   why this sentence exists). Commit message carries `settlement S<N>`. Push → deploy runs itself
   (`deploy.yml`; merge = prod). *Receipt: the site commit + CI green.*
7. **Report-after** to Keemin (the Ferry model): one line normal, more only when something held,
   quarantined, or refused to go green. Update the holds ledger. Daily entry.

## Standing rules

- **The sha is read, never typed.** Both the blessing tag and the pin bump.
- **A crossing that can't go green settles nothing** — canon stays at the last blessed sha, and
  the failure is surfaced loudly. A late settlement is recoverable; a bad blessing is canon.
- **You read dials; you never set them.** k changes are Keemin's, prospective, and arrive via
  `ECONOMY-DIALS.json` — apply the numbers of the day, note the change in the crossing report.
- **Curate the rendering, never the record.** A hold removes something from the *blessed render*;
  nothing you do removes anything from the record. If a task seems to require editing a
  resident's mark: stop, surface.
- **LOCAL-ONLY stands until Keemin flips go-live.** Until then any crossing is a dry-run: steps
  1–5 real, locally; step 6–7 simulated (no push, no deploy; the report says DRY-RUN).

## The inaugural drain (one-time)

First crossing only, founder-attended: before step 1, merge the dammed local branches per
**Wright's drain manifest** (branch list + order + per-step verification — provided, not
reconstructed), push town/world mains, then run the ordinary chain. The drain is the only
crossing that pushes *record* branches; every later crossing pushes only the settled state and
the pin.

## Pointers

- Ruling 8 (the law): `G:/Starstory/PULSE/gold-plans/postmark-write-release/postmark-write-release.md`
- Dials: `<town-root>/ECONOMY-DIALS.json` · Money ledger: `<town-root>/WHITE_PAGES/stamp-ledger.md`
- The pin: `<site-root>/package.json` (`postmark-world#<sha>`) · deploy: `.github/workflows/deploy.yml`
- Weight derive: `<town-root>/tools/world-stake.mjs` · fold: `<world-root>/tools/marks-fold.mjs`
- Kinship: the office DB's As-Of discipline (every answer names the sha it was built from) — your
  blessing is the same honesty at town scale.
