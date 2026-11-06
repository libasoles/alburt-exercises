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

export function isGoodTime(ms, moves, secondsPerMove = GOOD_SECONDS_PER_MOVE) {
  return moves > 0 && ms / moves <= secondsPerMove * 1000
}

/**
 * Pure: decide what a finished solve does to the stored record.
 *
 * @param {{ ms: number, good: boolean }|null} previous
 * @param {number} ms - time of this solve
 * @param {number} moves - user moves in the solution
 * @returns {{ next: { ms: number, good: boolean }, isNewRecord: boolean }}
 */
export function applySolve(previous, ms, moves) {
  const good = Boolean(previous?.good) || isGoodTime(ms, moves)
  if (!previous) return { next: { ms, good }, isNewRecord: false }
  if (ms < previous.ms) return { next: { ms, good }, isNewRecord: true }
  return { next: { ms: previous.ms, good }, isNewRecord: false }
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
