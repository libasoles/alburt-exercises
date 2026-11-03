import { createRequire } from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
const require = createRequire(import.meta.url)
const { Chess } = require('chess.js')

const T = process.env.WOODPECKER_TMP
const entries = JSON.parse(fs.readFileSync(T + '/' + process.argv[2], 'utf8')).filter(e => e.key)
const FIG = { '¢': 'K', '£': 'Q', '¦': 'R', '¥': 'B', '¤': 'N' }

const strip = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const surname = n => strip(n.replace(/[’']/g, '').split(' ').pop())

function parseKey(key) {
  const m = key.match(/^(\d+)(\.\.\.|\.)(.*)$/)
  let san = m[3].replace(/[†!?+–=±µ²³]/g, '').replace(/[¢£¦¥¤]/g, c => FIG[c])
  san = san.replace(/mate$/, '')
  return { num: +m[1], black: m[2] === '...', san }
}
const norm = s => s.replace(/[+#!?]/g, '')

function* pgnFiles(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) yield* pgnFiles(p)
    else if (f.name.endsWith('.pgn')) yield p
  }
}

const games = new Map() // dedupe by headers
for (const file of pgnFiles(T + '/pgn')) {
  const text = fs.readFileSync(file, 'latin1').replace(/\r\n/g, '\n')
  for (const block of text.split(/\n\n(?=\[Event )/)) {
    const h = k => (block.match(new RegExp('\\[' + k + ' "([^"]*)"\\]')) || [])[1] || ''
    const key = [h('White'), h('Black'), h('Date'), h('Round')].join('|')
    if (!games.has(key)) games.set(key, { white: h('White'), black: h('Black'), date: h('Date'), event: h('Event'), site: h('Site'), block })
  }
}
console.error('games indexed', games.size)

const found = []
for (const e of entries) {
  const ws = surname(e.w), bs = surname(e.b)
  for (const g of games.values()) {
    if (!strip(g.white).includes(ws) || !strip(g.black).includes(bs)) continue
    const y = parseInt(g.date)
    if (!(Math.abs(y - e.year) <= 1)) continue
    const k = parseKey(e.key)
    const c = new Chess()
    try { c.loadPgn(g.block) } catch { continue }
    const hist = c.history()
    const idx = (k.num - 1) * 2 + (k.black ? 1 : 0)
    if (!hist[idx] || norm(hist[idx]) !== norm(k.san)) continue
    const b = new Chess()
    for (let i = 0; i < idx; i++) b.move(hist[i])
    found.push({ n: e.n, white: g.white, black: g.black, date: g.date, event: g.event, site: g.site, fen: b.fen(), toMove: b.turn() === 'w' ? 'white' : 'black', moveNum: k.num, line: hist.slice(idx, idx + 8), result: (g.block.match(/\[Result "([^"]*)"\]/) || [])[1] })
    break
  }
}
fs.writeFileSync(T + '/' + process.argv[3], JSON.stringify(found, null, 1))
console.log('matched', found.length, 'of', entries.length)
