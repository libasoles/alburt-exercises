import { formatClock } from './records.js'

/**
 * Exercise clock. Counts up when there is no record yet, otherwise counts down
 * from the record and turns red at zero. Pauses while the tab is hidden.
 */
const CLOCK_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="exercise-clock-icon" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l-4 2"/></svg>'

export function createClock(el) {
  let limitMs = null
  let elapsedBefore = 0
  let startedAt = null
  let stopped = false
  let interval = null

  const elapsed = () =>
    elapsedBefore + (startedAt === null ? 0 : performance.now() - startedAt)

  function render() {
    const ms = elapsed()
    const countdown = limitMs !== null
    const text = formatClock(countdown ? limitMs - ms : ms, { countdown })
    if (countdown) el.innerHTML = `${CLOCK_ICON}${text}`
    else el.textContent = text
    el.classList.toggle('exercise-clock-expired', countdown && ms >= limitMs)
    el.classList.toggle('exercise-clock-countdown', countdown)
  }

  function pause() {
    if (startedAt === null) return
    elapsedBefore = elapsed()
    startedAt = null
  }

  function resume() {
    if (stopped || startedAt !== null) return
    startedAt = performance.now()
  }

  function halt() {
    clearInterval(interval)
    interval = null
    pause()
  }

  document.addEventListener('visibilitychange', () => {
    if (stopped || interval === null) return
    if (document.hidden) pause()
    else resume()
  })

  return {
    start(recordMs) {
      halt()
      limitMs = recordMs ?? null
      elapsedBefore = 0
      stopped = false
      startedAt = performance.now()
      render()
      interval = setInterval(() => {
        render()
        if (limitMs !== null && elapsed() >= limitMs) halt()
      }, 250)
    },
    /** Freezes the clock and returns the elapsed milliseconds. */
    stop() {
      const ms = elapsed()
      stopped = true
      halt()
      elapsedBefore = ms
      render()
      return ms
    },
    /** Whether the countdown already reached zero. */
    get expired() {
      return limitMs !== null && elapsed() >= limitMs
    },
  }
}
