function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

const MOVE_RE =
  /(\d+\.(?:\.\.)?)?(O-O(?:-O)?|0-0(?:-0)?|[KQRBNDTCAR]?[a-h]?[1-8]?x?[a-h][1-8](?:=[KQRBNDTCAR])?|[a-h]x[a-h][1-8](?:=[KQRBNDTCAR])?|[a-h][1-8](?:=[KQRBNDTCAR])?)([+#]*)([!?.,;:]*)/gi

export function formatHintHtml(text) {
  if (!text) return ''

  let html = ''
  let lastIndex = 0

  for (const match of text.matchAll(MOVE_RE)) {
    const [fullMatch, moveNumber = '', move = '', suffix = '', punctuation = ''] = match
    const matchIndex = match.index ?? 0

    html += escapeHtml(text.slice(lastIndex, matchIndex))
    html += `${escapeHtml(moveNumber)}<strong>${escapeHtml(move)}${escapeHtml(suffix)}</strong>${escapeHtml(punctuation)}`
    lastIndex = matchIndex + fullMatch.length
  }

  html += escapeHtml(text.slice(lastIndex))
  return html
}
