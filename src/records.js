const RECORDS_KEY = 'tucuchess_records'

// A solve counts as "good time" when the average time per move is at or under this.
export const GOOD_SECONDS_PER_MOVE = 4

function recordKey(set, id) {
  return `${set ?? 'alburt'}:${id}`
}

function readAll() {
  try {
    const data = JSON.parse(localStorage.getItem(RECORDS_KEY))
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

export function getRecord(set, id) {
  return readAll()[recordKey(set, id)] ?? null
}

/**
 * Whether a stored record earns the medal at the given threshold. Records saved
 * before per-move times were kept only have the sticky `good` flag.
 */
export function isGoodRecord(record, secondsPerMove = GOOD_SECONDS_PER_MOVE) {
  if (!record) return false
  if (typeof record.perMove === 'number') return record.perMove <= secondsPerMove * 1000
  return Boolean(record.good)
}

export function isGoodTime(ms, moves, secondsPerMove = GOOD_SECONDS_PER_MOVE) {
  return moves > 0 && ms / moves <= secondsPerMove * 1000
}

/**
 * Pure: decide what a finished solve does to the stored record.
 *
 * @param {{ ms: number, good: boolean, perMove?: number }|null} previous
 * @param {number} ms - time of this solve
 * @param {number} moves - user moves in the solution
 * @returns {{ next: { ms: number, good: boolean, perMove: number }, isNewRecord: boolean }}
 */
export function applySolve(previous, ms, moves) {
  const good = Boolean(previous?.good) || isGoodTime(ms, moves)
  // Best average time per move across all solves, so the medal can be
  // recalculated when the user changes the threshold.
  const perMove = Math.min(previous?.perMove ?? Infinity, moves > 0 ? ms / moves : Infinity)
  const stored = Number.isFinite(perMove) ? { perMove } : {}
  if (!previous) return { next: { ms, good, ...stored }, isNewRecord: false }
  if (ms < previous.ms) return { next: { ms, good, ...stored }, isNewRecord: true }
  return { next: { ms: previous.ms, good, ...stored }, isNewRecord: false }
}

export function saveSolve(set, id, ms, moves) {
  const all = readAll()
  const key = recordKey(set, id)
  const result = applySolve(all[key] ?? null, ms, moves)
  all[key] = result.next
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(all))
  } catch {
    // Storage full or blocked: the solve still celebrates, it just isn't kept.
  }
  return result
}

export function formatClock(ms, { countdown = false } = {}) {
  const totalSeconds = Math.max(0, countdown ? Math.ceil(ms / 1000) : Math.floor(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = String(totalSeconds % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}
