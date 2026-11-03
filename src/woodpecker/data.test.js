import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'
import { woodpeckerExercises } from './data.js'
import { formatSolutionHtml } from '../exercises/formatSolution.js'

function mainLine(node) {
  const sans = []
  while (node) {
    const san = Object.keys(node).find(key => node[key].rating === 'best')
    sans.push(san)
    if (node[san].response) sans.push(node[san].response)
    node = node[san].continuations ?? null
  }
  return sans
}

describe('woodpecker exercises', () => {
  test('has 25 sequentially numbered exercises', () => {
    expect(woodpeckerExercises).toHaveLength(25)
    woodpeckerExercises.forEach((ex, i) => expect(ex.id).toBe(i + 1))
  })

  test.each(woodpeckerExercises.map(ex => [ex.id, ex]))('exercise %i has a legal main line', (_id, ex) => {
    const chess = new Chess(ex.fen)
    expect(chess.turn()).toBe(ex.toMove === 'white' ? 'w' : 'b')
    const line = mainLine(ex.moves)
    for (const san of line) chess.move(san)
    if (ex.title.en.startsWith('Mate')) expect(chess.isCheckmate()).toBe(true)
  })

  test.each(woodpeckerExercises.map(ex => [ex.id, ex]))('exercise %i solution formats in both languages', (_id, ex) => {
    for (const lang of ['es', 'en']) {
      const html = formatSolutionHtml(ex.solution[lang], lang, ex.fen)
      expect(html).not.toBe('')
    }
  })
})
