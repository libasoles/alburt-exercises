import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

import { Chessground } from "chessground";
import { Chess } from "chess.js";
import confetti from "canvas-confetti";
import { exercises } from "./exercises/data.js";
import { evaluateMove } from "./exercises/evaluateMove.js";
import { formatHintHtml } from "./exercises/formatHint.js";
import { formatSolutionHtml } from "./exercises/formatSolution.js";
import { getLang, applyI18n, syncLangInUrl, t, withLangInUrl } from "./i18n.js";
import "./settingsMenu.js";
import { getTheme, applyBoardTheme, setupSettingsMenu } from "./settings.js";

// ── Routing ──────────────────────────────────────────────────────────────────

const params = new URLSearchParams(window.location.search);
const exId = parseInt(params.get("ex"), 10);

if (!exId || exId < 1 || exId > exercises.length) {
  window.location.replace(withLangInUrl("./index.html"));
  throw new Error("redirect");
}

const exercise = exercises[exId - 1];
const isLastExercise = exId === exercises.length;

// ── State ─────────────────────────────────────────────────────────────────────

let chess = new Chess(exercise.fen);
let cg = null;
let currentNode = exercise.moves;
let inFreePlay = false;
let bookResponsePending = false;
let hasUserMoved = false;
let boardOrientation = exercise.toMove;
let rotateIconTurns = 0;
let completionConfettiTimer = null;
let pageConfetti = confetti;
let overlayConfetti = confetti;

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

function updateResetButtonState() {
  const resetBtn = document.getElementById("reset-btn");
  if (!resetBtn) return;
  resetBtn.disabled = !hasUserMoved;
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

  updateResetButtonState();
}

// ── Confetti ──────────────────────────────────────────────────────────────────

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

  hasUserMoved = true;
  updateResetButtonState();

  // In free play mode, just keep playing
  if (inFreePlay) return;

  const { rating, response, nextNode } = evaluateMove(currentNode, move.san);

  showToast(rating);
  setResetButtonPulse(rating === "bad");

  // Advance tree
  currentNode = nextNode;
  if (currentNode === null) {
    inFreePlay = true;
    if (rating === "best") {
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
    cg.set({ movable: { color: undefined } });
    setTimeout(() => playBookResponse(response), 600);
  }
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

// ── Reset ─────────────────────────────────────────────────────────────────────

function resetBoard() {
  hideToast();
  hideCompletionOverlay();
  bookResponsePending = false;
  setResetButtonPulse(false);
  setNextButtonPulse(false);

  chess = new Chess(exercise.fen);
  currentNode = exercise.moves;
  inFreePlay = false;
  hasUserMoved = false;

  cg.set({
    fen: exercise.fen,
    orientation: boardOrientation,
    turnColor: exercise.toMove,
    lastMove: undefined,
    movable: {
      color: "both",
      free: false,
      dests: toDests(chess),
    },
    check: false,
  });

  // Hide hint and solution panels
  const hintPanel = document.getElementById("hint-panel");
  if (hintPanel && !hintPanel.hidden) toggleHint(false);
  const solutionPanel = document.getElementById("solution-panel");
  if (solutionPanel && !solutionPanel.hidden) toggleSolution(false);

  updateResetButtonState();
}

// ── Hint panel ────────────────────────────────────────────────────────────────

let hintOpen = false;

function toggleHint(forceOpen) {
  const panel = document.getElementById("hint-panel");
  const btn = document.getElementById("hint-btn");
  hintOpen = forceOpen !== undefined ? forceOpen : !hintOpen;
  panel.hidden = !hintOpen;
  btn.textContent = hintOpen ? t("hideHint") : t("showHint");
  btn.dataset.i18n = hintOpen ? "hideHint" : "showHint";
}

// ── Solution panel ────────────────────────────────────────────────────────────

let solutionOpen = false;

function toggleSolution(forceOpen) {
  const panel = document.getElementById("solution-panel");
  const btn = document.getElementById("solution-btn");
  solutionOpen = forceOpen !== undefined ? forceOpen : !solutionOpen;

  if (solutionOpen && !hintOpen && exercise.hint[getLang()]) {
    toggleHint(true);
  }

  panel.hidden = !solutionOpen;
  btn.textContent = solutionOpen ? t("hideSolution") : t("showSolution");
  btn.dataset.i18n = solutionOpen ? "hideSolution" : "showSolution";
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
  document.title = `TucuChess — ${exercise.title[lang]}`;

  document.getElementById("exercise-number").textContent =
    `${lang === "es" ? "Ejercicio" : "Exercise"} ${exercise.id}`;

  document.getElementById("exercise-title").textContent = exercise.title[lang];

  const toMoveKey = exercise.toMove === "white" ? "toMoveWhite" : "toMoveBlack";
  const toMoveLabel = document.getElementById("to-move-label");
  toMoveLabel.textContent = t(toMoveKey);
  toMoveLabel.className = `to-move-label exercise-link-badge ${exercise.toMove}`;

  const gameEl = document.getElementById("game-ref");
  gameEl.textContent = exercise.game ?? "";
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
  hintBtn.textContent = hintOpen ? t("hideHint") : t("showHint");

  document.getElementById("solution-text").innerHTML = formatSolutionHtml(
    exercise.solution[lang],
    lang,
  );

  // Solution button label
  const btn = document.getElementById("solution-btn");
  btn.textContent = solutionOpen ? t("hideSolution") : t("showSolution");

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

  if (exId <= 1) prevBtn.disabled = true;
  if (exId >= exercises.length) nextBtn.disabled = true;

  prevBtn.addEventListener("click", () => {
    if (exId > 1)
      window.location.href = withLangInUrl(`./exercise.html?ex=${exId - 1}`);
  });
  nextBtn.addEventListener("click", () => {
    if (exId < exercises.length)
      window.location.href = withLangInUrl(`./exercise.html?ex=${exId + 1}`);
  });
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
syncBoardTheme();
setupNav();
setupBoardControls();
setupCompletionOverlay();
setupFenCopy();
syncPanelLayout();
updateResetButtonState();

document.getElementById("reset-btn").addEventListener("click", resetBoard);
document
  .getElementById("hint-btn")
  .addEventListener("click", () => toggleHint());
document
  .getElementById("solution-btn")
  .addEventListener("click", () => toggleSolution());
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
