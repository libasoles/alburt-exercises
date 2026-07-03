import { describe, test, expect } from 'vitest'
import { evaluateMove } from './evaluateMove.js'
import { exercises } from './data.js'

const ex1 = exercises[0] // The Classic Deflection — Black to move

describe('evaluateMove', () => {
  test('best move at root returns rating, response, and continuations as nextNode', () => {
    const result = evaluateMove(ex1.moves, 'Qb2')
    expect(result.rating).toBe('best')
    expect(result.response).toBe('Rc8')
    expect(result.nextNode).not.toBeNull()
    expect(result.nextNode).toHaveProperty('Qb1+')
  })

  test('ok move returns ok rating with response and null nextNode', () => {
    const result = evaluateMove(ex1.moves, 'Qb1+')
    expect(result.rating).toBe('ok')
    expect(result.response).toBe('Qf1')
    expect(result.nextNode).toBeNull()
  })

  test('unknown move returns bad rating with no response and null nextNode', () => {
    const result = evaluateMove(ex1.moves, 'Rd8')
    expect(result.rating).toBe('bad')
    expect(result.response).toBeNull()
    expect(result.nextNode).toBeNull()
  })

  test('null treeNode returns bad rating', () => {
    const result = evaluateMove(null, 'Qb2')
    expect(result.rating).toBe('bad')
    expect(result.response).toBeNull()
    expect(result.nextNode).toBeNull()
  })

  test('move at depth 2 returns correct rating from sub-node', () => {
    const depth1 = evaluateMove(ex1.moves, 'Qb2')
    const depth2Result = evaluateMove(depth1.nextNode, 'Qb1+')
    expect(depth2Result.rating).toBe('best')
    expect(depth2Result.response).toBe('Qf1')
    expect(depth2Result.nextNode).toHaveProperty('Qxf1+')
  })

  test('move at depth 3 returns correct rating', () => {
    const n1 = evaluateMove(ex1.moves, 'Qb2')
    const n2 = evaluateMove(n1.nextNode, 'Qb1+')
    const n3 = evaluateMove(n2.nextNode, 'Qxf1+')
    expect(n3.rating).toBe('best')
    expect(n3.response).toBe('Kxf1')
    expect(n3.nextNode).toHaveProperty('Rxc8')
  })

  test('final best move has null nextNode (end of line)', () => {
    const n1 = evaluateMove(ex1.moves, 'Qb2')
    const n2 = evaluateMove(n1.nextNode, 'Qb1+')
    const n3 = evaluateMove(n2.nextNode, 'Qxf1+')
    const n4 = evaluateMove(n3.nextNode, 'Rxc8')
    expect(n4.rating).toBe('best')
    expect(n4.response).toBeNull()
    expect(n4.nextNode).toBeNull()
  })

  test('bad move with response (ex6 Nc4) still returns the response', () => {
    const ex6 = exercises[5]
    const result = evaluateMove(ex6.moves, 'Nc4')
    expect(result.rating).toBe('bad')
    expect(result.response).toBe('Qg7+')
    expect(result.nextNode).toBeNull()
  })
})
