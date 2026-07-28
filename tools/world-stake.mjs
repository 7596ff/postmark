#!/usr/bin/env node
// world-stake.mjs — the world-mark stake law engine (write-release gold P3).
//
// ONE implementation of the world-stake rules, the way ballot.mjs is one
// implementation of the vote-stake rules. Both lanes call this:
//   - the office's live world_stake / world_unstake doors
//   - any future crossing pass over mailed stake requests
//
// SHAPE, per Keemin's ruling 2026-07-27 (gold P0: "B — extend the sealed mint"):
// a `stake:world-mark/<mark-id>` target class in the ONE money ledger, reusing the
// ballot's proven STAKE grammar and its clip ceremony; resident-initiated unstake;
// a mark's ✦weight = the sum of its open escrows; retirement gated on zero escrow.
//
// THE CLIP LAW, inherited: stakes apply in ledger order and CLIP to remaining
// household headroom and to the staker's balance — they never bounce for cap
// reasons. An `applied: 0` with a reason is an honest answer, not an error; only
// malformed input throws.
//
// WHERE THIS DIFFERS FROM THE BALLOT, and why:
//   - Unstake exists. A ballot stake is final for the window and everything
//     returns at close; a world stake is a standing claim the resident may take
//     back, so the closer is `for: unstake` and the actor is the staker.
//   - An unstake clips to the staker's OWN open position on that mark. The escrow
//     account is per MARK, so the ledger's generic non-negative fold cannot tell
//     one resident's stamps from another's — this engine and the verifier both
//     enforce ownership, and neither may be the only one that does.
//   - The cap is a constant (WORLD_MARK_CAP_PER_HOUSEHOLD), not a per-topic file:
//     marks have no ballot JSON to carry one. Provisional — see CALLS.md.
//
// WHAT THIS DELIBERATELY CANNOT CHECK: whether the mark exists. Marks live in the
// world record (keeminlee/postmark-world) and this engine reads only the town's
// ledger. Mark existence is the DOOR's gate, where the world clone is in hand.
// Staking a nonexistent mark is therefore lawful-but-meaningless at ledger level:
// it escrows real stamps against an id nothing reads. Recorded in CALLS.md.
//
// Side-effect-free import (the Seal's discipline). Locking is the caller's job
// (the ferry's flock). Node v18+. Built-ins only.

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parseStampLedger, parseLaws, classifyEntry, foldBalances, householdKeys,
  appendSigned, worldStakeLine, worldUnstakeLine,
  foldWorldMarkEscrow, foldWorldMarkPositions, WORLD_MARK_CAP_PER_HOUSEHOLD,
} from './stamp-mint.mjs';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_REPO = resolve(SCRIPT_DIR, '..');

// A mark id is `<by>/<slug>`, both lowercase kebab — the shape every one of the
// 270 marks in the live record has. Checked here so a malformed id is a 422 at
// the door rather than an unparseable line in a sealed ledger.
export const MARK_ID_RE = /^[a-z0-9][a-z0-9-]*\/[a-z0-9][a-z0-9-]*$/;

// the full ledger-derived world-stake state, one read
export function worldStakeState(repo) {
  const ledgerPath = join(repo, 'WHITE_PAGES', 'stamp-ledger.md');
  const entries = existsSync(ledgerPath) ? parseStampLedger(readFileSync(ledgerPath, 'utf8')) : [];
  const { laws, revisions } = parseLaws(entries);
  const balances = foldBalances(entries);
  const escrow = foldWorldMarkEscrow(entries);
  const positions = foldWorldMarkPositions(entries);
  const base = householdKeys(repo);

  const householdOf = (handle, date) => {
    let key = null;
    for (const r of revisions) if (r.handle === handle && r.date <= date) key = r.key;
    if (key) return key;
    const rec = base.get(handle);
    return rec ? rec.key : `solo:${handle}`;
  };
  const lawAt = (date) => {
    let active = { rules: 'stamps-v1', meeps: new Set() };
    for (const l of laws) if (l.date <= date) active = l;
    return active;
  };
  return { entries, laws, revisions, balances, escrow, positions, householdOf, lawAt };
}

// What a mark currently carries — the number the world's compile reads as ✦weight.
export function markEscrow(repo, mark, state = worldStakeState(repo)) {
  return state.escrow.get(mark) ?? 0;
}

// One resident's own open escrow on one mark — what an unstake may draw from.
export function markPosition(repo, mark, handle, state = worldStakeState(repo)) {
  return state.positions.get(`${mark}|${handle}`) ?? 0;
}

// Remaining household headroom on one mark. The cap is on what is CURRENTLY
// staked, so an unstake gives the headroom back.
export function headroom(repo, mark, handle, date, state = worldStakeState(repo)) {
  const hkey = state.householdOf(handle, date);
  let held = 0;
  for (const [k, n] of state.positions) {
    const i = k.lastIndexOf('|');
    if (k.slice(0, i) !== mark) continue;
    if (state.householdOf(k.slice(i + 1), date) === hkey) held += n;
  }
  return Math.max(0, WORLD_MARK_CAP_PER_HOUSEHOLD - held);
}

// THE RETIREMENT GATE (Keemin, verbatim): "a mark is not retired until it hits 0
// stamps. If any resident has stamps on a mark, that mark still exists." So a
// stake is an existence-anchor and this predicate is what a retirement path must
// consult. It lives here, with the escrow fold, so the gate and the number it
// gates on can never drift apart.
export function retirementBlocked(repo, mark, state = worldStakeState(repo)) {
  const n = markEscrow(repo, mark, state);
  return n > 0 ? { blocked: true, escrow: n, reason: `${n} stamp(s) are staked on ${mark} — a staked mark cannot retire` }
               : { blocked: false, escrow: 0 };
}

const bounce = (code, defect, hint) => {
  const e = new Error(defect); Object.assign(e, { code, defect, hint }); return e;
};

// THE CLIP — validate, clip, append, signed. Mirrors ballot.clipApply.
export function worldStakeApply(repo, { handle, mark, n, via, date }, keyPem) {
  if (!handle || !mark || !via || !date)
    throw bounce(422, 'incomplete stake', 'required: handle, mark, n, via, date');
  if (!MARK_ID_RE.test(mark))
    throw bounce(422, `"${mark}" is not a mark id`, 'a mark id is <household>/<slug>, lowercase kebab both sides');
  n = Number(n);
  if (!Number.isInteger(n) || n < 1)
    throw bounce(422, 'stamps must be a whole number of at least 1', 'stakes move whole stamps');

  const state = worldStakeState(repo);
  if (state.lawAt(date).meeps.has(handle))
    throw bounce(403, `meep accounts cannot stake (${handle})`, 'stamps-v2 law: meeps neither mint nor stake');

  const room = headroom(repo, mark, handle, date, state);
  const balance = state.balances.get(handle) ?? 0;
  const applied = Math.min(n, room, balance);
  const result = {
    mark, handle, requested: n, applied, clipped: applied < n,
    household_headroom_before: room, balance_before: balance,
    mark_escrow_before: markEscrow(repo, mark, state),
  };
  if (applied <= 0) {
    result.reason = room <= 0
      ? `your household already holds the cap of ${WORLD_MARK_CAP_PER_HOUSEHOLD} on this mark`
      : 'your balance has no stamps free to stake';
    result.mark_escrow_after = result.mark_escrow_before;
    return result;
  }
  appendSigned(repo, [worldStakeLine({ date, handle, mark, n: applied, via })], keyPem);
  result.household_headroom_after = room - applied;
  result.balance_after = balance - applied;
  result.mark_escrow_after = result.mark_escrow_before + applied;
  return result;
}

// Resident-initiated unstake. Clips to the staker's OWN open position — you can
// never take out more than you put in, and never another resident's stamps.
export function worldUnstakeApply(repo, { handle, mark, n, date }, keyPem) {
  if (!handle || !mark || !date)
    throw bounce(422, 'incomplete unstake', 'required: handle, mark, n, date');
  if (!MARK_ID_RE.test(mark))
    throw bounce(422, `"${mark}" is not a mark id`, 'a mark id is <household>/<slug>, lowercase kebab both sides');
  n = Number(n);
  if (!Number.isInteger(n) || n < 1)
    throw bounce(422, 'stamps must be a whole number of at least 1', 'unstakes move whole stamps');

  const state = worldStakeState(repo);
  const open = markPosition(repo, mark, handle, state);
  const applied = Math.min(n, open);
  const result = {
    mark, handle, requested: n, applied, clipped: applied < n,
    position_before: open, mark_escrow_before: markEscrow(repo, mark, state),
  };
  if (applied <= 0) {
    result.reason = `you have no stamps staked on ${mark}`;
    result.mark_escrow_after = result.mark_escrow_before;
    return result;
  }
  appendSigned(repo, [worldUnstakeLine({ date, mark, handle, n: applied })], keyPem);
  result.position_after = open - applied;
  result.mark_escrow_after = result.mark_escrow_before - applied;
  return result;
}

// ── CLI (read-only views + the retirement gate; writes go through the office) ──
function main() {
  const arg = (name) => { const i = process.argv.indexOf(name); return i !== -1 ? process.argv[i + 1] : null; };
  const repo = resolve(arg('--repo') ?? DEFAULT_REPO);

  if (process.argv.includes('--escrow')) {
    const state = worldStakeState(repo);
    const rows = [...state.escrow.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    if (!rows.length) { console.log('no world-mark has stamps staked on it'); return; }
    for (const [mark, n] of rows) console.log(`${String(n).padStart(5)}  ${mark}`);
    console.log(`${String(rows.reduce((s, r) => s + r[1], 0)).padStart(5)}  (total escrowed on marks)`);
    return;
  }
  if (process.argv.includes('--positions')) {
    const state = worldStakeState(repo);
    const rows = [...state.positions.entries()].sort();
    if (!rows.length) { console.log('no open positions'); return; }
    for (const [k, n] of rows) { const i = k.lastIndexOf('|'); console.log(`${String(n).padStart(5)}  ${k.slice(i + 1)} on ${k.slice(0, i)}`); }
    return;
  }
  const gate = arg('--can-retire');
  if (gate) {
    const r = retirementBlocked(repo, gate);
    console.log(r.blocked ? `NO — ${r.reason}` : `yes — ${gate} carries no escrow`);
    process.exit(r.blocked ? 1 : 0);
  }
  console.error('usage: world-stake.mjs [--escrow | --positions | --can-retire MARK] [--repo PATH]');
  process.exit(1);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
