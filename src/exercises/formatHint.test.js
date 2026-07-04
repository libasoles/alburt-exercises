import { describe, expect, test } from 'vitest'
import { formatHintHtml } from './formatHint.js'

describe('formatHintHtml', () => {
  test('bolds move text without bolding the move number', () => {
    const html = formatHintHtml('¿No gana una pieza 1.Txf6 Rxf6 2.Ce4+?')

    expect(html).toContain('1.<strong>Txf6</strong>')
    expect(html).toContain('<strong>Rxf6</strong>')
    expect(html).toContain('2.<strong>Ce4+</strong>?')
  })

  test('keeps non-move text escaped', () => {
    const html = formatHintHtml('Si <mate> sigue con 1...Db2!')

    expect(html).toContain('Si &lt;mate&gt; sigue con 1...<strong>Db2</strong>!')
  })
})
