const LANG_KEY = 'tucuchess_lang'

export const strings = {
  es: {
    indexTitle: 'Ejercicios de Ajedrez — Libro de Alburt',
    alburtBio:
      'El GM Lev Alburt fue tres veces campeón de los EE.UU. de ajedrez (1984, 1985, 1990). Nacido en Ucrania, emigró a Estados Unidos en 1979 y se convirtió en uno de los entrenadores más reconocidos del país. Su «Chess Training Pocket Book» contiene 300 posiciones cuidadosamente seleccionadas para mejorar el cálculo y la visión táctica. Este sitio presenta los primeros 7 ejercicios para la práctica interactiva del club TucuChess.',
    toMoveWhite: 'Mueven las blancas',
    toMoveBlack: 'Mueven las negras',
    reset: 'Reiniciar',
    prev: 'Anterior',
    next: 'Siguiente',
    showSolution: 'Ver solución',
    hideSolution: 'Ocultar solución',
    exerciseLabel: 'Ejercicio',
    solutionLabel: 'Solución',
    hintLabel: 'Pista',
    gameLabel: 'Partida',
    exerciseLinkWhite: 'Blancas juegan',
    exerciseLinkBlack: 'Negras juegan',
  },
  en: {
    indexTitle: "Chess Exercises — Alburt's Pocket Book",
    alburtBio:
      'GM Lev Alburt is a three-time US Chess Champion (1984, 1985, 1990). Born in Ukraine, he emigrated to the United States in 1979 and became one of the country\'s most recognized chess coaches. His "Chess Training Pocket Book" contains 300 carefully selected positions designed to sharpen calculation and tactical vision. This site presents the first 7 exercises for interactive practice by the TucuChess club.',
    toMoveWhite: 'White to move',
    toMoveBlack: 'Black to move',
    reset: 'Reset',
    prev: 'Previous',
    next: 'Next',
    showSolution: 'Show solution',
    hideSolution: 'Hide solution',
    exerciseLabel: 'Exercise',
    solutionLabel: 'Solution',
    hintLabel: 'Hint',
    gameLabel: 'Game',
    exerciseLinkWhite: 'White to move',
    exerciseLinkBlack: 'Black to move',
  },
}

export function getLang() {
  return localStorage.getItem(LANG_KEY) || 'es'
}

export function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang)
}

export function t(key) {
  return strings[getLang()][key] ?? key
}

export function applyI18n(lang) {
  const l = lang ?? getLang()
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    const text = strings[l][key]
    if (text !== undefined) el.textContent = text
  })
  // Update <html lang> attribute
  document.documentElement.lang = l
}

export function setupLangToggle(onSwitch) {
  const btn = document.getElementById('lang-toggle')
  if (!btn) return

  const update = (lang) => {
    btn.textContent = lang === 'es' ? 'EN' : 'ES'
    btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español')
  }

  update(getLang())

  btn.addEventListener('click', () => {
    const next = getLang() === 'es' ? 'en' : 'es'
    setLang(next)
    update(next)
    applyI18n(next)
    if (onSwitch) onSwitch(next)
  })
}
