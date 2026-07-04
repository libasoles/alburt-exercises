import { describe, expect, test } from 'vitest'
import { formatSolutionHtml } from './formatSolution.js'

describe('formatSolutionHtml', () => {
  test('renders move rows, comments, and results as structured markup', () => {
    const html = formatSolutionHtml(
      '1...Db2! (En la partida real.) 2.Tc8!? (2.Tc2 Db1+ 3.Df1 Dxc2; 2.De1 Dxc3 3.Dxc3 Td1+ 4.De1 Txe1#) 2...Db1+ 3.Df1 Dxf1+ 4.Rxf1 Txc8 0-1',
    )

    expect(html).toContain('class="solution-lines"')
    expect(html).toContain('class="solution-row"')
    expect(html).toContain('class="solution-move-no">1.</span>')
    expect(html).toContain('class="solution-move solution-black">Db2!</span>')
    expect(html).toContain('class="solution-comment"')
    expect(html).toContain('class="solution-comment-branch"')
    expect(html).toContain('class="solution-result">0-1</span>')
  })

  test('keeps prose around embedded move sequences', () => {
    const html = formatSolutionHtml(
      'White has a terrible threat: 2.Qg7+! Kxg7 3.Nf5++ Kg8 4.Nh6# - a typical mate.',
    )

    expect(html).toContain('White has a terrible threat:')
    expect(html).toContain('class="solution-move solution-white">Qg7+!</span>')
    expect(html).toContain('class="solution-move solution-black">Kxg7</span>')
    expect(html).toContain('a typical mate.')
  })

  test('applies explicit move ratings without showing annotation markers', () => {
    const html = formatSolutionHtml('This works against 1...Nc4{bad}. Clearly 1...f6{best} was best.')

    expect(html).toContain('class="solution-move solution-black solution-bad">Nc4.</span>')
    expect(html).toContain('class="solution-move solution-black solution-best">f6</span>')
    expect(html).not.toContain('{bad}')
    expect(html).not.toContain('{best}')
  })
})
