import { exercises } from './exercises/data.js'
import { getLang, applyI18n, setupLangToggle, t, strings } from './i18n.js'

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

    const badge = document.createElement('span')
    badge.className = `exercise-link-badge ${ex.toMove}`
    badge.textContent =
      ex.toMove === 'white' ? strings[lang].exerciseLinkWhite : strings[lang].exerciseLinkBlack

    link.appendChild(title)
    link.appendChild(badge)
    li.appendChild(link)
    list.appendChild(li)
  })
}

// Init
const lang = getLang()
applyI18n(lang)
renderExerciseList(lang)

setupLangToggle(newLang => {
  applyI18n(newLang)
  renderExerciseList(newLang)
})
