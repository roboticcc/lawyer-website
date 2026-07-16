import { ref, onBeforeUnmount, type Ref } from 'vue'

export const useCounterAnimation = (target: number, duration = 1500) => {
  const count = ref(0)
  let frame: number | null = null

  const startAnimation = () => {
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      count.value = Math.round(target * eased)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
  }

  onBeforeUnmount(() => {
    if (frame !== null) cancelAnimationFrame(frame)
  })

  return { count, startAnimation }
}

export const useScrollReveal = (
  target: Ref<Element | null>,
  options: IntersectionObserverInit = { threshold: 0.2 }
) => {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  const observe = () => {
    if (!target.value) return
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    }, options)
    observer.observe(target.value)
  }

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { isVisible, observe }
}
