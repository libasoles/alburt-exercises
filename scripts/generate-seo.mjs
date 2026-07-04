import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { exercises } from '../src/exercises/data.js'
import { buildSiteUrl } from '../src/site.js'

const OUT_DIR = resolve(import.meta.dirname, '..', 'public')
const LANGS = ['es', 'en']
const TODAY = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Argentina/Tucuman',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date())

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function buildUrlEntries() {
  const entries = [
    buildSiteUrl('', { lang: 'es' }),
    buildSiteUrl('', { lang: 'en' }),
  ]

  for (const exercise of exercises) {
    for (const lang of LANGS) {
      entries.push(
        buildSiteUrl('exercise.html', {
          ex: String(exercise.id),
          lang,
        }),
      )
    }
  }

  return entries
}

function buildSitemapXml(urls) {
  const items = urls
    .map(
      (url) => `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${TODAY}</lastmod>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`
}

function buildRobotsTxt() {
  return `User-agent: *
Disallow: /
`
}

await mkdir(OUT_DIR, { recursive: true })

const urls = buildUrlEntries()

await writeFile(resolve(OUT_DIR, 'sitemap.xml'), buildSitemapXml(urls), 'utf8')
await writeFile(resolve(OUT_DIR, 'robots.txt'), buildRobotsTxt(), 'utf8')
