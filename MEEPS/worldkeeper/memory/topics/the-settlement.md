---
meep-id: worldkeeper
type: topic-shelf
name: the-settlement
created: 2026-07-28
last-updated: 2026-08-04
---

# The Settlement — the crossing's operating truth

> **Why this shelf exists:** the crossing is a ceremony with receipts at every step; this is the
> compressed operating knowledge, scaffolded from ruling 8 before first lived run. Correct it
> from lived crossings; the ruling stays the law, this stays the craft.

## The chain (each step names its receipt) — ruling 9 shape

1. **Pull** world + town mains (ff-only). *Receipt: clean pulls, tips noted.*
2. **Verify green:** `mark-lint` + the fold on world main. Amber/red → this crossing settles
   nothing it can't stand behind; quarantine or hold, never force. *Receipt: lint count, fold exit.*
3. **Derive:** town-side `node tools/world-stake.mjs --escrow --json > stakes.json` (k and law
   dials read from `ECONOMY-DIALS.json`; fallback k=5). *Receipt: row count.*
4. **The sweep (ruling 9):** enumerate `draft/<household>` branches; per mark, eligibility =
   **home (in own parcel) or constitution → auto · commons → escrow > 0** in the derive.
   Publish eligible marks into main (the settlement commit; move-on-delivery — they leave the
   draft branch). **Unpublish** any published commons mark whose escrow reached zero (back to
   its household's drafts — escrow implies existence, both directions). Lint must pass on the
   result. The bundled sweep writes the settlement commit and rebases the local draft refs in
   one run; record its returned heads, then fetch again and prove the remote draft tips did not
   move underneath the sweep. *Receipt: the sweep table — published / unpublished / left
   drafted, per household.*
5. **Hold / quarantine** per the lists (both empty at birth — an empty pass is stated, not
   skipped). *Receipt: the holds ledger line, even when it reads "nothing held."*
6. **Bless:** fold the settled state with `--stakes`; verify the settlement commit; tag
   `settlement/S<N>` (annotated, N monotonic). The blessed sha is canon. *Receipt: the tag.*
7. **Put every `draft/*` branch onto the blessed main** — the sketchbooks get today's world
   underneath; this is what keeps *branch = composed view* true, and it is yours, not theirs.
   The current sweep tool performs the rebases in step 4; publish those rewritten refs only
   with explicit leases against the tips you inspected, never blind force. *Receipt: branch
   count rebased, leases accepted, conflicts surfaced.*
8. **Bump the pin:** in `postmark-site`, `package.json` → `postmark-world#<sha>` where the sha
   comes from `git rev-parse` — **never typed by hand.** Commit message carries
   `settlement S<N>`. The sync-atlas cron may win the race after the edit: commit the pin,
   `pull --rebase`, then push normally through the keeper's pinned deploy key — never force.
   Push → deploy runs itself. *Receipt: the site commit + CI green + live artifact check.*
9. **Report-after** to Keemin (the Ferry model): one line normal, more only when something held,
   quarantined, unpublished, or refused to go green. Update the holds ledger. Daily entry.

## Standing rules

- **The sha is read, never typed.** Both the blessing tag and the pin bump.
- **A crossing that can't go green settles nothing** — canon stays at the last blessed sha, and
  the failure is surfaced loudly. A late settlement is recoverable; a bad blessing is canon.
- **You read dials; you never set them.** k changes are Keemin's, prospective, and arrive via
  `ECONOMY-DIALS.json` — apply the numbers of the day, note the change in the crossing report.
- **Curate the rendering, never the record.** A hold removes something from the *blessed render*;
  nothing you do removes anything from the record. If a task seems to require editing a
  resident's mark: stop, surface.
- **GO-LIVE HAPPENED 2026-07-28** — crossings are real. Run attended until Keemin says
  otherwise; a crossing that can't go green still settles nothing.

## First lived correction — S2, 2026-07-29

The first ordinary crossing published nineteen home marks from three sketchbooks, left
fourteen zero-escrow commons marks drafted, and held or quarantined nothing. Two craft points
became real:

- **Eligibility is not a hold.** The holds ledger says "nothing held" even when unbacked
  commons marks remain drafted; otherwise a mechanical threshold becomes an unearned public
  judgment about the resident.
- **The pin receipt ends live.** Local tests and a full build precede the commit; after the
  race-safe push, verify the exact remote commit, deploy conclusion, and the served artifact.
  S2's live viewer matched the pinned package byte for byte.

## Second lived correction — S3, 2026-07-29

The first quiet crossing published and unpublished nothing, left fourteen zero-escrow commons
marks drafted, rebased three sketchbooks, and held or quarantined nothing. It exposed two
Windows-volume craft points:

- **Package integrity comes from Git objects, not a converted worktree.** With
  `core.autocrlf` active, derive the exact package from
  `git -c core.autocrlf=false archive <blessed-sha>`, then pack and hash that clean source.
  The SHA still comes from `git rev-parse`; never type it.
- **A local npm reify hang is not permission to weaken the gate.** The `G:`-volume install
  hung and disturbed only ignored `node_modules`; stop the scoped process, keep tracked
  source clean, and validate the same package in a clean `C:` scratch worktree. S3 passed 21
  site tests, a 1,560-page production build, exact-commit deploy CI, and a live byte check.

## The inaugural drain — EXECUTED 2026-07-28 (historical)

The drain ran founder-carried (Wright, Keemin attending) before your first wake: seven
verified branches merged across town/world/office, the box redeployed, **`settlement/S1`
blessed** (tagged with your token — your name is on the genesis blessing), the pin bumped,
the site deployed. The drain manifest in `memory/` is the record. Every crossing from here
is ordinary: settled state and the pin only, never record branches.

## The parcel drain — POST-bless, every crossing (ruling 2026-08-04)

Keemin's ruling, 2026-08-04, from the blueprints board's `the-first-parcel` slot: **the
confirmation-sweep lane is adopted, and this office drains it** — the way the Illuminator
drains her placement bench, a bounded batch per round, until the backlog is dry and the lane
becomes pure flow. The judgment is never yours: the resident placed themselves in the
Illuminator's confirmation conversation, and that judgment is spent exactly once, there.
What you do is ruled arithmetic plus faithful carriage of their own words.

**Ordering law — the drain runs AFTER step 8 (the pin), never before the blessing.** What
your hand seats today is blessed by the NEXT crossing. You never bless your own fresh seeds
in the crossing that seats them: *the hand that seats a claim is never the hand that blesses
the canon containing it.* (Founding proof, 2026-08-04: Wright's hand seated wren-winter +
the-fen on main; the 18:00 crossing blessed them.)

The chain (receipts at every step, like everything else here):

1. **Derive the queue:** in the world clone, `node tools/seed-manifest-gen.mjs --atlas
   <town-clone>/PROJECTS/build-the-town/atlas` (fresh, never the stale manifest), then
   `node tools/parcel-seed-gen.mjs --dry --date <today>` — the dry list plus the "no mark in
   the tree" skips ARE the queue. *Receipt: dry count + skip count.*
2. **Take at most FIVE households this crossing** (the Illuminator's own drain ceiling —
   pace, not appetite). Ready-made arithmetic cases (dry-planned parcels) come first;
   authoring cases (no sited mark yet) after.
3. **Author each missing sited mark from the resident's OWN words.** Read their
   `WHITE_PAGES/<handle>/HOME/HOME.md`. Body ≤150 chars, compressed from their words or
   quoting them — never invented; when in doubt, the manifest's `style` line is already
   their words. Frontmatter exactly like the exemplar at
   `WORLD/marks/let-there-be-light/wren-winter-parcel/wren-winter/mark.md`: `by: <handle>`,
   `kind: sited`, `date: <today>`, `at:` the manifest `grid_m`, a modest extent, `pre: true`,
   `derived_from:` the HOME.md path + a verbatim quote. *Receipt: the mark, quote named.*
4. **Mint parcels:** `node tools/parcel-seed-gen.mjs --date <today>` (wet). Then **re-home
   each new house dir inside its parcel dir** (`<home>-parcel/<home>/`) — the gate's
   tightest-container law demands it and lint will name every offender. *Receipt: seeded list.*
5. **Gates, all three:** `node tools/mark-lint.mjs` CLEAN · `node tools/marks-fold.mjs`
   0 errors · `node --test` all green. Any red → this drain seats nothing; revert, surface.
   *Receipt: the three counts.*
6. **Commit world main** (unblessed — the next crossing's blessing carries it), message names
   the households. *Receipt: the sha.*
7. **One welcome letter per freshly parceled resident**, from `WHITE_PAGES/worldkeeper/outbox/`
   — the two founder-carried exemplars ride the ledger
   (`worldkeeper-2026-08-04-your-ground-wren-winter` / `…-the-fen`); match their shape:
   where (coordinates + their own placement words), what it means (parcel = sovereignty ·
   the walk · visible from the next blessing · nothing owed), and the consent law VERBATIM:
   **announced, not asked; move at your word; "unparceled" stays a real answer.** Letter id
   `worldkeeper-<today>-your-ground-<handle>` — deterministic, so the dedupe is the record:
   **before writing, grep `WHITE_PAGES/mail-ledger.md` + your own outbox for
   `your-ground-<handle>`; a hit means already welcomed, skip.** Commit town main.
   *Receipt: letters listed, envelope-check clean.*
8. **Report line** folds into the crossing's report-after: `drain: N seated, M welcomed,
   K remaining` (K from the dry re-run). Zero is stated, never skipped.

**Standing exclusions — surface, never seat:**
- **little-bird / the Drift** — declares no fixed berth; #322 is the open escalation. Seating
  her a fixed parcel would trample the question. Founder's word only.
- **far / special cases** (the-post-office is the boat; the-pando-peak anchor is the inset) —
  the manifest already refuses them; keep it that way.
- A household the tool skips as "a judgment, not arithmetic" — that is the tool holding your
  boundary for you. Surface it in the report; a founder or the Illuminator resolves it.
- The **wordless** (no HOME.md) are not this lane's to serve — nothing mints from a guess
  (residents place themselves, 2026-07-31). Drawing B on the blueprints board stays open
  for them; not yours to build.

**The boundary amendment this ruling makes (and its exact edge):** "curate the rendering,
never the record" gains one carve-out — the drain ADDS invitation pre-marks (`by: <resident>`,
`pre: true`, derived from their own confirmed words). It still never edits, never removes,
never re-seats: a resident who self-placed first simply wins, a move after furnishing is a
conversation (the Illuminator's), and a mark already standing is skipped by the tool's
record-truth check. The sweep is the floor nobody falls through, not the ceiling.

## Pointers

- Ruling 8 (the law): `G:/Starstory/PULSE/gold-plans/postmark-write-release/postmark-write-release.md`
- Dials: `<town-root>/ECONOMY-DIALS.json` · Money ledger: `<town-root>/WHITE_PAGES/stamp-ledger.md`
- The pin: `<site-root>/package.json` (`postmark-world#<sha>`) · deploy: `.github/workflows/deploy.yml`
- Weight derive: `<town-root>/tools/world-stake.mjs` · fold: `<world-root>/tools/marks-fold.mjs`
- Kinship: the office DB's As-Of discipline (every answer names the sha it was built from) — your
  blessing is the same honesty at town scale.
