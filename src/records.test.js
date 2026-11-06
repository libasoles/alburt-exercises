import { describe, expect, test } from 'vitest'
import { applySolve, formatClock, isGoodTime } from './records.js'

describe('applySolve', () => {
  test('first solve stores the time without being a record', () => {
    expect(applySolve(null, 20000, 4)).toEqual({
      next: { ms: 20000, good: false },
      isNewRecord: false,
    })
  })

  test('faster solve replaces the record', () => {
    const { next, isNewRecord } = applySolve({ ms: 20000, good: false }, 15000, 4)
    expect(isNewRecord).toBe(true)
    expect(next.ms).toBe(15000)
  })

  test('slower or equal solve keeps the record', () => {
    expect(applySolve({ ms: 20000, good: false }, 20000, 4).isNewRecord).toBe(false)
    expect(applySolve({ ms: 20000, good: false }, 30000, 4).next.ms).toBe(20000)
  })

  test('good flag is sticky', () => {
    expect(applySolve({ ms: 8000, good: true }, 30000, 4).next.good).toBe(true)
  })
})

describe('isGoodTime', () => {
  test('compares average seconds per move with the threshold', () => {
    expect(isGoodTime(16000, 4)).toBe(true)
    expect(isGoodTime(16001, 4)).toBe(false)
    expect(isGoodTime(5000, 0)).toBe(false)
  })
})

describe('formatClock', () => {
  test('counts up with floor and down with ceil', () => {
    expect(formatClock(145900)).toBe('2:25')
    expect(formatClock(145100, { countdown: true })).toBe('2:26')
    expect(formatClock(-5, { countdown: true })).toBe('0:00')
  })
})
