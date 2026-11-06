
const THEME_KEY = 'tucuchess_board_theme'

export function getTheme() {
  const theme = localStorage.getItem(THEME_KEY) || 'default'
  return theme === 'wood' ? '3d' : theme
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}

export function applyBoardTheme(theme) {
  const wrap = document.getElementById('board-wrap')
  if (!wrap) return
  wrap.classList.remove('theme-default', 'theme-3d')
  wrap.classList.add(`theme-${theme}`)
}

export function setupSettingsMenu(onLangChange, onThemeChange) {
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

  document.addEventListener('click', () => toggleMenu(false))
  menu.addEventListener('click', e => e.stopPropagation())
}
