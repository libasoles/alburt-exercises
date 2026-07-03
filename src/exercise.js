import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'

import { Chessground } from 'chessground'
import { Chess } from 'chess.js'
import { exercises } from './exercises/data.js'
import { evaluateMove } from './exercises/evaluateMove.js'
import { formatSolutionHtml } from './exercises/formatSolution.js'
import { getLang, applyI18n, t } from './i18n.js'
import './settingsMenu.js'
import { getTheme, applyBoardTheme, setupSettingsMenu } from './settings.js'

// ── Routing ──────────────────────────────────────────────────────────────────

const params = new URLSearchParams(window.location.search)
const exId = parseInt(params.get('ex'), 10)

if (!exId || exId < 1 || exId > exercises.length) {
  window.location.replace('./index.html')
  throw new Error('redirect')
}

const exercise = exercises[exId - 1]

// ── State ─────────────────────────────────────────────────────────────────────

let chess = new Chess(exercise.fen)
let cg = null
let currentNode = exercise.moves
let inFreePlay = false
let bookResponsePending = false

// ── Chessground helpers ───────────────────────────────────────────────────────

function toDests(chessInstance) {
  const dests = new Map()
  for (const move of chessInstance.moves({ verbose: true })) {
    if (!dests.has(move.from)) dests.set(move.from, [])
    dests.get(move.from).push(move.to)
  }
  return dests
}

function cgTurnColor(chessInstance) {
  return chessInstance.turn() === 'w' ? 'white' : 'black'
}

function updateCgDests() {
  cg.set({
    turnColor: cgTurnColor(chess),
    movable: {
      color: 'both',
      dests: toDests(chess),
    },
  })
}

function syncBoardTheme(theme = getTheme()) {
  applyBoardTheme(theme)
  if (cg) cg.redrawAll()
}

// ── Toast ─────────────────────────────────────────────────────────────────────

const RATING_IMAGES = {
  best: './images/rating-best.png',
  ok: './images/rating-ok.png',
  bad: './images/rating-bad.png',
}

let toastTimer = null

function showToast(rating) {
  const toast = document.getElementById('toast')
  const img = document.getElementById('toast-img')

  img.src = RATING_IMAGES[rating]
  img.alt = rating

  // Clear any ongoing hide animation
  clearTimeout(toastTimer)
  toast.classList.remove('toast-hiding')
  // Force reflow so CSS transition restarts
  void toast.offsetWidth
  toast.classList.add('toast-visible')

  toastTimer = setTimeout(() => {
    toast.classList.add('toast-hiding')
    setTimeout(() => {
      toast.classList.remove('toast-visible', 'toast-hiding')
    }, 200)
  }, 1500)
}

// ── Book response ─────────────────────────────────────────────────────────────

function playBookResponse(san) {
  bookResponsePending = false
  let move
  try {
    move = chess.move(san)
  } catch {
    return
  }
  if (!move) return

  cg.move(move.from, move.to)
  cg.set({
    lastMove: [move.from, move.to],
    turnColor: cgTurnColor(chess),
    movable: {
      color: 'both',
      free: false,
      dests: toDests(chess),
    },
  })
}

// ── Move handler ──────────────────────────────────────────────────────────────

function handleMove(orig, dest) {
  if (bookResponsePending) return

  // Determine promotion (always queen for simplicity)
  const piece = chess.get(orig)
  const promotion =
    piece?.type === 'p' &&
    ((piece.color === 'w' && dest[1] === '8') || (piece.color === 'b' && dest[1] === '1'))
      ? 'q'
      : undefined

  let move
  try {
    move = chess.move({ from: orig, to: dest, promotion })
  } catch {
    return
  }
  if (!move) return

  // Update board dests for the opponent's turn
  cg.set({
    lastMove: [move.from, move.to],
    turnColor: cgTurnColor(chess),
    movable: {
      color: 'both',
      dests: toDests(chess),
    },
  })

  // In free play mode, just keep playing
  if (inFreePlay) return

  const { rating, response, nextNode } = evaluateMove(currentNode, move.san)

  showToast(rating)

  // Advance tree
  currentNode = nextNode
  if (currentNode === null) inFreePlay = true

  // Schedule book response — disable board during the delay to prevent state desync
  if (response) {
    bookResponsePending = true
    cg.set({ movable: { color: undefined } })
    setTimeout(() => playBookResponse(response), 600)
  }
}

// ── Board init ────────────────────────────────────────────────────────────────

function initBoard() {
  const boardEl = document.getElementById('board')

  cg = Chessground(boardEl, {
    fen: exercise.fen,
    orientation: exercise.toMove,
    turnColor: exercise.toMove,
    movable: {
      color: 'both',
      free: false,
      dests: toDests(chess),
    },
    animation: { enabled: true, duration: 200 },
    highlight: { lastMove: true, check: true },
    events: {
      move: handleMove,
    },
  })
}

// ── Reset ─────────────────────────────────────────────────────────────────────

function resetBoard() {
  clearTimeout(toastTimer)
  bookResponsePending = false

  chess = new Chess(exercise.fen)
  currentNode = exercise.moves
  inFreePlay = false

  cg.set({
    fen: exercise.fen,
    orientation: exercise.toMove,
    turnColor: exercise.toMove,
    lastMove: undefined,
    movable: {
      color: 'both',
      free: false,
      dests: toDests(chess),
    },
    check: false,
  })

  // Hide hint and solution panels
  const hintPanel = document.getElementById('hint-panel')
  if (hintPanel && !hintPanel.hidden) toggleHint(false)
  const solutionPanel = document.getElementById('solution-panel')
  if (solutionPanel && !solutionPanel.hidden) toggleSolution(false)
}

// ── Hint panel ────────────────────────────────────────────────────────────────

let hintOpen = false

function toggleHint(forceOpen) {
  const panel = document.getElementById('hint-panel')
  const btn = document.getElementById('hint-btn')
  hintOpen = forceOpen !== undefined ? forceOpen : !hintOpen
  panel.hidden = !hintOpen
  btn.textContent = hintOpen ? t('hideHint') : t('showHint')
  btn.dataset.i18n = hintOpen ? 'hideHint' : 'showHint'
}

// ── Solution panel ────────────────────────────────────────────────────────────

let solutionOpen = false

function toggleSolution(forceOpen) {
  const panel = document.getElementById('solution-panel')
  const btn = document.getElementById('solution-btn')
  solutionOpen = forceOpen !== undefined ? forceOpen : !solutionOpen
  panel.hidden = !solutionOpen
  btn.textContent = solutionOpen ? t('hideSolution') : t('showSolution')
  btn.dataset.i18n = solutionOpen ? 'hideSolution' : 'showSolution'
}

// ── Render exercise content ───────────────────────────────────────────────────

function renderExercise(lang) {
  document.title = `TucuChess — ${exercise.title[lang]}`

  document.getElementById('exercise-number').textContent =
    `${lang === 'es' ? 'Ejercicio' : 'Exercise'} ${exercise.id}`

  document.getElementById('exercise-title').textContent = exercise.title[lang]

  const toMoveKey = exercise.toMove === 'white' ? 'toMoveWhite' : 'toMoveBlack'
  const toMoveLabel = document.getElementById('to-move-label')
  toMoveLabel.textContent = t(toMoveKey)
  toMoveLabel.className = `to-move-label exercise-link-badge ${exercise.toMove}`

  const gameEl = document.getElementById('game-ref')
  if (exercise.game) {
    gameEl.textContent = exercise.game
    gameEl.hidden = false
  } else {
    gameEl.hidden = true
  }

  // Hint panel content and button visibility
  const hintEl = document.getElementById('hint-text')
  const hintBtn = document.getElementById('hint-btn')
  if (exercise.hint[lang]) {
    hintEl.textContent = exercise.hint[lang]
    hintBtn.hidden = false
  } else {
    hintBtn.hidden = true
  }
  hintBtn.textContent = hintOpen ? t('hideHint') : t('showHint')

  document.getElementById('solution-text').innerHTML = formatSolutionHtml(exercise.solution[lang])

  // Solution button label
  const btn = document.getElementById('solution-btn')
  btn.textContent = solutionOpen ? t('hideSolution') : t('showSolution')
}

// ── Navigation ────────────────────────────────────────────────────────────────

function setupNav() {
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')

  if (exId <= 1) prevBtn.disabled = true
  if (exId >= exercises.length) nextBtn.disabled = true

  prevBtn.addEventListener('click', () => {
    if (exId > 1) window.location.href = `./exercise.html?ex=${exId - 1}`
  })
  nextBtn.addEventListener('click', () => {
    if (exId < exercises.length) window.location.href = `./exercise.html?ex=${exId + 1}`
  })
}

// ── Init ──────────────────────────────────────────────────────────────────────

const lang = getLang()
applyI18n(lang)
renderExercise(lang)
initBoard()
syncBoardTheme()
setupNav()

document.getElementById('reset-btn').addEventListener('click', resetBoard)
document.getElementById('hint-btn').addEventListener('click', () => toggleHint())
document.getElementById('solution-btn').addEventListener('click', () => toggleSolution())

setupSettingsMenu(
  newLang => {
    renderExercise(newLang)
  },
  newTheme => {
    syncBoardTheme(newTheme)
  },
)
