import { t } from './i18n.js'

const KEY_PREFIX = 'tucuchess_dismissed_'

const X_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'

function isDismissed(id) {
  try {
    return localStorage.getItem(KEY_PREFIX + id) === '1'
  } catch {
    return false
  }
}

function dismiss(id) {
  try {
    localStorage.setItem(KEY_PREFIX + id, '1')
  } catch {
    // Storage blocked: the card just comes back next visit.
  }
}

export function setupDismissibleCards() {
  document.querySelectorAll('[data-dismiss-id]').forEach(card => {
    const id = card.dataset.dismissId
    if (isDismissed(id)) {
      card.hidden = true
      return
    }
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'card-dismiss'
    btn.innerHTML = X_ICON
    btn.setAttribute('aria-label', t('dismissCard'))
    btn.addEventListener('click', () => {
      dismiss(id)
      card.hidden = true
    })
    card.appendChild(btn)
  })
}

export function refreshDismissLabels() {
  document.querySelectorAll('.card-dismiss').forEach(btn => {
    btn.setAttribute('aria-label', t('dismissCard'))
  })
}
