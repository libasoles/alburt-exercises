import { SITE_IMAGE, SITE_NAME, buildSiteUrl } from './site.js'

function setMeta(id, content) {
  const element = document.getElementById(id)
  if (!element || content === undefined || content === null) return
  element.setAttribute('content', content)
}

function setLink(id, href) {
  const element = document.getElementById(id)
  if (!element || !href) return
  element.setAttribute('href', href)
}

function setJsonLd(data) {
  const element = document.getElementById('seo-json-ld')
  if (!element) return
  element.textContent = JSON.stringify(data)
}

function applyCommonSeo({ title, description, canonicalUrl, pageType }) {
  document.title = title
  setMeta('meta-description', description)
  setMeta('meta-og-title', title)
  setMeta('meta-og-description', description)
  setMeta('meta-og-url', canonicalUrl)
  setMeta('meta-og-type', pageType)
  setMeta('meta-og-image', SITE_IMAGE)
  setMeta('meta-twitter-title', title)
  setMeta('meta-twitter-description', description)
  setMeta('meta-twitter-image', SITE_IMAGE)
  setLink('canonical-link', canonicalUrl)
}

export function updateIndexSeo(lang) {
  const isSpanish = lang === 'es'
  const title = isSpanish
    ? `${SITE_NAME} — Ejercicios de Alburt`
    : `${SITE_NAME} — Alburt Chess Exercises`
  const description = isSpanish
    ? 'Ejercicios interactivos de ajedrez del libro de Lev Alburt para practicar calculo, tactica y visualizacion.'
    : 'Interactive chess exercises from Lev Alburt to practice calculation, tactics, and visualization.'
  const canonicalUrl = buildSiteUrl('', { lang })

  applyCommonSeo({
    title,
    description,
    canonicalUrl,
    pageType: 'website',
  })

  setLink('alternate-es-link', buildSiteUrl('', { lang: 'es' }))
  setLink('alternate-en-link', buildSiteUrl('', { lang: 'en' }))

  setJsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: lang,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: buildSiteUrl(''),
    },
  })
}

export function updateExerciseSeo({ lang, exercise }) {
  const isSpanish = lang === 'es'
  const title = `${SITE_NAME} — ${exercise.title[lang]}`
  const description = isSpanish
    ? `Ejercicio ${exercise.id} de ajedrez de Lev Alburt. ${exercise.hint[lang]}`
    : `Chess exercise ${exercise.id} from Lev Alburt. ${exercise.hint[lang]}`
  const canonicalUrl = buildSiteUrl('exercise.html', {
    ex: String(exercise.id),
    lang,
  })

  applyCommonSeo({
    title,
    description,
    canonicalUrl,
    pageType: 'article',
  })

  setLink(
    'alternate-es-link',
    buildSiteUrl('exercise.html', { ex: String(exercise.id), lang: 'es' }),
  )
  setLink(
    'alternate-en-link',
    buildSiteUrl('exercise.html', { ex: String(exercise.id), lang: 'en' }),
  )

  setJsonLd({
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: lang,
    learningResourceType: 'Chess exercise',
    isPartOf: {
      '@type': 'CreativeWorkSeries',
      name: `${SITE_NAME} exercises`,
      url: buildSiteUrl('', { lang }),
    },
  })
}
