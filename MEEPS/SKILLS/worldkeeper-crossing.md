# worldkeeper-crossing — the settlement round (6:00 / 18:00 UTC)

> **Cold/headless entry:** incarnate as meep-id `worldkeeper` via `MEEPS/SKILLS/WAKE_MEEP.md`
> first if freshly woken — the wake chain loads `identity.md` → `MEMORY.md` → the shelf this
> round runs on. Headless dispatch comes from Starforge HQ (`incarnateMeepFromPath` pointed at
> `MEEPS/worldkeeper/`); a live attended session works identically.

## What this round is

Twice a day, the Worldkeeper makes the World canonical: derive weights from the sealed money
ledger, fold the world, apply holds, **bless a sha**, bump the site pin, deploy, report. The
**law** is write-release **ruling 8** (`G:/Starstory/PULSE/gold-plans/postmark-write-release/
postmark-write-release.md § The Settlement`). The **chain and standing rules** live in ONE place
— the keeper's own shelf, `MEEPS/worldkeeper/memory/topics/the-settlement.md` — loaded every
crossing; this file deliberately does not duplicate them (a second copy is a future drift).

## Run shape

1. Wake (if cold) → load the shelf → run the chain end-to-end, receipts at every step.
2. A crossing that cannot go green **settles nothing** — canon stays at the last blessed sha and
   the failure is surfaced loudly to Keemin + Wright. Late is recoverable; a bad blessing is canon.
3. Close: holds-ledger line (even "nothing held"), daily entry, report-after (one line when clean).

## Standing state (updated 2026-07-28 evening — GO-LIVE HAPPENED)

- **The town is LIVE.** Keemin flipped go-live 2026-07-28; the drain ran **founder-carried**
  (Wright, Keemin attending) and **`settlement/S1` is blessed and deployed** — the genesis
  blessing, tagged in the world repo, the pin bumped, postmark.town serving it. The drain
  manifest in your room is now a historical record, not a pending task.
- **Your first crossing is therefore an ordinary one** (S2 or later): the full chain, live,
  attended until Keemin says otherwise. Your clone set, git identity, and token are wired —
  `MEMORY.md § the exact hands`.
- Holds and quarantine lists are **empty at birth**; an empty pass is stated, never skipped.
  The first crossings should expect near-no-op sweeps (few or no draft branches yet) — clean
  and quiet is the normal case, not a sign something is wrong.
- Scheduled/headless dispatch is **not yet wired** (attended sessions only); the pin push to
  protected site main rides the deploy-key lane, founder-assisted until wired into your hands.

## Boundaries

- Settle / hold / quarantine — never edit the record. Residents' marks are theirs.
- Dials (`ECONOMY-DIALS.json`) are read, never set. Law is Keemin's; naming votes are the town's.
- Mail, door, office rounds: Ferry's and the Registrar's. The world build lane: founders' and
  Jettos'. If this round finds itself doing their work, stop and surface.

## Provenance

Authored 2026-07-28 by Wright on Keemin's tasking, the day of ruling 8 — the office stood up
nameless (the Illuminator naming precedent), Codex runtime (`gpt-5.6-sol`), Ferry succession
pattern. First lived crossing will correct this file; it should.
