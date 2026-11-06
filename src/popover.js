const POPOVER_MS = 3000

let current = null

function dismiss() {
  if (!current) return
  clearTimeout(current.timer)
  current.el.remove()
  current = null
}

/** Small non-intrusive bubble under `anchor`; closes on timeout, outside click or Escape. */
export function showPopover(anchor, text) {
  const wasOnSameAnchor = current?.anchor === anchor
  dismiss()
  if (wasOnSameAnchor) return

  const el = document.createElement('div')
  el.className = 'popover'
  el.setAttribute('role', 'status')
  el.textContent = text
  document.body.appendChild(el)

  const rect = anchor.getBoundingClientRect()
  const width = el.offsetWidth
  const left = Math.min(
    Math.max(8, rect.left + rect.width / 2 - width / 2),
    window.innerWidth - width - 8,
  )
  el.style.left = `${left + window.scrollX}px`
  el.style.top = `${rect.bottom + window.scrollY + 8}px`
  el.style.setProperty('--arrow-x', `${rect.left + rect.width / 2 - left}px`)

  current = { el, anchor, timer: setTimeout(dismiss, POPOVER_MS) }
}

document.addEventListener('click', event => {
  if (current && !current.anchor.contains(event.target)) dismiss()
})
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') dismiss()
})
