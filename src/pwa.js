export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return

  const hadController = Boolean(navigator.serviceWorker.controller)
  let reloading = false

  // A new service worker took over an already-controlled page: reload to pick up fresh assets.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return
    reloading = true
    window.location.reload()
  })

  window.addEventListener('load', () => {
    const serviceWorkerUrl = new URL('./sw.js', window.location.href)

    navigator.serviceWorker.register(serviceWorkerUrl, {
      scope: './',
    }).catch(error => {
      console.error('Service worker registration failed', error)
    })
  })
}
