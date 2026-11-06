
import { GOOD_SECONDS_PER_MOVE } from './records.js'

const THEME_KEY = 'tucuchess_board_theme'
const TIMER_KEY = 'tucuchess_seconds_per_move'

export function getTheme() {
  const theme = localStorage.getItem(THEME_KEY) || 'default'
  return theme === 'wood' ? '3d' : theme
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}

export function getSecondsPerMove() {
  try {
    const value = Number(localStorage.getItem(TIMER_KEY))
    return value > 0 ? value : GOOD_SECONDS_PER_MOVE
  } catch {
    return GOOD_SECONDS_PER_MOVE
  }
}

export function setSecondsPerMove(seconds) {
  try {
    localStorage.setItem(TIMER_KEY, String(seconds))
  } catch {
    // Storage blocked: the threshold just won't persist.
  }
}

export function applyBoardTheme(theme) {
  const wrap = document.getElementById('board-wrap')
  if (!wrap) return
  wrap.classList.remove('theme-default', 'theme-3d')
  wrap.classList.add(`theme-${theme}`)
}

export function setupSettingsMenu(onLangChange, onThemeChange, onTimerChange) {
  const root = document.querySelector('settings-menu')
  const btn = root?.querySelector('#settings-btn')
  const menu = root?.querySelector('#settings-menu')
  if (!root || !btn || !menu) return

  let open = false

  function updateActive() {
    const theme = getTheme()
    menu.querySelectorAll('[data-theme]').forEach(el => {
      el.classList.toggle('active', el.dataset.theme === theme)
    })
  }

  function toggleMenu(forceOpen) {
    open = forceOpen !== undefined ? forceOpen : !open
    menu.hidden = !open
    btn.setAttribute('aria-expanded', String(open))
  }

  btn.addEventListener('click', e => {
    e.stopPropagation()
    updateActive()
    toggleMenu()
  })

  menu.querySelectorAll('[data-theme]').forEach(el => {
    el.addEventListener('click', () => {
      const newTheme = el.dataset.theme
      setTheme(newTheme)
      applyBoardTheme(newTheme)
      updateActive()
      if (onThemeChange) onThemeChange(newTheme)
    })
  })

  const timerInput = menu.querySelector('#settings-timer')
  const timerValue = menu.querySelector('#settings-timer-value')
  if (timerInput) {
    const showValue = () => {
      if (timerValue) timerValue.textContent = `${timerInput.value}s`
    }
    // Stored values outside the slider range snap to its nearest end.
    timerInput.value = getSecondsPerMove()
    showValue()
    timerInput.addEventListener('input', showValue)
    timerInput.addEventListener('change', () => {
      const seconds = Number(timerInput.value)
      setSecondsPerMove(seconds)
      if (onTimerChange) onTimerChange(seconds)
    })
  }

  document.addEventListener('click', () => toggleMenu(false))
  menu.addEventListener('click', e => e.stopPropagation())
}
