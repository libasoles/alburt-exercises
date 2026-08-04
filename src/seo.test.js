import { describe, expect, test } from 'vitest'

import { exercises } from './exercises/data.js'
import { buildExerciseTitle } from './seo.js'

describe('exercise SEO titles', () => {
  test('include exercise number in Spanish and English', () => {
    const exercise = exercises[0]

    expect(buildExerciseTitle('es', exercise)).toContain(`Ejercicio ${exercise.id}:`)
    expect(buildExerciseTitle('en', exercise)).toContain(`Exercise ${exercise.id}:`)
  })

  test('are unique across all exercises in Spanish and English', () => {
    const languages = ['es', 'en']

    for (const lang of languages) {
      const titles = exercises.map((exercise) => buildExerciseTitle(lang, exercise))
      expect(new Set(titles).size).toBe(titles.length)
    }
  })
})
