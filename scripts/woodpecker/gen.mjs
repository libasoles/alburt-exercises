import { createRequire } from 'node:module'
import fs from 'node:fs'
const require = createRequire(import.meta.url)
const { Chess } = require('chess.js')

const T = process.env.WOODPECKER_TMP
const pick = JSON.parse(fs.readFileSync(T + '/pick-all.json', 'utf8'))
const easy = JSON.parse(fs.readFileSync(T + '/ident-all.json', 'utf8'))
const sur = n => n.split(',')[0].trim()

const out = pick.map((p, i) => {
  const book = easy[p.n]
  const c = new Chess(p.fen)
  const black = p.toMove === 'black'
  // Walk the game line: keep the key move, its reply, and a follow-up only if it is forcing.
  let keep = [p.line[0]]
  if (p.line[1]) keep.push(p.line[1])
  if (p.line[2]) {
    const t = new Chess(p.fen)
    t.move(p.line[0]); t.move(p.line[1])
    const m = t.move(p.line[2])
    if (/[+#]/.test(m.san) || m.captured) keep.push(p.line[2])
  }
  const build = j => {
    if (j >= keep.length) return null
    const node = { rating: 'best' }
    if (keep[j + 1]) node.response = keep[j + 1]
    const nx = build(j + 2)
    if (nx) node.continuations = nx
    return { [keep[j]]: node }
  }
  let num = p.moveNum
  let line = ''
  keep.forEach((s, j) => {
    const white = (j % 2 === 0) === !black
    if (white) line += `${num}.${s} `
    else { line += (j === 0 ? `${num}...` : '') + s + ' '; num++ }
  })
  const game = `${sur(p.white)} – ${sur(p.black)}, ${book.where} ${book.year}`
  return {
    id: i + 1,
    level: p.level,
    bookNumber: p.n,
    fen: p.fen,
    toMove: p.toMove,
    title: { en: `${sur(p.white)} – ${sur(p.black)}`, es: `${sur(p.white)} – ${sur(p.black)}` },
    game,
    hint: {
      en: 'Find the strongest move. It is not always a direct attack — look at every forcing option.',
      es: 'Encontrá la jugada más fuerte. No siempre es un ataque directo: mirá todas las opciones forzadas.',
    },
    solution: { en: line.trim(), es: line.trim() },
    moves: build(0),
  }
})

const body = `// Tactics from historical master games, identified from "The Woodpecker Method" (Smith & Tikkanen).
// Only the positions/games are used; moves come from the games themselves (PGN Mentor, https://www.pgnmentor.com).
// \`bookNumber\` is the exercise number in the book (Smith & Tikkanen); \`level\` is the book's difficulty section.
export const woodpeckerExercises = ${JSON.stringify(out, null, 2)}
`
fs.writeFileSync(process.argv[2], body)
console.log(out.length)
