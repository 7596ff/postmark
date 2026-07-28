---
meep-id: worldkeeper
type: drain-manifest
written: 2026-07-28
author: wright (dispatcher)
status: READY — awaiting Keemin's go-live
---

# The inaugural drain — manifest

One-time, founder-attended. This is the branch list, order, and per-step verification for the
Worldkeeper's first crossing. **Nothing here runs before Keemin flips go-live.** All work below
was verified green by Wright on 2026-07-28 (receipts inline).

## The dammed branches

| # | Repo | Clone · branch | Tip | Carries | Verified |
|---|---|---|---|---|---|
| 1 | town | `G:/Wright-HQ/postmark` · `worldkeeper-room` | `7e634875` (atop `aa54a778`) | ECONOMY-DIALS.json + this room + crossing skill | JSON parses; room reviewed |
| 2 | town | `G:/Postmark/postmark-town-jetto2` · `world-stake-draft` | `9691cf0b` | stake grammar/law/verifier/derive/corpus + adjudicated CALLS.md | 107/107 (Wright-run); cap symbols only in ballot files (correct) |
| 3 | world | `G:/Postmark/postmark-world-jetto` · `walk-p2-draft-jetto` | `2fa11e6` | walk P2 + re-home-25 + containment arrival + strengthened lint (main pre-merged) | lint CLEAN 267; 82/82 (Wright-run) |
| 4 | world | `G:/Postmark/postmark-world-jetto2` · `world-stake-draft` | `9ac1560` | fold consumes derived weight; retirement gate named | 45/45 (Jetto2-run) |
| 5 | office | `G:/Postmark/office-jetto` · `walk-p2-draft-jetto` | `614081e` | world_walk door (extent recorded for arrival) | with #3's suite |
| 6 | office | `G:/Postmark/office-jetto2` · `world-stake-draft` | `e1db8cd` | world_stake/unstake doors, no-cap settlement semantics | 120/120 (Jetto2-run) |

## Order

1. **Town:** merge #1, then #2 into town `main` (dials before/with the derive that reads them).
   Re-run town corpus + `stamp-verify` (execution rule: stamp-adjacent → verify before push). Push.
2. **World:** merge #3 (the newer, main-merged branch), then #4. Expected friction: fold files —
   #4 predates #3's merge of main; resolve keeping BOTH semantics (walk's fold additions + stake's
   `--stakes` consumption). Re-run world suite + mark-lint + a full fold. Push.
3. **Office:** merge #5, then #6 (expected disjoint). Office corpus. Push; box redeploy (office
   restart picks up both doors).
4. **The first blessing (the ordinary chain, S1):** fold green → derive (`--escrow`, k from dials)
   → settle → tag `settlement/S1` → pin bump in `postmark-site` (sha from rev-parse) → push →
   deploy.yml ships it. **Rei's twenty-two Lanternstep marks go public in this blessing.**
5. **PSA entry rides the drain push** (the wall's routing rule): the walk door, the stake door,
   the settlement rhythm — one entry, newest-first, teaser rewritten. Wright drafts, Keemin's eye
   per quiet-launch taste.

## Row 7 — ruling 9 (added same evening)

| 7 | office + world | `office-jetto2` + `postmark-world-jetto2` · `world-draft-scoping` | (in flight) | door writes → `draft/<household>`; auth-scoped reads (branch-vs-main tree selection); the sweep + rebase tool; my-drafts endpoint | pending Wright review |

**Order amendment:** merge #7 LAST in its repos (it carries the newest door semantics; on
conflict, #7's read/write paths win). The first blessing (step 4) becomes ruling-9 shaped: the
sweep runs even on an empty draft set (state it), and S1's settlement commit is the genesis
blessing — everything already on main is the founding estate.

## Cautions

- The two world branches share ancestry but #4 lacks #3's main-merge — merge #3 first, always.
- Nothing runs against real pen keys until the doors are deployed; the drain's door tests stay
  synthetic.
- If any step refuses green: stop, surface, settle nothing — the dam holds another crossing
  without harm (slow-mail town; late is recoverable, bad canon is not).
