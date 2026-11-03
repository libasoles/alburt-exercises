const LANG_KEY = "tucuchess_lang";
const DEFAULT_LANG = "es";
const SUPPORTED_LANGS = new Set(["es", "en"]);

export const strings = {
  es: {
    indexTitleMain: "Ejercicios de Ajedrez",
    indexTitleSub: "Libro de Alburt",
    alburtBio:
      "Lev Alburt fue tres veces campeón de ajedrez de EE.UU. (1984, 1985 y 1990). Nació en Ucrania, emigró a Estados Unidos en 1979 y llegó a ser uno de los entrenadores más reconocidos del país. Su «<strong>Chess Training Pocket Book</strong>» reúne 300 posiciones elegidas para afinar el cálculo y la visión táctica. Compartimos los primeros 7 ejercicios.",
    woodpeckerTitle: "The Woodpecker Method",
    woodpeckerBio:
      "«<strong>The Woodpecker Method</strong>» (Axel Smith y Hans Tikkanen) propone resolver una y otra vez el mismo conjunto de problemas tácticos, cada vez más rápido, hasta que los patrones se reconocen casi sin pensar, como un pájaro carpintero golpeando el mismo árbol. Acá van 25 problemas selectos de táctica variada (mates, horquillas, clavadas, desviaciones y más), tomados de la base de datos abierta de <a href=\"https://database.lichess.org/#puzzles\" target=\"_blank\" rel=\"noopener\">Lichess</a>. Resolvelos, anotá cuánto tardás y repetí el ciclo.",
    toMoveWhite: "Juegan las blancas",
    toMoveBlack: "Juegan las negras",
    reset: "Reintentar",
    prev: "Anterior",
    next: "Siguiente",
    showHint: "Ver pista",
    hideHint: "Ocultar pista",
    revealHint: "Revelar",
    showSolution: "Ver solución",
    hideSolution: "Ocultar solución",
    exerciseLabel: "Ejercicio",
    solutionLabel: "Solución",
    solutionAlternativesTitle: "Líneas alternativas",
    hintLabel: "Pista",
    gameLabel: "Partida",
    exerciseLinkWhite: "Juegan las blancas",
    exerciseLinkBlack: "Juegan las negras",
    settingsLang: "Idioma",
    settingsBoard: "Tablero",
    settingsBoardFlat: "Plano",
    settingsBoardWood: "Staunton",
    rotateBoard: "Rotar",
    fenLabel: "FEN",
    fenCopyHint: "Tocá para copiar",
    fenCopied: "FEN copiado",
    finalCongratsKicker: "Alburt",
    finalCongratsTitle: "Felicitaciones",
    finalCongratsSubtitle: "Tocá para volver al indice",
  },
  en: {
    indexTitleMain: "Chess Exercises",
    indexTitleSub: "Alburt's Pocket Book",
    alburtBio:
      'GM Lev Alburt is a three-time US Chess Champion (1984, 1985, 1990). Born in Ukraine, he emigrated to the United States in 1979 and became one of the country\'s most recognized chess coaches. His "<strong>Chess Training Pocket Book</strong>" contains 300 carefully selected positions designed to sharpen calculation and tactical vision. We share the first 7 exercises.',
    woodpeckerTitle: "The Woodpecker Method",
    woodpeckerBio:
      'The "<strong>Woodpecker Method</strong>" (Axel Smith and Hans Tikkanen) means solving the same set of tactical problems again and again, a little faster each cycle, until the patterns are recognised almost without thinking, like a woodpecker hammering the same tree. Here are 25 selected tactics of varied themes (mates, forks, pins, deflections and more) from the open <a href="https://database.lichess.org/#puzzles" target="_blank" rel="noopener">Lichess</a> puzzle database. Solve them, time yourself, and repeat the cycle.',
    toMoveWhite: "White to move",
    toMoveBlack: "Black to move",
    reset: "Retry",
    prev: "Previous",
    next: "Next",
    showHint: "Show hint",
    hideHint: "Hide hint",
    revealHint: "Reveal",
    showSolution: "Show solution",
    hideSolution: "Hide solution",
    exerciseLabel: "Exercise",
    solutionLabel: "Solution",
    solutionAlternativesTitle: "Alternative lines",
    hintLabel: "Hint",
    gameLabel: "Game",
    exerciseLinkWhite: "White to move",
    exerciseLinkBlack: "Black to move",
    settingsLang: "Language",
    settingsBoard: "Board",
    settingsBoardFlat: "Flat",
    settingsBoardWood: "Staunton",
    rotateBoard: "Rotate",
    fenLabel: "FEN",
    fenCopyHint: "Tap to copy",
    fenCopied: "FEN copied",
    finalCongratsKicker: "Alburt",
    finalCongratsTitle: "Congratulations!",
    finalCongratsSubtitle: "Tap to return to the index",
  },
};

export function normalizeLang(lang) {
  const normalized = lang?.toLowerCase().split("-")[0];
  return SUPPORTED_LANGS.has(normalized) ? normalized : null;
}

export function getLangFromUrl(
  search = typeof window === "undefined" ? "" : window.location.search,
) {
  const params = new URLSearchParams(search);
  return normalizeLang(params.get("lang"));
}

export function detectBrowserLang() {
  if (typeof navigator === "undefined") return DEFAULT_LANG;

  const candidates = Array.isArray(navigator.languages)
    ? navigator.languages
    : [navigator.language];

  for (const candidate of candidates) {
    const normalized = normalizeLang(candidate);
    if (normalized) return normalized;
  }

  return DEFAULT_LANG;
}

export function getLang() {
  return (
    getLangFromUrl() ||
    normalizeLang(localStorage.getItem(LANG_KEY)) ||
    detectBrowserLang()
  );
}

export function setLang(lang) {
  const normalized = normalizeLang(lang);
  if (!normalized) return;
  localStorage.setItem(LANG_KEY, normalized);
}

export function withLangInUrl(path, lang = getLang()) {
  if (typeof window === "undefined") return path;
  const url = new URL(path, window.location.href);
  url.searchParams.set("lang", lang);
  return `${url.pathname}${url.search}`;
}

export function syncLangInUrl(lang = getLang()) {
  if (typeof window === "undefined") return;
  const nextUrl = withLangInUrl(window.location.href, lang);
  const currentUrl = `${window.location.pathname}${window.location.search}`;
  if (nextUrl === currentUrl) return;
  window.history.replaceState({}, "", nextUrl);
}

export function t(key) {
  return strings[getLang()][key] ?? key;
}

export function applyI18n(lang) {
  const l = lang ?? getLang();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const text = strings[l][key];
    if (text === undefined) return;
    if (el.dataset.i18nHtml === "true") {
      el.innerHTML = text;
      return;
    }
    el.textContent = text;
  });
  // Update <html lang> attribute
  document.documentElement.lang = l;
}
