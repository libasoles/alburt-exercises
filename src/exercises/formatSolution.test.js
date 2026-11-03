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

    expect(html).toContain('class="solution-move solution-black solution-bad">Nc4</span>')
    expect(html).toContain('class="solution-move solution-black solution-best">f6</span>')
    expect(html).not.toContain('{bad}')
    expect(html).not.toContain('{best}')
  })

  test('does not include commas after rated moves inside move cells', () => {
    const html = formatSolutionHtml('Por ejemplo 1.Dd3{best}, o la audaz 1.c5{best}, que encierra al alfil.')

    expect(html).toContain('class="solution-move solution-white solution-best">Dd3</span>')
    expect(html).toContain('class="solution-move solution-white solution-best">c5</span>')
    expect(html).not.toContain('solution-best">Dd3,</span>')
    expect(html).not.toContain('solution-best">c5,</span>')
    expect(html).not.toContain('<p class="solution-paragraph">,')
  })
})

describe('formatSolutionHtml clickable moves', () => {
  const fen = '3r2k1/p4ppp/1q6/8/8/2R1P3/P3QPPP/6K1 b - - 0 1'
  const text =
    '1...Db2! (En la partida.) 2.Tc8!? (2.Tc2 Db1+ 3.Df1 Dxc2; 2.De1 Dxc3) 2...Db1+ 3.Df1 Dxf1+ 4.Rxf1 Txc8 0-1'

  test('attaches the path from the start position to each replayable move', () => {
    const html = formatSolutionHtml(text, 'es', fen)

    expect(html).toContain('data-path="Qb2">Db2!</span>')
    expect(html).toContain('data-path="Qb2 Rc8">Tc8!?</span>')
    expect(html).toContain('data-path="Qb2 Rc8 Qb1+ Qf1 Qxf1+ Kxf1 Rxc8">Txc8</span>')
  })

  test('variations branch from the move they replace', () => {
    const html = formatSolutionHtml(text, 'es', fen)

    expect(html).toContain('data-path="Qb2 Rc2 Qb1+ Qf1 Qxc2">Dxc2</span>')
    expect(html).toContain('data-path="Qb2 Qe1 Qxc3">Dxc3</span>')
  })

  test('moves that cannot be replayed stay plain text', () => {
    const html = formatSolutionHtml('1.Txf6 Rxf6', 'es', fen)

    expect(html).not.toContain('data-path')
  })

  test('without a start position nothing is clickable', () => {
    expect(formatSolutionHtml(text, 'es')).not.toContain('data-path')
  })
})

describe('formatSolutionHtml with a prefix', () => {
  test('replays the assumed prefix before the solution moves', () => {
    const fen = '8/1p2kp1p/p3pn2/2r5/8/P1N5/1PP3PP/5RK1 w - - 0 1'
    const html = formatSolutionHtml('1...Txc3! 2.Txf7+! Rxf7 3.bxc3', 'es', fen, ['Rxf6'])

    expect(html).toContain('data-path="Rxf6 Rxc3">Txc3!</span>')
    expect(html).toContain('data-path="Rxf6 Rxc3 Rxf7+ Kxf7 bxc3">bxc3</span>')
  })
})
