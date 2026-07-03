import { describe, expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

function readRootFile(name) {
  return readFileSync(resolve(import.meta.dirname, '..', name), 'utf8')
}

describe('html shell', () => {
  test('index loads the shared stylesheet in the head', () => {
    const html = readRootFile('index.html')

    expect(html).toContain('<link rel="stylesheet" href="./src/styles/main.css" />')
    expect(html.indexOf('<link rel="stylesheet" href="./src/styles/main.css" />')).toBeLessThan(
      html.indexOf('</head>'),
    )
  })

  test('exercise loads the shared stylesheet in the head', () => {
    const html = readRootFile('exercise.html')

    expect(html).toContain('<link rel="stylesheet" href="./src/styles/main.css" />')
    expect(html.indexOf('<link rel="stylesheet" href="./src/styles/main.css" />')).toBeLessThan(
      html.indexOf('</head>'),
    )
  })
})
