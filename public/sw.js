const CACHE_NAME = 'alburt-v3'
const APP_SHELL_URLS = [
  './',
  './index.html',
  './exercise.html',
  './manifest.webmanifest',
  './images/apple-touch-icon.png',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/mascot.png',
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL_URLS.map(url => new Request(url, { cache: 'reload' })))),
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName)),
      ),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) return

  // Pages: network first so a new deploy shows up on the next open; cache only when offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'reload' })
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache))
          }
          return networkResponse
        })
        .catch(() => caches.match(event.request, { ignoreSearch: true })),
    )
    return
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse

      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse
        }

        const responseToCache = networkResponse.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })

        return networkResponse
      })
    }),
  )
})
