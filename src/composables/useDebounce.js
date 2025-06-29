import { ref, onUnmounted } from 'vue'

export function useDebounce(fn, delay = 500) {
  const timeoutRef = ref()

  const debouncedFn = (...args) => {
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
    }

    timeoutRef.value = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  onUnmounted(() => {
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value)
    }
  })

  return debouncedFn
}
