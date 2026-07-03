const LANG_KEY = "tucuchess_lang";

export const strings = {
  es: {
    indexTitleMain: "Ejercicios de Ajedrez",
    indexTitleSub: "Libro de Alburt",
    alburtBio:
      "Lev Alburt fue tres veces campeón de ajedrez de EE.UU. (1984, 1985 y 1990). Nació en Ucrania, emigró a Estados Unidos en 1979 y llegó a ser uno de los entrenadores más reconocidos del país. Su «Chess Training Pocket Book» reúne 300 posiciones elegidas para afinar el cálculo y la visión táctica. Acá compartimos los primeros 7 ejercicios para practicar de forma interactiva en TucuChess.",
    toMoveWhite: "Juegan las blancas",
    toMoveBlack: "Juegan las negras",
    reset: "Reiniciar",
    prev: "Anterior",
    next: "Siguiente",
    showHint: "Ver pista",
    hideHint: "Ocultar pista",
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
    finalCongratsKicker: "TucuChess",
    finalCongratsTitle: "Felicitaciones",
    finalCongratsSubtitle: "Tocá para volver al indice",
  },
  en: {
    indexTitleMain: "Chess Exercises",
    indexTitleSub: "Alburt's Pocket Book",
    alburtBio:
      'GM Lev Alburt is a three-time US Chess Champion (1984, 1985, 1990). Born in Ukraine, he emigrated to the United States in 1979 and became one of the country\'s most recognized chess coaches. His "Chess Training Pocket Book" contains 300 carefully selected positions designed to sharpen calculation and tactical vision. This site presents the first 7 exercises for interactive practice by the TucuChess club.',
    toMoveWhite: "White to move",
    toMoveBlack: "Black to move",
    reset: "Reset",
    prev: "Previous",
    next: "Next",
    showHint: "Show hint",
    hideHint: "Hide hint",
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
    finalCongratsKicker: "TucuChess",
    finalCongratsTitle: "Congratulations!",
    finalCongratsSubtitle: "Tap to return to the index",
  },
};

export function getLang() {
  return localStorage.getItem(LANG_KEY) || "es";
}

export function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

export function t(key) {
  return strings[getLang()][key] ?? key;
}

export function applyI18n(lang) {
  const l = lang ?? getLang();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const text = strings[l][key];
    if (text !== undefined) el.textContent = text;
  });
  // Update <html lang> attribute
  document.documentElement.lang = l;
}
