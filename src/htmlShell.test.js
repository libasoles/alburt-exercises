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

  test('html shells expose canonical and robots metadata', () => {
    const indexHtml = readRootFile('index.html')
    const exerciseHtml = readRootFile('exercise.html')

    expect(indexHtml).toContain('rel="canonical"')
    expect(indexHtml).toContain('name="robots"')
    expect(indexHtml).toContain('content="noindex,nofollow,noimageindex,noarchive,nosnippet"')
    expect(exerciseHtml).toContain('rel="canonical"')
    expect(exerciseHtml).toContain('name="robots"')
    expect(exerciseHtml).toContain('content="noindex,nofollow,noimageindex,noarchive,nosnippet"')
  })

  test('robots.txt blocks crawlers', () => {
    const robotsTxt = readRootFile('public/robots.txt')

    expect(robotsTxt).toContain('User-agent: *')
    expect(robotsTxt).toContain('Disallow: /')
    expect(robotsTxt).not.toContain('Allow: /')
    expect(robotsTxt).not.toContain('Sitemap:')
  })
})
