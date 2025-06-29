<script setup lang="js">
import { useStore } from 'vuex'
import { computed } from 'vue'
import HeaderNavbar from '@/components/ui/HeaderNavbar.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'

const store = useStore()
const countLoading = computed(() => {
  const count = store.getters['loading/count']

  if (count > 0) {
    document.body.style.overflowY = 'hidden'
  } else {
    document.body.style.overflowY = 'auto'
  }

  return count
})
</script>

<template>
  <LoadingOverlay v-if="countLoading > 0" />
  <HeaderNavbar />
  <main class="w-11/12 sm:w-10/12 py-6 sm:py-10 mx-auto">
    <RouterView />
  </main>
</template>
