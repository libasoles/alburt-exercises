import { exercises } from './exercises/data.js'
import { getLang, applyI18n } from './i18n.js'
import { setupSettingsMenu } from './settings.js'

function renderExerciseList(lang) {
  const list = document.getElementById('exercise-list')
  list.innerHTML = ''

  exercises.forEach(ex => {
    const li = document.createElement('li')
    li.className = 'exercise-item'

    const link = document.createElement('a')
    link.href = `./exercise.html?ex=${ex.id}`
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
applyI18n(lang)
renderExerciseList(lang)

setupSettingsMenu(newLang => {
  renderExerciseList(newLang)
})
