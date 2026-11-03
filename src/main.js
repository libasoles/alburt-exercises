import { exercises } from './exercises/data.js'
import { woodpeckerExercises } from './woodpecker/data.js'
import { getLang, applyI18n, syncLangInUrl, withLangInUrl } from './i18n.js'
import { registerServiceWorker } from './pwa.js'
import { updateIndexSeo } from './seo.js'
import './settingsMenu.js'
import { setupSettingsMenu } from './settings.js'

function renderExerciseList(lang) {
  renderList('exercise-list', exercises, '', lang)
  renderList('woodpecker-list', woodpeckerExercises, 'set=woodpecker&', lang)
}

function renderList(listId, items, query, lang) {
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

setupSettingsMenu(newLang => {
  updateIndexSeo(newLang)
  renderExerciseList(newLang)
})

registerServiceWorker()
