import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

import { Chessground } from "chessground";
import { Chess } from "chess.js";
import confetti from "canvas-confetti";
import { exercises as alburtExercises } from "./exercises/data.js";
import { woodpeckerExercises } from "./woodpecker/data.js";
import { evaluateMove } from "./exercises/evaluateMove.js";
import { formatHintHtml } from "./exercises/formatHint.js";
import { formatSolutionHtml } from "./exercises/formatSolution.js";
import { getLang, applyI18n, syncLangInUrl, t, withLangInUrl } from "./i18n.js";
import { registerServiceWorker } from "./pwa.js";
import { updateExerciseSeo } from "./seo.js";
import "./settingsMenu.js";
import { createClock } from "./clock.js";
import { showPopover } from "./popover.js";
import { getRecord, saveSolve, formatClock } from "./records.js";
import { getTheme, applyBoardTheme, setupSettingsMenu } from "./settings.js";

// ── Routing ──────────────────────────────────────────────────────────────────

const params = new URLSearchParams(window.location.search);
let exId = parseInt(params.get("ex"), 10);
const setParam = params.get("set") === "woodpecker" ? "woodpecker" : null;
const exercises = setParam ? woodpeckerExercises : alburtExercises;
const exerciseUrl = (id) => withLangInUrl(`./exercise.html?${setParam ? `set=${setParam}&` : ""}ex=${id}`);

if (!exId || exId < 1 || exId > exercises.length) {
  window.location.replace(withLangInUrl("./index.html"));
  throw new Error("redirect");
}

let exercise = exercises[exId - 1];
let isLastExercise = exId === exercises.length;

// ── State ─────────────────────────────────────────────────────────────────────

let chess = new Chess(exercise.fen);
let cg = null;
let currentNode = exercise.moves;
let inFreePlay = false;
let bookResponsePending = false;
let checkpoint = null;
let checkpointPending = false;
let bookResponseTimer = null;
let playbackTimer = null;
let playbackId = 0;
let hintOpen = false;
let hintStage = "idle";
let hintCardDismissed = false;
let boardOrientation = exercise.toMove;
let rotateIconTurns = 0;
let completionConfettiTimer = null;
let pageConfetti = confetti;
let overlayConfetti = confetti;
let userMoves = 0;
let solutionUsed = false;
let recordBannerTimer = null;
const clock = createClock(document.getElementById("exercise-clock"));

registerServiceWorker();

// ── Chessground helpers ───────────────────────────────────────────────────────

function toDests(chessInstance) {
  const dests = new Map();
  for (const move of chessInstance.moves({ verbose: true })) {
    if (!dests.has(move.from)) dests.set(move.from, []);
    dests.get(move.from).push(move.to);
  }
  return dests;
}

function cgTurnColor(chessInstance) {
  return chessInstance.turn() === "w" ? "white" : "black";
}

function updateCgDests() {
  cg.set({
    turnColor: cgTurnColor(chess),
    movable: {
      color: "both",
      dests: toDests(chess),
    },
  });
}

function syncBoardTheme(theme = getTheme()) {
  applyBoardTheme(theme);
  if (cg) cg.redrawAll();
}

function getOppositeOrientation(color) {
  return color === "white" ? "black" : "white";
}

function setRotateBoardButtonLabels(lang = getLang()) {
  const rotateBtn = document.getElementById("rotate-board-btn");
  const rotateLabel = document.getElementById("rotate-board-label");
  if (!rotateBtn) return;

  const label = lang === "es" ? "Rotar tablero" : "Rotate board";
  rotateBtn.setAttribute("aria-label", label);
  rotateBtn.title = label;
  if (rotateLabel) rotateLabel.textContent = t("rotateBoard");
}

function saveCheckpoint() {
  checkpoint = {
    fen: chess.fen(),
    node: currentNode,
    inFreePlay,
    lastMove: cg?.state.lastMove,
  };
}

function updateResetButtonState() {
  const resetBtn = document.getElementById("reset-btn");
  if (!resetBtn) return;
  resetBtn.disabled = chess.fen() === checkpoint.fen;
}

function bestMoves() {
  if (!currentNode || inFreePlay || bookResponsePending) return [];
  const bestSans = Object.keys(currentNode).filter(
    (san) => currentNode[san].rating === "best",
  );
  return chess
    .moves({ verbose: true })
    .filter((move) => bestSans.includes(move.san))
    .sort((a, b) => bestSans.indexOf(a.san) - bestSans.indexOf(b.san));
}

// Hint button cycle: "Ver pista" (idle) -> "Revelar" (square tinted) -> arrow
// shown. A good move returns it to idle.
function updateHintButton() {
  const btn = document.getElementById("hint-btn");
  const label = document.getElementById("hint-btn-label");
  if (!btn || !label) return;
  const key = hintStage === "idle" ? "showHint" : "revealHint";
  label.textContent = t(key);
  label.dataset.i18n = key;
  btn.classList.toggle("hint-btn-reveal", hintStage !== "idle");
  btn.disabled = hintStage === "arrow" || bestMoves().length === 0;
}

// The square tint is a div inside cg-board, under the pieces (chessground
// ignores nodes that are not piece/square), so only the square is coloured; the arrow is a chessground auto shape.
function refreshHintHighlight() {
  const boardEl = document.getElementById("board");
  boardEl.querySelectorAll(".hint-square").forEach((el) => el.remove());
  cg?.setAutoShapes([]);

  const moves = bestMoves();
  if (hintStage === "idle" || moves.length === 0) {
    updateHintButton();
    return;
  }

  if (hintStage === "arrow") {
    cg.setAutoShapes([{ orig: moves[0].from, dest: moves[0].to, brush: "green" }]);
  }

  const origins = hintStage === "arrow" ? [moves[0].from] : moves.map((m) => m.from);
  for (const square of new Set(origins)) {
    const file = square.charCodeAt(0) - 97;
    const rank = Number(square[1]) - 1;
    const white = boardOrientation === "white";
    const el = document.createElement("div");
    el.className = "hint-square";
    el.style.left = `${(white ? file : 7 - file) * 12.5}%`;
    el.style.top = `${(white ? 7 - rank : rank) * 12.5}%`;
    boardEl.querySelector("cg-board").appendChild(el);
  }
  updateHintButton();
}

function setResetButtonPulse(enabled) {
  const resetBtn = document.getElementById("reset-btn");
  if (!resetBtn) return;
  resetBtn.classList.toggle("action-btn-pulse", enabled);
}

function setNextButtonPulse(enabled) {
  const nextBtn = document.getElementById("next-btn");
  if (!nextBtn) return;
  nextBtn.classList.toggle("action-btn-pulse", enabled && !nextBtn.disabled);
}

// ── Toast ─────────────────────────────────────────────────────────────────────

const RATING_IMAGES = {
  best: "./images/rating-best.png",
  ok: "./images/rating-ok.png",
  bad: "./images/rating-bad.png",
};

const TOAST_DURATION_MS = {
  best: 1500,
  ok: 3000,
  bad: 4500,
};

const TOAST_FADE_MS = 220;

let toastTimer = null;
let toastHideTimer = null;

function hideToast() {
  const toast = document.getElementById("toast");
  if (!toast) return;

  clearTimeout(toastTimer);
  clearTimeout(toastHideTimer);
  if (!toast.classList.contains("toast-visible")) return;

  toast.classList.add("toast-hiding");
  toastHideTimer = setTimeout(() => {
    toast.classList.remove("toast-visible", "toast-hiding");
  }, TOAST_FADE_MS);
}

function showToast(rating) {
  const toast = document.getElementById("toast");
  const img = document.getElementById("toast-img");

  img.src = RATING_IMAGES[rating];
  img.alt = rating;
  document.getElementById("toast-text").textContent =
    rating === "ok" ? t("interestingButNo") : "";

  // Clear any ongoing hide animation
  clearTimeout(toastTimer);
  clearTimeout(toastHideTimer);
  toast.classList.remove("toast-hiding");
  // Force reflow so CSS transition restarts
  void toast.offsetWidth;
  toast.classList.add("toast-visible");

  toastTimer = setTimeout(() => {
    toast.classList.add("toast-hiding");
    toastHideTimer = setTimeout(() => {
      toast.classList.remove("toast-visible", "toast-hiding");
    }, TOAST_FADE_MS);
  }, TOAST_DURATION_MS[rating] ?? TOAST_DURATION_MS.best);
}

// ── Copy toast ──────────────────────────────────────────────────────────────

let copyToastTimer = null;
let copyToastHideTimer = null;

function showCopyToast(message) {
  const toast = document.getElementById("copy-toast");
  toast.textContent = message;

  clearTimeout(copyToastTimer);
  clearTimeout(copyToastHideTimer);
  toast.classList.remove("copy-toast-hiding");
  void toast.offsetWidth;
  toast.classList.add("copy-toast-visible");

  copyToastTimer = setTimeout(() => {
    toast.classList.add("copy-toast-hiding");
    copyToastHideTimer = setTimeout(() => {
      toast.classList.remove("copy-toast-visible", "copy-toast-hiding");
    }, TOAST_FADE_MS);
  }, 1500);
}

// ── FEN copy ────────────────────────────────────────────────────────────────

async function copyFen() {
  const fen = exercise.fen;
  try {
    await navigator.clipboard.writeText(fen);
  } catch {
    // Fallback for insecure contexts / older browsers
    const ta = document.createElement("textarea");
    ta.value = fen;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch {
      /* ignore */
    }
    ta.remove();
  }
  showCopyToast(t("fenCopied"));
}

function setupFenCopy() {
  document.getElementById("fen-value").textContent = exercise.fen;
  const box = document.getElementById("fen-box");
  box.title = t("fenCopyHint");
  box.setAttribute("aria-label", t("fenCopyHint"));
  box.addEventListener("click", copyFen);
}

// ── Book response ─────────────────────────────────────────────────────────────

function playBookResponse(san) {
  bookResponsePending = false;
  bookResponseTimer = null;
  let move;
  try {
    move = chess.move(san);
  } catch {
    return;
  }
  if (!move) return;

  cg.move(move.from, move.to);
  cg.set({
    lastMove: [move.from, move.to],
    turnColor: cgTurnColor(chess),
    movable: {
      color: "both",
      free: false,
      dests: toDests(chess),
    },
  });

  if (checkpointPending) saveCheckpoint();
  checkpointPending = false;
  updateResetButtonState();
  refreshHintHighlight();
}

// ── Confetti ──────────────────────────────────────────────────────────────────

// ── Clock & records ───────────────────────────────────────────────────────────

function startClock() {
  clock.start(getRecord(setParam, exId)?.ms);
}

function recordSolve() {
  const ms = clock.stop();
  if (solutionUsed || clock.expired) return { isNewRecord: false };
  return saveSolve(setParam, exId, ms, userMoves);
}

function showRecordBanner() {
  const banner = document.getElementById("record-banner");
  banner.textContent = t("newRecord");
  banner.setAttribute("aria-hidden", "false");
  banner.classList.remove("record-banner-visible");
  void banner.offsetWidth;
  banner.classList.add("record-banner-visible");
  clearTimeout(recordBannerTimer);
  recordBannerTimer = setTimeout(hideRecordBanner, 3200);
}

function hideRecordBanner() {
  clearTimeout(recordBannerTimer);
  const banner = document.getElementById("record-banner");
  banner.classList.remove("record-banner-visible");
  banner.setAttribute("aria-hidden", "true");
}

function setupClock() {
  const clockEl = document.getElementById("exercise-clock");
  clockEl.addEventListener("click", () => {
    const record = getRecord(setParam, exId);
    if (!record) return;
    showPopover(
      clockEl,
      `${t("recordTimePopover")}: ${formatClock(record.ms, { countdown: true })}`,
    );
  });
  startClock();
}

function celebrateSolved() {
  pageConfetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    disableForReducedMotion: true,
  });
}

function celebrateFinalExerciseSolved() {
  const bursts = [
    { particleCount: 220, spread: 90, origin: { x: 0.2, y: 0.65 } },
    { particleCount: 220, spread: 90, origin: { x: 0.8, y: 0.65 } },
    { particleCount: 280, spread: 120, origin: { x: 0.5, y: 0.45 } },
  ];

  bursts.forEach((burst, index) => {
    setTimeout(
      () =>
        overlayConfetti({
          ...burst,
          disableForReducedMotion: true,
        }),
      index * 180,
    );
  });
}

function startCompletionConfetti() {
  if (completionConfettiTimer !== null) return;

  const fire = () => {
    overlayConfetti({
      particleCount: 110,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.72 },
      disableForReducedMotion: true,
    });
    overlayConfetti({
      particleCount: 110,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.72 },
      disableForReducedMotion: true,
    });
  };

  fire();
  completionConfettiTimer = window.setInterval(fire, 900);
}

function stopCompletionConfetti() {
  if (completionConfettiTimer === null) return;

  window.clearInterval(completionConfettiTimer);
  completionConfettiTimer = null;
}

function showCompletionOverlay() {
  const overlay = document.getElementById("completion-overlay");
  if (!overlay) return;

  overlay.classList.add("completion-overlay-visible");
  overlay.setAttribute("aria-hidden", "false");
  startCompletionConfetti();
}

function hideCompletionOverlay() {
  const overlay = document.getElementById("completion-overlay");
  if (!overlay) return;

  overlay.classList.remove("completion-overlay-visible");
  overlay.setAttribute("aria-hidden", "true");
  stopCompletionConfetti();
}

function goToIndex() {
  stopCompletionConfetti();
  window.location.href = withLangInUrl("./index.html");
}

function setCurvedCompletionTitle(text) {
  const titleEl = document.getElementById("completion-overlay-title");
  if (!titleEl) return;

  const chars = [...text];
  const center = (chars.length - 1) / 2;
  const isDesktop = window.matchMedia("(min-width: 640px)").matches;
  const titleWidth = titleEl.clientWidth || (isDesktop ? 520 : 480);
  const spread = isDesktop
    ? Math.min(
        36,
        Math.max(16, (titleWidth * 0.84) / Math.max(chars.length - 1, 1)),
      )
    : Math.min(
        24,
        Math.max(12, (titleWidth * 0.72) / Math.max(chars.length - 1, 1)),
      );
  const maxOffset = Math.max(center, 1);
  titleEl.setAttribute("aria-label", text);
  titleEl.textContent = "";
  titleEl.style.setProperty("--char-count", chars.length);

  chars.forEach((char, index) => {
    const offset = index - center;
    const curveY = -1 * (maxOffset * maxOffset - offset * offset) * 1.7;
    const tiltRatio = maxOffset === 0 ? 0 : offset / maxOffset;
    const tilt =
      Math.sign(tiltRatio) * Math.pow(Math.abs(tiltRatio), 1.15) * 14;
    const span = document.createElement("span");
    span.className = "completion-overlay-title-char";
    span.style.setProperty("--char-index", index);
    span.style.setProperty("--char-x", `${offset * spread}px`);
    span.style.setProperty("--char-curve-y", `${curveY}px`);
    span.style.setProperty("--char-tilt", `${tilt}deg`);
    span.textContent = char === " " ? "\u00a0" : char;
    titleEl.appendChild(span);
  });
}

function syncCurvedCompletionTitle() {
  const titleEl = document.getElementById("completion-overlay-title");
  const text = titleEl?.getAttribute("aria-label");
  if (text) setCurvedCompletionTitle(text);
}

// ── Move handler ──────────────────────────────────────────────────────────────

function handleMove(orig, dest) {
  if (bookResponsePending) return;

  // Determine promotion (always queen for simplicity)
  const piece = chess.get(orig);
  const promotion =
    piece?.type === "p" &&
    ((piece.color === "w" && dest[1] === "8") ||
      (piece.color === "b" && dest[1] === "1"))
      ? "q"
      : undefined;

  let move;
  try {
    move = chess.move({ from: orig, to: dest, promotion });
  } catch {
    return;
  }
  if (!move) return;

  // Update board dests for the opponent's turn
  cg.set({
    lastMove: [move.from, move.to],
    turnColor: cgTurnColor(chess),
    movable: {
      color: "both",
      dests: toDests(chess),
    },
  });

  hintStage = "idle";

  // In free play mode, just keep playing
  if (inFreePlay) {
    updateResetButtonState();
    refreshHintHighlight();
    return;
  }

  const { rating, response, nextNode } = evaluateMove(currentNode, move.san);

  showToast(rating);
  if (rating === "best" && hintOpen) {
    toggleHint(false);
    hintCardDismissed = true;
  }
  setResetButtonPulse(rating !== "best");

  if (rating === "best") userMoves += 1;

  // Advance tree
  currentNode = nextNode;
  if (currentNode === null) {
    inFreePlay = true;
    if (rating === "best") {
      const { isNewRecord } = recordSolve();
      if (isNewRecord) showRecordBanner();
      if (isLastExercise) {
        celebrateFinalExerciseSolved();
        showCompletionOverlay();
      } else {
        celebrateSolved();
        setNextButtonPulse(true);
      }
    }
  }

  // Schedule book response — disable board during the delay to prevent state desync
  if (response) {
    bookResponsePending = true;
    checkpointPending = rating === "best";
    cg.set({ movable: { color: undefined } });
    bookResponseTimer = setTimeout(() => playBookResponse(response), 600);
  } else if (rating === "best") {
    saveCheckpoint();
  }

  updateResetButtonState();
  refreshHintHighlight();
}

// ── Board init ────────────────────────────────────────────────────────────────

function initBoard() {
  const boardEl = document.getElementById("board");

  cg = Chessground(boardEl, {
    fen: exercise.fen,
    orientation: boardOrientation,
    turnColor: exercise.toMove,
    movable: {
      color: "both",
      free: false,
      dests: toDests(chess),
    },
    animation: { enabled: true, duration: 200 },
    highlight: { lastMove: true, check: true },
    events: {
      move: handleMove,
    },
  });
}

// ── Retry ─────────────────────────────────────────────────────────────────────

function retryFromCheckpoint() {
  cancelPlayback();
  if (solutionOpen) setSolutionVisible(false);
  hintStage = "idle";
  hideToast();
  hideCompletionOverlay();
  clearTimeout(bookResponseTimer);
  bookResponseTimer = null;
  bookResponsePending = false;
  checkpointPending = false;
  setResetButtonPulse(false);
  setNextButtonPulse(false);

  chess = new Chess(checkpoint.fen);
  currentNode = checkpoint.node;
  inFreePlay = checkpoint.inFreePlay;

  cg.set({
    fen: checkpoint.fen,
    orientation: boardOrientation,
    turnColor: cgTurnColor(chess),
    lastMove: checkpoint.lastMove,
    movable: {
      color: "both",
      free: false,
      dests: toDests(chess),
    },
    check: false,
  });

  updateResetButtonState();
  refreshHintHighlight();
}

// ── Solution playback ─────────────────────────────────────────────────────────

const CLICK_MOVE_DELAY_MS = 550;
const AUTOPLAY_START_DELAY_MS = 900;

function humanMoveDelay() {
  return 1100 + Math.random() * 900;
}

function bestLine(startNode) {
  const sans = [];
  let node = startNode;
  while (node) {
    const san = Object.keys(node).find((key) => node[key].rating === "best");
    if (!san) break;
    sans.push(san);
    if (node[san].response) sans.push(node[san].response);
    node = node[san].continuations ?? null;
  }
  return sans;
}

// On mobile the solution panel sits below the board; bring the board back
// into view so the replay is visible.
function revealBoard() {
  if (!mobilePanelsQuery.matches) return;
  document
    .getElementById("board")
    .scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearActiveSolutionMove() {
  document
    .querySelectorAll(".solution-active")
    .forEach((el) => el.classList.remove("solution-active"));
}

function cancelPlayback() {
  playbackId += 1;
  clearTimeout(playbackTimer);
  playbackTimer = null;
  clearActiveSolutionMove();
}

function showPlaybackPosition(lastMove) {
  cg.set({
    fen: chess.fen(),
    turnColor: cgTurnColor(chess),
    lastMove,
    check: chess.inCheck() ? cgTurnColor(chess) : false,
    movable: { color: undefined },
  });
}

// Replays `sans` from `fen`, one move at a time, on top of a board that is
// locked until the line ends.
function playLine(
  sans,
  { fen = exercise.fen, lastMove, startDelay, nextDelay },
) {
  cancelPlayback();
  revealBoard();
  const id = playbackId;

  clearTimeout(bookResponseTimer);
  bookResponseTimer = null;
  bookResponsePending = false;
  checkpointPending = false;
  inFreePlay = true;
  hintStage = "idle";
  setResetButtonPulse(false);
  setNextButtonPulse(false);
  hideToast();
  hideCompletionOverlay();

  chess = new Chess(fen);
  showPlaybackPosition(lastMove);
  updateResetButtonState();
  refreshHintHighlight();

  const step = (index) => {
    if (id !== playbackId) return;
    if (index >= sans.length) {
      playbackTimer = null;
      cg.set({ movable: { color: "both", free: false, dests: toDests(chess) } });
      return;
    }
    const move = chess.move(sans[index]);
    showPlaybackPosition([move.from, move.to]);
    playbackTimer = setTimeout(() => step(index + 1), nextDelay());
  };

  playbackTimer = setTimeout(() => step(0), startDelay);
}

function setupSolutionClicks() {
  const container = document.getElementById("solution-text");

  const activate = (el) => {
    const path = el.dataset.path.split(" ");
    playLine(path, {
      startDelay: CLICK_MOVE_DELAY_MS,
      nextDelay: () => CLICK_MOVE_DELAY_MS,
    });
    clearActiveSolutionMove();
    el.classList.add("solution-active");
  };

  container.addEventListener("click", (event) => {
    const el = event.target.closest(".solution-clickable");
    if (el) activate(el);
  });
  container.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const el = event.target.closest(".solution-clickable");
    if (!el) return;
    event.preventDefault();
    activate(el);
  });
}

// ── Hint panel ────────────────────────────────────────────────────────────────

function advanceHint() {
  if (hintStage === "idle") {
    if (!hintOpen && !hintCardDismissed) toggleHint(true);
    hintStage = "highlight";
  } else if (hintStage === "highlight") {
    hintStage = "arrow";
  }
  refreshHintHighlight();
}

function toggleHint(forceOpen) {
  const panel = document.getElementById("hint-panel");
  hintOpen = forceOpen !== undefined ? forceOpen : !hintOpen;
  panel.hidden = !hintOpen;
}

// ── Solution panel ────────────────────────────────────────────────────────────

let solutionOpen = false;

// The panel buttons are hidden while the solution card is open; Retry closes it.
function setSolutionVisible(open) {
  solutionOpen = open;
  document.getElementById("solution-panel").hidden = !open;
  document
    .getElementById("panel-buttons")
    .classList.toggle("panel-buttons-collapsed", open);
}

function openSolution() {
  solutionUsed = true;
  if (!inFreePlay) clock.stop();
  setSolutionVisible(true);
  if (!hintOpen && exercise.hint[getLang()]) toggleHint(true);

  // Continue from the user's last good position; only the missing moves play.
  playLine(checkpoint.inFreePlay ? [] : bestLine(checkpoint.node), {
    fen: checkpoint.fen,
    lastMove: checkpoint.lastMove,
    startDelay: AUTOPLAY_START_DELAY_MS,
    nextDelay: humanMoveDelay,
  });
}

const mobilePanelsQuery = window.matchMedia("(max-width: 639px)");

function syncPanelLayout() {
  const infoColumn = document.querySelector(".info-column");
  const panelButtons = document.getElementById("panel-buttons");
  const hintBtn = document.getElementById("hint-btn");
  const hintPanel = document.getElementById("hint-panel");
  const solutionBtn = document.getElementById("solution-btn");
  const solutionPanel = document.getElementById("solution-panel");

  if (
    !infoColumn ||
    !panelButtons ||
    !hintBtn ||
    !hintPanel ||
    !solutionBtn ||
    !solutionPanel
  )
    return;

  if (mobilePanelsQuery.matches) {
    hintBtn.insertAdjacentElement("afterend", hintPanel);
    solutionBtn.insertAdjacentElement("afterend", solutionPanel);
    return;
  }

  panelButtons.insertAdjacentElement("afterend", hintPanel);
  hintPanel.insertAdjacentElement("afterend", solutionPanel);
}

// ── Render exercise content ───────────────────────────────────────────────────

function renderExercise(lang) {
  updateExerciseSeo({ lang, exercise });

  document.getElementById("exercise-number").textContent =
    `${lang === "es" ? "Ejercicio" : "Exercise"} ${exercise.id}`;

  document.getElementById("exercise-title").textContent = exercise.title[lang];

  const toMoveKey = exercise.toMove === "white" ? "toMoveWhite" : "toMoveBlack";
  const toMoveLabel = document.getElementById("to-move-label");
  toMoveLabel.textContent = t(toMoveKey);
  toMoveLabel.className = `to-move-label exercise-link-badge ${exercise.toMove}`;

  const gameEl = document.getElementById("game-ref");
  gameEl.textContent = exercise.game ?? "";
  gameEl.title = exercise.game ?? "";
  setRotateBoardButtonLabels(lang);

  // Hint panel content and button visibility
  const hintEl = document.getElementById("hint-text");
  const hintBtn = document.getElementById("hint-btn");
  if (exercise.hint[lang]) {
    hintEl.innerHTML = formatHintHtml(exercise.hint[lang]);
    hintBtn.hidden = false;
  } else {
    hintBtn.hidden = true;
  }
  updateHintButton();

  document.getElementById("solution-text").innerHTML = formatSolutionHtml(
    exercise.solution[lang],
    lang,
    exercise.fen,
    exercise.solutionPrefix,
  );


  // FEN copy tooltip
  const fenBox = document.getElementById("fen-box");
  if (fenBox) {
    fenBox.title = t("fenCopyHint");
    fenBox.setAttribute("aria-label", t("fenCopyHint"));
  }

  setCurvedCompletionTitle(t("finalCongratsTitle"));
}

// ── Navigation ────────────────────────────────────────────────────────────────

function setupNav() {
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  updateNavButtons();

  prevBtn.addEventListener("click", () => {
    if (exId > 1) goToExercise(exId - 1);
  });
  nextBtn.addEventListener("click", () => {
    if (exId < exercises.length) goToExercise(exId + 1);
  });
  window.addEventListener("popstate", () => {
    const id = parseInt(new URLSearchParams(window.location.search).get("ex"), 10);
    if (id >= 1 && id <= exercises.length && id !== exId) loadExercise(id);
  });
}

function updateNavButtons() {
  document.getElementById("prev-btn").disabled = exId <= 1;
  document.getElementById("next-btn").disabled = exId >= exercises.length;
}

// Switches exercise in place: the board stays mounted and only the pieces
// fade out and back in with the new position.
const SWAP_FADE_MS = 180;
let swapTimer = null;

function goToExercise(id) {
  history.pushState(null, "", exerciseUrl(id));
  loadExercise(id);
}

function loadExercise(id) {
  const boardEl = document.getElementById("board");
  boardEl.classList.add("board-swapping");
  clearTimeout(swapTimer);
  swapTimer = setTimeout(() => {
    applyExercise(id);
    // Let chessground draw the new pieces (still transparent) before fading in.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => boardEl.classList.remove("board-swapping")),
    );
  }, SWAP_FADE_MS);
}

function applyExercise(id) {
  cancelPlayback();
  clearTimeout(bookResponseTimer);
  bookResponseTimer = null;
  bookResponsePending = false;
  checkpointPending = false;
  stopCompletionConfetti();
  hideToast();
  hideCompletionOverlay();
  hideRecordBanner();
  setResetButtonPulse(false);
  setNextButtonPulse(false);
  clearActiveSolutionMove();
  if (solutionOpen) setSolutionVisible(false);
  toggleHint(false);
  hintStage = "idle";
  hintCardDismissed = false;

  exId = id;
  exercise = exercises[id - 1];
  isLastExercise = id === exercises.length;
  chess = new Chess(exercise.fen);
  currentNode = exercise.moves;
  inFreePlay = false;
  userMoves = 0;
  solutionUsed = false;
  boardOrientation = exercise.toMove;
  startClock();

  cg.set({
    animation: { enabled: false },
    fen: exercise.fen,
    orientation: boardOrientation,
    turnColor: exercise.toMove,
    lastMove: undefined,
    check: false,
    movable: { color: "both", free: false, dests: toDests(chess) },
  });
  cg.set({ animation: { enabled: true } });

  saveCheckpoint();
  renderExercise(getLang());
  document.getElementById("fen-value").textContent = exercise.fen;
  updateNavButtons();
  updateResetButtonState();
}

function setupBoardControls() {
  const rotateBtn = document.getElementById("rotate-board-btn");
  rotateBtn.addEventListener("click", () => {
    boardOrientation = getOppositeOrientation(boardOrientation);
    rotateIconTurns += 1;
    rotateBtn.style.setProperty(
      "--icon-rotation",
      `${rotateIconTurns * 180}deg`,
    );
    cg.set({ orientation: boardOrientation });
    refreshHintHighlight();
  });
}

function setupCompletionOverlay() {
  const overlay = document.getElementById("completion-overlay");
  if (!overlay) return;
  const confettiCanvas = document.getElementById("completion-confetti-canvas");

  if (confettiCanvas instanceof HTMLCanvasElement) {
    overlayConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true,
    });
  }

  overlay.addEventListener("click", goToIndex);
  overlay.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToIndex();
    }
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────

const lang = getLang();
syncLangInUrl(lang);
applyI18n(lang);
renderExercise(lang);
initBoard();
saveCheckpoint();
syncBoardTheme();
setupNav();
setupBoardControls();
setupClock();
setupCompletionOverlay();
setupFenCopy();
setupSolutionClicks();
syncPanelLayout();
updateResetButtonState();

document.getElementById("reset-btn").addEventListener("click", retryFromCheckpoint);
document
  .getElementById("hint-btn")
  .addEventListener("click", advanceHint);
document
  .getElementById("solution-btn")
  .addEventListener("click", openSolution);
// Clicking outside the board deselects the selected piece
document.addEventListener("pointerdown", (event) => {
  if (!event.target.closest("#board")) cg.selectSquare(null);
});
mobilePanelsQuery.addEventListener("change", syncPanelLayout);
window.addEventListener("resize", syncCurvedCompletionTitle);

setupSettingsMenu(
  (newLang) => {
    renderExercise(newLang);
  },
  (newTheme) => {
    syncBoardTheme(newTheme);
  },
);
