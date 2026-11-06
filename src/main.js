import { exercises } from './exercises/data.js'
import { woodpeckerExercises } from './woodpecker/data.js'
import { getLang, applyI18n, syncLangInUrl, withLangInUrl } from './i18n.js'
import { registerServiceWorker } from './pwa.js'
import { updateIndexSeo } from './seo.js'
import './settingsMenu.js'
import { setupSettingsMenu, getSecondsPerMove } from './settings.js'
import { getRecord, isGoodRecord } from './records.js'
import { showPopover } from './popover.js'
import { t } from './i18n.js'
import { setupDismissibleCards, refreshDismissLabels } from './dismissibleCards.js'

const AWARD_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>'

function createGoodTimeBadge() {
  const badge = document.createElement('span')
  badge.className = 'good-time-icon'
  badge.setAttribute('role', 'button')
  badge.tabIndex = 0
  badge.innerHTML = AWARD_ICON
  badge.setAttribute('aria-label', t('goodTimePopover'))

  const open = event => {
    event.preventDefault()
    event.stopPropagation()
    showPopover(badge, t('goodTimePopover'))
  }
  badge.addEventListener('click', open)
  badge.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') open(event)
  })
  return badge
}

function renderExerciseList(lang) {
  renderList('exercise-list', exercises, '', lang)
  for (const level of ['easy', 'intermediate', 'advanced']) {
    const items = woodpeckerExercises.filter(ex => ex.level === level)
    renderList(`woodpecker-list-${level}`, items, 'set=woodpecker&', lang, 'woodpecker')
  }
}

function renderList(listId, items, query, lang, set = null) {
  const list = document.getElementById(listId)
  list.innerHTML = ''

  items.forEach(ex => {
    const li = document.createElement('li')
    li.className = 'exercise-item'

    const link = document.createElement('a')
    link.href = withLangInUrl(`./exercise.html?${query}ex=${ex.id}`, lang)
    link.className = 'exercise-link'

    const title = document.createElement('span')
    title.className = 'exercise-link-title'
    title.textContent = ex.title[lang]

    link.appendChild(title)
    if (isGoodRecord(getRecord(set, ex.id), getSecondsPerMove())) link.appendChild(createGoodTimeBadge())
    li.appendChild(link)
    list.appendChild(li)
  })
}

// Init
const lang = getLang()
syncLangInUrl(lang)
applyI18n(lang)
updateIndexSeo(lang)
renderExerciseList(lang)
setupDismissibleCards()

setupSettingsMenu(
  newLang => {
    refreshDismissLabels()
    updateIndexSeo(newLang)
    renderExerciseList(newLang)
  },
  undefined,
  () => renderExerciseList(getLang()),
)

// Back/forward cache can restore the index without re-running this script.
window.addEventListener('pageshow', event => {
  if (event.persisted) renderExerciseList(getLang())
})

registerServiceWorker()
