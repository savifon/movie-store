import { onMounted, onUnmounted } from 'vue'
import { useDebounce } from '@/composables/useDebounce'

export function useInfiniteScroll(callback) {
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.offsetHeight

    if (scrollTop + windowHeight >= documentHeight - 10) {
      callback()
    }
  }

  const debouncedSearch = useDebounce(handleScroll)

  onMounted(async () => {
    window.addEventListener('scroll', debouncedSearch)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', debouncedSearch)
  })
}
