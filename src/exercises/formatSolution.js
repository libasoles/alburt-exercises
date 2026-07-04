import { strings } from '../i18n.js'

const MOVE_START_RE = /(\d+)\.(\.\.)?([^\s()]+)/g
const MOVE_RATING_RE = /^(.*?)(?:\{(best|ok|bad)\})([!?.,;:]*)$/i

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function normalizeWhitespace(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function isResultToken(token) {
  return /^(?:1-0|0-1|1\/2-1\/2)$/.test(token)
}

function isLikelyMoveToken(token) {
  if (!token || token.includes('.')) return false

  return /^(?:O-O(?:-O)?|0-0(?:-0)?|[KQRBNDTCAR]?[a-h]?[1-8]?x?[a-h][1-8](?:=[KQRBNDTCAR])?|[a-h]x[a-h][1-8](?:=[KQRBNDTCAR])?|[a-h][1-8](?:=[KQRBNDTCAR])?)(?:[+#]+)?[!?]*$/i.test(token)
}

function parseRatedMoveToken(token) {
  const match = token.match(MOVE_RATING_RE)
  if (!match) return { move: token, rating: null, punctuation: '' }

  return {
    move: match[1],
    rating: match[2].toLowerCase(),
    punctuation: match[3] ?? '',
  }
}

function consumeLeadingToken(text) {
  const trimmed = text.trim()
  if (!trimmed) return { token: '', rest: '' }

  const match = trimmed.match(/^(\S+)([\s\S]*)$/)
  return {
    token: match ? match[1] : trimmed,
    rest: match ? match[2].trim() : '',
  }
}

function parseTextSegment(text) {
  const matches = [...text.matchAll(MOVE_START_RE)]
  if (matches.length === 0) {
    const paragraph = normalizeWhitespace(text)
    return paragraph ? [{ type: 'paragraph', text: paragraph }] : []
  }

  const segments = []
  let cursor = 0

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index]
    const nextIndex = index < matches.length - 1 ? matches[index + 1].index : text.length
    const proseBefore = normalizeWhitespace(text.slice(cursor, match.index))
    if (proseBefore) segments.push({ type: 'paragraph', text: proseBefore })

    const row = {
      type: 'row',
      number: match[1],
      whiteMove: match[2] ? '' : parseRatedMoveToken(match[3]),
      blackMove: match[2] ? parseRatedMoveToken(match[3]) : '',
      result: '',
    }

    let tail = text.slice(match.index + match[0].length, nextIndex).trim()

    if (!match[2] && tail) {
      const { token, rest } = consumeLeadingToken(tail)
      const ratedToken = parseRatedMoveToken(token)
      if (isLikelyMoveToken(ratedToken.move)) {
        row.blackMove = ratedToken
        tail = rest
      }
    }

    if (tail) {
      const { token, rest } = consumeLeadingToken(tail)
      if (isResultToken(token)) {
        row.result = token
        tail = rest
      }
    }

    segments.push(row)

    const proseAfter = normalizeWhitespace(tail)
    if (proseAfter) segments.push({ type: 'paragraph', text: proseAfter })

    cursor = nextIndex
  }

  return segments
}

function splitTopLevelComments(text) {
  const segments = []
  let depth = 0
  let current = ''
  let kind = 'text'

  for (const char of text) {
    if (char === '(') {
      if (depth === 0) {
        if (current) segments.push({ type: kind, text: current })
        current = ''
        kind = 'comment'
      } else {
        current += char
      }
      depth += 1
      continue
    }

    if (char === ')') {
      depth -= 1
      if (depth === 0) {
        segments.push({ type: kind, text: current })
        current = ''
        kind = 'text'
      } else {
        current += char
      }
      continue
    }

    current += char
  }

  if (current) segments.push({ type: kind, text: current })

  return segments
}

function renderRow(row) {
  const moveNo = `${row.number}.`
  const whiteMove = row.whiteMove
    ? `${escapeHtml(row.whiteMove.move)}${escapeHtml(row.whiteMove.punctuation ?? '')}`
    : '&hellip;'
  const blackMove = row.blackMove
    ? `${escapeHtml(row.blackMove.move)}${escapeHtml(row.blackMove.punctuation ?? '')}`
    : '&hellip;'
  const result = row.result ? escapeHtml(row.result) : ''
  const whiteRatingClass = row.whiteMove?.rating ? ` solution-${row.whiteMove.rating}` : ''
  const blackRatingClass = row.blackMove?.rating ? ` solution-${row.blackMove.rating}` : ''

  return `
    <div class="solution-row">
      <span class="solution-move-no">${escapeHtml(moveNo)}</span>
      <span class="solution-move solution-white${whiteRatingClass}">${whiteMove}</span>
      <span class="solution-move solution-black${blackRatingClass}">${blackMove}</span>
      <span class="solution-result">${result}</span>
    </div>
  `
}

function renderFlatSegments(segments, { mainLine = false } = {}) {
  let html = ''
  let rows = ''
  const linesClass = mainLine ? 'solution-lines solution-lines-main' : 'solution-lines'

  const flushRows = () => {
    if (!rows) return
    html += `<div class="${linesClass}">${rows}</div>`
    rows = ''
  }

  for (const segment of segments) {
    if (segment.type === 'row') {
      rows += renderRow(segment)
      continue
    }

    flushRows()
    html += `<p class="solution-paragraph">${escapeHtml(segment.text)}</p>`
  }

  flushRows()
  return html
}

function renderComment(text, lang) {
  const branches = text
    .split(';')
    .map(branch => normalizeWhitespace(branch))
    .filter(Boolean)

  const parsedBranches = branches.map(branch => parseTextSegment(branch))
  const hasMoves = parsedBranches.some(segments => segments.some(segment => segment.type === 'row'))

  const content = parsedBranches.length > 1
    ? parsedBranches
        .map(segments => `<div class="solution-comment-branch">${renderFlatSegments(segments)}</div>`)
        .join('')
    : renderFlatSegments(parsedBranches[0] ?? [])

  const title = hasMoves
    ? `<div class="solution-comment-title">${escapeHtml(strings[lang].solutionAlternativesTitle)}</div>`
    : ''

  return `<div class="solution-comment">${title}${content}</div>`
}

export function formatSolutionHtml(text, lang = 'es') {
  const segments = splitTopLevelComments(text)
  return segments
    .map(segment => {
      if (segment.type === 'comment') return renderComment(segment.text, lang)
      return renderFlatSegments(parseTextSegment(segment.text), { mainLine: true })
    })
    .join('')
}
