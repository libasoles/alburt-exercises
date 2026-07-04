export const SITE_NAME = 'TucuChess'
export const SITE_URL = 'https://libasoles.github.io/alburt-exercises/'
export const SITE_IMAGE = new URL('images/mascot.png', SITE_URL).toString()

export function buildSiteUrl(pathname = '', searchParams = {}) {
  const normalizedPath = pathname.replace(/^\.\//, '')
  const url = new URL(normalizedPath, SITE_URL)

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    url.searchParams.set(key, value)
  })

  return url.toString()
}
