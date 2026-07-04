import { exercises } from './exercises/data.js'
import { getLang, applyI18n, syncLangInUrl, withLangInUrl } from './i18n.js'
import { updateIndexSeo } from './seo.js'
import './settingsMenu.js'
import { setupSettingsMenu } from './settings.js'

function renderExerciseList(lang) {
  const list = document.getElementById('exercise-list')
  list.innerHTML = ''

  exercises.forEach(ex => {
    const li = document.createElement('li')
    li.className = 'exercise-item'

    const link = document.createElement('a')
    link.href = withLangInUrl(`./exercise.html?ex=${ex.id}`, lang)
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
